import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";
import { sendChatMessageStream, generateSessionId, loadSessionsFromStorage, saveSessionsToStorage } from "@/services/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const AI_PERSONAS = {
  "customer-agent": {
    name: "Field Agent AI",
    role: "Mobile Assistant",
    color: "text-primary",
    icon: "🎯",
  },
  default: {
    name: "Aigenesis Assistant",
    role: "AI Helper",
    color: "text-primary",
    icon: "🤖",
  },
};

export function AssistChatPage() {
  const { user } = useAuthContext();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const persona = user?.persona || "default";
  const aiPersona = AI_PERSONAS[persona as keyof typeof AI_PERSONAS] || AI_PERSONAS.default;

  useEffect(() => {
    if (user?.id) {
      const stored = loadSessionsFromStorage(user.id);
      if (stored && stored.length > 0) {
        setSessions(stored);
        setActiveSessionId(stored[0].id);
      } else {
        const newSession: ChatSession = {
          id: generateSessionId(),
          title: "New Chat",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setSessions([newSession]);
        setActiveSessionId(newSession.id);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id && sessions.length > 0) {
      saveSessionsToStorage(user.id, sessions);
    }
  }, [sessions, user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeSessionId]);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: generateSessionId(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setError(null);
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      const remaining = sessions.filter(s => s.id !== sessionId);
      setActiveSessionId(remaining[0]?.id || null);
    }
  }, [activeSessionId, sessions]);

  const updateSessionTitle = useCallback((sessionId: string, firstMessage: string) => {
    const title = firstMessage.length > 30 ? firstMessage.slice(0, 30) + "..." : firstMessage;
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, title, updatedAt: new Date() } : s
    ));
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !activeSessionId || isStreaming) return;

    const userMessage: ChatMessage = {
      id: generateSessionId(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setSessions(prev => prev.map(s => 
      s.id === activeSessionId 
        ? { ...s, messages: [...s.messages, userMessage], updatedAt: new Date() }
        : s
    ));

    const currentInput = input.trim();
    setInput("");
    setIsStreaming(true);
    setError(null);

    if (activeSession?.messages.length === 0) {
      updateSessionTitle(activeSessionId, currentInput);
    }

    try {
      const sessionId = activeSessionId;
      const allMessages = [...(activeSession?.messages || []), userMessage];
      
      await sendChatMessageStream(
        user?.email || "",
        allMessages,
        sessionId,
        (chunk, isComplete) => {
          setSessions(prev => prev.map(s => {
            if (s.id !== sessionId) return s;
            
            const existingAssistantIdx = s.messages.findIndex(m => m.role === "assistant" && m.id === "streaming");
            
            if (existingAssistantIdx >= 0) {
              const updated = [...s.messages];
              updated[existingAssistantIdx] = { ...updated[existingAssistantIdx], content: chunk };
              return { ...s, messages: updated };
            } else if (isComplete || chunk) {
              return {
                ...s,
                messages: [...s.messages, {
                  id: isComplete ? generateSessionId() : "streaming",
                  role: "assistant",
                  content: chunk,
                  timestamp: new Date(),
                }],
              };
            }
            return s;
          }));
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      <div className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-2">
        <button
          onClick={createNewSession}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-xl font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2 mt-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all",
                activeSessionId === session.id
                  ? "bg-surface-container-high text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <button
                onClick={() => setActiveSessionId(session.id)}
                className="flex-1 text-left truncate text-sm"
              >
                {session.messages.length === 0 ? "New Chat" : session.title}
              </button>
              <button
                onClick={() => deleteSession(session.id)}
                className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto space-y-6 p-4">
          {!activeSession?.messages.length && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-4xl">
                {aiPersona.icon}
              </div>
              <div>
                <h3 className="text-2xl font-headline font-bold text-on-surface">{aiPersona.name}</h3>
                <p className="text-on-surface-variant mt-1">{aiPersona.role}</p>
              </div>
              <p className="text-sm text-on-surface-variant max-w-md">
                Start a conversation and I'll help you with field operations, customer inquiries, and more.
              </p>
            </div>
          )}

          {activeSession?.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-4xl",
                message.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === "user" 
                  ? "bg-gradient-to-br from-secondary to-secondary-dim text-on-secondary" 
                  : "bg-gradient-to-br from-primary to-primary-dim text-on-primary"
              )}>
                {message.role === "user" ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <span className="text-sm">{aiPersona.icon}</span>
                )}
              </div>
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 max-w-[75%]",
                  message.role === "user"
                    ? "bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-br-md"
                    : "bg-surface-container-high text-on-surface rounded-bl-md"
                )}
              >
                <div className="prose prose-sm max-w-none prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {isStreaming && (
            <div className="flex gap-3 max-w-4xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dim text-on-primary flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{aiPersona.icon}</span>
              </div>
              <div className="bg-surface-container-high rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm ml-12">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-outline-variant/20">
          <div className="relative max-w-4xl mx-auto">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isStreaming}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl pl-4 pr-12 py-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 resize-none"
              rows={1}
              style={{ minHeight: "56px", maxHeight: "200px" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all",
                input.trim() && !isStreaming
                  ? "bg-primary text-on-primary hover:brightness-110"
                  : "bg-surface-container text-on-surface-variant"
              )}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-on-surface-variant/50 mt-2">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}