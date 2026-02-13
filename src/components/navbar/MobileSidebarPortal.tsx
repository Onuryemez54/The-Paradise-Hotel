'use client';
import { createPortal } from 'react-dom';
import { BrandLogo } from '../common/BrandLogo';
import { NavLinks } from './NavLinks';
import { AuthSection } from '../auth/AuthSection';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileSidebarPortal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="bg-mobile-nav-bg/50 fixed inset-0 z-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.ul
            className="from-primary-300 to-primary-900 text-primary-50 fixed top-0 left-0 z-70 flex h-dvh w-40 flex-col items-center justify-between overflow-y-auto rounded-r-xl bg-linear-to-br py-16 shadow-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center justify-center gap-6">
              <li>
                <BrandLogo setIsOpen={setIsOpen} />
              </li>
              <NavLinks setIsOpen={setIsOpen} />
            </div>
            <AuthSection setIsOpen={setIsOpen} />
          </motion.ul>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
