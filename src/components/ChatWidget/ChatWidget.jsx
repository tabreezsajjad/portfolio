import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", text: "Hi! How can I help? Ask about work, press, or anything else." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const bodyRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside to close
  useEffect(() => {
    function onDown(e) {
      if (!open) return;
      if (panelRef.current?.contains(e.target)) return;
      if (btnRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing, open]);


  // --- THIS IS THE UPDATED LOGIC ---
  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // Add user's message to the UI right away
    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Prepare message history for the API. We strip the `id` field as the API doesn't need it.
    const apiMessages = [...messages, userMsg].map((msg) => ({
      role: msg.role,
      content: msg.text,
    }));

    try {
      // Call our secure serverless endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        // If the server returns an error, display it in the chat
        const errorData = await response.json();
        throw new Error(errorData.error || "An unknown error occurred.");
      }

      const data = await response.json();
      
      // Add the AI's response to the UI
      if (data.reply?.content) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "bot", text: data.reply.content },
        ]);
      }

    } catch (error) {
      console.error("Chat fetch error:", error);
      // Display a user-friendly error message in the chat
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: error.message },
      ]);
    } finally {
      setTyping(false);
    }
  }

  // --- THE REST OF THE COMPONENT REMAINS THE SAME ---

  // Simple stagger animation for messages
  const msgVariants = {
    hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: 8, filter: "blur(6px)", transition: { duration: 0.18 } },
  };

  return (
    <>
      {/* Launcher button */}
      <button
        ref={btnRef}
        className="chat-launcher"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg className="chat-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4.5 5.5h15a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H12l-4.5 3v-3H4.5A1.5 1.5 0 0 1 3 15V7a1.5 1.5 0 0 1 1.5-1.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={panelRef}
            className="chat-window"
            role="dialog"
            aria-label="Chat widget"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="chat-header">
              <div className="chat-title">
                <span className="title-abril">Tej</span>&nbsp;Assistant
              </div>
              <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
                ×
              </button>
            </header>

            <div ref={bodyRef} className="chat-body" aria-live="polite">
              <div className="thread">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      className={`msg ${m.role === "bot" ? "msg-bot" : "msg-user"}`}
                      variants={msgVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      {m.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {typing && (
                  <motion.div
                    className="msg msg-bot"
                    variants={msgVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <span className="typing">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            <form className="chat-input" onSubmit={handleSubmit}>
              <input
                className="chat-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                aria-label="Type your message"
                autoFocus
              />
              <button className="chat-send" type="submit">
                Send
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
