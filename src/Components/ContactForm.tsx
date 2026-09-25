"use client";

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaMessage } from "react-icons/fa6";
import { MotionWrapper } from "./Shared/MotionWrapper";
import { ButtonState, ContactSubmitButton } from "./ContactSubmitButton";

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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

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

        {/* Action Button (Isolated Component) */}
        <MotionWrapper
          animationType="fadeUp"
          delay={0.5}
          className="w-full pt-1"
        >
          <ContactSubmitButton
            buttonState={buttonState}
            isSubmitting={isSubmitting}
          />
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
