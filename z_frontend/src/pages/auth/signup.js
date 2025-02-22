import React from "react";
import { useNavigate } from "react-router-dom";
import BidderImage from '../../public/images/BidderSignupPageImage.jpeg';
import VendorImage from '../../public/images/vendorSignupPageImage.jpeg';

const SignUp = () => {

    const navigate = useNavigate();
    const handleVendorSignup = () =>{
        console.log("Navigating to vendor signup");
        return navigate('/auth/signup/vendor');
    }
    const handleBidderSignup = () =>{
        console.log("Navigating to bidder signup");
        return navigate('/auth/signup/bidder');
    }
  return (
    <div className="w-full min-h-[400px] bg-white py-10" id="div-signup">
      <div className="flex flex-col justify-center items-center">
        {/* Heading Section */}
        <div className="w-full mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Register at AuctionHai
          </h2>
        </div>
        {/* Signup Options */}
        <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6 px-4">
          {/* Vendor Section */}
          <div 
            id="div-signup-vendor" 
            className="relative flex-1 group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={handleVendorSignup}
          >
            <img
              src={VendorImage}
              alt="Vendor Signup"
              className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-500" 
            /> 
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-opacity duration-500" /> 
            <div className="absolute inset-0 flex items-center justify-center text-center text-white text-xl md:text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              As Vendor
            </div>
          </div>
          {/* Bidder Section */}
          <div 
            id="div-signup-bidder" 
            className="relative flex-1 group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={handleBidderSignup}
          >
            <img
              src={BidderImage}
              alt="Bidder Signup"
              className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-500" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-black text-xl md:text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              As Bidder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;