"use client";
import { useEffect, useRef } from "react";
import zeza from "../../public/data/zeza";
import sonyeo from "../../public/data/sonyeo";
import fruity from "../../public/data/fruity";
import laundry from "../../public/data/laundry";
import translucent from "../../public/data/translucent";
import Image from "next/image";

const totalZeza = zeza.length;
const infiniteZeza = Array.from(
  { length: totalZeza * 3 },
  (_, i) => zeza[i % totalZeza]
);

const totalSonyeo = sonyeo.length;
const infiniteSonyeo = Array.from(
  { length: totalSonyeo * 3 },
  (_, i) => sonyeo[i % totalSonyeo]
);

const totalFruity = fruity.length;
const infiniteFruity = Array.from(
  { length: totalFruity * 3 },
  (_, i) => fruity[i % totalFruity]
);

const totalLaundry = laundry.length;
const infiniteLaundry = Array.from(
  { length: totalLaundry * 3 },
  (_, i) => laundry[i % totalLaundry]
);

const totalTranslucent = translucent.length;
const infiniteTranslucent = Array.from(
  { length: totalTranslucent * 3 },
  (_, i) => translucent[i % totalTranslucent]
);

export default function BarSoap() {
  // Refs untuk masing-masing baris
  const scrollRefs = useRef({
    zeza: useRef<HTMLDivElement>(null),
    sonyeo: useRef<HTMLDivElement>(null),
    fruity: useRef<HTMLDivElement>(null),
    laundry: useRef<HTMLDivElement>(null),
    translucent: useRef<HTMLDivElement>(null),
  }).current;

  const isHover = useRef({
    zeza: useRef(false),
    sonyeo: useRef(false),
    fruity: useRef(false),
    laundry: useRef(false),
    translucent: useRef(false),
  }).current;

  const isDrag = useRef({
    zeza: useRef(false),
    sonyeo: useRef(false),
    fruity: useRef(false),
    laundry: useRef(false),
    translucent: useRef(false),
  }).current;

  const startX = useRef({
    zeza: useRef(0),
    sonyeo: useRef(0),
    fruity: useRef(0),
    laundry: useRef(0),
    translucent: useRef(0),
  }).current;

  const origScroll = useRef({
    zeza: useRef(0),
    sonyeo: useRef(0),
    fruity: useRef(0),
    laundry: useRef(0),
    translucent: useRef(0),
  }).current;

  useEffect(() => {
    const elements = [
      "zeza",
      "sonyeo",
      "fruity",
      "laundry",
      "translucent",
    ] as const;

    const intervals: NodeJS.Timeout[] = [];

    elements.forEach((el) => {
      const c = scrollRefs[el].current;
      if (!c) return;

      const singleWidth = c.scrollWidth / 3;
      c.scrollLeft = singleWidth;

      const iv = setInterval(() => {
        if (!isHover[el].current && !isDrag[el].current) {
          c.scrollLeft += 1;
          if (c.scrollLeft >= singleWidth * 2) {
            c.scrollLeft = singleWidth;
          }
        }
      }, 20);

      intervals.push(iv);
    });

    const onUp = () => {
      elements.forEach((el) => {
        isDrag[el].current = false;
      });
    };

    const onMove = (e: MouseEvent) => {
      elements.forEach((el) => {
        const c = scrollRefs[el].current;
        if (!c) return;
        if (isDrag[el].current) {
          e.preventDefault();
          const x = e.pageX - (c.offsetLeft || 0);
          const walk = (x - startX[el].current) * 1.5;
          c.scrollLeft = origScroll[el].current - walk;

          const singleWidth = c.scrollWidth / 3;
          if (c.scrollLeft <= singleWidth * 0.5) {
            c.scrollLeft += singleWidth;
            origScroll[el].current += singleWidth;
          }
          if (c.scrollLeft >= singleWidth * 2.5) {
            c.scrollLeft -= singleWidth;
            origScroll[el].current -= singleWidth;
          }
        }
      });
    };

    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);

    return () => {
      intervals.forEach(clearInterval);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
    };
  }, [isDrag, isHover, origScroll, scrollRefs, startX]);

  const handleEnter = (key: keyof typeof isHover) => {
    isHover[key].current = true;
  };

  const handleLeave = (key: keyof typeof isHover) => {
    isHover[key].current = false;
  };

  const handleDown = (
    e: React.MouseEvent<HTMLDivElement>,
    key: keyof typeof isHover
  ) => {
    const c = scrollRefs[key].current;
    if (!c) return;
    isDrag[key].current = true;
    startX[key].current = e.pageX - c.offsetLeft;
    origScroll[key].current = c.scrollLeft;
  };

  return (
    <div className="py-20 bg-neutral-900">
      <div className="container mx-auto px-16 md:px-20">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-12 text-white tracking-wider">
          <span className="relative inline-block">
            Bar Soaps
            <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded"></span>
          </span>
        </h1>

        {/* Beauty Soap */}
        <div className="mb-24">
          <h2 className="text-white text-3xl font-semibold mb-8 tracking-tight">
            Beauty Soap
          </h2>

          {/* SONYEO Scroll */}
          <Section
            title="" // kosongin title karena udah ada di atas
            scrollRef={scrollRefs.sonyeo}
            onEnter={() => handleEnter("sonyeo")}
            onLeave={() => handleLeave("sonyeo")}
            onDown={(e) => handleDown(e, "sonyeo")}
            items={infiniteSonyeo}
          />

          {/* ZEZA Scroll */}
          <Section
            title="" // kosongin title juga
            scrollRef={scrollRefs.zeza}
            onEnter={() => handleEnter("zeza")}
            onLeave={() => handleLeave("zeza")}
            onDown={(e) => handleDown(e, "zeza")}
            items={infiniteZeza}
          />
        </div>

        {/* Fruity Soap */}
        <Section
          title="Fruity Soap"
          scrollRef={scrollRefs.fruity}
          onEnter={() => handleEnter("fruity")}
          onLeave={() => handleLeave("fruity")}
          onDown={(e) => handleDown(e, "fruity")}
          items={infiniteFruity}
        />

        {/* Laundry Soap */}
        <Section
          title="Laundry Soap"
          scrollRef={scrollRefs.laundry}
          onEnter={() => handleEnter("laundry")}
          onLeave={() => handleLeave("laundry")}
          onDown={(e) => handleDown(e, "laundry")}
          items={infiniteLaundry}
        />

        {/* Laundry Translucent */}
        <Section
          title="Laundry Translucent"
          scrollRef={scrollRefs.translucent}
          onEnter={() => handleEnter("translucent")}
          onLeave={() => handleLeave("translucent")}
          onDown={(e) => handleDown(e, "translucent")}
          items={infiniteTranslucent}
        />
      </div>
    </div>
  );
}

function Section({
  title,
  scrollRef,
  onEnter,
  onLeave,
  onDown,
  items,
}: {
  title: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onEnter: () => void;
  onLeave: () => void;
  onDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  items: { image: string; name: string }[];
}) {
  return (
    <div className="mb-24">
      <h2 className="text-white text-3xl font-semibold mb-8 tracking-tight">
        {title}
      </h2>
      <div
        ref={scrollRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseDown={onDown}
        className="flex gap-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none rounded-2xl"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative group min-w-[300px] md:min-w-[400px] aspect-[16/9] bg-neutral-800 rounded-2xl flex-shrink-0 shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-500"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 300px, 400px"
              className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
