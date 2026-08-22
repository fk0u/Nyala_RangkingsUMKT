"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  PaperPlaneRight, 
  Sparkle, 
  Trash, 
  User, 
  Copy, 
  Check, 
  Headset,
  ArrowSquareOut,
  ArrowClockwise,
  CheckCircle,
  Lightning,
  Laptop,
  CalendarCheck,
  TShirt,
  GraduationCap,
  MapPin,
  Trophy,
  ShieldCheck,
  ChatCircleDots
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import { useToast } from "@/context/ToastContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { QA_CATEGORIES, VERIFIED_QA_DATABASE, QAKnowledgeItem } from "@/lib/qa-knowledge-base";
import { dispatchGamificationUpdate } from "@/lib/gamification";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  category?: string;
  suggestedFollowups?: string[];
}

export default function MobileCompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-mobile-1",
      role: "assistant",
      content: `Halo! Saya **Nyala**, asisten cerdas terpadu Mahasiswa Baru **Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026**.

Basis pengetahuan saya telah diselaraskan dengan seluruh edaran resmi kampus dan **Lomba Pemeringkatan UMKT 2026**. 

Silakan ketik pertanyaanmu atau pilih kategori topik siap-jawab di bawah ini:`,
      timestamp: "Baru saja",
      suggestedFollowups: [
        "Bagaimana cara login dan apa username password SIKAD?",
        "Apa saja rangkaian lengkap kegiatan orientasi MABA?",
        "Apa format resmi penamaan akun Zoom?",
        "Di mana lokasi Biro Kemahasiswaan dan jam operasionalnya?"
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const filteredQuestions = selectedCategory === "all"
    ? VERIFIED_QA_DATABASE
    : VERIFIED_QA_DATABASE.filter((q) => q.category === selectedCategory);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // 1. Catat interaksi untuk gamifikasi XP
      const curCount = parseInt(localStorage.getItem("nyala_ai_interactions") || "0", 10);
      localStorage.setItem("nyala_ai_interactions", String(curCount + 1));
      dispatchGamificationUpdate();

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response || data.reply || "Maaf, terjadi kendala sistem saat memproses jawaban.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      toast.error("Gagal terhubung ke server chat", "Koneksi Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Teks jawaban berhasil disalin!", "Tersalin");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (confirm("Hapus seluruh riwayat percakapan?")) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: "Riwayat percakapan telah dibersihkan. Ada yang bisa Nyala bantu kembali?",
          timestamp: "Baru saja",
        },
      ]);
      toast.info("Riwayat chat dibersihkan", "Reset");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-145px)] -mx-4 -mt-5 -mb-28 bg-[#FAFAF9] dark:bg-[#070B19]">
      
      {/* ── 1. COMPACT CHAT TOP BAR ── */}
      <div className="p-3.5 bg-white dark:bg-[#0F172A] border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs select-none flex-shrink-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300/40 dark:border-amber-800/40 flex items-center justify-center shadow-xs">
            <MascotFlame size="sm" mood="cheering" className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-black text-navy-950 dark:text-white leading-tight">
                Nyala AI Companion
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-nyala-600 dark:text-nyala-400 font-mono font-bold">
              Basis Data Resmi & Pemeringkatan UMKT
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950/50 text-slate-500 hover:text-rose-600 active:scale-95 transition-all"
          title="Bersihkan Percakapan"
        >
          <Trash weight="bold" className="w-4 h-4" />
        </button>
      </div>

      {/* ── 2. INTERACTIVE CATEGORY SELECTOR CHIPS (HORIZONTAL SCROLL) ── */}
      <div className="px-3 py-2 bg-slate-100/70 dark:bg-[#0C1222] border-b border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0 select-none">
        {QA_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1 cursor-pointer border ${
                isSelected
                  ? "bg-nyala-600 text-white border-nyala-700 shadow-xs"
                  : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. CHAT MESSAGES SCROLL VIEW ── */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs select-text shadow-sm ${
                  isUser
                    ? "bg-nyala-600 text-white rounded-br-xs border border-nyala-700 font-medium"
                    : "bg-white dark:bg-[#0F172A] text-navy-950 dark:text-slate-100 rounded-bl-xs border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900"
                }`}
              >
                {/* Assistant Verified Badge */}
                {!isUser && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    <span className="flex items-center gap-1">
                      <CheckCircle weight="fill" className="w-3.5 h-3.5" />
                      Terverifikasi Panduan UMKT
                    </span>
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="text-slate-400 hover:text-navy-950 dark:hover:text-white p-0.5"
                      title="Salin Teks"
                    >
                      {copiedId === msg.id ? (
                        <Check weight="bold" className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy weight="bold" className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                )}

                {/* Markdown Content */}
                <div className="prose prose-xs dark:prose-invert max-w-none space-y-2 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Suggested Followups */}
                {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Pertanyaan Lanjutan Terkait:
                    </span>
                    <div className="flex flex-col gap-1">
                      {msg.suggestedFollowups.map((followup, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(followup)}
                          className="text-left text-[11px] font-bold p-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] hover:bg-amber-50 dark:hover:bg-amber-950/40 text-nyala-600 dark:text-nyala-400 border border-slate-200 dark:border-slate-700 active:scale-98 transition-all flex items-center justify-between"
                        >
                          <span>{followup}</span>
                          <Sparkle weight="fill" className="w-3 h-3 text-amber-500 flex-shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                <div className={`text-[9px] text-right mt-1.5 font-mono ${
                  isUser ? "text-white/70" : "text-slate-400"
                }`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 w-fit">
            <div className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            <span className="text-[11px] font-mono text-slate-400 ml-1">Mencari jawaban terverifikasi...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── 4. QUICK QUESTION ACCORDION STRIP ── */}
      <div className="p-2.5 bg-slate-100/90 dark:bg-[#0C1222]/90 border-t border-slate-200 dark:border-slate-800 space-y-1.5 flex-shrink-0 select-none">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 px-1">
          <span>Topik Siap Jawab ({filteredQuestions.length}):</span>
          <span className="font-mono text-nyala-600 dark:text-nyala-400">Ketuk untuk kirim</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {filteredQuestions.slice(0, 6).map((q) => (
            <button
              key={q.id}
              onClick={() => handleSendMessage(q.question)}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1E293B] hover:bg-amber-50 dark:hover:bg-amber-950/40 text-navy-950 dark:text-white text-[10px] font-bold border border-slate-200 dark:border-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-2xs"
            >
              {q.question}
            </button>
          ))}
        </div>
      </div>

      {/* ── 5. BOTTOM MESSAGE INPUT BAR ── */}
      <div className="p-3 bg-white dark:bg-[#0F172A] border-t-2 border-slate-200 dark:border-slate-800 flex-shrink-0 select-none">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan KRS SIKAD, jadwal, atau kontak..."
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 text-xs text-navy-950 dark:text-white outline-none focus:border-nyala-500 transition-colors placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-nyala-600 hover:bg-nyala-700 disabled:opacity-50 text-white flex items-center justify-center active:scale-95 transition-all flex-shrink-0 shadow-xs cursor-pointer"
          >
            <PaperPlaneRight weight="fill" className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
}
