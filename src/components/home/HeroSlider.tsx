'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ButtonKey, TitleKey } from '@/types/i18n/keys';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { CustomButton } from '../ui/custom-components/CustomButton';

const images = ['/bg/bg.webp', '/bg/bg-2.webp', '/bg/outdoor-2.webp'];

export const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      10000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="absolute inset-0 h-screen">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.3 }}
          >
            <div className="relative h-full w-full">
              <Image
                src={img}
                alt="Hotel background"
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </motion.div>
        ))}
        <div className="from-primary-900/70 absolute inset-0 bg-linear-to-b to-transparent" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 backdrop-blur-sm"
          style={{
            maskImage:
              'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
          }}
        />
      </div>
      <div className="px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <CustomTitle variant="main" i18nKey={TitleKey.HOME} />
            <CustomButton
              as="link"
              variant="explore"
              href="/rooms"
              isAnimated
              i18nKey={ButtonKey.EXPLORE}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
