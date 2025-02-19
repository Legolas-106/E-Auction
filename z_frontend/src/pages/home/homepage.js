

import React, { useState } from 'react';
import { Search, User, LogOut, Settings, UserCircle } from 'lucide-react';
import AuctionWheel from '../../routes/statsWheel';
import IndividualIntervalsExample from '../../routes/corosaul';
import MainContainerDramatic from '../../features/homepage/maincontainer';
import TestimonialCorosaul from '../../features/homepage/testimonialCorosaul';
import WhyAuctionHaiPage from '../../features/homepage/whyAUctioHai';
import AuctionTable from '../../features/homepage/auctionTable';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchBarIsFocused, setSearchBarIsFocused] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Your existing navItems array stays the same

  const MenuItem = ({ item }) => {
    if (!item.subItems) {
      return (
        <li className="relative group">
          <a 
            href={item.link || "#"} 
            className="text-white hover:text-blue-200 py-2 px-4 block whitespace-nowrap"
          >
            {item.name}
          </a>
        </li>
      );
    }

    return (
      <li className="relative group">
        <a 
          href={item.link || "#"} 
          className="text-white hover:text-blue-200 py-2 px-4 block whitespace-nowrap"
        >
          {item.name}
        </a>
        {item.subItems && (
          <ul className="absolute hidden group-hover:block bg-blue-800 rounded-lg mt-0 min-w-48 shadow-lg z-50">
            {item.subItems.map((subItem, index) => (
              <li key={index} className="relative group/sub">
                <a
                  href={subItem.link || '#'}
                  className="text-white hover:bg-blue-700 py-2 px-4 block whitespace-nowrap"
                >
                  {subItem.name}
                  {subItem.subItems && (
                    <span className="float-right ml-2">›</span>
                  )}
                </a>
                {subItem.subItems && (
                  <ul className="absolute hidden group-hover/sub:block left-full top-0 bg-blue-800 rounded-lg min-w-48 shadow-lg">
                    {subItem.subItems.map((nestedItem, nestedIndex) => (
                      <li key={nestedIndex}>
                        <a
                          href={nestedItem.link}
                          className="text-white hover:bg-blue-700 py-2 px-4 block whitespace-nowrap"
                        >
                          {nestedItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">

      {/* <main className="flex-grow container mx-auto px-4 py-4bg-cover bg-center bg-no-repeat"> */}

        <MainContainerDramatic>  
        <div id='banner-portion' className='w-full h-1/2'>
          {/* <div className="h-64 bg-gray-200 w-full -mt-4"> */}
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7012.658038895218!2d77.19080769999998!3d28.499747099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1735827302141!5m2!1sen!2sin" className="w-full h-full" loading="lazy"></iframe> */}
          {/* </div> */}
          <div className='d-flex w-full h-1/2' style={{ width: '100%', margin: '0 auto', backgroundImage :'linear-gradient(to right, black, grey, black)'}}> 
            < IndividualIntervalsExample />
          </div>
        </div>  
        <div id="sort-auction" className="flex flex-grow mb-6 w-full p-0">

          <div className="grid grid-cols-5 gap-4 bg-white p-3 rounded-lg shadow-md w-full">
            <button className="flex-1 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-blue-500 hover:text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
              Active Auctions
            </button>
            <button className="flex-1 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-blue-500 hover:text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
              Results of Auction
            </button>
            <button className="flex-1 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-blue-500 hover:text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
              Auctions By Value
            </button>
            <button className="flex-1 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-blue-500 hover:text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
              Auctions By Org
            </button>
            <button className="flex-1 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-blue-500 hover:text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium whitespace-nowrap">
              Auctions By Prod Category
            </button>
          </div>
        </div>
        <div className='flex w-full p-3 flex-col items-center h-full' id='auction-wheel'>
          {/* <div id="homePageImage" className="w-1/3 h-1/3 bg-red-500">
            <img src={HomePageImage} alt="HomePage" className="w-full h-full object-cover"/>
          </div> */}
          <div className='w-full flex flex-col items-center h-full'><AuctionWheel /></div>
        </div>
        <div id='div-why-us' className='my-2 mb-4 w-full'>
            < WhyAuctionHaiPage />
        </div>
        <div id='div-testimonials' className='w-full h-full mt-5 mb-8 bg-white text-orange-900'>
            <div id='div-testimonial-corosaul' className='w-[1363px] h-[871px] '>
                < TestimonialCorosaul />
            </div>
        </div>
        {/* <div id='how-to-start' className='bg-white'>
          <section>
            <h2>Welcome, Auction Hai</h2>
            <p>How to start</p>
            <div className='d-flex w-full flex-col lg:flex-row'>
              <div id='start-step-1' className='w-full h-[400px] mx-2 mb-2 rounded-2xl border-solid border-3 border-gray-600  flex items-center justify-center'>
                  <h3>Login Yourself</h3>
              </div>
              <div id='start-step-2' className='w-full h-[400px] mx-2 mb-2 rounded-2xl border-solid border-3 border-gray-600 flex items-center justify-center'>
                  <h3>Register as Buyer</h3>
              </div>
              <div id='start-step-3' className='w-full h-[400px] mx-2 mb-2 rounded-2xl border-solid border-3 border-gray-600 flex items-center justify-center' >
                  <h3>Register as Seller</h3>
              </div>
              
            </div>
          </section>
        </div> */}
        {/* <div id='auction-table' className="rounded-lg shadow-lg p-6 min-h-[400px] flex items-center text-gray-500">
          <div className="w-1/5 bg-white min-h-[400px] mr-2 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Auctions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Title</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Publish Date</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Start Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      id: 1,
                      title: "Vehicle Scrap Auction",
                      publishDate: "2025-02-01",
                      startDate: "2025-02-15",
                      link: "/auction/upcoming/1"
                    },
                    {
                      id: 2,
                      title: "Industrial Land Sale",
                      publishDate: "2025-02-03",
                      startDate: "2025-02-17",
                      link: "/auction/upcoming/2"
                    },
                    {
                      id: 3,
                      title: "Raw Timber Stock",
                      publishDate: "2025-02-05",
                      startDate: "2025-02-20",
                      link: "/auction/upcoming/3"
                    },
                    {
                      id: 4,
                      title: "E-Waste Collection",
                      publishDate: "2025-02-07",
                      startDate: "2025-02-22",
                      link: "/auction/upcoming/4"
                    }
                  ].map((auction) => (
                    <tr 
                      key={auction.id} 
                      onClick={() => window.location.href = auction.link}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-3 py-2 text-xs text-gray-500 truncate max-w-[150px]">
                        {auction.title}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-500">
                        {auction.publishDate}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-500">
                        {auction.startDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-3/5 bg-white min-h-[400px] mr-2 rounded-lg">
          <h2 className="text-xl font-semibold  mb-4">Current Ongoing Auctions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">S.No</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Auction ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Publish Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Submission Start Date</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    auctionId: "AUC-2025-001",
                    title: "Industrial Equipment Auction",
                    publishDate: "2025-01-01",
                    submissionStart: "2025-01-15"
                  },
                  {
                    id: 2,
                    auctionId: "AUC-2025-002",
                    title: "Commercial Land Plots",
                    publishDate: "2025-01-02",
                    submissionStart: "2025-01-16"
                  },
                  {
                    id: 3,
                    auctionId: "AUC-2025-003",
                    title: "Metal Scrap Collection",
                    publishDate: "2025-01-03",
                    submissionStart: "2025-01-17"
                  },
                  {
                    id: 4,
                    auctionId: "AUC-2025-004",
                    title: "E-Waste Disposal Tender",
                    publishDate: "2025-01-04",
                    submissionStart: "2025-01-18"
                  },
                  {
                    id: 5,
                    auctionId: "AUC-2025-005",
                    title: "Timber Stock Auction",
                    publishDate: "2025-01-05",
                    submissionStart: "2025-01-19"
                  }
                ].map((auction) => (
                  <tr key={auction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500">{auction.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{auction.auctionId}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{auction.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{auction.publishDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{auction.submissionStart}</td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          <div className="w-1/5 min-h-[400px] bg-green-400 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hot Auctions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Title</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Current Bid</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    title: "Premium Land Plot",
                    currentBid: "₹15.2M",
                    category: "Land",
                    link: "/auction/hot/1"
                  },
                  {
                    id: 2,
                    title: "Rare Metal Stock",
                    currentBid: "₹8.5M",
                    category: "Metal",
                    link: "/auction/hot/2"
                  },
                  {
                    id: 3,
                    title: "Factory Equipment",
                    currentBid: "₹12.7M",
                    category: "Industrial",
                    link: "/auction/hot/3"
                  },
                  {
                    id: 4,
                    title: "Teak Wood Lot",
                    currentBid: "₹5.9M",
                    category: "Timber",
                    link: "/auction/hot/4"
                  },
                  {
                    id: 5,
                    title: "Server Parts",
                    currentBid: "₹3.2M",
                    category: "E-Waste",
                    link: "/auction/hot/5"
                  }
                ].map((auction) => (
                  <tr 
                    key={auction.id} 
                    onClick={() => window.location.href = auction.link}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-3 py-2 text-xs text-gray-500 truncate max-w-[120px]">
                      {auction.title}
                    </td>
                    <td className="px-3 py-2 text-xs font-medium text-green-600">
                      {auction.currentBid}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-500">
                      {auction.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div> */}
        <div id="auction-table w-full h-full mt-10">
          <div className='flex flex-col w-[1363px] h-[667px]'>
            < AuctionTable />
          </div>
        </div>
      </MainContainerDramatic>
      {/* </main> */}

    </div>
  );
};

export default HomePage;