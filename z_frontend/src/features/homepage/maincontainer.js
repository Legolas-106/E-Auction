import React from 'react';
import MainPageImage from '../../public/images/MainBackgroundImage.jpeg'

const MainContainerDramatic = ({ children }) => {
  return (
    <main 
      className="flex-grow mx-auto pb-4 bg-cover bg-center bg-no-repeat min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/MainBackgroundImage.jpeg')`, // Replace with your actual image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
};

export default MainContainerDramatic;
