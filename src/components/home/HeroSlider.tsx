'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ButtonKey, TitleKey } from '@/types/i18n/keys';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { CustomButton } from '../ui/custom-components/CustomButton';

const images = ['/bg-3.png', '/bg-2.png', '/bg.png'];

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
