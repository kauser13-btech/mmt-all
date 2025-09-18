"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImageCarouselClient({ images = [], imageAlt }) {
    const [currentSlider, setCurrentSlider] = useState(0);

    const handlePrev = () => {
        setCurrentSlider((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentSlider((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className="w-full 2xl:min-h-[768px] flex flex-col-reverse 2xl:flex-row max-sm:items-center overflow-hidden gap-5 lg:gap-10">
            {/* Thumbnail list */}
            <div className="select-none flex flex-row 2xl:min-h-[768px] 2xl:flex-col justify-center items-center gap-5 max-w-full 2xl:min-w-[131px]">
                {/* Prev */}
                <button onClick={handlePrev} className="rounded-full size-6 flex items-center justify-center hover:bg-gray-200">
                    <ChevronLeft />
                </button>

                <div className="flex gap-2 2xl:flex-col overflow-auto max-w-[180px] sm:max-w-[400px] max-h-[743px] hideScroll">
                    {images.map((product, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentSlider(index)}
                            className={`${index === currentSlider ? "border rounded-lg border-[#ff5e01] " : ""
                                } flex items-center justify-center cursor-pointer 
              min-w-[46px] min-h-[46px] sm:min-w-[68px] sm:min-h-[68px] md:min-w-[70px] md:min-h-[70px] 2xl:min-w-[131px] 2xl:min-h-[131px] p-1`}
                        >
                            <Image
                                src={product.url}
                                alt={
                                    imageAlt
                                        ? index % 2 === 0
                                            ? `${imageAlt} for Men`
                                            : `${imageAlt} for Women`
                                        : "Tees to Match with Jordans, Adidas, Nike | MatchMyTees"
                                }
                                width={120}
                                height={120}
                                className="object-cover max-w-full max-h-full"
                            />
                        </div>
                    ))}
                </div>

                {/* Next */}
                <button onClick={handleNext} className="rounded-full size-6 flex items-center justify-center hover:bg-gray-200">
                    <ChevronRight />
                </button>
            </div>

            {/* Main slider */}
            <div className="w-full max-w-7xl flex overflow-hidden">
                <div className="relative overflow-hidden w-full">
                    <div
                        className="ease-linear duration-500 flex transform-gpu relative"
                        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
                    >
                        {images.length > 0 ? (
                            images.map((slide, inx) => (
                                <div key={inx} className="min-w-full flex justify-center">
                                    <Image
                                        src={slide.url}
                                        alt={imageAlt ?? "Tees to Match with Jordans, Adidas, Nike | MatchMyTees"}
                                        width={800}
                                        height={800}
                                        className="object-contain w-full h-[276px] sm:h-[500px] md:h-[328px] lg:h-[497px] xl:h-[682px] 2xl:h-[731px]"
                                    />
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
