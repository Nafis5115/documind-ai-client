import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Sparkles, FileText, Upload } from "lucide-react";
import { useOutletContext, useParams } from "react-router-dom";
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
  const { chats, addMessage, uploadDocumentAndOpenChat } =
    useOutletContext<AppLayoutContext>();
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const emptyFileInputRef = useRef<HTMLInputElement>(null);
  const chat = chats.find((c) => c.id === id);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages, isTyping]);

  const handleSend = () => {
    const content = input.trim();
    if (!content || !chat?.id || !chat.documentId) return;

    const chatId = chat.id;
    addMessage(chatId, { role: "user", content });
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

  const needsDocument = !chat || !chat.documentId;

  if (needsDocument) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <input
          ref={emptyFileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadDocumentAndOpenChat(file);
            }
            e.target.value = "";
          }}
        />
        <div className="text-center animate-fade-in max-w-md">
          <div className="w-20 h-20 rounded-3xl gradient-bg-primary mx-auto mb-6 flex items-center justify-center glow-blue floating">
            <FileText className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-2">
            Upload your document to start chatting
          </h2>
          <p className="text-muted-foreground mb-8">
            Upload a PDF to open your chat. Once your document is ready, you can
            ask questions, get summaries, and extract insights.
          </p>
          <button
            onClick={() => emptyFileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl gradient-bg-primary text-primary-foreground font-medium text-sm glow-blue hover:opacity-90 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4" />
            Upload PDF
          </button>
          <p className="text-xs text-muted-foreground/60 mt-4">
            Supported: PDF
          </p>
        </div>
      </div>
    );
  }

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
