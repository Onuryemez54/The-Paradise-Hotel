import { ReactNode } from 'react';
import { ScrollReveal } from '../common/animation/ScrollReveal';

export const HomeWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollReveal delay={0.2}>
      <section className="3xl:px-20 px-6 py-4 md:px-10 lg:px-16">
        {children}
      </section>
    </ScrollReveal>
  );
};
