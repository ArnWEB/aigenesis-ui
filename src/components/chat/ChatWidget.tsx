import { useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachment?: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Good morning, Agent. I have prioritized #CLM-8902 due to high fraud probability markers. How can I assist with your review?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Comparison complete. I found a mismatch in metadata. The upload date for the claimant's photo is 3 months prior to the incident date.",
        timestamp: new Date(),
        attachment: "damage_analysis_side_v2.exif"
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-gradient-to-r from-primary to-primary-dim rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(164,166,255,0.3)] flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg className="w-6 h-6 text-on-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[60] flex flex-col bg-surface-container border border-outline-variant/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(164,166,255,0.1)] overflow-hidden transition-all duration-300",
      isMinimized ? "w-80 h-14" : "w-96 h-[560px]"
    )}>
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dim p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <svg className="w-5 h-5 text-on-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm font-bold text-on-primary leading-none">Aegis Intelligence</h5>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              <span className="text-[10px] text-white/80 font-medium">Real-time Assistance</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-lowest/50">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  "flex justify-start",
                  message.role === "user" && "justify-end"
                )}
              >
                <div className={cn(
                  "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                  message.role === "assistant" 
                    ? "bg-surface-container-highest text-on-surface-variant rounded-tl-none"
                    : "bg-primary text-on-primary font-medium rounded-tr-none"
                )}>
                  {message.attachment && (
                    <div className="flex items-center gap-2 bg-background/40 p-2 rounded-lg border border-outline-variant/20 mb-2">
                      <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[10px] font-medium truncate">{message.attachment}</span>
                    </div>
                  )}
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface-container-highest/60 px-4 py-2 rounded-full flex gap-1 items-center h-8">
                  <div className="w-1 h-1 bg-on-surface-variant rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1 h-1 bg-on-surface-variant rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-1 bg-on-surface-variant rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-surface-container border-t border-outline-variant/10">
            <div className="relative flex flex-col gap-3">
              <div className="flex gap-2 mb-1">
                <button className="bg-surface-container-highest p-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="bg-surface-container-highest p-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask AI about this claim..."
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 rounded-xl pl-4 pr-12 py-3 text-sm text-on-surface focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] uppercase tracking-widest text-on-surface-variant/40 font-bold">AES-256 Encrypted Tunnel</span>
                <span className="text-[9px] uppercase tracking-widest text-on-surface-variant/40 font-bold">GPT-4V Core</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
