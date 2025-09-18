"use client";

import { useState, useEffect } from 'react';
import HeroSection from "./HeroSection";

const Slider = () => {
  // State for current slide indices
  const [currentLeftSlider, setCurrentLeftSlider] = useState(0);
  const [currentRightSlider, setCurrentRightSlider] = useState(0);

  // Static data (no need for functions)
  const leftBanners = [
    {
      image: '/images/landing/slider/imageleft/left1.webp',
      title: 'Static Left Banner 1',
      mobileModel: '/images/landing/slider/imagemiddle/mobile1.webp'
    },
    {
      image: '/images/landing/slider/imageleft/left2.webp',
      title: 'Static Left Banner 2',
      mobileModel: '/images/landing/slider/imagemiddle/mobile2.webp'
    }
  ];

  const rightBanners = [
    {
      image: '/images/landing/slider/imageright/right1.webp',
      title: 'Static Right Banner 1'
    },
    {
      image: '/images/landing/slider/imageright/right2.webp',
      title: 'Static Right Banner 2'
    }
  ];

  // Auto-slide functionality (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLeftSlider(prev => (prev + 1) % leftBanners.length);
      setCurrentRightSlider(prev => (prev + 1) % rightBanners.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [leftBanners.length, rightBanners.length]);

  return (
    <section className="bg-gradient py-4 pt-28">
      <HeroSection
        leftBanners={leftBanners}
        rightBanners={rightBanners}
        currentLeftSlider={currentLeftSlider}
        currentRightSlider={currentRightSlider}
      />
    </section>
  );
};

export default Slider;