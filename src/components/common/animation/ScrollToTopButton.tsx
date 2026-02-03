'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > 300 && currentY > lastScrollY.current) {
        setVisible(true);
      }

      if (currentY < lastScrollY.current) {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="bg-utility-bg text-utility-text fixed right-6 bottom-6 z-50 flex h-8 w-8 items-center justify-center rounded-full shadow-lg backface-hidden lg:h-12 lg:w-12"
        >
          <ArrowUp className="h-4 w-4 lg:h-5 lg:w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
