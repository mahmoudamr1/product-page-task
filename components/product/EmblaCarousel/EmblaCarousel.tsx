//components\product\EmblaCarousel\EmblaCarousel.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import Image from "next/image";
import "./EmblaCarousel.css";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbsApi.scrollTo(index);
  }, [emblaMainApi, emblaThumbsApi]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex gap-3 lg:gap-5 col-span-1 max-w-full">
      <div className="embla flex flex-col">
        <div className="flex gap-4 lg:gap-5">
          <div
            className="embla__viewport overflow-hidden rounded-lg flex flex-col"
            ref={emblaMainRef}
          >
            <div className="embla__container flex">
              {slides.map((src, index) => (
                <div className="embla__slide min-w-0 px-1" key={index}>
                  <Image
                    fill
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg !relative"
                  />
                </div>
              ))}
            </div>
            <div className="embla-thumbs">
              <div
                className="embla-thumbs__viewport overflow-hidden"
                ref={emblaThumbsRef}
              >
                <div className="embla-thumbs__container flex gap-2">
                  {slides.map((src, index) => (
                    <Thumb
                      key={index}
                      imgSrc={src}
                      onClick={() => onThumbClick(index)}
                      selected={index === selectedIndex}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3 lg:gap-4 items-center">
              <div className="small-img-container p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M15 5.86243C15.6454 5.99624 16.1323 6.21958 16.5237 6.59233C17.5 7.52227 17.5 9.01901 17.5 12.0124C17.5 15.0058 17.5 16.5025 16.5237 17.4325C15.5474 18.3624 13.976 18.3624 10.8333 18.3624H9.16667C6.02397 18.3624 4.45262 18.3624 3.47631 17.4325C2.5 16.5025 2.5 15.0058 2.5 12.0124C2.5 9.01901 2.5 7.52227 3.47631 6.59233C3.86765 6.21958 4.35458 5.99624 5 5.86243"
                    stroke="#141414"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.0211 1.69612L10 11.6957M10.0211 1.69612C9.88558 1.69051 9.74925 1.73894 9.62775 1.84145C8.87242 2.47907 7.5 4.1364 7.5 4.1364M10.0211 1.69612C10.1426 1.70116 10.2635 1.74965 10.3723 1.84158C11.1276 2.47932 12.5 4.1364 12.5 4.1364"
                    stroke="#141414"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="small-img-container p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M16.2187 3.35751C13.9839 1.98675 12.0335 2.53915 10.8618 3.41906C10.3813 3.77985 10.1412 3.96025 9.99984 3.96025C9.8585 3.96025 9.61834 3.77985 9.13784 3.41906C7.96619 2.53915 6.01574 1.98675 3.78104 3.35751C0.848228 5.1565 0.184604 11.0915 6.94944 16.0986C8.23794 17.0522 8.88217 17.5291 9.99984 17.5291C11.1175 17.5291 11.7618 17.0522 13.0503 16.0986C19.8151 11.0915 19.1514 5.1565 16.2187 3.35751Z"
                    stroke="#141414"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:gap-4 items-center">
              <div
                className="small-img-container p-2 cursor-pointer"
                onClick={scrollPrev}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M12 5.02905C12 5.02905 7.00001 8.71147 7 10.0291C6.99999 11.3467 12 15.0291 12 15.0291"
                    stroke="#141414"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="small-img-container p-2 cursor-pointer"
                onClick={scrollNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M8 5.02905C8 5.02905 13 8.71147 13 10.0291C13 11.3467 8 15.0291 8 15.0291"
                    stroke="#141414"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
