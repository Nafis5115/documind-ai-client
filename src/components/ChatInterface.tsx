import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Sparkles,
  FileText,
} from "lucide-react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { AppLayoutContext } from "@/layouts/AppLayout";

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
  const { chats, addMessage, createChat } = useOutletContext<AppLayoutContext>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chat = chats.find((c) => c.id === id);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages, isTyping]);

  const handleSend = () => {
    const content = input.trim();
    if (!content) return;

    const chatId = chat?.id ?? createChat();
    addMessage(chatId, { role: "user", content });
    if (!chat?.id) {
      navigate(`/chat/${chatId}`);
    }
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

  const isEmpty = !chat || chat.messages.length === 0;

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
          </div>
        ) : (
          <>
            {chat?.messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`flex items-end gap-3 animate-fade-in ${msg.role === "user" ? "justify-end" : ""}`}
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
                  {/* {msg.sources && msg.sources.length > 0 && (
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
                  )} */}
                  {/* {msg.role === "ai" && (
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
                  )} */}
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

      {/* Input */}
      <div className="px-4 lg:px-8 pb-4 pt-2">
        <div className="glass-strong rounded-2xl p-3 flex items-end gap-3 transition-all duration-300 focus-within:shadow-[0_0_30px_hsla(230,90%,62%,0.15)]">
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
      </div>
    </div>
  );
};

export default ChatInterface;
