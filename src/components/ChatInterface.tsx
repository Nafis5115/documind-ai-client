import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Sparkles,
  Zap,
  ListChecks,
  Brain,
  FileText,
} from "lucide-react";
import type { ChatSession } from "@/lib/store";
import { useOutletContext, useParams } from "react-router-dom";
import type { AppLayoutContext } from "@/layouts/AppLayout";
interface ChatInterfaceProps {
  chat: ChatSession | undefined;
  onSendMessage: (chatId: string, content: string) => void;
}

const suggestedPrompts = [
  {
    icon: Sparkles,
    label: "Summarize",
    prompt: "Summarize the key points of this document",
  },
  {
    icon: Brain,
    label: "Explain simply",
    prompt: "Explain this document in simple terms",
  },
  {
    icon: ListChecks,
    label: "Key points",
    prompt: "Extract the key points and action items",
  },
  {
    icon: Zap,
    label: "Extract insights",
    prompt: "What are the most important insights?",
  },
];

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-xl gradient-bg-accent flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-accent-foreground" />
      </div>
      <div className="chat-bubble-ai px-5 py-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
          <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
          <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
        </div>
      </div>
    </div>
  );
};

const ChatInterface = () => {
  const { chats, addMessage } = useOutletContext<AppLayoutContext>();
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chat = chats.find((c) => c.id === id);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || !chat) return;
    addMessage(chat.id, { role: "user", content: input.trim() });
    setInput("");
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  // if (!chat) {
  //   return (
  //     <div className="flex-1 flex items-center justify-center">
  //       <div className="text-center animate-fade-in">
  //         <div className="w-20 h-20 rounded-3xl gradient-bg-primary mx-auto mb-6 flex items-center justify-center glow-blue floating">
  //           <FileText className="w-10 h-10 text-primary-foreground" />
  //         </div>
  //         <h2 className="text-2xl font-bold gradient-text mb-2">Welcome to DocuMind AI</h2>
  //         <p className="text-muted-foreground max-w-md">Upload a document and start chatting to unlock intelligent insights.</p>
  //       </div>
  //     </div>
  //   );
  // }

  const isEmpty = chat.messages.length === 0;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center h-full min-h-[50vh]">
            <div className="w-16 h-16 rounded-2xl gradient-bg-primary mb-5 flex items-center justify-center glow-blue floating">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              How can I help you?
            </h3>
            <p className="text-muted-foreground text-sm mb-8 text-center max-w-md">
              Ask me anything about your documents. I can summarize, explain,
              extract insights, and more.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-lg w-full">
              {suggestedPrompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setInput(p.prompt);
                    inputRef.current?.focus();
                  }}
                  className="glass-subtle p-4 rounded-2xl text-left hover:bg-muted/60 transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <p.icon className="w-5 h-5 text-primary mb-2 group-hover:text-neon-cyan transition-colors" />
                  <p className="text-sm font-medium text-foreground">
                    {p.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {p.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {chat.messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 animate-fade-in ${msg.role === "user" ? "justify-end" : ""}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-xl gradient-bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] ${msg.role === "user" ? "chat-bubble-user px-5 py-3" : "chat-bubble-ai px-5 py-4"}`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                    {typeof msg.content === "string"
                      ? msg.content
                      : JSON.stringify(msg.content)}
                  </div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <p className="text-xs text-muted-foreground mb-1.5">
                        📎 Sources
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {msg.role === "ai" && (
                    <div className="mt-3 flex items-center gap-2">
                      {["Summarize", "Simplify", "Extract insights"].map(
                        (action) => (
                          <button
                            key={action}
                            className="text-xs px-2.5 py-1 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                          >
                            {action}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-xl gradient-bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-primary-foreground">
                    JD
                  </div>
                )}
              </div>
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested chips when has messages */}
      {!isEmpty && !isTyping && (
        <div className="px-4 lg:px-8 pb-2 flex items-center gap-2 flex-wrap">
          {suggestedPrompts.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setInput(p.prompt);
                inputRef.current?.focus();
              }}
              className="text-xs px-3 py-1.5 rounded-full glass-subtle text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <p.icon className="w-3 h-3" />
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 lg:px-8 pb-4 pt-2">
        <div className="glass-strong rounded-2xl p-3 flex items-end gap-3 transition-all duration-300 focus-within:shadow-[0_0_30px_hsla(230,90%,62%,0.15)] glow-border">
          <button className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all mb-0.5">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your document..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none leading-relaxed py-2 max-h-40"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl gradient-bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed mb-0.5 glow-blue"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-xs text-muted-foreground/40 mt-2">
          DocuMind AI may produce inaccurate information. Always verify
          important facts.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
