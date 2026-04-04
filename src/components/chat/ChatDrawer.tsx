import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";

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
  metadata?: Record<string, unknown>;
}

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
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

export function ChatDrawer({ isOpen, onClose, className }: ChatDrawerProps) {
  const { user } = useAuthContext();
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "default",
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState("default");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const persona = user?.persona 
    ? AI_PERSONAS[user.persona as keyof typeof AI_PERSONAS] 
    : AI_PERSONAS.executors;

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeSession.messages, scrollToBottom]);

  const generateResponse = useCallback(async (_message: string): Promise<string> => {
    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const responses: Record<string, string[]> = {
      executors: [
        "Analyzing enterprise risk metrics... Total exposure is within acceptable parameters.",
        "Portfolio performance update: GWP increased by 12.4% this quarter. Combined ratio at 91.4%.",
        "AI efficiency analysis: Underwriting department shows 42% time reduction per policy.",
      ],
      underwriter: [
        "Risk assessment complete. Financial risk score: 88%. Recommendation: Review liability cap.",
        "Market trend analysis: Logistics sector shows +14% volatility. Consider adjusted premium.",
        "Policy comparison: Premium deviation detected at +0.05%. Within acceptable range.",
      ],
      adjudicator: [
        "Claims analysis: #CLM-8902 shows anomalous damage pattern. Confidence: 98.4%.",
        "Fraud probability detected: 82%. Metadata mismatch found in uploaded photos.",
        "AI insight: Damage pattern inconsistent with reported multi-car collision.",
      ],
      "customer-service": [
        "Customer ticket #AX-2041: Drone dispatched to collision site. ETA: 4 minutes.",
        "Policy query processed. Account #AE-7728 shows full replacement coverage.",
        "Client approval pending for tow destination: Southside Collision Center.",
      ],
      operations: [
        "Compute cluster status: US-EAST at 45%, EU-WEST at 82% (heavy load).",
        "Active agents: 1,204 across all regions. Throughput optimal.",
        "API latency: 14ms. Within acceptable parameters.",
      ],
      "customer-agent": [
        "Field verification: 65% of workflow complete. Policy documentation: 20%.",
        "Incident #AX-2041: Damage assessment 85% complete. Write-off likely.",
        "CSAT score: 4.9/5. Target: 4.8. Performance optimal.",
      ],
    };

    const roleResponses = responses[user?.persona || "executors"];
    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
  }, [user?.persona]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const newUserMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [...session.messages, newUserMessage],
              updatedAt: new Date(),
            }
          : session
      )
    );
    setInput("");
    setIsTyping(true);

    try {
      const response = await generateResponse(input.trim());
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
        metadata: {
          persona: user?.persona,
          confidence: Math.random() * 10 + 90,
        },
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? {
                ...session,
                messages: [...session.messages, assistantMessage],
                updatedAt: new Date(),
              }
            : session
        )
      );
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, activeSessionId, generateResponse, user?.persona]);

  const handleNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

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
                  {message.content}
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
    </>
  );
}

// Floating trigger button
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