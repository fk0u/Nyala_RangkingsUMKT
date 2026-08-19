"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  Trash2, 
  Bot, 
  User, 
  Zap, 
  ShieldCheck, 
  MessageSquareHeart,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import MascotFlame from "@/components/MascotFlame";
import BacklinkBanner from "@/components/BacklinkBanner";
import { OFFICIAL_LINKS } from "@/lib/masta-data";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Bagaimana alur resmi MASTA UMKT 2026? 📖",
  "Barang apa saja yang wajib disiapkan? 🎒",
  "Tips mengatasi rasa gugup dan cemas? 🧘",
  "Aturan On-Cam dan dresscode sesi Zoom? 💻",
  "Apa saja Unit Kegiatan Mahasiswa (UKM)? 🎪",
  "Website resmi dan kontak panitia MASTA? 🌐"
];

export default function CompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Halo Sobat MABA UMKT 2026! 🔥 Aku **Nyala**, teman perjalanan MABA-mu! \n\nAda hal yang ingin kamu tanyakan seputar persiapan MASTA, alur kegiatan, tips menghadapi orientasi kampus, atau info seputar Universitas Muhammadiyah Kalimantan Timur? Tanyakan apa saja, Nyala siap nemenin kamu! ✨",
      timestamp: "Baru saja",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        content: data.reply || "Halo Sobat MABA! Nyala siap bantu seputar MASTA UMKT 2026.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);
      const fallbackReply: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: "Maaf Sobat, terjadi sedikit kendala koneksi. Tapi tenang, kamu tetap bisa membaca panduan resmi di portal [masta-maba.odoo.com](https://masta-maba.odoo.com/) dan website resmi [UMKT](https://www.umkt.ac.id/) ya! 🔥",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClearChat = () => {
    if (confirm("Ingin memulai percakapan baru dengan Nyala?")) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: "Percakapan baru telah dimulai! 🔥 Ada yang ingin kamu diskusikan lagi seputar MASTA UMKT 2026?",
          timestamp: "Baru saja",
        },
      ]);
    }
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
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-nyala-500 text-white">
                Virtual Companion
              </span>
            </div>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
              Teman virtual yang selalu siap menjawab pertanyaan seputar MASTA & kampus UMKT.
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="self-end sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-navy-600 dark:text-navy-400 hover:text-rose-600 dark:hover:text-rose-400 bg-navy-100 dark:bg-navy-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          title="Reset Obrolan"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Reset Obrolan</span>
        </button>
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2.5 sm:gap-3.5 ${
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
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed ${
                      isBot
                        ? "bg-cream-100 dark:bg-navy-800 text-navy-900 dark:text-slate-100 border border-amber-200/60 dark:border-navy-700 shadow-sm"
                        : "bg-navy-900 dark:bg-nyala-600 text-white shadow-md font-normal rounded-tr-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {message.content}
                    </div>
                    <div
                      className={`text-[10px] mt-2 font-medium ${
                        isBot
                          ? "text-navy-400 dark:text-navy-400"
                          : "text-navy-300 dark:text-nyala-100 text-right"
                      }`}
                    >
                      {message.timestamp}
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

          {/* Typing Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-nyala-500/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-nyala-500 animate-spin" />
              </div>
              <div className="bg-cream-100 dark:bg-navy-800 rounded-2xl px-4 py-3 border border-amber-200/50 dark:border-navy-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="text-xs text-navy-500 dark:text-navy-400 ml-2 font-medium">Nyala sedang mengetik...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompts Bar */}
        <div className="px-4 py-2 border-t border-navy-100 dark:border-navy-800 bg-white/40 dark:bg-navy-900/40">
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
                className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-300 border border-navy-200/70 dark:border-navy-700 hover:border-nyala-500 hover:text-nyala-600 dark:hover:text-nyala-400 transition-colors shadow-xs"
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
              placeholder="Ketik pertanyaanmu seputar MASTA atau tips kampus..."
              disabled={isLoading}
              className="flex-1 bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-nyala-500 border border-navy-200/60 dark:border-navy-700 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-nyala-500 hover:bg-nyala-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all shadow-fire flex items-center gap-2"
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
