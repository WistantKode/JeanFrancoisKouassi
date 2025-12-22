'use client';

import { useEffect, useState, type FC } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface SupporterCounterProps {
  target: number;
}

export const SupporterCounter: FC<SupporterCounterProps> = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="tabular-nums font-bold text-primary">
      {count.toLocaleString()}
    </span>
  );
};
