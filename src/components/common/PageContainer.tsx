import { ReactNode } from 'react';

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mx-auto w-full max-w-7xl px-8 py-12 pt-20 sm:pt-28 2xl:pt-32">
      {children}
    </main>
  );
};
