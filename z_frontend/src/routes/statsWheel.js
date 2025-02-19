import React, { useState } from 'react';
import AuctionFilterAuctionPublishedImage from '../public/icons/auctionFilter/AuctionPublished.svg';
import AuctionFilterPlasticAuctionImage from '../public/icons/auctionFilter/GlassAuction.svg';
import AuctionFilterPaperAuctionImage from '../public/icons/auctionFilter/PaperAuction.svg';
import AuctionFilterEWasteAuctionImage from '../public/icons/auctionFilter/InstagramIcon.svg';
import AuctionFilterGlassAuctionImage from '../public/icons/auctionFilter/GlassAuction.svg';
import AuctionFilterUpcomingAuctionImage from '../public/icons/auctionFilter/UpcomingAuction.svg';
import AuctionFilterCurrentAuctionImage from '../public/icons/auctionFilter/CurrentAuction.svg';
import AuctionFilterClosedAuctionImage from '../public/icons/auctionFilter/ClosedAuction.svg';

const AuctionWheel = () => {
  const [centerNumber, setCenterNumber] = useState(0);
  const [auctionPublished,setAuctionPublished] = useState(null);
  const [auctionUpcoming,setAuctionUpcoming] = useState(null);
  const [auctionEnded,setAuctionEnded] = useState(null);
  const [auctionListed,setAuctionListed] = useState(null);
  
  // Mapping divs to values
  const divValues = [1, 2, 3, 4, 5, 6, 7, 8];
  
  
  const handleStatsWheelElementClick = (value) => {
    setCenterNumber(value);
  };
  const handleDivClickMethod = (e) => {
    console.log(e.target.getAttribute("data-value"));
    return false;
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Tp Div */}
      <div className='w-full flex flex-row'>
        <div id='' className='auction-filter' >
            <div className='grid grid-cols-4 gap-4'>
              <div className="auction-filter-grid-element">
                <div className='flex flex-row'>
                  <div className='w-1/2 auction-filter-image' >
                    {/* SaerchFilter Image Image */}
                    <img src={AuctionFilterAuctionPublishedImage} />
                  </div>
                  <div className='w-1/2 flex flex-col justify-between'>
                    <div className='auction-filter-text'>
                      Auction Published
                    </div>
                    <div className='auction-filter-text'>
                      {auctionPublished || "00"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="auction-filter-grid-element">
                <div className='flex flex-row'>
                  <div className='w-1/2 auction-filter-image' >
                    {/* SaerchFilter Image Image */}
                    <img src={AuctionFilterPlasticAuctionImage} />
                  </div>
                  <div className='w-1/2 flex flex-col justify-between'>
                    <div className='auction-filter-text'>
                    Plastic Auction
                    </div>
                    <div className='auction-filter-text'>
                      {auctionPublished || "00"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="auction-filter-grid-element">
                <div className='flex flex-row'>
                  <div className='w-1/2 auction-filter-image' >
                    {/* SaerchFilter Image Image */}
                    <img src={AuctionFilterPaperAuctionImage} />
                  </div>
                  <div className='w-1/2 flex flex-col justify-between'>
                    <div className='auction-filter-text'>
                      Paper Auction
                    </div>
                    <div className='auction-filter-text'>
                      {auctionPublished || "00"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="auction-filter-grid-element">
                <div className='flex flex-row'>
                  <div className='w-1/2 auction-filter-image' >
                    {/* SaerchFilter Image Image */}
                    <img src={AuctionFilterEWasteAuctionImage} />
                  </div>
                  <div className='w-1/2 flex flex-col justify-between'>
                    <div className='auction-filter-text h-full'>
                      E-Waste Auction
                    </div>
                    <div className='auction-filter-text'>
                      {auctionPublished || "00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='w-full flex mt-4 flex-row'>
        <div id='' className='auction-filter' >
            <div className='grid grid-cols-4 gap-4'>
              <div className="auction-filter-grid-element">
                <div className='flex flex-row'>
                  <div className='w-1/2 auction-filter-image' >
                    {/* SaerchFilter Image Image */}
                    <img src={AuctionFilterAuctionPublishedImage} />
                  </div>
                  <div className='w-1/2 flex flex-col justify-between'>
                    <div className='auction-filter-text'>
                      Auction Published
                    </div>
                    <div className='auction-filter-text'>
                      {auctionPublished || "00"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="auction-filter-grid-element">
                <div className='flex flex-row'>
                  <div className='w-1/2 auction-filter-image' >
                    {/* SaerchFilter Image Image */}
                    <img src={AuctionFilterPlasticAuctionImage} />
                  </div>
                  <div className='w-1/2 flex flex-col justify-between'>
                    <div className='auction-filter-text'>
                    Plastic Auction
                    </div>
                    <div className='auction-filter-text'>
                      {auctionPublished || "00"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="auction-filter-grid-element">
                <div className='flex flex-row'>
                  <div className='w-1/2 auction-filter-image' >
                    {/* SaerchFilter Image Image */}
                    <img src={AuctionFilterPaperAuctionImage} />
                  </div>
                  <div className='w-1/2 flex flex-col justify-between'>
                    <div className='auction-filter-text'>
                      Paper Auction
                    </div>
                    <div className='auction-filter-text'>
                      {auctionPublished || "00"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="auction-filter-grid-element">
                <div className='flex flex-row'>
                  <div className='w-1/2 auction-filter-image' >
                    {/* SaerchFilter Image Image */}
                    <img src={AuctionFilterEWasteAuctionImage} />
                  </div>
                  <div className='w-1/2 flex flex-col justify-between'>
                    <div className='auction-filter-text h-full'>
                      E-Waste Auction
                    </div>
                    <div className='auction-filter-text'>
                      {auctionPublished || "00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
  </div>
  );
};

export default AuctionWheel;
