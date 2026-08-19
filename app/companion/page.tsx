"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  Trash2, 
  User, 
  Zap, 
  Copy, 
  Check, 
  Laptop, 
  Bot, 
  Flame
} from "lucide-react";
import MascotFlame from "@/components/MascotFlame";
import BacklinkBanner from "@/components/BacklinkBanner";
import SkeletonLoader from "@/components/SkeletonLoader";
import TypewriterText from "@/components/TypewriterText";
import { useToast } from "@/context/ToastContext";
import { OFFICIAL_LINKS } from "@/lib/masta-data";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

const QUICK_PROMPTS = [
  "Cara login di mahasiswa.umkt.ac.id? 💻",
  "Bagaimana alur resmi MASTA UMKT 2026? 📖",
  "Pengisian KRS Semester 1 untuk MABA? 📑",
  "Berapa batas minimal presensi kuliah? 📊",
  "Barang apa saja yang wajib disiapkan? 🎒",
  "Tips mengatasi rasa gugup dan cemas? 🧘",
  "Aturan On-Cam dan dresscode sesi Zoom? 💻",
  "Bagaimana cara bayar tagihan SPP? 💳"
];

export default function CompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Halo Sobat MABA UMKT 2026! 🔥 Aku **Nyala**, sahabat virtual perjalanan MABA-mu! \n\nAda hal yang ingin kamu tanyakan seputar persiapan MASTA, portal akademik SIKAD (mahasiswa.umkt.ac.id), KRS, tata tertib, atau tips perkuliahan di UMKT? Tanyakan apa saja, Nyala siap membantumu!",
      timestamp: "Baru saja",
      isStreaming: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil respon");
      }

      const data = await response.json();
      const botReply: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Halo Sobat MABA! Nyala siap bantu seputar MASTA & SIKAD UMKT.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);
      const fallbackReply: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: "Halo Sobat! Jika ada kendala koneksi, kamu tetap dapat membuka panduan resmi di portal [mahasiswa.umkt.ac.id](https://mahasiswa.umkt.ac.id/) dan [masta-maba.odoo.com](https://masta-maba.odoo.com/) ya! 🔥",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        isStreaming: false,
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Pesan berhasil disalin ke clipboard!", "Tersalin");
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: "Percakapan baru telah dimulai! 🔥 Ada yang ingin kamu diskusikan seputar MASTA atau SIKAD UMKT 2026?",
        timestamp: "Baru saja",
        isStreaming: false,
      },
    ]);
    toast.info("Riwayat obrolan telah dibersihkan.", "Reset Chat");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800">
        <div className="flex items-center gap-3.5">
          <MascotFlame size="md" mood={isLoading ? "thinking" : "happy"} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 dark:text-white">
                Tanya Nyala AI
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-nyala-500 text-white shadow-xs">
                Virtual Companion
              </span>
            </div>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
              Teman virtual yang siap membimbing MASTA & sistem portal mahasiswa.umkt.ac.id
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-navy-600 dark:text-navy-400 hover:text-rose-600 dark:hover:text-rose-400 bg-navy-100 dark:bg-navy-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            title="Reset Obrolan"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800 flex flex-col h-[560px] sm:h-[620px] shadow-xl overflow-hidden">
        
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => {
              const isBot = message.role === "assistant";

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-start gap-2.5 sm:gap-3.5 group ${
                    isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Bot Avatar */}
                  {isBot && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nyala-500/15 border border-nyala-500/30 flex items-center justify-center text-nyala-600 dark:text-nyala-400">
                      <Sparkles className="w-4 h-4 text-nyala-500" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed relative ${
                      isBot
                        ? "bg-cream-100 dark:bg-navy-800 text-navy-900 dark:text-slate-100 border border-amber-200/60 dark:border-navy-700 shadow-sm"
                        : "bg-navy-900 dark:bg-nyala-600 text-white shadow-md font-normal rounded-tr-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {isBot && message.isStreaming ? (
                        <TypewriterText
                          text={message.content}
                          speed={8}
                          onComplete={() => {
                            setMessages((prev) =>
                              prev.map((m) =>
                                m.id === message.id ? { ...m, isStreaming: false } : m
                              )
                            );
                          }}
                        />
                      ) : (
                        message.content
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-navy-100/60 dark:border-navy-700/50">
                      <span
                        className={`text-[10px] font-medium ${
                          isBot ? "text-navy-400 dark:text-navy-400" : "text-navy-300 dark:text-nyala-100"
                        }`}
                      >
                        {message.timestamp}
                      </span>

                      {/* Copy Action Microinteraction */}
                      {isBot && (
                        <button
                          onClick={() => handleCopyMessage(message.content, message.id)}
                          className="opacity-60 hover:opacity-100 text-navy-500 hover:text-nyala-500 dark:text-navy-400 p-1 rounded-md transition-opacity"
                          title="Salin Pesan"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {!isBot && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-800 dark:bg-navy-700 text-white flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Skeleton Shimmer Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <SkeletonLoader variant="chat" />
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompts Bar */}
        <div className="px-4 py-2 border-t border-navy-100 dark:border-navy-800 bg-white/50 dark:bg-navy-900/50">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-navy-500 dark:text-navy-400 whitespace-nowrap flex items-center gap-1">
              <Zap className="w-3 h-3 text-nyala-500" />
              Tanya Cepat:
            </span>
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-300 border border-navy-200/70 dark:border-navy-700 hover:border-nyala-500 hover:text-nyala-600 dark:hover:text-nyala-400 transition-all active:scale-95 shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-navy-900 border-t border-navy-200/60 dark:border-navy-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan seputar MASTA, KRS, atau login SIKAD UMKT..."
              disabled={isLoading}
              className="flex-1 bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nyala-500 border border-navy-200/60 dark:border-navy-700 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-nyala-500 hover:bg-nyala-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all shadow-fire flex items-center gap-2 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Kirim</span>
            </button>
          </form>
        </div>

      </div>

      {/* Verified Official Links Footer in Companion */}
      <BacklinkBanner compact />

    </div>
  );
}
