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
  ArrowSquareOut
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import { useToast } from "@/context/ToastContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Maaf, terjadi kendala sistem saat memproses jawaban.",
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

  return (
    <div className="flex flex-col h-[calc(100dvh-13rem)] justify-between space-y-3">
      
      {/* ── 1. CHAT MESSAGE STREAM ── */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-none">
        
        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5 pb-2">
          <span className="text-[10px] font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider block">
            Pertanyaan Cepat:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_PROMPTS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E1635] border border-navy-200 dark:border-navy-800 text-[11px] font-semibold text-navy-700 dark:text-navy-300 hover:border-nyala-500 whitespace-nowrap active:scale-95 transition-transform cursor-pointer shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Bubbles */}
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-nyala-600 to-amber-500 flex items-center justify-center p-0.5 flex-shrink-0 mt-0.5 shadow-md">
                  <MascotFlame size="sm" mood="happy" className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed space-y-1 shadow-sm ${
                  isUser
                    ? "bg-nyala-600 text-white rounded-br-none"
                    : "bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 text-navy-900 dark:text-navy-100 rounded-bl-none"
                }`}
              >
                <div className="prose dark:prose-invert prose-xs max-w-none prose-p:leading-relaxed prose-a:text-nyala-600 dark:prose-a:text-nyala-400">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
                </div>

                <div className={`flex items-center justify-between gap-2 pt-1 text-[10px] ${
                  isUser ? "text-white/70" : "text-navy-400"
                }`}>
                  <span>{m.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(m.id, m.content)}
                      className="hover:text-navy-950 dark:hover:text-white transition-colors"
                      title="Salin Pesan"
                    >
                      {copiedId === m.id ? <Check weight="bold" className="w-3 h-3 text-emerald-500" /> : <Copy weight="bold" className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-navy-500 dark:text-navy-400 font-mono py-2">
            <span className="w-2 h-2 rounded-full bg-nyala-500 animate-ping" />
            <span>Nyala sedang meracik jawaban terverifikasi...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── 2. NATIVE CHAT INPUT DOCK ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200 dark:border-navy-800 shadow-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan hal seputar MASTA, SIKAD & TI..."
          className="flex-1 px-3 py-2 bg-transparent text-xs text-navy-950 dark:text-white placeholder:text-navy-400 outline-none"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-nyala-600 hover:bg-nyala-500 disabled:opacity-40 text-white active:scale-90 transition-transform cursor-pointer shadow-sm"
        >
          <PaperPlaneRight weight="fill" className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
