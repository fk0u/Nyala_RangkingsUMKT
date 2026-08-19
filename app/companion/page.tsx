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
  Info
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import BacklinkBanner from "@/components/BacklinkBanner";
import SkeletonLoader from "@/components/SkeletonLoader";
import AdminHelpModal from "@/components/AdminHelpModal";
import { useToast } from "@/context/ToastContext";
import { OFFICIAL_LINKS, OFFICIAL_CONTACTS } from "@/lib/masta-data";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Kontak & WhatsApp Admin UMKT?",
  "Mata kuliah Semester 1 TI 2026?",
  "Cara pengisian KRS di SIKAD?",
  "Berapa batas minimal presensi?",
  "Standar nilai kelulusan prodi TI?",
  "Agenda Kalender Akademik 2026?",
  "Ketentuan dresscode & on-cam Zoom?",
  "Info beasiswa KIP-Kuliah & Tahfidz?"
];

export default function CompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Halo Sobat MABA UMKT 2026! Aku **Nyala**, sahabat virtual perjalanan MABA-mu! 🔥

Ada yang ingin kamu tanyakan seputar:
- 📋 **KRS & SIKAD** ([mahasiswa.umkt.ac.id](https://mahasiswa.umkt.ac.id/))
- 🎓 **Kurikulum & Perkuliahan TI 2026**
- 🏛️ **Kontak Admin PMB & Biro Kemahasiswaan (Gedung C Lt. 1)**
- 🌟 **Beasiswa & Rangkaian MASTA 2026**

Tanyakan apa saja, Nyala siap memberikan jawaban akurat & terverifikasi!`,
      timestamp: "Baru saja",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal memproses pesan.");
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Maaf, Nyala belum dapat memproses jawaban tersebut.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      toast.error("Gagal terhubung ke AI. Silakan coba kembali.", "Kendala Jaringan");
      
      const fallbackMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        role: "assistant",
        content: "Mohon maaf, koneksi ke server sedang mengalami kendala. Jika kamu butuh bantuan darurat, silakan langsung hubungi WhatsApp resmi **Biro Kemahasiswaan Gedung C Lt. 1 di [0822-5087-8843](https://wa.me/6282250878843)** atau **Admin PMB di [+62 812-3001-7008](https://wa.me/6281230017008)** ya!",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClearHistory = () => {
    if (confirm("Hapus seluruh riwayat percakapan?")) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: "Riwayat telah dibersihkan. Halo lagi! Apa yang bisa Nyala bantu hari ini?",
          timestamp: "Baru saja",
        },
      ]);
      toast.info("Riwayat chat berhasil dibersihkan.", "Chat Direset");
    }
  };

  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Teks pesan disalin ke papan klip.", "Tersalin");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      
      {/* Header Info */}
      <div className="glass-card rounded-3xl p-6 border border-navy-200/60 dark:border-navy-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <MascotFlame size="md" mood={isLoading ? "thinking" : "happy"} />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-navy-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white">
                Tanya Nyala AI
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold font-mono">
                v2.0 Markdown
              </span>
            </div>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mt-0.5">
              Sahabat AI resmi MABA UMKT 2026. Faktual, cerdas, dan responsif.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-colors"
            title="Hubungi Admin Resmi UMKT"
          >
            <Headset weight="bold" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Kontak Admin</span>
          </button>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl text-navy-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Bersihkan Percakapan"
          >
            <Trash weight="bold" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Fast Admin Escalation Banner */}
      <div className="rounded-2xl p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center gap-2">
          <Headset weight="bold" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Perlu konfirmasi berkas atau dispensasi?</strong> Admin Resmi UMKT siap melayani via WhatsApp:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <a
            href="https://wa.me/6281230017008?text=Halo%20Admin%20PMB%20UMKT%2C%20saya%20Mahasiswa%20Baru%202026%20ingin%20bertanya."
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
          >
            <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
            <span>Admin PMB</span>
          </a>
          <a
            href="https://wa.me/6282250878843?text=Halo%20Biro%20Kemahasiswaan%20UMKT%20(Gedung%20C%20Lt.%201)%2C%20saya%20MABA%202026%20ingin%20konsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
          >
            <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
            <span>Biro Kemahasiswaan (Gd. C)</span>
          </a>
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nyala-500/15 border border-nyala-500/30 flex items-center justify-center text-nyala-600 dark:text-nyala-400 mt-1">
                      <Sparkle weight="fill" className="w-4 h-4 text-nyala-500" />
                    </div>
                  )}

                  {/* Message Bubble with ReactMarkdown */}
                  <div
                    className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed relative ${
                      isBot
                        ? "bg-cream-100 dark:bg-navy-800 text-navy-900 dark:text-slate-100 border border-amber-200/60 dark:border-navy-700 shadow-sm"
                        : "bg-navy-900 dark:bg-nyala-600 text-white shadow-md font-normal rounded-tr-none"
                    }`}
                  >
                    <div className="font-sans prose prose-xs dark:prose-invert max-w-none text-xs sm:text-sm">
                      {isBot ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                            strong: ({ children }) => <strong className="font-extrabold text-navy-900 dark:text-white">{children}</strong>,
                            ul: ({ children }) => <ul className="list-disc pl-4 my-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 my-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            h1: ({ children }) => <h1 className="text-base font-black mt-3 mb-1.5 text-navy-900 dark:text-white">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-bold mt-2.5 mb-1 text-navy-900 dark:text-white">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xs font-bold mt-2 mb-1 text-navy-900 dark:text-white">{children}</h3>,
                            table: ({ children }) => (
                              <div className="overflow-x-auto my-3 rounded-lg border border-navy-200 dark:border-navy-700">
                                <table className="w-full text-xs text-left border-collapse">{children}</table>
                              </div>
                            ),
                            th: ({ children }) => <th className="px-3 py-2 bg-navy-100/70 dark:bg-navy-900 font-bold border-b border-navy-200 dark:border-navy-700">{children}</th>,
                            td: ({ children }) => <td className="px-3 py-1.5 border-b border-navy-100 dark:border-navy-800">{children}</td>,
                            code: ({ children }) => (
                              <code className="px-1.5 py-0.5 rounded bg-navy-200/60 dark:bg-navy-900 font-mono text-[11px] text-nyala-600 dark:text-nyala-300">
                                {children}
                              </code>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-nyala-600 dark:text-nyala-400 font-bold underline hover:text-nyala-700 inline-flex items-center gap-0.5"
                              >
                                {children}
                              </a>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-nyala-500 pl-3 my-2 text-xs italic text-navy-600 dark:text-navy-300 bg-nyala-500/5 py-1 rounded-r">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
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
                            <Check weight="bold" className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy weight="bold" className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {!isBot && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-800 dark:bg-navy-700 text-white flex items-center justify-center mt-1">
                      <User weight="bold" className="w-4 h-4" />
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
              className="flex items-start gap-3 justify-start"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nyala-500/15 border border-nyala-500/30 flex items-center justify-center text-nyala-500 animate-pulse">
                <Sparkle weight="fill" className="w-4 h-4" />
              </div>
              <div className="bg-cream-100 dark:bg-navy-800 rounded-2xl p-4 border border-amber-200/60 dark:border-navy-700 shadow-sm max-w-sm">
                <SkeletonLoader count={2} />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="px-4 py-2 border-t border-navy-100 dark:border-navy-800/60 bg-white/50 dark:bg-navy-900/50 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-navy-400 dark:text-navy-500 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
            <Lightning weight="fill" className="w-3 h-3 text-nyala-500" />
            <span>Saran:</span>
          </span>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-navy-800 border border-navy-200/80 dark:border-navy-700 text-navy-700 dark:text-navy-300 hover:border-nyala-500 hover:text-nyala-600 dark:hover:text-nyala-400 whitespace-nowrap transition-all shadow-xs disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form Box */}
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
            className="p-2.5 sm:px-5 sm:py-2.5 rounded-2xl bg-nyala-600 hover:bg-nyala-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md shadow-nyala-600/20 transition-all flex items-center justify-center gap-2 flex-shrink-0"
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
