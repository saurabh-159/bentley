"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

export type HeroCopySlide = {
  title: string;
  description: string;
};

export function HeroCopySwiper({
  slides,
  ariaLabel = "Highlights",
}: {
  slides: readonly HeroCopySlide[];
  ariaLabel?: string;
}) {
  const reduceMotion = useReducedMotion();
  const swiperRef = useRef<SwiperClass | null>(null);
  const [index, setIndex] = useState(0);

  if (slides.length === 0) return null;

  if (slides.length === 1) {
    const slide = slides[0];
    return (
      <div className="mt-5 max-w-3xl">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
          {slide.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-[1.05rem]">
          {slide.description}
        </p>
      </div>
    );
  }

  return (
    <>
      <div aria-live="polite" className="relative mt-5 grid max-w-3xl">
        {slides.map((item) => (
          <div
            key={item.title}
            className="invisible col-start-1 row-start-1"
            aria-hidden
          >
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              {item.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 sm:text-[1.05rem]">
              {item.description}
            </p>
          </div>
        ))}

        <div className="absolute inset-0 col-start-1 row-start-1">
          <Swiper
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={700}
            allowTouchMove
            autoplay={
              reduceMotion
                ? false
                : {
                    delay: 4200,
                    disableOnInteraction: false,
                  }
            }
            modules={[Autoplay, EffectFade]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setIndex(swiper.realIndex)}
            className="!m-0 !h-full !w-full overflow-hidden"
          >
            {slides.map((item) => (
              <SwiperSlide key={item.title} className="!h-full bg-transparent">
                <h1 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                  {item.title}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-[1.05rem]">
                  {item.description}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div
        role="tablist"
        aria-label={ariaLabel}
        className="mt-8 flex items-center gap-2"
      >
        {slides.map((item, slideIndex) => {
          const active = slideIndex === index;
          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={item.title}
              onClick={() => swiperRef.current?.slideToLoop(slideIndex)}
              className={
                active
                  ? "h-1.5 w-8 bg-white transition-[width,background-color]"
                  : "h-1.5 w-3 bg-white/35 transition-[width,background-color] hover:bg-white/60"
              }
            />
          );
        })}
      </div>
    </>
  );
}
