import React, { useState } from "react";
import { ChevronDown,ChevronUp } from "lucide-react";

const UpcomingAuctionItemsDetails = ({data}) =>{
    const [showItemDetails,setShowItemDetails] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});

    const ListedLotCard = ({ item, index }) => (
        <div className="w-full mb-4">
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
            <div 
              className="p-2 cursor-pointer"
              onClick={() => setExpandedItems(prev => ({...prev, [`listed-${index}`]: !prev[`listed-${index}`]}))}
            >
              <div className="flex justify-between items-center">
                <div className="grid grid-cols-5 gap-4 w-full">
                  <div className="font-semibold">{index + 1}</div>
                  <div>`AUC_{item.auctionNo}`</div>
                  <div>{item.auctionDescription}</div>
                  <div>{item.auctionPublishDate}</div>
                  <div className="flex justify-center items-center">
                    {item.auctionType}
                    {expandedItems[`listed-${index}`] ? 
                      <ChevronUp className="ml-4" /> : 
                      <ChevronDown className="ml-4" />
                    }
                  </div>
                </div>
              </div>
            </div>
            
            {expandedItems[`listed-${index}`] && (
              <div className="pt-2 border-t border-gray-200">
                <LotsTable item={item} showSeeDetail={true} />
              </div>
            )}
          </div>
        </div>
      );

    return (
        <div className="w-full flex flex-col h-full p-2 items-start rounded-sm border border-gray-300">
        <h4 className="text-left text-lg">Upcoming Auctions</h4>
        <div className="w-full grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 rounded-t-lg font-semibold">
          <div>Sr.No</div>
          <div>Auction No</div>
          <div>Auction Details</div>
          <div>Publish Date</div>
          <div>Auction Type</div>
        </div>
        {data.map((item, index) => (
          <ListedLotCard key={index} item={item} index={index} />
        ))}
      </div>
    );
}

export default UpcomingAuctionItemsDetails;