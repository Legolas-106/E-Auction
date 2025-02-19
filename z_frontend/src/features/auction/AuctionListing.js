import React, {useState, useRef, useEffect} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Eye, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { TextField, Select, MenuItem, Button, Grid, Typography, InputLabel, FormControl } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { BsCalendar, BsBuilding } from 'react-icons/bs';
import { MdCategory, MdLocalOffer } from 'react-icons/md';
import AuctionForm from "../../pages/auction/AuctionSearchForm";

const AuctionListing = () =>{
    const categories = ["Electronics", "Furniture", "Vehicles", "Real Estate"];
    const auctionTypes = ["Forward", "Reverse", "Dutch"];
    const lotTypes = ["Single", "Multiple", "Bundle"];
    const statuses = ["Active", "Closed", "Upcoming", "Draft"];
    const [totalAuction,setTotalAuction] = useState(null);
    const [listedAuction,setListedAuction] = useState([]);
    const [upcomingAuction,setUpcomingAuction] = useState([]);
    const [ongoingAuction,setOngoingAuction] = useState([]);
    const [endedAuction,setEndedAuction] = useState([]);
    const [tableData,setTableData] = useState([]);
    const navigate = useNavigate();
    const ref = useRef();
    const location = useLocation();
    const isAuctionDetailsPage = location.pathname.endsWith('auctionDetails');
    
    // Sample data - Here data need to be loaded using a sql entity, which queries database according to user.
    // let listedAuction = [];
    // let upcomingAuction = [];
    // let ongoingAuction = [];
    // let endedAuction = [];

    // Table Constants

    const formRef = useRef();
    console.log("Current Path is : ",location.pathname);
    const setTheFormData = () =>{
        console.log("Setting the form data");

        let currentPath = location.pathname;
        console.log("Current Path : ",currentPath);
        // currentPath = currentPath.split("/").filter(part=>part);
        if(currentPath == '/searchAuction/metals'){
            console.log("got the metal path");
        }
        else if(currentPath == '/searchAuction'){
            console.log("got the pathname");
        }

    }

    const renderTableData = (data) => {
        console.log("The data received is ",data);
        setTotalAuction(data.totalAuctions);
        const auctions = data.auctionDetails.reduce((acc,item)=>{
            if(!acc[item.auctionStatus]){
                acc[item.auctionStatus] = [];
            }
            acc[item.auctionStatus].push(item);
            return acc;
        },[]);

        setTableData(data.auctionDetails);
        setFilteredData(data.auctionDetails);
        console.log("Setting up the tableData ",filteredData);
        console.log("Auctions are : ",auctions.upcoming);
        if(auctions?.upcoming){
            setUpcomingAuction(auctions.upcoming);
        }
        if(auctions?.ongoing){
            setOngoingAuction(auctions.ongoing);
        }
        if(auctions?.listed){
            setListedAuction(auctions.listed);
        }
        if(auctions?.ended){
            setEndedAuction(auctions.ended);
        }

    }

    useEffect(()=>{
        console.log("Setting up forms value")
        setTheFormData();
    }); 
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(tableData);

  
    // Handle search across all fields
    const handleSearch = (value) => {
      setSearchTerm(value);
      const filtered = tableData.filter(auction => {
        const searchStr = value.toLowerCase();
        return (
          auction.auctionId.toString().toLowerCase().includes(searchStr) ||
          auction.title.toLowerCase().includes(searchStr) ||
          auction.publishDate.toLowerCase().includes(searchStr) ||
          auction.submissionStartDate.toLowerCase().includes(searchStr) ||
          auction.auctionType.toLowerCase().includes(searchStr) ||
          auction.auctionDescription.toLowerCase().includes(searchStr) ||
          auction.auctionEndDate.toLowerCase().includes(searchStr) ||
          auction.auctionTitle.toLowerCase().includes(searchStr) || 
          auction.lotType.toLowerCase().includes(searchStr) || 
          auction.productCategory.toLowerCase().includes(searchStr) 
        );
      });
      setFilteredData(filtered);
    };
    
    const showAuctionDetails = (auction) =>{
        console.log("Showing the details for auction ",auction.auctionId);
        navigate("/searchAuction/auctionDetails",{state : {auctionData : auction}});
    }
    
    return (
        <div>
            {!isAuctionDetailsPage && 
            <div>
                <div id="AdvanceAuctionForm" className="flex w-4/5 mx-auto px-4 pt-8  justify-center items-center">{< AuctionForm ref={ref} setTheData={renderTableData} />}</div>
                <div id="list-table">
                <div className="mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="w-4/5 mx-auto mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Auction List</h2>
                    <div className="relative">
                        <div className="relative">
                        <input
                            type="text"
                            placeholder="Search auctions..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>
                    </div>

                    {/* Table Section */}
                    <div className="w-4/5 mx-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Auction ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Auction Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Auction Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Auction Start Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Lot Type
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((auction) => (
                            <tr key={auction.auctionId} className="hover:bg-gray-50"
                            onClick={()=>showAuctionDetails(auction)}
                            >
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm font-semibold text-gray-500">
                                {auction.auctionId}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-900">
                                {auction.auctionTitle}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                {auction.auctionDescription}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                {auction.auctionStatus}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                {auction.auctionStartDate}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                {auction.lotType}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
            }
            <Outlet />
        </div>
    )
}

export default AuctionListing