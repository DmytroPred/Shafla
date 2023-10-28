import React from 'react';

const BackgroundVid = () => {
  return (
    <div className='absolute w-full -z-10'>
      <video
        className='w-full h-full'
        autoPlay={true}
        loop={true}
        preload='auto'
        playsInline={true}
        muted
      >
        <source
          type='video/webm'
          src='https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_webm.webm'
        />
        <source
          type='video/mp4'
          src='https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4'
        />
      </video>
    </div>
  );
};

export default BackgroundVid;
