import React, { useState } from 'react';

const Card = ({ number, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div 
        className="relative w-[264px] h-[364px] bg-black rounded-[2px] transition-all duration-300 ease-in-out overflow-hidden"
        style={{ width: isHovered ? '552px' : '264px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Initial content with fixed height */}
        <div className={`absolute inset-0 p-[30px] ${isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div className="h-full flex flex-col">
            <h4 className="font-libre font-light text-[32px] leading-[32px] text-white text-left">
              {title}
            </h4>
            <div className="mt-auto">
              <span className="flex justify-center items-center w-1/2 -rotate-90 font-libre font-bold text-[94px] leading-[94px] text-[#FE7008]">
                {String(number).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
  
        {/* Hover content with fixed positioning */}
        <div className={`absolute inset-0 p-[30px] ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div className="h-full flex flex-col justify-between">
            <h4 
              className="font-libre font-light text-[32px] leading-[32px] text-white text-left"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: `translateX(${isHovered ? '0' : '50px'})`,
                transition: 'opacity 500ms ease-out, transform 500ms ease-out'
              }}
            >
              {title}
            </h4>
            
            <p 
              className="font-libre font-thin text-[32px] leading-[32px] text-customOrange text-left"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: `translateX(${isHovered ? '0' : '50px'})`,
                transition: 'opacity 500ms ease-out 200ms, transform 500ms ease-out 200ms'
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };
const WhyAuctionHaiPage = () => {
  const cards = [
    { number: 1, title: 'Competitive Bidding', description: 'Transparent bidding fosters healthy competition, ensuring you get the optimal value for your scrap' },
    { number: 2, title: 'Wide Market Reach', description: 'Our extensive buyer network increases exposure, helping you secure the most competitive offers' },
    { number: 3, title: 'Eco-friendly Solutions', description: 'Our platform encourages recycling and waste reduction, supporting a sustainable future' },
    { number: 4, title: 'Efficient Process', description: 'A streamlined system makes it quick and hassle-free to list and sell your scrap materials' },
    { number: 5, title: 'Trusted Community', description: 'A network of verified buyers and sellers ensures secure, reliable transactions every time' },
    { number: 6, title: 'Goverment Partnership', description: 'Transparent bidding fosters healthy competition, ensuring you get the optimal value for your scrap' }
  ];

  return (
    <section className="flex w-full flex-col justify-center gap-[10px] p-6">
        <h2 className='text-left font-libre text-[42px] flex items-center'>
            Why AuctionHai
            <span className="ml-2 w-[544px] h-[2px] flex items-center">
                <svg
                width="544"
                height="10"
                viewBox="0 0 544 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M0 5H534M534 5L524 0M534 5L524 10" stroke="black" strokeWidth="2" />
                </svg>
            </span>
        </h2>
        <div className="flex justify-between w-full max-w-[1500px] gap-[10px]">
            {cards.map((card) => (
            <Card
                key={card.number}
                number={card.number}
                title={card.title}
                description={card.description}
            />
            ))}
        </div>
    </section>
  );
};

export default WhyAuctionHaiPage;