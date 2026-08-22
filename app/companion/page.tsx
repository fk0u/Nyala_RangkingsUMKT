"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  PaperPlaneRight, 
  Sparkle, 
  Trash, 
  User, 
  Lightning, 
  Copy, 
  Check, 
  Laptop, 
  Robot, 
  Fire,
  Headset,
  WhatsappLogo,
  ArrowSquareOut,
  Info,
  CheckCircle,
  ShieldCheck
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import BacklinkBanner from "@/components/BacklinkBanner";
import SkeletonLoader from "@/components/SkeletonLoader";
import AdminHelpModal from "@/components/AdminHelpModal";
import { useToast } from "@/context/ToastContext";
import { QA_CATEGORIES, VERIFIED_QA_DATABASE } from "@/lib/qa-knowledge-base";
import { dispatchGamificationUpdate } from "@/lib/gamification";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  suggestedFollowups?: string[];
}

export default function CompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Halo! Saya **Nyala**, asisten virtual terpadu pendamping Mahasiswa Baru **Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026**.

Basis data saya telah terkalibrasi dengan edaran resmi kampus dan **Lomba Pemeringkatan UMKT 2026**:
- 🔑 **Kredensial SIKAD:** NIM 13 Digit & Password default Nomor Registrasi \`12xxxxxx\`
- 📋 **KRS & Dosen PA:** Alur pengisian paket 20 SKS & etika chat WA Dosen Pembimbing
- 📅 **Jadwal MABA:** Rangkaian Universitas, Fakultas, IMM 3 Gelombang, & UKM Expo
- 👔 **Tata Tertib & Zoom:** Format penamaan \`[Prodi]_[Nama Lengkap]\` & Dresscode
- 🏛️ **Kontak Admin:** WhatsApp Biro Kemahasiswaan Gedung C Lt. 1 ([0822-5087-8843](https://wa.me/6282250878843))
- 🏆 **Inovasi Pemeringkatan:** Karya MABA Al-Ghani Desta Setyawan ([@kou.sozo](https://instagram.com/kou.sozo))

Silakan ajukan pertanyaan atau pilih salah satu kategori siap jawab di bawah ini:`,
      timestamp: "Baru saja",
      suggestedFollowups: [
        "Bagaimana cara login dan apa username password SIKAD?",
        "Apa saja rangkaian lengkap kegiatan orientasi MABA?",
        "Apa format resmi nama akun Zoom?",
        "Di mana lokasi Biro Kemahasiswaan dan jam operasionalnya?"
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const filteredQuestions = selectedCategory === "all"
    ? VERIFIED_QA_DATABASE
    : VERIFIED_QA_DATABASE.filter((q) => q.category === selectedCategory);

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
      // Catat interaksi untuk XP gamifikasi
      const curCount = parseInt(localStorage.getItem("nyala_ai_interactions") || "0", 10);
      localStorage.setItem("nyala_ai_interactions", String(curCount + 1));
      dispatchGamificationUpdate();

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

      const data = await response.json();

      const botMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response || data.reply || "Maaf, terjadi kendala saat memproses jawaban.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      toast.error("Gagal terhubung ke AI server", "Koneksi Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Teks jawaban berhasil disalin!", "Tersalin");
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleClearChat = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat percakapan?")) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: "Riwayat percakapan telah dibersihkan. Ada yang bisa Nyala bantu kembali seputar UMKT?",
          timestamp: "Baru saja",
        },
      ]);
      toast.info("Riwayat chat berhasil dibersihkan", "Reset Percakapan");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200/80 dark:border-navy-800 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent text-navy-950 dark:text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nyala-500/15 border border-nyala-500/30 text-nyala-600 dark:text-nyala-400 font-mono text-xs font-bold">
            <ShieldCheck weight="fill" className="w-4 h-4" />
            <span>Karya Inovasi Lomba Pemeringkatan UMKT 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Nyala AI Companion
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-xl leading-relaxed">
            Asisten cerdas berbasis data terverifikasi untuk membantu menjawab seluruh pertanyaan seputar SIKAD, KRS, kurikulum, dan tata tertib orientasi MABA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border-2 border-b-4 border-amber-300/40 dark:border-amber-800/40 flex items-center justify-center p-2 shadow-xs">
            <MascotFlame size="sm" mood="cheering" className="w-12 h-12" />
          </div>
        </div>
      </div>

      {/* 2. Main Chat Box */}
      <div className="glass-card rounded-3xl border border-navy-200/80 dark:border-navy-800 bg-white/70 dark:bg-navy-950/70 shadow-xl overflow-hidden flex flex-col h-[640px]">
        
        {/* Chat Header Control */}
        <div className="p-4 border-b border-navy-200/80 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-navy-700 dark:text-navy-300">
              Respon Cepat Basis Data Terverifikasi
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
            >
              <Headset weight="bold" className="w-3.5 h-3.5" />
              <span>Admin Gedung C</span>
            </button>

            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl text-navy-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Bersihkan Percakapan"
            >
              <Trash weight="bold" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-4 py-2 bg-navy-100/50 dark:bg-navy-900/80 border-b border-navy-200/60 dark:border-navy-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none select-none">
          {QA_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer border ${
                  isSelected
                    ? "bg-nyala-600 text-white border-nyala-700 shadow-xs"
                    : "bg-white dark:bg-navy-800 text-navy-600 dark:text-navy-300 border-navy-200 dark:border-navy-700 hover:bg-navy-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Chat Scroll View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => {
              const isBot = message.role === "assistant";

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-3 ${
                    isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Bot Avatar */}
                  {isBot && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nyala-500/10 dark:bg-nyala-500/20 border border-nyala-500/30 flex items-center justify-center text-nyala-500 mt-1">
                      <Sparkle weight="fill" className="w-4 h-4" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm shadow-sm ${
                      isBot
                        ? "bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 text-navy-900 dark:text-navy-100 rounded-tl-xs"
                        : "bg-nyala-600 text-white rounded-tr-xs font-medium"
                    }`}
                  >
                    {/* Bot Verified Badge */}
                    {isBot && (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold pb-2 mb-2 border-b border-navy-100 dark:border-navy-800">
                        <CheckCircle weight="fill" className="w-3.5 h-3.5" />
                        <span>Terverifikasi Panduan UMKT 2026</span>
                      </div>
                    )}

                    <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none space-y-2 leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>

                    {/* Suggested Followups */}
                    {message.suggestedFollowups && message.suggestedFollowups.length > 0 && (
                      <div className="pt-3 mt-3 border-t border-navy-100 dark:border-navy-800 space-y-1.5">
                        <span className="text-[10px] font-bold text-navy-400 dark:text-navy-500 uppercase tracking-wider block">
                          Pertanyaan Lanjutan Terkait:
                        </span>
                        <div className="flex flex-col gap-1">
                          {message.suggestedFollowups.map((followup, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(followup)}
                              className="text-left text-xs font-bold p-2 rounded-xl bg-navy-50 dark:bg-navy-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-nyala-600 dark:text-nyala-400 border border-navy-200/60 dark:border-navy-700 active:scale-98 transition-all flex items-center justify-between"
                            >
                              <span>{followup}</span>
                              <Sparkle weight="fill" className="w-3 h-3 text-amber-500 flex-shrink-0 ml-1" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-navy-100/60 dark:border-navy-700/50">
                      <span className={`text-[10px] font-mono ${isBot ? "text-navy-400" : "text-white/70"}`}>
                        {message.timestamp}
                      </span>

                      {isBot && (
                        <button
                          onClick={() => handleCopyMessage(message.content, message.id)}
                          className="opacity-60 hover:opacity-100 text-navy-500 hover:text-nyala-500 dark:text-navy-400 p-1 rounded-md transition-opacity"
                          title="Salin Pesan"
                        >
                          {copiedId === message.id ? (
                            <Check weight="bold" className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy weight="bold" className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-800 dark:bg-navy-700 text-white flex items-center justify-center mt-1">
                      <User weight="bold" className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 justify-start"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nyala-500/15 border border-nyala-500/30 flex items-center justify-center text-nyala-500 animate-pulse">
                <Sparkle weight="fill" className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-navy-900 rounded-2xl p-4 border border-navy-200 dark:border-navy-800 shadow-sm max-w-sm">
                <SkeletonLoader count={2} />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 border-t border-navy-200/80 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-900/50 flex items-center gap-2 overflow-x-auto scrollbar-none select-none">
          <span className="text-[11px] font-bold text-navy-400 dark:text-navy-500 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
            <Lightning weight="fill" className="w-3 h-3 text-nyala-500" />
            <span>Topik ({filteredQuestions.length}):</span>
          </span>
          {filteredQuestions.slice(0, 8).map((q) => (
            <button
              key={q.id}
              onClick={() => handleSendMessage(q.question)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-300 hover:border-nyala-500 hover:text-nyala-600 dark:hover:text-nyala-400 whitespace-nowrap transition-all shadow-2xs disabled:opacity-50"
            >
              {q.question}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 border-t border-navy-200/80 dark:border-navy-800 bg-white dark:bg-navy-950 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Tanyakan hal seputar MASTA, SIKAD, KRS, kurikulum TI, atau jam buka admin..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-200 dark:border-navy-800 text-xs sm:text-sm text-navy-900 dark:text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-nyala-500 focus:border-transparent transition-all"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 sm:px-5 sm:py-2.5 rounded-2xl bg-nyala-600 hover:bg-nyala-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md shadow-nyala-600/20 transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span className="hidden sm:inline">Kirim</span>
            <PaperPlaneRight weight="bold" className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* Backlinks */}
      <BacklinkBanner />

      {/* Official Admin Help Modal */}
      <AdminHelpModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

    </div>
  );
}
