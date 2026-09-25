"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaXmark } from "react-icons/fa6";

export type ButtonState = "idle" | "sending" | "success" | "error";

interface SubmitButtonProps {
  buttonState: ButtonState;
  isSubmitting: boolean;
}

export const ContactSubmitButton: React.FC<SubmitButtonProps> = ({
  buttonState,
  isSubmitting,
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="group relative flex min-h-12 w-full items-center justify-center overflow-hidden rounded-lg border border-primary/60 bg-linear-to-r from-card-bg via-primary/20 to-accent/20 px-6 py-3.5 text-xs font-bold tracking-widest uppercase text-foreground shadow-md transition-all duration-500 hover:shadow-primary/20 active:scale-[0.98] disabled:cursor-not-allowed md:text-sm"
    >
      <AnimatePresence mode="wait">
        {/* IDLE STATE */}
        {buttonState === "idle" && (
          <motion.div
            key="idle-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 transition-all duration-300 group-hover:gap-4.5"
          >
            {/* ১. টেক্সট নিচ থেকে উপরে স্লাইড করে আসবে */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10"
            >
              Send Message
            </motion.span>

            {/* ২. টেক্সট আসার পর আইকন নিজ জায়গায় স্কেল-আপ এবং ফেড-ইন হবে (নিচ থেকে উঠবে না) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.35,
                ease: "backOut",
              }}
            >
              <FaPaperPlane className="text-primary transition-transform duration-300 group-hover:scale-110" />
            </motion.div>
          </motion.div>
        )}

        {/* SENDING STATE */}
        {buttonState === "sending" && (
          <motion.div
            key="sending-container"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            {/* স্লো ও স্মুথ পালস অ্যানিমেশন (1.8s) */}
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              Sending Message
            </motion.span>

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                x: [0, 2, -2, 0],
                y: [0, -2, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <FaPaperPlane className="text-primary" />
            </motion.div>
          </motion.div>
        )}

        {/* SUCCESS STATE */}
        {buttonState === "success" && (
          <motion.div
            key="success-container"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center justify-center gap-3"
          >
            <span className="relative z-10">Message Sent Successfully</span>

            {/* স্লো উড়ে যাওয়ার অ্যানিমেশন (1.4s) */}
            <motion.div
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: 100,
                y: -100,
                opacity: 0,
                scale: 1.5,
              }}
              transition={{
                duration: 1.4,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <FaPaperPlane className="text-primary" />
            </motion.div>
          </motion.div>
        )}

        {/* ERROR STATE */}
        {buttonState === "error" && (
          <motion.div
            key="error-container"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="relative z-10">Message Send Failed</span>

            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              }}
            >
              <FaXmark className="text-sm text-destructive" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
