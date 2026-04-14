/* eslint-disable @next/next/no-img-element */

import heroSlideOne from "@/1.jpg";
import heroSlideTwo from "@/2.png";
import heroSlideThree from "@/3.jpg";

const slides = [heroSlideOne.src, heroSlideTwo.src, heroSlideThree.src];

export function HeroBackgroundCarousel() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0 overflow-hidden sm:left-[8%] lg:left-[18%]"
    >
      {slides.map((slide, index) => (
        <div
          key={slide}
          className="hero-carousel-slide absolute inset-0"
          style={{ animationDelay: `${index * -8}s` }}
        >
          <img
            src={slide}
            alt=""
            fetchPriority={index === 0 ? "high" : undefined}
            className="h-full w-full object-cover object-center brightness-[0.98] saturate-[0.95]"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,242,232,0.74)_0%,rgba(247,242,232,0.28)_34%,rgba(247,242,232,0.18)_60%,rgba(247,242,232,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,248,241,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(130,157,127,0.08),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(247,242,232,0.12),transparent_34%)]" />
    </div>
  );
}
