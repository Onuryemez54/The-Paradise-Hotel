import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { useLocale } from 'next-intl';
import Providers from '../components/providers/providers';
import { ReactNode } from 'react';
import { ScrollToTopButton } from '@/components/common/animation/ScrollToTopButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background">
        <Providers>{children}</Providers>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
