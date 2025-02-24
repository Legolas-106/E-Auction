import React,{useEffect, useState} from "react";
import { ChevronDown,ChevronUp, Eye } from "lucide-react";
import LotDetailCard from "../vendor/itemDetailsCard";
import { useAuth } from "../../services/auth/useAuthHook";
import { VendorService } from "../../services/vendor/vendorService";
import { constructNow } from "date-fns";
import { useAuctions } from "../../services/auction/auctionHook/useAuctionHook";

const ItemDetailsPage = () => {
    const [expandedItems, setExpandedItems] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemFetched,setItemFetched] = useState(false);
    const {listed,upcoming,unlisted} = useAuctions();
    console.log("Listed from context is ",listed, " unlisted form context is : ",unlisted, "\n upcmoings auction are", upcoming);
    // Sample data structure
    let listedLots = [
      {
        auctionNo: "A123",
        itemNo: "I456",
        companyName : "Raisen Jiaa",
        itemDetails: "Antique Furniture Collection",
        publishDate: "2025-01-15",
        auctionType: "Regular",
        auctionDescription: "A rare collection of Victorian era furniture pieces",
        auctionLotType: "multiple",
        auctionLotDetails: [
          {
            auctionLotNumber: "L1",
            productCategory: "Antique Furniture",
            lotWeight: "25kg",
            lotDescription: "Hand-carved Victorian chair circa 1850, featuring original upholstery",
            lotDetail: "Victorian style mahogany chair",
            lotAddress: "123 Antique Lane",
            lotCity: "Manchester",
            lotState: "Greater Manchester",
            lotPostalCode: "M1 1AA",
            lotSellerContactNumber: "+44 20 7123 4567",
            lotEMD: "200",
            lotAuctionAmount: "500",
            lotAuctionStartDate: "2025-02-01",
            lotAuctionEndDate: "2025-02-15",
            condition: "Good",
            dimensions: "96x45x45 cm",
            material: "Mahogany",
            images: [
              "/api/placeholder/400/300",
              "/api/placeholder/400/300"
            ]
          },
          {
            auctionLotNumber: "L2",
            productCategory: "Antique Furniture",
            lotWeight: "45kg",
            lotDescription: "Mahogany dining table with extendable leaves, excellent craftsmanship",
            lotDetail: "Antique dining table",
            lotAddress: "123 Antique Lane",
            lotCity: "Manchester",
            lotState: "Greater Manchester",
            lotPostalCode: "M1 1AA",
            lotSellerContactNumber: "+44 20 7123 4567",
            lotEMD: "300",
            lotAuctionAmount: "800",
            lotAuctionStartDate: "2025-02-01",
            lotAuctionEndDate: "2025-02-15",
            condition: "Excellent",
            dimensions: "180x90x75 cm",
            material: "Mahogany",
            images: [
              "/api/placeholder/400/300",
              "/api/placeholder/400/300"
            ]
          }
        ]
      },
      {
        auctionNo: "A124",
        itemNo: "I457",
        itemDetails: "Modern Art Collection",
        publishDate: "2025-01-20",
        auctionType: "Premium",
        auctionDescription: "Contemporary art pieces from renowned artists",
        auctionLotType: "multiple",
        auctionLotDetails: [
          {
            auctionLotNumber: "L3",
            productCategory: "Contemporary Art",
            lotWeight: "5kg",
            lotDescription: "Original abstract acrylic painting on canvas by renowned artist",
            lotDetail: "Abstract Painting - 'Urban Dreams'",
            lotAddress: "456 Gallery Street",
            lotCity: "London",
            lotState: "Greater London",
            lotPostalCode: "W1A 1AA",
            lotSellerContactNumber: "+44 20 7890 1234",
            lotEMD: "500",
            lotAuctionAmount: "1200",
            lotAuctionStartDate: "2025-02-10",
            lotAuctionEndDate: "2025-02-25",
            condition: "New",
            dimensions: "100x80 cm",
            material: "Acrylic on canvas",
            images: [
              "/api/placeholder/400/300",
              "/api/placeholder/400/300"
            ]
          }
        ]
      }
    ];
    let upcomingAuctionItems = [];
    let ongoingAuctionItems = [];
    let endedAuctionItems = [];
    let unlistedLots = [
      {
        itemNo: "I789",
        itemDetails: "Vintage Watch Collection",
        auctionDescription: "Rare collection of vintage timepieces",
        auctionLotType: "single",
        auctionLotDetails: [
          {
            auctionLotNumber: "L4",
            productCategory: "Vintage Watches",
            lotWeight: "0.5kg",
            lotDescription: "1960s Omega Speedmaster in original condition",
            lotDetail: "Vintage Omega Speedmaster",
            lotAddress: "789 Watch Street",
            lotCity: "Birmingham",
            lotState: "West Midlands",
            lotPostalCode: "B1 1AA",
            lotSellerContactNumber: "+44 20 7345 6789",
            lotEMD: "1000",
            lotAuctionAmount: "3000",
            lotAuctionStartDate: "",
            lotAuctionEndDate: "",
            condition: "Good",
            dimensions: "42mm",
            material: "Stainless Steel",
            images: [
              "/api/placeholder/400/300",
              "/api/placeholder/400/300"
            ]
          }
        ]
      },
      {
        itemNo: "I790",
        itemDetails: "Classic Car Collection",
        auctionDescription: "Vintage and classic automobiles",
        auctionLotType: "single",
        auctionLotDetails: [
          {
            auctionLotNumber: "L5",
            productCategory: "Classic Cars",
            lotWeight: "1200kg",
            lotDescription: "1965 Ford Mustang, original paint, restored engine",
            lotDetail: "1965 Ford Mustang",
            lotAddress: "101 Classic Car Avenue",
            lotCity: "Leeds",
            lotState: "West Yorkshire",
            lotPostalCode: "LS1 1AA",
            lotSellerContactNumber: "+44 20 7567 8901",
            lotEMD: "5000",
            lotAuctionAmount: "25000",
            lotAuctionStartDate: "",
            lotAuctionEndDate: "",
            condition: "Restored",
            dimensions: "4.7m x 1.8m x 1.3m",
            material: "Steel",
            images: [
              "/api/placeholder/400/300",
              "/api/placeholder/400/300"
            ]
          }
        ]
      }
    ];

    const loadTableDate = () =>{
      console.log("Filling up the table data");
      console.log(listedLots);
      console.log(unlistedLots);
      console.log(upcomingAuctionItems);
      console.log(ongoingAuctionItems);
      console.log(endedAuctionItems);

    }

    //Using useEffect with no dependecy array
    const {getCurrUserInfo} = useAuth();
    useEffect(()=>{
      const fetchData = async () =>{
        console.log("Fetching initial Data");
        const userInfo = getCurrUserInfo();
        // if(userInfo && userInfo.username){
        //   console.log(userInfo.username,userInfo.id);
        //   try{
        //     const response = await VendorService.getAllItems(userInfo.id);
        //     console.log("Response is received ",response);
        //     console.log(response.errorCode,response.message);

        //     const formatedResponse = " '" + response + "' ";
        //     // console.log(formatedResponse);
        //     // const resObj = JSON.parse(formatedResponse);
            
            
        //     // console.log(typeof(resObj),resObj.upcomingAuction);
            
        //     if(response.listedAuction && response.listedAuction!=null){
        //       listedLots = response.listedAuction;
        //       console.log(listedLots);
        //     }
        //     if(response.upcomingAuction && response.upcomingAuction!=null){
        //       upcomingAuctionItems = response.upcomingAuction;
        //       console.log(upcomingAuctionItems);

        //     }
        //     if(response.ongoingAuction && response.ongoingAuction!=null){
        //       ongoingAuctionItems = response.ongoingAuction;
        //       console.log(ongoingAuctionItems);

        //     }
        //     if(response.endAuction && response.endAuction !=null){
        //       endedAuctionItems = response.endAuction;
        //       console.log(endedAuctionItems);

        //     }
        //     if(response.itemDetails && response.itemDetails != null){
        //       unlistedLots = response.itemDetails;
        //       console.log(unlistedLots);
        //     }
        //     setItemFetched(true);
        //   }catch(err){
        //     console.log("Erro while sending request to backend ",err);
        //   }
        // }
        // else{
        //   console.log("No userInfo is present");
        // }
      }

      // fetchData();
      // const tableData = await VendorService
      // loadTableDate();
    },[getCurrUserInfo]);
    const LotsTable = ({ item, showSeeDetail }) => (
      <div className="w-full mt-1">
        <div className="grid grid-cols-5 gap-4 p-1 bg-gray-100 rounded-t-lg text-sm font-semibold">
          <div>Lot Number</div>
          <div>Product Category</div>
          <div>Lot Detail</div>
          <div>EMD</div>
          <div>Auction Amount</div>
        </div>
        {item.lots.map((lot, index) => ( 
          <div key={index} className="grid grid-cols-5 p-2 gap-4 border-b">
            <div>{lot.lotNumber}</div>
            <div>{lot.productCategory}</div>
            <div>{lot.lotDescription}</div>
            <div>{lot.emd}</div>
            <div>{lot.auctionAmount}</div>
          </div>
        ))}
        <div className="w-full flex flex-row justify-end" id="div-button-group">
          <button className="p-1 m-1 rounded-lg bg-yellow-700" onClick={()=>{setSelectedItem(item)}}>
            View Details
          </button>
          <button className="p-1 m-1 bg-blue-700 rounded-lg">
            Edit Details
          </button>
          <button className="p-1 m-1 rounded-lg bg-red-600">
            Delete Item
          </button>
        </div>
      </div>
    );
  
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
                <div>{item.auctionNo}</div>
                <div>{item.itemDetails}</div>
                <div>{item.publishDate}</div>
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
  //   <button
  //   onClick={() => setSelectedLot(lot)}
  //   className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:text-blue-800"
  // >
  //   <Eye size={16} />
  //   See Details
  // </button>
    const UnlistedLotCard = ({ item, index }) => (
      <div className="w-full mb-4">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
          <div 
            className="p-2 cursor-pointer"
            onClick={() => setExpandedItems(prev => ({...prev, [`unlisted-${index}`]: !prev[`unlisted-${index}`]}))}
          >
            <div className="flex justify-between items-center">
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="font-semibold">{index + 1}</div>
                <div>{item.auctionTitle}</div>
                <div className="flex justify-center items-center w-full">
                  <div className="flex w-5/6 items-center justify-center">
                    {item.auctionDescription}
                  </div>
                  <div className="flex justify-end w-1/6">
                    {expandedItems[`unlisted-${index}`] ? 
                      <ChevronUp className="ml-2" /> : 
                      <ChevronDown className="ml-2" />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {expandedItems[`unlisted-${index}`] && (
            <div className="p-4 border-t border-gray-200">
              <LotsTable item={item} showSeeDetail={true} />
            </div>
          )}
        </div>
      </div>
    );
    console.log("Unlisted Lots are : ",unlistedLots, " Upcoming Auction ites : ",upcomingAuctionItems);
    return (
      <div className="w-full h-full flex flex-col items-center bg-white" id="div-id-lot-details">
        <div className="flex flex-col w-3/4 h-full">
          <h1 className="m-2 p-2 text-lg font-bold">Item Details</h1>
          
          <div id="div-id-listed-lots" className="flex flex-col w-full h-full items-start rounded-lg border border-gray-500 m-2 p-3">
            <h3 className="text-md font-semibold mb-4">Auction Items</h3>
            <div className="w-full flex flex-col h-full p-2 items-start rounded-sm border border-gray-300">
              <h4 className="text-left text-base">Ongoing Auctions</h4>
              {ongoingAuctionItems.length !== 0 ? (
                <>
                  <div className="w-full grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 rounded-t-lg font-semibold">
                    <div>Sr.No</div>
                    <div>Auction No</div>
                    <div>Item Details</div>
                    <div>Publish Date</div>
                    <div>Auction Type</div>
                  </div>
                  {ongoingAuctionItems.map((item, index) => (
                    <ListedLotCard key={index} item={item} index={index} />
                  ))}
                </>
              ) : (
                <p className="text-center w-full font-bauhaus">No Data Available</p>
              )}
            </div>
            <div className="w-full flex flex-col h-full p-2 items-start rounded-sm border border-gray-300">
              <h4 className="text-left text-base">Upcoming Auctions</h4>
              {upcomingAuctionItems.length !== 0 ? (
                <>
                  <div className="w-full grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 rounded-t-lg font-semibold">
                    <div>Sr.No</div>
                    <div>Auction No</div>
                    <div>Item Details</div>
                    <div>Publish Date</div>
                    <div>Auction Type</div>
                  </div>
                  {upcomingAuctionItems.map((item, index) => (
                    <ListedLotCard key={index} item={item} index={index} />
                  ))}
                </>
              ) : (
                <p className="text-center w-full font-bauhaus">No Data Available</p>
              )}
            </div>
            
            <div className="w-full flex flex-col h-full p-2 items-start rounded-sm border border-gray-300">
              <h4 className="text-left text-base">Past Auctions</h4>
              {endedAuctionItems.length !== 0 ? (
                <>
                  <div className="w-full grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 rounded-t-lg font-semibold">
                    <div>Sr.No</div>
                    <div>Auction No</div>
                    <div>Item Details</div>
                    <div>Publish Date</div>
                    <div>Auction Type</div>
                  </div>
                  {endedAuctionItems.map((item, index) => (
                    <ListedLotCard key={index} item={item} index={index} />
                  ))}
                </>
              ) : (
                <p className="text-center w-full font-bauhaus">No Data Available</p>
              )}
            </div>
          </div>
  
          <div className="flex flex-col w-full h-full items-start border rounded-lg border-gray-500 m-2 p-2" id="div-unlisted-lots">
            <h3 className="text-md font-semibold mb-4">Unlisted items</h3>
            <div className="w-full grid grid-cols-3 gap-4 px-4 py-2 bg-gray-100 rounded-t-lg font-semibold">
              <div>Sr.No</div>
              <div>Auction Title</div>
              <div>Item Description</div>
            </div>
            {unlisted.map((item, index) => (
              <UnlistedLotCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
  
        {selectedItem && <LotDetailCard item={selectedItem} setSelectedItem={setSelectedItem} />}
      </div>
    );
  };

export default ItemDetailsPage;