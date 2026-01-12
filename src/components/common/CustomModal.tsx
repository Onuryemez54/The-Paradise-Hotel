'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

interface CustomModalProps {
  children: ReactNode;
  mode: 'edit';
  setShowModal?: (show: boolean) => void;
}

export const CustomModal = ({
  children,
  mode,
  setShowModal,
}: CustomModalProps) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        router.back();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-primary-900/90 border-primary-600 text-primary-100 animate-in zoom-in relative max-h-[90vh] w-[90%] max-w-md overflow-y-auto rounded-2xl border p-4 text-center shadow-2xl duration-400 ease-in-out sm:p-8"
      >
        <span
          className="text-primary-400 hover:text-accent-400 absolute top-4 right-4 cursor-pointer"
          onClick={() => setShowModal && setShowModal(false)}
        >
          <X size={20} />
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};
