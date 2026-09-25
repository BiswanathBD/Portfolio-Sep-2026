"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaMessage,
  FaXmark,
} from "react-icons/fa6";
import { MotionWrapper } from "./Shared/MotionWrapper";

type ButtonState = "idle" | "sending" | "success" | "error";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonState("sending");
    setStatus({ type: null, message: "" });

    console.log("🚀 [Contact Form Submitting Data]:", formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("📥 [Contact Form API Response Status]:", response.status);
      console.log("📦 [Contact Form API Response Data]:", data);

      if (response.ok) {
        setButtonState("success");
        setStatus({
          type: "success",
          message:
            "Message sent successfully! Check your email for confirmation.",
        });

        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setButtonState("idle");
        }, 3500);
      } else {
        setButtonState("error");
        setStatus({
          type: "error",
          message: data.message || "Something went wrong. Please try again.",
        });

        setTimeout(() => {
          setButtonState("idle");
        }, 3500);
      }
    } catch (error) {
      console.error("❌ [Contact Form Submission Error]:", error);
      setButtonState("error");
      setStatus({
        type: "error",
        message:
          "Failed to send message. Please check your network connection.",
      });

      setTimeout(() => {
        setButtonState("idle");
      }, 3500);
    }
  };

  const isSubmitting =
    buttonState === "sending" ||
    buttonState === "success" ||
    buttonState === "error";

  return (
    <section className="relative flex h-full w-full flex-col justify-center p-6 text-left">
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 z-0 aspect-square w-1/3 -translate-y-1/2 rounded-full bg-accent/20 blur-[90px]" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-full flex-col gap-4"
      >
        {/* Name & Email 2-Column Grid */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Name Field */}
          <MotionWrapper animationType="fadeUp" delay={0.2} className="w-full">
            <div className="group relative flex items-center rounded-lg border border-border-color/80 bg-card-bg/40 px-3.5 py-3 transition-all duration-300 focus-within:border-primary focus-within:bg-card-bg/70 focus-within:ring-1 focus-within:ring-primary/40 hover:border-border-color">
              <FaUser className="mr-3 shrink-0 text-xs text-foreground/40 transition-colors duration-300 group-focus-within:text-primary" />
              <div className="flex w-full flex-col overflow-hidden">
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                    formData.name
                      ? "text-accent"
                      : "text-foreground/50 group-focus-within:text-accent"
                  }`}
                >
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-transparent text-xs font-semibold text-foreground placeholder:text-foreground/20 focus:outline-none md:text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </MotionWrapper>

          {/* Email Field */}
          <MotionWrapper animationType="fadeUp" delay={0.3} className="w-full">
            <div className="group relative flex items-center rounded-lg border border-border-color/80 bg-card-bg/40 px-3.5 py-3 transition-all duration-300 focus-within:border-primary focus-within:bg-card-bg/70 focus-within:ring-1 focus-within:ring-primary/40 hover:border-border-color">
              <FaEnvelope className="mr-3 shrink-0 text-xs text-foreground/40 transition-colors duration-300 group-focus-within:text-primary" />
              <div className="flex w-full flex-col overflow-hidden">
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                    formData.email
                      ? "text-accent"
                      : "text-foreground/50 group-focus-within:text-accent"
                  }`}
                >
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-transparent text-xs font-semibold text-foreground placeholder:text-foreground/20 focus:outline-none md:text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </MotionWrapper>
        </div>

        {/* Message Field */}
        <MotionWrapper animationType="fadeUp" delay={0.4} className="w-full">
          <div className="group relative flex items-start rounded-lg border border-border-color/80 bg-card-bg/40 px-3.5 py-3 transition-all duration-300 focus-within:border-primary focus-within:bg-card-bg/70 focus-within:ring-1 focus-within:ring-primary/40 hover:border-border-color">
            <FaMessage className="mr-3 mt-1 shrink-0 text-xs text-foreground/40 transition-colors duration-300 group-focus-within:text-primary" />
            <div className="flex w-full flex-col overflow-hidden">
              <span
                className={`text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                  formData.message
                    ? "text-accent"
                    : "text-foreground/50 group-focus-within:text-accent"
                }`}
              >
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your message here..."
                className="w-full resize-none bg-transparent text-xs font-semibold text-foreground placeholder:text-foreground/20 focus:outline-none md:text-sm"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
        </MotionWrapper>

        {/* Action Button */}
        <MotionWrapper
          animationType="fadeUp"
          delay={0.5}
          className="w-full pt-1"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group relative flex w-full items-center justify-center gap-3 rounded-lg border px-6 py-3.5 text-xs font-bold tracking-widest uppercase shadow-md transition-all duration-500 hover:gap-4.5 active:scale-[0.98] disabled:cursor-not-allowed md:text-sm ${
              buttonState === "success"
                ? "border-success/70 bg-success/15 text-success shadow-success/10"
                : buttonState === "error"
                  ? "border-destructive/70 bg-destructive/15 text-destructive shadow-destructive/10"
                  : "border-primary/60 bg-linear-to-r from-card-bg via-primary/20 to-accent/20 text-foreground"
            }`}
          >
            {/* Dynamic Text with Smooth Sequential Transitions */}
            <AnimatePresence mode="wait">
              {buttonState === "idle" && (
                <motion.span
                  key="idle-text"
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)", scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 transition-colors duration-300"
                >
                  Send Message
                </motion.span>
              )}

              {buttonState === "sending" && (
                <motion.span
                  key="sending-text"
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)", scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10"
                >
                  Sending Message
                </motion.span>
              )}

              {buttonState === "success" && (
                <motion.span
                  key="success-text"
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)", scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 text-success"
                >
                  Message Sent Successfully
                </motion.span>
              )}

              {buttonState === "error" && (
                <motion.span
                  key="error-text"
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)", scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 text-destructive"
                >
                  Message Send Failed
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dynamic Animated Icons Container */}
            <div className="relative z-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {buttonState === "idle" && (
                  <motion.div
                    key="idle-icon"
                    initial={{ opacity: 0, scale: 0.7, filter: "blur(2px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.7, filter: "blur(2px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaPaperPlane className="text-primary transition-transform duration-300 group-hover:scale-110" />
                  </motion.div>
                )}

                {buttonState === "sending" && (
                  <motion.div
                    key="sending-icon"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1.1,
                      x: [0, 2, -2, 2, 0],
                      y: [0, -2, 1, -1, 0],
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      x: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                      y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                      duration: 0.5,
                    }}
                  >
                    <FaPaperPlane className="text-primary" />
                  </motion.div>
                )}

                {buttonState === "error" && (
                  <motion.div
                    key="success-icon"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: 60,
                      y: -60,
                      opacity: [1, 0.5, 0],
                      scale: [1, 3, 5],
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.16, 1, 0.1, 1],
                    }}
                  >
                    <FaPaperPlane className="text-success" />
                  </motion.div>
                )}

                {/* {buttonState === "error" && (
                  <motion.div
                    key="error-icon"
                    initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.4 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <FaXmark className="text-sm text-destructive" />
                  </motion.div>
                )} */}
              </AnimatePresence>
            </div>
          </button>
        </MotionWrapper>

        {/* Status Notification Below Form */}
        {status.message && (
          <MotionWrapper animationType="fadeUp" delay={0.1}>
            <p
              className={`text-center text-xs font-medium ${
                status.type === "success" ? "text-success" : "text-destructive"
              }`}
            >
              {status.message}
            </p>
          </MotionWrapper>
        )}
      </form>
    </section>
  );
};
