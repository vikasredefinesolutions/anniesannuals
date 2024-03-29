'use client';
import { useEffect, useState } from 'react';

function getWindowDimensions() {
  let height = 1920;
  let width = 1080;

  if (typeof window !== 'undefined') {
    height = window.innerHeight;
    width = window.innerWidth;
  }

  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    setTimeout(() => {
      handleResize();
    }, 300);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
