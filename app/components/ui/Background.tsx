import { randomNum } from '@/app/utils/random-number';
import { BACKGROUND_URL } from '@/public/data/background';
import React, { useRef } from 'react';

const Background = () => {
  const backgrounds = BACKGROUND_URL;
  const randomNumber = useRef<number>(randomNum(backgrounds.length));
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
