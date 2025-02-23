import React from "react";
import { useNavigate } from "react-router-dom";
import BidderImage from '../../public/images/BidderSignUpImage.svg';
import VendorImage from '../../public/images/VendorSignUpImage.svg';
import { Link } from "react-router-dom";

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
    <div className="w-full lg:h-[1024px] md:h-[720px] sm:h-[480px] bg-white" id="div-signup">
      <div className="relative flex flex-row h-full">
        {/* Signup Options */}
        <div className="flex flex-col w-full h-full">
          {/* Vendor Section */}
          <div 
            id="div-signup-vendor" 
            className="relative flex-1 flex-col group cursor-pointer overflow-hidden justify-center rounded-lg shadow-lg h-full w-full"
            onClick={handleBidderSignup}
          >
            {/* Image */}
            <img 
              src={BidderImage} 
              alt="Vendor Signup" 
              className="object-cover w-full h-full group-hover:opacity-80 transition-opacity duration-500"
            />

            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-opacity duration-500" />  */}

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white h-full w-full">
              <div className="flex flex-col items-center justify-between h-1/2">
                {/* Top Text */}
                <p className="text-lg font-libre">I would like to bid</p>

                {/* Bottom Signup Button */}
                <button 
                  className="relative bg-white text-black font-libre text-base py-2 px-6 border-1 border-orange-600 rounded-[50px] overflow-hidden hover:border-2 transition-all duration-300 ease-out group"
                >
                  <span className="absolute inset-0 w-0 bg-orange-800 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative z-10 group-hover:text-white">Signup as Bidder</span>
                </button>

              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-full">
          <div 
              id="div-signup-bidder" 
              className="relative flex-1 flex-col group cursor-pointer overflow-hidden justify-center rounded-lg shadow-lg h-full w-full"
              onClick={handleVendorSignup}
            >
              <img
                src={VendorImage}
                alt="Bidder Signup"
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-500" 
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-opacity duration-500" /> */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white h-full w-full">
                <div className="flex flex-col items-center justify-between h-1/2">
                  {/* Top Text */}
                  <p className="text-lg md:text-lg font-libre">I would like to sell</p>

                  {/* Bottom Signup Button */}
                  <button 
                    className="bg-white text-black font-libre py-2 px-6 border border-orange-600 text-base rounded-[50px] transition duration-300"
                  >
                    Signup as Vendor
                  </button>

                </div>
              </div>
          </div>
        </div>
        <div className="absolute top-[40%] left-[40%] h-1/5 w-1/5 rounded-[20px] bg-white">
                <div className="flex flex-col h-full py gap-3">
                  <div className="font-libre text-xl font-semibold text-blue-500">Sign up</div>
                  <div className="font-libre text-base">or</div>
                  <div>
                    <Link to="/auth/login" className="no-underline text-md font-libre text-blue-500 ">Login here</Link>
                  </div>
                </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;