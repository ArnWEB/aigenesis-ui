import type { ChatMessage, ChatSession } from "@/components/chat/ChatDrawer";

const API_KEY = import.meta.env.VITE_LANGFLOW_API_KEY || "";
const BASE_URL = import.meta.env.VITE_LANGFLOW_BASE_URL || "";
const FLOW_ID = import.meta.env.VITE_LANGFLOW_FLOW_ID || "";

const getApiBase = () => BASE_URL;

export interface LangflowPayload {
  output_type: string;
  input_type: string;
  tweaks: Record<string, any>;
  session_id: string;
}

interface LangflowResponse {
  outputs: Array<{
    outputs: Array<{
      component_id: string;
      results?: {
        text?: {
          data?: {
            text: string;
          };
        };
      };
      outputs?: {
        text?: {
          message: string;
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
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for non-secure contexts (HTTP)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export type StreamCallback = (chunk: string, isComplete: boolean) => void;

/**
 * Sends a chat message and simulates a stream for the UI.
 * The provided API is non-streaming, so we return the full result as a single chunk.
 */
export async function sendChatMessageStream(
  email: string,
  messages: ChatMessage[],
  sessionId: string,
  onChunk: StreamCallback
): Promise<void> {
  try {
    const response = await sendChatMessage(email, messages, sessionId);
    onChunk(response, true);
  } catch (error) {
    console.error("Error in sendChatMessageStream:", error);
    throw error;
  }
}

export async function sendChatMessage(
  email: string,
  messages: ChatMessage[],
  sessionId: string
): Promise<string> {
  const latestInput = messages.length > 0 ? messages[messages.length - 1].content : "";
  
  const apiUrl = `${getApiBase()}/api/v1/run/${FLOW_ID}`;

  const payload: LangflowPayload = {
    output_type: "text",
    input_type: "text",
    tweaks: {
      "TextInput-L0fNg": { input_value: latestInput },
      "TextInput-1MH9m": { input_value: email },
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

  const responseData: LangflowResponse = await response.json();
  
  try {
    const outputNodes = responseData.outputs[0].outputs;
    let finalMessage = "No valid output found.";
    
    // Loop through nodes to find the first one with a valid text result
    for (const node of outputNodes) {
      // Use the path from the test script: results.text.data.text, or fallback to outputs.text.message
      const textResult = node.results?.text?.data?.text || node.outputs?.text?.message;
      
      if (textResult && textResult !== "None" && textResult !== "") {
        finalMessage = textResult.trim();
      }
    }
    
    return finalMessage;
  } catch (e) {
    console.error("Error parsing response structure:", e);
    throw new Error("Error parsing response structure");
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