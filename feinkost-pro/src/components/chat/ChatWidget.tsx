"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: number;
}

const STORAGE_KEY = "feinkost-chat-messages";
const NAME_KEY = "feinkost-chat-name";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLang();

  // Load messages and name from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[];
        setMessages(parsed);
      }
      const storedName = localStorage.getItem(NAME_KEY);
      if (storedName) {
        setCustomerName(storedName);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // ignore storage errors
      }
    }
  }, [messages]);

  // Persist customer name
  useEffect(() => {
    if (customerName) {
      try {
        localStorage.setItem(NAME_KEY, customerName);
      } catch {
        // ignore
      }
    }
  }, [customerName]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);
    setHasUnread(false);

    // Add welcome message if no messages exist
    setMessages((prev) => {
      if (prev.length === 0) {
        return [
          {
            id: generateId(),
            text: t("chat.welcome"),
            sender: "support",
            timestamp: Date.now(),
          },
        ];
      }
      return prev;
    });
  }, [t]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      text: trimmed,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Send to API
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          customerName: customerName || undefined,
        }),
      });
    } catch {
      // silently fail
    }

    // Auto-reply after 2 seconds
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: generateId(),
        text: t("chat.auto_reply"),
        sender: "support",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 2000);
  }, [input, customerName, t]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-4 sm:right-6 w-[340px] sm:w-[350px] h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999] border border-sand-200 ${
            isClosing ? "animate-slide-down" : "animate-slide-up"
          }`}
        >
          {/* Header */}
          <div className="bg-olive-500 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold text-sm">{t("chat.title")}</h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-olive-600 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-olive-500 text-white rounded-br-md"
                      : "bg-cream-200 text-espresso-600 rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.sender === "user"
                        ? "text-white/70 text-right"
                        : "text-espresso-400 text-left"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-sand-200 bg-white p-3 shrink-0 space-y-2">
            {/* Name input — only show if name hasn't been set yet */}
            {!customerName && (
              <input
                type="text"
                placeholder={t("chat.name_placeholder")}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-sand-200 text-sm text-espresso-600 placeholder:text-sand-400 focus:outline-none focus:ring-1 focus:ring-olive-400 bg-cream-50"
              />
            )}
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder={t("chat.placeholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-3 py-2 rounded-xl border border-sand-200 text-sm text-espresso-600 placeholder:text-sand-400 focus:outline-none focus:ring-1 focus:ring-olive-400 bg-white"
                maxLength={1000}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-2 bg-olive-500 text-white rounded-xl hover:bg-olive-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                aria-label={t("chat.send")}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] w-14 h-14 bg-olive-500 hover:bg-olive-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={t("chat.title")}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
            )}
          </>
        )}
      </button>
    </>
  );
}
