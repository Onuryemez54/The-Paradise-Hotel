'use client';

import { motion } from 'framer-motion';

export function FadeUp({
  children,
  delay = 0,
  initialY = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  initialY?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
