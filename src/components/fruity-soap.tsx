"use client";
import { useEffect, useRef } from "react";
import soaps from "../../public/data/zeza";

const total = soaps.length;
const infiniteSoaps = Array.from(
  { length: total * 3 },
  (_, i) => soaps[i % total]
);

export default function BarSoap() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHover = useRef(false);
  const isDrag = useRef(false);
  const startX = useRef(0);
  const origScroll = useRef(0);

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    const singleWidth = c.scrollWidth / 3;
    c.scrollLeft = singleWidth;

    // auto-scroll
    const iv = setInterval(() => {
      if (!isHover.current && !isDrag.current) {
        c.scrollLeft += 1;
        if (c.scrollLeft >= singleWidth * 2) {
          c.scrollLeft = singleWidth;
        }
      }
    }, 20);

    const onUp = () => {
      isDrag.current = false;
    };
    const onMove = (e: MouseEvent) => {
      if (!isDrag.current) return;
      e.preventDefault();
      const x = e.pageX - (c.offsetLeft || 0);
      const walk = (x - startX.current) * 1.5;
      c.scrollLeft = origScroll.current - walk;
      if (c.scrollLeft <= singleWidth * 0.5) {
        c.scrollLeft += singleWidth;
        origScroll.current += singleWidth;
      }
      if (c.scrollLeft >= singleWidth * 2.5) {
        c.scrollLeft -= singleWidth;
        origScroll.current -= singleWidth;
      }
    };

    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);

    return () => {
      clearInterval(iv);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const onEnter = () => {
    isHover.current = true;
  };
  const onLeave = () => {
    isHover.current = false;
  };
  const onDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = scrollRef.current;
    if (!c) return;
    isDrag.current = true;
    startX.current = e.pageX - c.offsetLeft;
    origScroll.current = c.scrollLeft;
  };

  return (
    <div className="py-20 bg-neutral-900">
      <div className="container mx-auto px-16 md:px-20">
        <h1 className="text-white text-4xl font-bold mb-6">Bar Soap</h1>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none rounded-xl"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onMouseDown={onDown}
        >
          {infiniteSoaps.map((soap, idx) => (
            <div
              key={idx}
              className="min-w-[300px] lg:min-w-[400px] h-[250px] bg-white rounded-xl flex-shrink-0 shadow-md overflow-hidden"
            >
              <img
                src={soap.image}
                alt={soap.name}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="w-full h-full object-cover hover:scale-125 hover:transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
