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
  ArrowClockwise
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import { useToast } from "@/context/ToastContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FlutterChip from "@/components/flutter/FlutterChip";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Berapa kuota fakultas saya?",
  "Cara login SIKAD dengan NIM?",
  "Mata kuliah Semester 1 TI?",
  "Aturan dresscode resmi MASTA?",
  "Batas minimal presensi 75%?",
  "Kontak Biro Kemahasiswaan?",
];

export default function MobileCompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-mobile-1",
      role: "assistant",
      content: `Halo! Saya **Nyala**, asisten virtual pendamping Mahasiswa Baru UMKT 2026.

Ada yang ingin kamu tanyakan seputar **Jadwal MASTA**, **KRS SIKAD**, **Kurikulum TI**, atau **Kontak Admin Kampus**?`,
      timestamp: "Baru saja",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
      toast.error("Gagal terhubung ke AI server", "Koneksi Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Pesan disalin ke clipboard", "Tersalin");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-mobile-1",
        role: "assistant",
        content: `Percakapan telah dibersihkan. Apa yang ingin kamu tanyakan berikutnya, Sobat Nyala?`,
        timestamp: "Baru saja",
      },
    ]);
    toast.info("Percakapan berhasil direset", "Chat Bersih");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] -mx-4 px-4 sm:mx-0 sm:px-0">
      
      {/* ── 1. HEADER BAR COMPANION (Status & Clear Action) ── */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-nyala-500/10 dark:bg-nyala-950/80 border border-nyala-500/20 flex items-center justify-center">
            <MascotFlame size="sm" mood="excited" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-navy-950 dark:text-white">
                Tanya Nyala
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Zpi SDK • Responsif 24/7
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Bersihkan Percakapan"
          aria-label="Bersihkan Percakapan"
          className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-500 flex items-center justify-center active:scale-90 transition-all cursor-pointer"
        >
          <Trash weight="bold" className="w-4 h-4" />
        </button>
      </div>

      {/* ── 2. MESSAGE STREAM CONTAINER (Scrollable) ── */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {isUser ? (
                  <div className="w-8 h-8 rounded-full bg-navy-800 dark:bg-slate-700 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    <User weight="bold" className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-nyala-100 dark:bg-nyala-950/80 border border-nyala-200 dark:border-nyala-800 flex items-center justify-center shadow-sm">
                    <MascotFlame size="sm" mood="happy" className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 text-xs sm:text-sm shadow-sm relative group ${
                  isUser
                    ? "bg-navy-950 dark:bg-slate-800 text-white rounded-tr-sm"
                    : "bg-white dark:bg-[#0F172A] text-navy-950 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-tl-sm"
                }`}
              >
                <div className="prose prose-xs dark:prose-invert max-w-none space-y-2 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] text-slate-400">
                  <span className="font-mono">{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1 active:scale-90"
                      title="Salin Pesan"
                    >
                      {copiedId === msg.id ? (
                        <Check weight="bold" className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy weight="bold" className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-nyala-100 dark:bg-nyala-950/80 border border-nyala-200 dark:border-nyala-800 flex items-center justify-center">
              <MascotFlame size="sm" mood="thinking" className="w-5 h-5 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-nyala-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-400 font-medium ml-1">Nyala sedang berpikir...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── 3. QUICK PROMPT PILLS (Thumb Reachable) ── */}
      <div className="py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-shrink-0">
        {QUICK_PROMPTS.map((prompt) => (
          <FlutterChip
            key={prompt}
            label={prompt}
            onClick={() => handleSendMessage(prompt)}
          />
        ))}
      </div>

      {/* ── 4. NATIVE INPUT BAR ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800 flex-shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya jadwal, SIKAD, atau kurikulum TI..."
          disabled={isLoading}
          className="flex-1 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-nyala-500 transition-colors shadow-sm disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="Kirim Pesan"
          className="w-11 h-11 rounded-2xl bg-nyala-500 text-white flex items-center justify-center active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-nyala-500/30 flex-shrink-0"
        >
          <PaperPlaneRight weight="fill" className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
}
