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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass w-[calc(100vw-32px)] md:w-[350px] rounded-[32px] overflow-hidden mb-4 gold-glow-strong border-white/10 flex flex-col h-[550px] md:h-[650px] max-h-[75vh] relative shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 md:p-5 flex items-center justify-between border-b border-white/10 glass brightness-110">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-2xl bg-primary/20 text-primary gold-glow shrink-0">
                  <Bot size={20} className="animate-pulse" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-display font-bold text-base md:text-lg leading-tight truncate">Ynihs Ai</h3>
                  <p className="text-[10px] md:text-[11px] text-muted-foreground font-medium truncate">By Arul</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20 shrink-0 ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] md:text-[10px] text-green-500 uppercase tracking-widest font-black">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.length === 1 && (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
                   <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-muted-foreground/40 mb-2">
                     <Bot size={32} />
                   </div>
                   <p className="text-muted-foreground text-sm max-w-[250px]">Hi! Ask me anything about this portfolio.</p>
                   <div className="flex flex-wrap justify-center gap-2">
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
                         className="px-4 py-2.5 rounded-full glass border-white/10 text-xs text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-foreground transition-all"
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
                  <div className={`flex flex-col gap-1.5 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg shadow-primary/10 font-medium" 
                        : "glass border-white/10 rounded-tl-none font-normal"
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
                  <div className="glass px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.div
                          key={d}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.1 }}
                          className="w-1.5 h-1.5 rounded-full bg-primary/40"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">Assistant is thinking</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 glass brightness-110">
              <div className="relative flex items-center gap-2.5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all placeholder:text-muted-foreground/50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-3.5 rounded-3xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 gold-glow shadow-primary/20 shadow-xl"
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
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-all gold-glow-strong relative z-[151] group"
      >
        {/* Pulsing Rings */}
        {!isOpen && (
          <>
            <motion.div 
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-primary/50"
            />
            <motion.div 
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full border border-primary/30"
            />
          </>
        )}
        
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
