'use client';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { Link } from '@/i18n/navigation';

interface BrandLogoProps {
  setIsOpen?: (isOpen: boolean) => void;
  children?: React.ReactNode;
}
export const BrandLogo = ({ setIsOpen, children }: BrandLogoProps) => {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/logo-dark.png' : '/logo-light.png';

  return (
    <Link href="/" className="flex items-center gap-4">
      <Image
        src={logoSrc}
        height="50"
        width="50"
        alt="The Paradise Hotel logo"
        className="rounded-full opacity-80"
        onClick={() => setIsOpen && setIsOpen(false)}
      />
      {children && children}
    </Link>
  );
};
