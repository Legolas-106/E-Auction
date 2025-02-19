import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

const AuctionTable = () =>{
    const [tableData,setTableData] = useState(null);
    const [tableKeys,setTableKeys] = useState(null);
    const [currentOption, setCurrentOption] = useState('trending_auction');

    let ongoingAuction = [
        {
            "auctionId": "AUC_ON_1",
            "title": "Industrial Equipment Auction",
            "Start Date": "1 January, 2025",
            "EMD": "500000",
        },
        {
            "auctionId": "AUC_ON_1",
            "title": "Industrial Equipment Auction",
            "Start Date": "1 January, 2025",
            "EMD": "500000",
        },
        {
            "auctionId": "AUC_ON_1",
            "title": "Industrial Equipment Auction",
            "Start Date": "1 January, 2025",
            "EMD": "500000",
        },
        {
            "auctionId": "AUC_ON_1",
            "title": "Industrial Equipment Auction",
            "Start Date": "1 January, 2025",
            "EMD": "500000",
        },
        {
            "auctionId": "AUC_ON_2",
            "title": "Vintage Car Auction",
            "Start Date": "5 January, 2025",
            "EMD": "1000000",
        },
        {
            "auctionId": "AUC_ON_3",
            "title": "Electronics Clearance Sale",
            "Start Date": "10 January, 2025",
            "EMD": "200000",
        },
        {
            "auctionId": "AUC_ON_4",
            "title": "Luxury Watch Collection",
            "Start Date": "15 January, 2025",
            "EMD": "750000",
        },
        {
            "auctionId": "AUC_ON_5",
            "title": "Antique Furniture Auction",
            "Start Date": "20 January, 2025",
            "EMD": "900000",
        },
        {
            "auctionId": "AUC_ON_5",
            "title": "Antique Furniture Auction",
            "Start Date": "20 January, 2025",
            "EMD": "900000",
        },
        {
            "auctionId": "AUC_ON_5",
            "title": "Antique Furniture Auction",
            "Start Date": "20 January, 2025",
            "EMD": "900000",
        },
        {
            "auctionId": "AUC_ON_5",
            "title": "Antique Furniture Auction",
            "Start Date": "20 January, 2025",
            "EMD": "900000",
        },
        {
            "auctionId": "AUC_ON_5",
            "title": "Antique Furniture Auction",
            "Start Date": "20 January, 2025",
            "EMD": "900000",
        },
    ];
    
    let upcomingAuctions = [
        {
            "auctionId": "AUC_UP_1",
            "title": "Real Estate Auction",
            "Publish Date": "5 February, 2025",
            "EMD": "2000000",
        },
        {
            "auctionId": "AUC_UP_2",
            "title": "Jewelry Auction",
            "Publish Date": "10 February, 2025",
            "EMD": "1200000",
        },
        {
            "auctionId": "AUC_UP_3",
            "title": "Rare Coin Collection",
            "Publish Date": "15 February, 2025",
            "EMD": "500000",
        },
        {
            "auctionId": "AUC_UP_4",
            "title": "Art & Paintings Auction",
            "Publish Date": "20 February, 2025",
            "EMD": "3000000",
        },
        {
            "auctionId": "AUC_UP_5",
            "title": "Luxury Yacht Auction",
            "Publish Date": "25 February, 2025",
            "EMD": "8000000",
        },
    ];
    
    let trendingAuction = [
        {
            "auctionId": "AUC_TR_1",
            "title": "Supercar Auction",
            "Start Date": "5 January, 2025",
            "Biggest Bid": "15,000,000",
        },
        {
            "auctionId": "AUC_TR_2",
            "title": "Exclusive Art Pieces",
            "Start Date": "8 January, 2025",
            "Biggest Bid": "25,000,000",
        },
        {
            "auctionId": "AUC_TR_3",
            "title": "Private Island Auction",
            "Start Date": "12 January, 2025",
            "Biggest Bid": "50,000,000",
        },
        {
            "auctionId": "AUC_TR_4",
            "title": "Classic Wine Collection",
            "Start Date": "18 January, 2025",
            "Biggest Bid": "5,000,000",
        },
        {
            "auctionId": "AUC_TR_5",
            "title": "Tech Gadgets & AI Tools",
            "Start Date": "22 January, 2025",
            "Biggest Bid": "1,200,000",
        },
    ];
    
    useEffect(() => {
        console.log("Inside Use Effect of table data");
        console.log(currentOption);
        switch (currentOption) {
            case "ongoing_auction":
                setTableData(ongoingAuction);
                setTableKeys(Object.keys(ongoingAuction[0]));
                break;
            case "upcoming_auction":
                setTableData(upcomingAuctions);
                setTableKeys(Object.keys(upcomingAuctions[0]));
                break;
            default:
                setTableData(trendingAuction);
                setTableKeys(Object.keys(trendingAuction[0]));
        }
        console.log("Keys are : ",tableKeys);
    }, [currentOption]);

    // Handle button selection
    const handleOptionChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setCurrentOption(value); // Update selected button
    };
        

    const Table = () =>{
        return (
            <div className="w-[1360px] absolute flex items-center justify-center h-[596px] bg-black rounded-tl-[20px] rounded-br-[20px]">
                <div className="absolute flex flex-row top-0 left-0 w-[1360px] h-[596px]">
                    <div className="absolute top-[25px] left-[15px] w-[244px] h-[546px] flex flex-col rounded-l-[10px] border-[1px]">
                        {/* Auction Table buttons */}
                        <button 
                            value="trending_auction" 
                            onClick={handleOptionChange} 
                            className={`absolute w-[241px] left-[18px] h-[58px] text-center font-libre transition-all duration-300 ${
                                currentOption === "trending_auction" ? "bg-white text-black rounded-l-[10px]" : "text-[#8F8F8F]"
                            } top-[75px]`}
                        >
                            Trending Auction
                        </button>
                        <button 
                            value="upcoming_auction" 
                            onClick={handleOptionChange} 
                            className={`absolute w-[241px] left-[18px] h-[58px] text-center font-libre transition-all duration-300 ${
                                currentOption === "upcoming_auction" ? "bg-white text-black rounded-l-[10px]" : "text-[#8F8F8F]"
                            } top-[154px]`}
                        >
                            Upcoming Auction
                        </button>
                        <button 
                            value="ongoing_auction" 
                            onClick={handleOptionChange} 
                            className={`absolute w-[241px] left-[18px] h-[58px] text-center font-libre transition-all duration-300 ${
                                currentOption === "ongoing_auction" ? "bg-white text-black rounded-l-[10px]" : "text-[#8F8F8F]"
                            } top-[233px]`}
                        >
                            Ongoing Auction
                        </button>                    
                    </div>

                    <motion.div 
                        key={currentOption} // Forces re-render on option change
                        initial={{ opacity: 0 }} // Fade-in effect
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }} // Smooth transition
                        className="absolute flex flex-col overflow-y-auto w-[1070px] h-[546px] left-[259px] top-[25px] rounded-tr-[10px] rounded-br-[10px] bg-white">

                        {tableData && tableKeys ? (
                            <table className="absolute h-full w-full border-collapse border overflow-y-auto border-gray-300 ">
                                <thead className="pt-[36px]">
                                    <tr className="bg-gray-200  p-3 left-[25px] w-[1004px] h-[73px] border-b-2 border-[#3C3C3C]">
                                        {tableKeys.map((key) => (
                                            <th key={key} className=" px-4 pt-2 text-center font-[300] text-[21px] leading-[21px] tracking-[0%] font-libre" style={{}}>
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </th>
                                        ))}
                                        <th key="view" className="px-4 pt-2 text-center font-[300] text-[21px] leading-[21px] tracking-[0%] font-libre">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index} className="text-center border-b-[1px] border-[#B3B3B3]">
                                            {tableKeys.map((key) => (
                                                <td key={key} className= {`px-4 py-2 ${key==="title"? "font-[600px] text-customOrange":"font-[300px]"} text-[21px] leading-[21px] tracking-[0%] font-libre`}>
                                                    {row[key]}
                                                </td>
                                            ))} 
                                            <td>
                                            <button className="w-[75px] h-[34px] bg-[#0A326D] text-[#FAFAFA] rounded-full text-[21px] font-[300] leading-[100%]">
                                                            View
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            ) : (
                                <p className="text-center text-gray-500">No data available</p>
                            )}
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <section className="w-full h-full flex flex-col items-center justify-between px-6">
            <p className="text-left font-libre text-[42px] w-full flex items-center">
                Auction List
                <span className="ml-2 w-[544px] h-[42px] flex items-center">
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
            </p>
            <div className="relative w-full h-full">
                < Table />
            </div>
        </section>
    );

}

export default AuctionTable;