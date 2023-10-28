'use client';
import { randomNum } from '@/app/utils/random-number';
import { BACKGROUND_URL } from '@/public/data/background';
import React, { useEffect, useRef } from 'react';

const Background = () => {
  const backgrounds = BACKGROUND_URL;
  const randomNumber = useRef<number>(0);

  useEffect(() => {
    randomNumber.current = randomNum(backgrounds.length);
  }, []);

  return (
    <div className='absolute w-full -z-10'>
      <img
        className='w-full h-full'
        src={`./images/backgrounds/${backgrounds[randomNumber.current]}.jpg`}
        alt=''
      />
    </div>
  );
};

export default Background;
