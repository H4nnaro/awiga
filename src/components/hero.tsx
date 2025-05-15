"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    "https://images.pexels.com/photos/3987142/pexels-photo-3987142.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/4210374/pexels-photo-4210374.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/4202469/pexels-photo-4202469.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const changeImage = useCallback(
    (next = true) => {
      setCurrentIndex((prevIndex) =>
        next
          ? (prevIndex + 1) % images.length
          : (prevIndex - 1 + images.length) % images.length
      );
    },
    [images.length]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      changeImage(true);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [changeImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      changeImage(true);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [changeImage]);

  const handleNext = () => {
    changeImage(true);
    resetTimer();
  };

  const handlePrev = () => {
    changeImage(false);
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      changeImage(true);
    }, 5000);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slider */}
      <motion.div
        className="absolute inset-0 flex h-full"
        animate={{ x: `-${currentIndex * 100}vw` }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative h-full w-screen flex-shrink-0">
            <Image
              src={img}
              alt={`Slide ${i + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <div className="relative w-xl sm:w-2xl md:w-3xl xl:w-4xl 2xl:w-5xl aspect-[3/1]">
          <Image
            src="/images/awiga-transparent.png"
            alt="AWIGA"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 transition rounded-full p-3 shadow-lg z-20 backdrop-blur-sm"
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 transition rounded-full p-3 shadow-lg z-20 backdrop-blur-sm"
      >
        <ArrowRight className="h-6 w-6 text-white" />
      </button>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          className="w-full h-[120px] text-neutral-900"
        >
          <path fill="currentColor" d="M0,0 Q50,50 100,0 V100 H0 Z" />
        </svg>
      </div>
    </div>
  );
}
