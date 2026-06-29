"use client";

import { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === '') {
        // Finished deleting, transition asynchronously to next word
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 150);
      } else {
        timer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (currentText === fullWord) {
        // Finished typing word, wait and start deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      } else {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className="relative">
      <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan select-all">
        {currentText}
      </span>
      {/* Blinking cursor */}
      <span className="absolute -right-1 inline-block w-[3px] h-[90%] bg-neon-cyan animate-pulse" />
    </span>
  );
}
