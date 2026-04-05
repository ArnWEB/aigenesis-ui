import type { ChatMessage, ChatSession } from "@/components/chat/ChatDrawer";

const API_KEY = import.meta.env.VITE_LANGFLOW_API_KEY;
const API_URL = import.meta.env.VITE_LANGFLOW_URL || "https://langflow-aigenesis-dev.azurewebsites.net/api/v1/run/chat";

export interface LangflowPayload {
  output_type: "chat";
  input_type: "chat";
  tweaks: {
    "TextInput-Lhpx2": { input_value: string };
    "ChatInput-Dpbqb": { input_value: string };
  };
  session_id: string;
}

export interface LangflowResponse {
  outputs?: Array<{
    outputs?: Array<{
      artifacts?: {
        message?: string;
      };
      results?: {
        message?: {
          text?: string;
        };
      };
    }>;
  }>;
  error?: string;
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

export async function sendChatMessage(
  email: string,
  messages: ChatMessage[],
  sessionId: string
): Promise<string> {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error("API key not configured. Please set VITE_LANGFLOW_API_KEY in .env");
  }

  const formattedHistory = formatChatHistory(messages);

  const payload: LangflowPayload = {
    output_type: "chat",
    input_type: "chat",
    tweaks: {
      "TextInput-Lhpx2": { input_value: email },
      "ChatInput-Dpbqb": { input_value: formattedHistory },
    },
    session_id: sessionId,
  };

  const response = await fetch(API_URL, {
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

  const result = extractResponse(data);
  if (!result) {
    throw new Error("Invalid response format from Langflow");
  }

  return result;
}

function extractResponse(data: LangflowResponse): string | null {
  try {
    const outputs = data.outputs;
    if (!outputs || !outputs[0]) return null;

    const firstOutput = outputs[0].outputs;
    if (!firstOutput || !firstOutput[0]) return null;

    const artifacts = firstOutput[0].artifacts;
    if (artifacts?.message) {
      return artifacts.message;
    }

    const results = firstOutput[0].results;
    if (results?.message?.text) {
      return results.message.text;
    }

    return null;
  } catch {
    return null;
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