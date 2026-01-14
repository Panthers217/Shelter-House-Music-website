import React, { useState, useEffect, useRef } from "react";


// FadeCarouselImages: handles fade animation and image rendering
export const FadeCarouselImages = ({ images, current, ImageDivName, isVisible=true }) => {
  
  const fadeBase = `${isVisible ? "block" : "hidden"} transition-opacity duration-700 ease-in-out ${ImageDivName}`;
  return (
    <>
      {images.map((img, idx) => (
        <img  
          key={idx}
          src={img}
          alt={img}
          className={`flex sm:w-full md:w-full md:h-[489px] xl:h-[482px] xl:w-[482px] ` +
            fadeBase +
            (idx === current
              ? " opacity-100 z-10"
              : " opacity-0 z-0 pointer-events-none")
          }
          style={{ objectFit: "cover", borderRadius: "inherit" }}
        />
      ))}
    </>
  );
};

// FadeCarouselIndicator: handles page indicator and click
export const FadeCarouselIndicator = ({ images, current, goTo, isVisible=true, indicatorDivName }) => (
  <div className={`${isVisible ? "block" : "hidden"} flex absolute w-[80.10px] h-[15.89px] bottom-[10%] minMobile:bottom-[6%] left-1/2 -translate-x-1/2 justify-center gap-[16px] z-20 `}>
    {images.map((_, idx) => (
      <div
        key={idx}
        onClick={() => goTo(idx)}
        className={
          "size-[15.89px] rounded-full cursor-pointer transition-all " +
          (idx === current
            ? "bg-[#aa2a46] scale-110 shadow"
            : "bg-[#fffced]/30")
        }
        style={{ display: "inline-block" }}
      />
    ))}
  </div>
);

// Main FadeCarousel: manages state and composes the above
const FadeCarousel = ({ images, interval = 3500, ImageDivName, indicatorDivName, imageVisibility, indicatorVisibility }) => {
  const ImageDivClass = ImageDivName;
  const indicatorDivClass = indicatorDivName;
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [current, images.length, interval]);

  const goTo = (idx) => {
    setCurrent(idx);
    clearTimeout(timeoutRef.current);
  };

  return (
    <div className="relative w-full h-full lg:ml-[-15%] lg:w-[350px] lg:h-[350px] rounded-[1.4vw]">
      <FadeCarouselImages images={images} current={current} ImageDivName={ImageDivClass} isVisible={imageVisibility}  />
      <FadeCarouselIndicator images={images} current={current} goTo={goTo} isVisible={indicatorVisibility} indicatorDivName={indicatorDivClass} />
    </div>
  );
};

export default FadeCarousel;
