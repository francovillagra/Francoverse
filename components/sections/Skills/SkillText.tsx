"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion';
import { Sparkles } from 'lucide-react';

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop(0.5)}
        className="skills-intro-box py-2 px-1 border border-[#7042f88b] opacity-90 flex items-center"
      >
        <Sparkles className="text-[#b49bff] mr-1 h-3 w-3" />
        <span className="text-[10px] text-white font-medium uppercase tracking-tight font-sans">
          Lleva tu desarrollo al siguiente nivel con Next.js 13
        </span>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        Making apps with modern technologies
      </motion.h2>

      <motion.p
        variants={slideInFromRight(0.5)}
        className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        Never miss a task deadline or idea
      </motion.p>
    </div>
  );
};

export default SkillText;
