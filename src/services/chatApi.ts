import type { ChatMessage, ChatSession } from "@/components/chat/ChatDrawer";

const API_KEY = import.meta.env.VITE_LANGFLOW_API_KEY || "";
const BASE_URL = import.meta.env.VITE_LANGFLOW_URL || "https://langflow-aigenesis-dev.azurewebsites.net";
const FLOW_ID = import.meta.env.VITE_LANGFLOW_FLOW_ID || "chat";

const getApiBase = () => BASE_URL;

export interface LangflowPayload {
  output_type: "chat";
  input_type: "chat";
  tweaks: {
    "TextInput-Lhpx2": { input_value: string };
    "ChatInput-Dpbqb": { input_value: string };
  };
  session_id: string;
}

interface LangflowResponse {
  outputs?: Array<{
    outputs?: Array<{
      artifacts?: {
        stream_url?: string;
        message?: string;
      };
      results?: {
        message?: {
          text?: string;
        };
      };
    }>;
  }>;
}

export function formatChatHistory(messages: ChatMessage[]): string {
  return messages
    .map((msg) => {
      const role = msg.role === "user" ? "Human" : "AI";
      return `${role}: ${msg.content}`;
    })
    .join("\n");
}

export function generateSessionId(): string {
  return crypto.randomUUID();
}

export type StreamCallback = (chunk: string, isComplete: boolean) => void;

export async function sendChatMessageStream(
  email: string,
  messages: ChatMessage[],
  sessionId: string,
  onChunk: StreamCallback
): Promise<void> {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error("API key not configured. Please set VITE_LANGFLOW_API_KEY in .env");
  }

  // Format chat history - separate latest input from history
  // Latest input goes to vector search, history is just for context
  const historyMessages = messages.slice(0, -1); // All messages except last one
  const latestInput = messages.length > 0 ? messages[messages.length - 1].content : "";

  const formattedHistory = historyMessages
    .map((msg) => {
      const role = msg.role === "user" ? "Human" : "AI";
      return `${role}: ${msg.content}`;
    })
    .join("\n");

  // Create combined input with clear separator
  const combinedInput = formattedHistory
    ? `HISTORY:\n${formattedHistory}\n\nLATEST_INPUT:\n${latestInput}`
    : latestInput;

  const flowId = FLOW_ID;
  const apiBase = getApiBase();
  const initiateUrl = `${apiBase}/api/v1/run/${flowId}?stream=true`;

  const payload: LangflowPayload = {
    output_type: "chat",
    input_type: "chat",
    tweaks: {
      "TextInput-Lhpx2": { input_value: email },
      "ChatInput-Dpbqb": { input_value: combinedInput },
    },
    session_id: sessionId,
  };

  const initResponse = await fetch(initiateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!initResponse.ok) {
    const errorText = await initResponse.text();
    throw new Error(`API error: ${initResponse.status} - ${errorText}`);
  }

  if (!initResponse.body) {
    throw new Error("No response body");
  }

  const reader = initResponse.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullMessage = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        let jsonStr = trimmedLine;
        if (trimmedLine.startsWith("data:")) {
          jsonStr = trimmedLine.slice(5).trim();
        }

        if (!jsonStr) continue;

        const cleanJsonStr = jsonStr.replace(/^\uFEFF/, '').trim();
        if (!cleanJsonStr || cleanJsonStr === '') continue;

        if (cleanJsonStr.charAt(0) !== '{' && cleanJsonStr.charAt(0) !== '[') continue;

        try {
          const eventData = JSON.parse(cleanJsonStr);

        if (eventData.event === "token" && eventData.data?.chunk) {
            let chunk = eventData.data.chunk;
            if (chunk.trim() === "..." || chunk.trim() === "…") {
              continue;
            }
            if (chunk.includes("thinking...")) {
              chunk = chunk.replace(/thinking\.\.\./gi, "").replace(/…/g, "");
              if (!chunk.trim()) continue;
            }
            fullMessage += chunk;
            onChunk(fullMessage, false);
          } else if (eventData.event === "add_message" && eventData.data?.message?.text) {
            fullMessage = eventData.data.message.text;
            onChunk(fullMessage, false);
          } else if (eventData.event === "end") {
            if (eventData.data?.message?.text) {
              fullMessage = eventData.data.message.text;
            }
            onChunk(fullMessage, true);
            return;
          } else if (eventData.event === "close") {
            onChunk(fullMessage, true);
            return;
          }
        } catch (e) {
          console.warn("JSON parse error:", e);
        }
      }
    }

    if (fullMessage) {
      onChunk(fullMessage, true);
    }
  } finally {
    reader.releaseLock();
  }
}

export async function sendChatMessage(
  email: string,
  _messages: ChatMessage[],
  sessionId: string
): Promise<string> {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error("API key not configured. Please set VITE_LANGFLOW_API_KEY in .env");
  }

  const flowId = FLOW_ID;
  const apiBase = getApiBase();
  const apiUrl = `${apiBase}/api/v1/run/${flowId}`;

  const payload: LangflowPayload = {
    output_type: "chat",
    input_type: "chat",
    tweaks: {
      "TextInput-Lhpx2": { input_value: email },
      "ChatInput-Dpbqb": { input_value: "" },
    },
    session_id: sessionId,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const data: LangflowResponse = await response.json();

  try {
    const outputs = data.outputs;
    if (!outputs || !outputs[0]) throw new Error("Invalid response format");

    const firstOutput = outputs[0].outputs;
    if (!firstOutput || !firstOutput[0]) throw new Error("No response from flow");

    const artifacts = firstOutput[0].artifacts;
    if (artifacts?.message) return artifacts.message;

    const results = firstOutput[0].results;
    if (results?.message?.text) return results.message.text;

    throw new Error("No message in response");
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Failed to parse response");
  }
}

export function getStorageKey(userId: string): string {
  return `aigenesis_chat_sessions_${userId}`;
}

export function loadSessionsFromStorage(userId: string): ChatSession[] | null {
  try {
    const key = getStorageKey(userId);
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed.map((session: ChatSession) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      messages: session.messages.map((msg: ChatMessage) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch {
    return null;
  }
}

export function saveSessionsToStorage(userId: string, sessions: ChatSession[]): void {
  try {
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(sessions));
  } catch (e) {
    console.error("Failed to save chat sessions:", e);
  }
}

export function clearSessionsFromStorage(userId: string): void {
  try {
    const key = getStorageKey(userId);
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Failed to clear chat sessions:", e);
  }
}