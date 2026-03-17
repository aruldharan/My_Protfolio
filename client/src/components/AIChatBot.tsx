import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-config";

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hi! I'm  Ynihs Arul's Ai assistant. Ask me anything about his work!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close if click is outside chatRef AND isn't the toggle button itself (handled by its own onClick)
      if (chatRef.current && !chatRef.current.contains(target) && !target.closest('.chat-toggle-btn')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside, { capture: true });
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, { capture: true });
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error("Server error: Unable to parse response");
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      setMessages((prev) => [...prev, data]);
    } catch (error: any) {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: error.message || "Sorry, I'm having trouble connecting right now." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[280px] sm:w-[350px] rounded-[24px] overflow-hidden mb-4 border border-black/5 dark:border-white/10 flex flex-col h-[450px] sm:h-[650px] max-h-[70vh] relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white dark:bg-[#0A0A0A]"
          >
            {/* Header */}
            <div className="p-3 sm:p-5 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-primary/10 text-primary shrink-0">
                  <Bot size={18} className="animate-pulse" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-display font-bold text-sm sm:text-lg leading-tight truncate text-black dark:text-white">Ynihs Ai</h3>
                  <p className="text-[9px] sm:text-[11px] text-black/40 dark:text-white/40 font-medium truncate">By Arul</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 bg-green-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-green-500/20 shrink-0 ml-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[8px] sm:text-[10px] text-green-500 uppercase tracking-widest font-black">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 scrollbar-hide">
              {messages.length === 1 && (
                <div className="flex flex-col items-center justify-center py-4 sm:py-8 text-center space-y-4 sm:space-y-6">
                   <div className="w-12 h-12 sm:w-16 h-16 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/20 dark:text-white/20 mb-1 sm:mb-2">
                     <Bot size={24} />
                   </div>
                   <p className="text-black/60 dark:text-white/60 text-xs sm:text-sm max-w-[200px] sm:max-w-[250px]">Hi! Ask me anything about this portfolio.</p>
                   <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                     {[
                       "Tell me about this portfolio",
                       "What technologies do you use?",
                       "How can I contact you?",
                     ].map((q) => (
                       <button
                         key={q}
                         onClick={() => {
                           setInput(q);
                           setTimeout(handleSend, 0);
                         }}
                         className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-black/5 dark:border-white/10 text-[10px] sm:text-xs text-black/60 dark:text-white/60 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all bg-black/[0.02] dark:bg-white/[0.02]"
                       >
                         {q}
                       </button>
                     ))}
                   </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  key={i} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col gap-1 sm:gap-1.5 max-w-[90%] sm:max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-[13px] sm:text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg shadow-primary/10 font-bold" 
                        : "bg-black/5 dark:bg-white/[0.05] border border-black/5 dark:border-white/5 text-black/80 dark:text-white/80 rounded-tl-none font-medium"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-black/5 dark:bg-white/[0.05] px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl rounded-tl-none flex items-center gap-1.5 sm:gap-2 border border-black/5 dark:border-white/5">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.div
                          key={d}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.1 }}
                          className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-primary/40"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-black/40 dark:text-white/40 font-medium">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3.5 text-[13px] sm:text-sm focus:outline-none focus:border-primary/40 focus:bg-primary/5 transition-all placeholder:text-black/30 dark:placeholder:text-white/30 text-black dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-primary/20"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-all shadow-primary/30 relative z-[151] group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AIChatBot;
