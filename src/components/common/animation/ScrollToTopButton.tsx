'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={scrollToTop}
          className="bg-utility-bg text-utility-text hover:bg-utility-hover-bg hover:text-utility-hover-text fixed right-6 bottom-6 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 lg:h-12 lg:w-12"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4 lg:h-5 lg:w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
