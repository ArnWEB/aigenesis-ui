import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";
import { sendChatMessageStream, generateSessionId, loadSessionsFromStorage, saveSessionsToStorage } from "@/services/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    langflowSessionId?: string;
  };
}

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

const AI_PERSONAS = {
  admin: {
    name: "System Admin",
    role: "Platform Administration",
    color: "primary",
    icon: "⚙️",
  },
  executors: {
    name: "Aigenesis Intelligence",
    role: "Enterprise Analytics",
    color: "primary",
    icon: "🛡️",
  },
  underwriter: {
    name: "Risk Analyst",
    role: "Underwriting Assistant",
    color: "secondary",
    icon: "📊",
  },
  adjudicator: {
    name: "Claims AI",
    role: "Adjudication Support",
    color: "tertiary",
    icon: "⚖️",
  },
  "customer-service": {
    name: "Support Agent",
    role: "Customer Assistance",
    color: "secondary",
    icon: "🎧",
  },
  operations: {
    name: "Ops Manager",
    role: "Operations AI",
    color: "tertiary",
    icon: "⚙️",
  },
  "customer-agent": {
    name: "Field Agent",
    role: "Mobile Assistant",
    color: "primary",
    icon: "📍",
  },
} as const;

function createDefaultSession(): ChatSession {
  return {
    id: `session-${Date.now()}`,
    title: "New Conversation",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      langflowSessionId: generateSessionId(),
    },
  };
}

export function ChatDrawer({ isOpen, onClose, className }: ChatDrawerProps) {
  const { user } = useAuthContext();
  const [sessions, setSessions] = useState<ChatSession[]>([createDefaultSession()]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "error" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persona = user?.persona 
    ? AI_PERSONAS[user.persona as keyof typeof AI_PERSONAS] 
    : AI_PERSONAS.executors;

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const showToast = useCallback((message: string, type: "success" | "error" = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "error" }), 4000);
  }, []);

  useEffect(() => {
    if (user?.id) {
      const stored = loadSessionsFromStorage(user.id);
      if (stored && stored.length > 0) {
        setSessions(stored);
        setActiveSessionId(stored[0].id);
      } else {
        const newSession = createDefaultSession();
        setSessions([newSession]);
        setActiveSessionId(newSession.id);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id && sessions.length > 0) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveSessionsToStorage(user.id, sessions);
      }, 500);
    }
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [sessions, user?.id]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeSession.messages, scrollToBottom]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    if (!user?.email) {
      showToast("User not authenticated. Please log in again.");
      return;
    }

    const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
    const sessionId = currentSession.metadata?.langflowSessionId || generateSessionId();

    const userInput = input.trim();

    setInput("");
    setIsTyping(true);

    const newUserMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [...session.messages, newUserMessage],
              title: session.messages.length === 0 ? userInput.slice(0, 30) + (userInput.length > 30 ? "..." : "") : session.title,
              updatedAt: new Date(),
              metadata: {
                ...session.metadata,
                langflowSessionId: sessionId,
              },
            }
          : session
      )
    );

    const assistantMessageId = `msg-${Date.now() + 1}`;
    const placeholderMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      metadata: {
        persona: user?.persona,
      },
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [...session.messages, placeholderMessage],
              updatedAt: new Date(),
            }
          : session
      )
    );

    try {
      // Get the session messages to send full history to Langflow
      const currentSessionForApi = sessions.find((s) => s.id === activeSessionId) || sessions[0];
      const sessionMessages = [...currentSessionForApi.messages, newUserMessage];
      
      await sendChatMessageStream(user.email, sessionMessages, sessionId, (chunk, isComplete) => {
        setSessions((prev) =>
          prev.map((session) =>
            session.id === activeSessionId
              ? {
                  ...session,
                  messages: session.messages.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: chunk }
                      : msg
                  ),
                }
              : session
          )
        );
        
        if (isComplete) {
          setIsTyping(false);
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to get response";
      showToast(errorMessage);
      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? {
                ...session,
                messages: session.messages.filter((msg) => msg.id !== assistantMessageId),
              }
            : session
        )
      );
      setIsTyping(false);
    }
  }, [input, isTyping, activeSessionId, sessions, user, showToast]);

  const handleNewChat = useCallback(() => {
    const newSession = createDefaultSession();
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

  const handleClearSession = useCallback(() => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [],
              title: "New Conversation",
              metadata: {
                ...session.metadata,
                langflowSessionId: generateSessionId(),
              },
            }
          : session
      )
    );
  }, [activeSessionId]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-surface-container border-l border-outline-variant/20 z-50 transform transition-transform duration-300 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center text-lg",
              persona.color === "primary" && "bg-primary/20",
              persona.color === "secondary" && "bg-secondary/20",
              persona.color === "tertiary" && "bg-tertiary/20",
            )}>
              {persona.icon}
            </div>
            <div>
              <h3 className="text-sm font-headline font-semibold text-on-surface">
                {persona.name}
              </h3>
              <p className="text-[10px] text-on-surface-variant">{persona.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearSession}
              className="p-2 rounded-lg hover:bg-surface-variant transition-colors"
              title="Clear Chat"
            >
              <svg className="w-5 h-5 text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={handleNewChat}
              className="p-2 rounded-lg hover:bg-surface-variant transition-colors"
              title="New Chat"
            >
              <svg className="w-5 h-5 text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface-variant transition-colors"
            >
              <svg className="w-5 h-5 text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sessions List (Collapsed) */}
        {sessions.length > 1 && (
          <div className="flex gap-1 p-2 border-b border-outline-variant/10 overflow-x-auto">
            {sessions.slice(0, 5).map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors",
                  activeSessionId === session.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface-variant text-on-surface-variant hover:text-on-surface"
                )}
              >
                {session.title}
              </button>
            ))}
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeSession.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <div className="text-4xl">{persona.icon}</div>
              <p className="text-sm text-on-surface-variant">
                How can I assist you today?
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                {[
                  "Show metrics",
                  "Analyze claim",
                  "Check status",
                  "Generate report",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1 text-xs bg-surface-variant rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            activeSession.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm",
                  message.role === "user" 
                    ? "bg-primary/20 text-primary" 
                    : persona.color === "secondary" 
                      ? "bg-secondary/20 text-secondary"
                      : persona.color === "tertiary"
                        ? "bg-tertiary/20 text-tertiary"
                        : "bg-primary/20 text-primary"
                )}>
                  {message.role === "user" ? "👤" : persona.icon}
                </div>
                <div className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                  message.role === "user"
                    ? "bg-primary text-on-primary rounded-tr-none"
                    : "bg-surface-variant text-on-surface rounded-tl-none"
                )}>
                  {message.role === "user" ? (
                    message.content
                  ) : message.content || isTyping ? (
                    isTyping && !message.content ? null : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            const isInline = !match;
                            return isInline ? (
                              <code className="px-1.5 py-0.5 bg-black/20 rounded text-xs font-mono" {...props}>
                                {children}
                              </code>
                            ) : (
                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg text-xs my-2"
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            );
                          },
                          a({ href, children, ...props }) {
                            return (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80" {...props}>
                                {children}
                              </a>
                            );
                          },
                          ul({ children, ...props }) {
                            return <ul className="list-disc list-inside space-y-1 my-2" {...props}>{children}</ul>;
                          },
                          ol({ children, ...props }) {
                            return <ol className="list-decimal list-inside space-y-1 my-2" {...props}>{children}</ol>;
                          },
                          li({ children, ...props }) {
                            return <li className="text-sm" {...props}>{children}</li>;
                          },
                          h1({ children, ...props }) {
                            return <h1 className="text-xl font-bold my-3" {...props}>{children}</h1>;
                          },
                          h2({ children, ...props }) {
                            return <h2 className="text-lg font-bold my-2" {...props}>{children}</h2>;
                          },
                          h3({ children, ...props }) {
                            return <h3 className="text-md font-semibold my-2" {...props}>{children}</h3>;
                          },
                          p({ children, ...props }) {
                            return <p className="my-2" {...props}>{children}</p>;
                          },
                          table({ children, ...props }) {
                            return (
                              <div className="overflow-x-auto my-3">
                                <table className="min-w-full text-xs border-collapse" {...props}>{children}</table>
                              </div>
                            );
                          },
                          th({ children, ...props }) {
                            return <th className="border px-2 py-1 bg-black/20 text-left" {...props}>{children}</th>;
                          },
                          td({ children, ...props }) {
                            return <td className="border px-2 py-1" {...props}>{children}</td>;
                          },
                          blockquote({ children, ...props }) {
                            return <blockquote className="border-l-4 border-primary/50 pl-3 my-2 italic" {...props}>{children}</blockquote>;
                          },
                          strong({ children, ...props }) {
                            return <strong className="font-bold" {...props}>{children}</strong>;
                          },
                          em({ children, ...props }) {
                            return <em className="italic" {...props}>{children}</em>;
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )
                  ) : null}
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm",
                persona.color === "secondary" ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
              )}>
                {persona.icon}
              </div>
              <div className="bg-surface-variant rounded-2xl rounded-tl-none px-4 py-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-outline-variant/10">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about claims, policies, or metrics..."
              className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={cn(
                "p-2 rounded-lg transition-colors",
                input.trim() && !isTyping
                  ? "bg-primary text-on-primary hover:brightness-110"
                  : "bg-surface-variant text-on-surface-variant cursor-not-allowed"
              )}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[8px] text-on-surface-variant/40 uppercase tracking-wider">
              AES-256 Encrypted
            </span>
            <span className="text-[8px] text-on-surface-variant/40 uppercase tracking-wider">
              {persona.role} Core
            </span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 right-6 z-50 animate-slide-in">
          <div className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border",
            toast.type === "success" ? "bg-tertiary/20 border-tertiary text-tertiary" : "bg-error/20 border-error text-error"
          )}>
            {toast.type === "success" ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm font-medium text-on-surface">{toast.message}</span>
            <button onClick={() => setToast({ show: false, message: "", type: "error" })} className="ml-2">✕</button>
          </div>
        </div>
      )}
    </>
  );
}

interface ChatTriggerProps {
  onClick: () => void;
  className?: string;
}

export function ChatTrigger({ onClick, className }: ChatTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary-dim flex items-center justify-center text-on-primary shadow-lg hover:scale-110 active:scale-95 transition-all group",
        className
      )}
    >
      <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </button>
  );
}