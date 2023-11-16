import React, { useState, useEffect } from "react";
import {FaArrowLeft,FaArrowRight} from "react-icons/fa"
const images = [
  "/landing_page/landing_page1.jpg",
  "/landing_page/landing_page2.jpg",
  "/landing_page/landing_page.jpg",
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide]);

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className="relative w-full h-full flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              style={{ display: index === currentSlide ? "block" : "none" }}
            />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-md cursor-pointer hover:bg-gray-600">
        <FaArrowLeft size={24}/>
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-md cursor-pointer hover:bg-gray-600">
        <FaArrowRight size={24}/>
      </button>
    </div>
  );
};

export default Slider;