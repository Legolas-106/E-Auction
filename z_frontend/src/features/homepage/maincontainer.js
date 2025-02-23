import React from 'react';
import MainPageImage from '../../public/images/MainBackgroundImage.jpeg'

const generateBlobs = (count) => {
  return Array.from({ length: count }).map((_, index) => ({
    width: Math.random() * 400 + 200, // Random size between 200px - 600px
    height: Math.random() * 300 + 150, // Random height between 150px - 450px
    left: `${Math.random() * 100}%`, // Randomly positioned across the width
    top: `${Math.random() * 3000}px`, // Randomly positioned within the large scrollable area
    rotate: Math.random() * 360, // Rotate randomly
    opacity: Math.random() * 0.5 + 0.3, // Opacity between 0.3 - 0.8
  }));
};

const blobs = generateBlobs(15); // Create 15 scattered blobs

const MainContainerDramatic = ({ children }) => {
  return (
    <main className="flex-grow mx-auto pb-4 min-h-screen relative overflow-hidden">
      {/* Decorative blobs */}
      {blobs.map((blob, index) => (
        <div
          key={index}
          className="absolute border border-red-800 text-red-900 rounded-full"
          style={{
            width: `${blob.width}px`,
            height: `${blob.height}px`,
            left: blob.left,
            top: blob.top,
            transform: `rotate(${blob.rotate}deg)`,
            opacity: blob.opacity,
            transition: 'all 0.3s ease-in-out',
            zIndex: 1,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
};

export default MainContainerDramatic;
