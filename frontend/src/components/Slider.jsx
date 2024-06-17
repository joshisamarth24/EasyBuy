import React, { useState } from 'react';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { sliderItems } from '../data';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="w-full h-55vh flex relative overflow-hidden hidden md:flex">
      <div
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 left-2 cursor-pointer opacity-50 z-10"
        onClick={() => handleClick('left')}
      >
        <ArrowLeftOutlinedIcon />
      </div>
      <div
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer opacity-50 z-10"
        onClick={() => handleClick('right')}
      >
        <ArrowRightOutlinedIcon />
      </div>
      <div
        className="h-full flex transition-transform duration-1500 ease-in-out"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div
            key={item.id}
            className="w-screen h-55vh flex items-center"
          >
            <div className="h-full flex-1">
              <img
                src={item.img}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
