"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const words = ["Community", "Cars", "Platform"];

const TYPE_DURATION = 500;
const DELETE_DURATION = 500;
const HOLD_DURATION = 1000;

export default function HeroText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Typing
    if (!deleting) {
      if (text.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, TYPE_DURATION / currentWord.length);

        return () => clearTimeout(timeout);
      }

      const hold = setTimeout(() => {
        setDeleting(true);
      }, HOLD_DURATION);

      return () => clearTimeout(hold);
    }

    // Deleting
    if (text.length > 0) {
      const timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length - 1));
      }, DELETE_DURATION / currentWord.length);

      return () => clearTimeout(timeout);
    }

    setDeleting(false);
    setWordIndex((prev) => (prev + 1) % words.length);
  }, [text, deleting, wordIndex]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-6xl font-bold tracking-tight"
    >
      <span className="text-neutral-900  dark:text-white">
        <span className="text-[#F0EEE8]">Your</span>{" "}
      </span>

      <span className="text-emerald-500 inline-block min-w-[11ch]">
        {text}
        <span className="animate-pulse">.</span>
      </span>
    </motion.h1>
  );
}