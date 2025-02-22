import React, { useEffect, useState, useRef } from "react";
import { Search, User, LogOut, Settings, UserCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Outlet,useNavigate, Link, useLocation } from "react-router-dom";
// import HeaderImage from '../public/images/AuctionHaiProfilePic1.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPageMenu from "../routes/login";
import LangThemFontUtility from "../routes/LanguageFontTheme";
import { colors } from "@mui/material";
import SiteMap from "../features/homepage/siteMap";
import { useAuth } from "../services/auth/useAuthHook";
import FooterElement from "../features/footeElement";
import { motion } from "framer-motion";
import SearchBarNav from "../features/searchBarNav";
import MenuItemsNav from "../features/menuItemsNav";
import LogoImage from "../public/icons/Logo.png";
import StickyHeader from "../features/stickyheader";
import HeaderImage from "../public/images/HeaderImage.jpeg";
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchBarIsFocused, setSearchBarIsFocused] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showLoginPanel,setShowLoginPanel] = useState(false);
    const navigate = useNavigate();
    const {checkPermission, getCurrUserInfo} = useAuth();
    const [navItems, setNavItems] = useState([]);

    //Login Form handlers
    const handleLogin = () =>{
      console.log("Handled login button is clicked");
      setShowLoginPanel(true);
    }




    const handleDropdownEnter = (index) => {
        setActiveDropdown(index);
    };

    const handleDropdownLeave = () => {
        setActiveDropdown(null);
    };

    // Your existing navItems array stays the same
    // const navItems = [
    //   {
    //     "name": "Home",
    //     "link": "/",
    //     "resource" : "home",
    //     "action" : "view"
    //   },
    //   {
    //     "name": "Categories",
    //     "resource" :"categories",
    //     "action" : "view",
    //     "link" : getCurrUserInfo.userType === 'BIDDER' ? "/searchAuction" : "/vendor/listItem",
    //     "subItems": [
    //       {
    //         "name": "Scrap/Disposal",
    //         "link" : "/searchAuction/scrap",
    //         "resource" : "categories/scrap",
    //         "action" : "view",
    //         "subItems": [
    //           {
    //             "name": "Metal Scrap",
    //             "link": "/searchAuction/scrap/metal",
    //             "resource" : "categories/scrap",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "List Metal Scrap",
    //             "link": "/vendor/listItem/scrap/metal",
    //             "resource" : "sell",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "E-Waste Scrap",
    //             "link": "/searchAuction/scrap/ewaste",
    //             "resource" : "categories/scrap",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "List E-Waste Scrap",
    //             "link": "/vendor/listItem/scrap/ewaste",
    //             "resource" : "sell",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "Plastic Scrap",
    //             "link": "/searchAuction/scrap/plastic",
    //             "resource" : "categories/scrap",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "List Plastic Scrap",
    //             "link": "/vendor/listItem/scrap/plastic",
    //             "resource" : "sell",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "Glass Scrap",
    //             "link": "/searchAuction/scrap/glass",
    //             "resource" : "categories/scrap",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "List Glass Scrap",
    //             "link": "/vendor/listItem/scrap/glass",
    //             "resource" : "sell",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "Paper Scrap",
    //             "link": "/searchAuction/scrap/paper",
    //             "resource" : "categories/scrap",
    //             "action" : "view"
    //           },
    //           {
    //             "name": "List Paper Scrap",
    //             "link": "/vendor/listItem/scrap/paper",
    //             "resource" : "sell",
    //             "action" : "view"
    //           },
    //         ]
    //       },
    //       {
    //         "name": "Land",
    //         "subItems": [
    //           {
    //             "name": "Residential",
    //             "link": "/categories/land/residential"
    //           },
    //           {
    //             "name": "Commercial",
    //             "link": "/categories/land/commercial"
    //           },
    //           {
    //             "name": "Industrial",
    //             "link": "/categories/land/industrial"
    //           }
    //         ]
    //       },
    //       {
    //         "name": "Timber",
    //         "subItems": [
    //           {
    //             "name": "Raw Timber",
    //             "link": "/categories/timber/raw"
    //           },
    //           {
    //             "name": "Processed Wood",
    //             "link": "/categories/timber/processed"
    //           },
    //           {
    //             "name": "Firewood",
    //             "link": "/categories/timber/firewood"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "name": "Search Auctions",
    //     "link": "/searchAuction",
    //     "resource" : "auctions",
    //     "action" : "view"
    //   },
    //   {
    //     "name": "Sign Up",
    //     "link": "/auth/signup",
    //     "resource" : "signup",
    //     "action" : "view"
    //   },
    //   {
    //     "name": "List Item",
    //     "link": "/vendor/listItem",
    //     "resource" : "sell",
    //     "action" : "view"
    //   },
    //   {
    //     "name": "My Auctions",
    //     "link": "/myAuction",
    //     "resource" : "sell",
    //     "action" : "view",
    //     "subItems" : [
    //       {
    //         "name" : "View My Lots",
    //         "link" : "/vendor/myItems",
    //         "resource" : "sell",
    //         "action" : "view"
    //       },
    //       {
    //         "name" : "Monitor My Auctions",
    //         "link" : "/myAuction/monitor",
    //         "resource" : "sell",
    //         "action" : "view"
    //       }
    //     ]
    //   },
    //   {
    //     "name" : "My Bids",
    //     "link" : "/bidder/myBid",
    //     "resource" : "bid",
    //     "action" : "view",
    //     "subItems" : [
    //       {
    //         "name" : "My Auctions",
    //         "link" : "/bidder/myAuctions",
    //         "resource" : "",
    //         "action" : "view",
    //       },
    //       {
    //         "name" : "Bid History",
    //         "link" : "/bidder/bidHistory",
    //         "resource" : "bid",
    //         "action" : "view"
    //       }
    //     ]
    //   },
    //   {
    //     "name" : "Dashboard",
    //     "link" : "/profile",
    //     "resource" : "dashboard",
    //     "action" : "view"
    //   },
    //   {
    //     "name" : "Payment & Shipment",
    //     "links" : "#"
    //   },
    // ];

    const generateNavItems = (userType) => {
      return [
        {
          "name": "Home",
          "link": "/",
          "resource" : "home",
          "action" : "view"
        },
        {
          "name": "Categories",
          "resource" :"categories",
          "action" : "view",
          "link" : userType === 'BIDDER' ? "/searchAuction" : "/vendor/listItem",
          "subItems": [
            {
              "name": "Scrap/Disposal",
              "link" : "/searchAuction/scrap",
              "resource" : "categories/scrap",
              "action" : "view",
              "subItems": [
                {
                  "name": "Metal Scrap",
                  "link": "/searchAuction/scrap/metal",
                  "resource" : "categories/scrap",
                  "action" : "view"
                },
                {
                  "name": "List Metal Scrap",
                  "link": "/vendor/listItem/scrap/metal",
                  "resource" : "sell",
                  "action" : "view"
                },
                {
                  "name": "E-Waste Scrap",
                  "link": "/searchAuction/scrap/ewaste",
                  "resource" : "categories/scrap",
                  "action" : "view"
                },
                {
                  "name": "List E-Waste Scrap",
                  "link": "/vendor/listItem/scrap/ewaste",
                  "resource" : "sell",
                  "action" : "view"
                },
                {
                  "name": "Plastic Scrap",
                  "link": "/searchAuction/scrap/plastic",
                  "resource" : "categories/scrap",
                  "action" : "view"
                },
                {
                  "name": "List Plastic Scrap",
                  "link": "/vendor/listItem/scrap/plastic",
                  "resource" : "sell",
                  "action" : "view"
                },
                {
                  "name": "Glass Scrap",
                  "link": "/searchAuction/scrap/glass",
                  "resource" : "categories/scrap",
                  "action" : "view"
                },
                {
                  "name": "List Glass Scrap",
                  "link": "/vendor/listItem/scrap/glass",
                  "resource" : "sell",
                  "action" : "view"
                },
                {
                  "name": "Paper Scrap",
                  "link": "/searchAuction/scrap/paper",
                  "resource" : "categories/scrap",
                  "action" : "view"
                },
                {
                  "name": "List Paper Scrap",
                  "link": "/vendor/listItem/scrap/paper",
                  "resource" : "sell",
                  "action" : "view"
                },
              ]
            },
            {
              "name": "Land",
              "subItems": [
                {
                  "name": "Residential",
                  "link": "/categories/land/residential"
                },
                {
                  "name": "Commercial",
                  "link": "/categories/land/commercial"
                },
                {
                  "name": "Industrial",
                  "link": "/categories/land/industrial"
                }
              ]
            },
            {
              "name": "Timber",
              "subItems": [
                {
                  "name": "Raw Timber",
                  "link": "/categories/timber/raw"
                },
                {
                  "name": "Processed Wood",
                  "link": "/categories/timber/processed"
                },
                {
                  "name": "Firewood",
                  "link": "/categories/timber/firewood"
                }
              ]
            }
          ]
        },
        {
          "name": "Search Auctions",
          "link": "/searchAuction",
          "resource" : "auctions",
          "action" : "view"
        },
        {
          "name": "Sign Up",
          "link": "/auth/signup",
          "resource" : "signup",
          "action" : "view"
        },
        {
          "name": "List Item",
          "link": "/vendor/listItem",
          "resource" : "sell",
          "action" : "view"
        },
        {
          "name": "My Auctions",
          "link": "/myAuction",
          "resource" : "sell",
          "action" : "view",
          "subItems" : [
            {
              "name" : "View My Lots",
              "link" : "/vendor/myItems",
              "resource" : "sell",
              "action" : "view"
            },
            {
              "name" : "Monitor My Auctions",
              "link" : "/myAuction/monitor",
              "resource" : "sell",
              "action" : "view"
            }
          ]
        },
        {
          "name" : "My Bids",
          "link" : "/bidder/myBid",
          "resource" : "bid",
          "action" : "view",
          "subItems" : [
            {
              "name" : "My Auctions",
              "link" : "/bidder/myAuctions",
              "resource" : "",
              "action" : "view",
            },
            {
              "name" : "Bid History",
              "link" : "/bidder/bidHistory",
              "resource" : "bid",
              "action" : "view"
            }
          ]
        },
        {
          "name" : "Dashboard",
          "link" : "/profile",
          "resource" : "dashboard",
          "action" : "view"
        },
        {
          "name" : "Payment & Shipment",
          "links" : "#"
        },
      ];
    };

    useEffect(() => {
      // Call generateNavItems whenever getCurrUserInfo changes
      console.log("get User Info is changed");
      const userType = getCurrUserInfo.userType;
      const updatedNavItems = generateNavItems(userType);
      setNavItems(updatedNavItems);
    }, [getCurrUserInfo]);
  
    
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setShowProfileMenu(false);
    };

    const handleNavItemNavigation = (item) =>{
      console.log("Nav item navigation");
      navigate(item.link);
    }

    const AuctionDirectLinks = [
      {label : "Active Auction", link : "/searchAuction/activeAuc"},
      {label : "Result of Auction", link : "/searchAuction/endedAuc"},
      {label : "Auction By Value", link : "/searchAuction/searchFilter"},
      {label : "Auction By Org", link : "/searchAuction/searchFilter"},
      {label : "Auction Prod Category", link : "/searchAuction/searchFilter"}
    ];


  //   const MenuItem = ({ item, index }) => {
  //     console.log("Menu bhai ke pass gaya call");
      
  //     const [isHovered, setIsHovered] = useState(false);
  //     if (!item.subItems) {
  //       console.log("Menu bhai 1 render kiyela");

  //       return (
  //         <li className="">
  //           {checkPermission(item.resource, item.action) && (
  //                 <Link 
  //                   to={item.link || '/'}
  //                   className="no-underline px-1 py-2 d-flex align-items-center transition-colors rounded font-libre text-[18px] leading-[18px] focus:outline-none"
  //                 >
  //                   <motion.div
  //           className="flex items-center gap-2"
  //           initial="initial"
  //           whileHover="hover"
  //           animate="initial"
  //         >
  //           <motion.span
  //             className="text-orange-500"
  //             variants={{
  //               initial: {
  //                 opacity: 0,
  //                 y: -20,
  //                 transition: { duration: 0.2 }
  //               },
  //               hover: { 
  //                 opacity: 1, 
  //                 y: 0,
  //                 transition: { duration: 0.2 }
  //               }
  //             }}
  //           >
  //             •
  //           </motion.span>
            
  //           <motion.span
  //             variants={{
  //               initial: {
  //                 color: '#ffffff', // text-white
  //                 fontWeight: 400,
  //                 transition: { duration: 0.2 }
  //               },
  //               hover: { 
  //                 color: '#f97316', // text-orange-500
  //                 fontWeight: 600,
  //                 transition: { duration: 0.2 }
  //               }
  //             }}
  //           >
  //             {item.name}
  //           </motion.span>
  //         </motion.div>
  //                 </Link>
  //           )}
  //         </li>
  //       );
  //     }
  //     console.log("Menu bhai 2 render kiyela");

  //     return (

  //         checkPermission(item.resource, item.action) && (<li className="nav-item dropdown"
  //             onMouseEnter={() => handleDropdownEnter(index)}
  //             onMouseLeave={handleDropdownLeave}>
  //              <Link className="text-white px-3 py-2 d-flex align-items-center gap-1 transition-colors hover:bg-blue-700 rounded"
  //                to={item.link || "#"}
  //                onMouseEnter={() => setIsHovered(true)}
  //                onMouseLeave={() => setIsHovered(false)}>
  //                 {item.name}
  //                 <ChevronDown size={16} 
  //                     className={`transition-transform duration-200 ${isHovered || activeDropdown === index ? 'rotate-180' : ''}`}/>
  //             </Link>
            
  //             {(activeDropdown === index) && (
  //                 <div className="dropdown-menu show border-0 mt-0 text-black bg-blue-800 p-0 animate-fadeIn">
  //                     {item.subItems.map((subItem, subIndex) => (
  //                         <DropdownItem 
  //                             key={subIndex} 
  //                             item={subItem} 
  //                             isNested={true}
  //                         />
  //                     ))}
  //                 </div>
  //             )}
  //         </li>
  //       )
  //     );
  //   };

  // const DropdownItem = ({ item, isNested }) => {
  //     const [showSubMenu, setShowSubMenu] = useState(false);

  //     if (!item.subItems) {
  //       return (
          
  //         checkPermission(item.resource, item.action) && (
  //           <Link              
  //           className="dropdown-item text-black py-2 px-4 transition-colors hover:bg-blue-700"
  //             to={item.link}
  //           >
  //             {item.name}
  //           </Link>
  //         )
  //       );
  //     }

  //     return (
  //         checkPermission(item.resource,item.action) &&   
  //       (<div className="dropdown-submenu position-relative"
  //              onMouseEnter={() => setShowSubMenu(true)}
  //              onMouseLeave={() => setShowSubMenu(false)}>
  //             <Link className="dropdown-item text-black py-2 px-4 d-flex align-items-center justify-content-between transition-colors hover:bg-blue-700"
  //                to={item.link || "#"}>
  //                 {item.name}
  //                 <ChevronRight size={16} />
  //             </Link>
  //             {showSubMenu && (
  //                 <div className="dropdown-menu show position-absolute top-0 start-100 bg-blue-800 border-0">
  //                     {item.subItems.map((subItem, idx) => (
  //                         <DropdownItem 
  //                             key={idx} 
  //                             item={subItem} 
  //                             isNested={true}
  //                         />
  //                     ))}
  //                 </div>
  //             )}
  //         </div>)
  //     );
  //   };
  console.log("User Status :",isLoggedIn);
  const loginRef = useRef();
  const location = useLocation();

  useEffect(()=>{
    console.log("Loading some values Location ",location.pathname);
    if(location.pathname === "/"){
      console.log("Redirecting to home");
      navigate("/home");
    }
    if(localStorage.getItem('authToken')){
      console.log(localStorage.getItem("authToken"));
      setIsLoggedIn(true);
      console.log(loginRef.current);
      if(loginRef.current){
        loginRef.current.setLogin();
      }
    }
  },[location]);

//   <div className="w-full flex flex-row items-start">
//   <div className="flex left-1 w-full">
//     <a href="/home/#auction-table" className="text-black">
//         Skip to Main Content
//     </a>
//   </div>
// </div>


{/* <LangThemFontUtility 
className="w-48" // Fixed width for the utility panel
containerStyles="" // Additional padding/styling for the container
position="dropdown" // Indicates this is in a dropdown style rather than sidebar
isHeaderVersion={true} // Flag to adjust styling for header placement
/> */}

// const [focus, setFocus] = useState(false);
// const [placeholder, setPlaceholder] = useState("Bidder");

// const placeholderValues = ["Bidder", "Vendor", "Auction"];

// useEffect(() => {
//   if (!focus) {
//     const interval = setInterval(() => {
//       setPlaceholder((prev) => {
//         const nextIndex = (placeholderValues.indexOf(prev) + 1) % placeholderValues.length;
//         return placeholderValues[nextIndex];
//       });
//     }, 1500); // Change every 1.5 seconds

//     return () => clearInterval(interval);
//   }
//   else{

//   }
// }, [focus]);


{/* <header className="custom-header">
<div className="w-full flex flex-row justify-between h-[55px] pl-[15px] py-2">
  <div className="flex w-[130px] justify-between">
    <div>
      <svg width="14" height="28" viewBox="0 0 14 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5498 28V15.4H13.3752L14 9.8H9.5498V7.07246C9.5498 5.63046 9.58665 4.2 11.6017 4.2H13.6426V0.196191C13.6426 0.135991 11.8895 0 10.1159 0C6.41199 0 4.09276 2.32007 4.09276 6.58027V9.8H0V15.4H4.09276V28H9.5498Z" fill="#3B5B8A"/>
      </svg>
    </div>
    <div>
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.0495 0.344482H26.3451L16.9631 11.065L28 25.6552H19.3603L12.5884 16.8086L4.8492 25.6552H0.547588L10.5806 14.1863L0 0.344482H8.85876L14.9735 8.43053L22.0495 0.344482ZM20.5406 23.0876H22.9196L7.5628 2.77821H5.00739L20.5406 23.0876Z" fill="#0B0B0B"/>
    </svg>
    </div>
    <div>
    <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 7.79834C12.5782 7.79834 11.1884 8.21996 10.0063 9.00983C8.82418 9.7997 7.90281 10.9224 7.35873 12.2359C6.81465 13.5495 6.6723 14.9949 6.94967 16.3893C7.22702 17.7837 7.91166 19.0646 8.917 20.0699C9.92231 21.0751 11.2031 21.7598 12.5975 22.0371C13.9921 22.3145 15.4373 22.1721 16.7509 21.6281C18.0645 21.084 19.1871 20.1627 19.977 18.9806C20.767 17.7984 21.1885 16.4085 21.1885 14.9868C21.1908 14.0421 21.0065 13.1064 20.646 12.2333C20.2855 11.36 19.7562 10.5666 19.0882 9.89866C18.4202 9.23067 17.6268 8.70127 16.7537 8.34083C15.8804 7.9804 14.9447 7.79605 14 7.79834ZM14 19.6681C13.0741 19.6681 12.169 19.3935 11.3992 18.8791C10.6295 18.3649 10.0294 17.6337 9.67508 16.7783C9.32076 15.9229 9.22807 14.9817 9.40869 14.0735C9.58931 13.1655 10.0352 12.3313 10.6898 11.6766C11.3445 11.022 12.1787 10.5761 13.0867 10.3955C13.9949 10.2149 14.9361 10.3076 15.7915 10.6619C16.6469 11.0162 17.3781 11.6163 17.8923 12.386C18.4067 13.1558 18.6813 14.0609 18.6813 14.9868C18.6813 16.2283 18.1881 17.4191 17.3102 18.297C16.4323 19.1749 15.2415 19.6681 14 19.6681ZM23.1697 7.50028C23.1697 7.84707 23.0669 8.18605 22.8743 8.47436C22.6816 8.76269 22.4077 8.98742 22.0874 9.12011C21.7671 9.25282 21.4145 9.28753 21.0743 9.21989C20.7342 9.15223 20.4219 8.98525 20.1766 8.74005C19.9315 8.49485 19.7645 8.18245 19.6968 7.84235C19.6291 7.50223 19.6638 7.14971 19.7965 6.82934C19.9293 6.50897 20.154 6.23515 20.4423 6.04249C20.7307 5.84983 21.0696 5.74699 21.4164 5.74699C21.8814 5.74699 22.3274 5.93172 22.6561 6.26053C22.9851 6.58933 23.1697 7.03529 23.1697 7.50028ZM27.9211 9.25357C27.9721 7.07394 27.1591 4.96257 25.6594 3.38006C24.0853 1.86116 21.9729 1.02883 19.7858 1.06571C17.5066 0.960517 10.4934 0.960517 8.21416 1.06571C6.03519 1.01853 3.92523 1.83104 2.34064 3.32746C0.840947 4.90997 0.0279123 7.02134 0.078898 9.20097C-0.0262993 11.4802 -0.0262993 18.4934 0.078898 20.7727C0.0279123 22.9523 0.840947 25.0637 2.34064 26.6462C3.92523 28.1426 6.03519 28.9551 8.21416 28.9079C10.5285 29.0482 17.4715 29.0482 19.7858 28.9079C21.9655 28.9589 24.0768 28.1459 25.6594 26.6462C27.1591 25.0637 27.9721 22.9523 27.9211 20.7727C28.0263 18.4934 28.0263 11.4802 27.9211 9.20097V9.25357ZM24.9405 23.2799C24.7024 23.883 24.3432 24.4305 23.8847 24.889C23.4262 25.3475 22.8786 25.7068 22.2755 25.9449C19.5537 26.4952 16.7712 26.6839 14 26.5059C11.2347 26.684 8.45788 26.4954 5.74202 25.9449C5.13901 25.7068 4.5913 25.3475 4.13289 24.889C3.67445 24.4305 3.31508 23.883 3.07702 23.2799C2.34064 21.4214 2.49844 17.0382 2.49844 15.0043C2.49844 12.9705 2.34064 8.56979 3.07702 6.72884C3.30837 6.11987 3.66518 5.56635 4.1243 5.1042C4.58341 4.64207 5.13458 4.28163 5.74202 4.0463C8.45788 3.49574 11.2347 3.30708 14 3.48525C16.7712 3.30738 19.5537 3.49603 22.2755 4.0463C22.8786 4.28437 23.4262 4.64374 23.8847 5.10217C24.3432 5.56059 24.7024 6.1083 24.9405 6.7113C25.6769 8.56979 25.5016 12.953 25.5016 14.9868C25.5016 17.0206 25.6769 21.4214 24.9405 23.2623V23.2799Z" fill="#FE8D39"/>
    </svg>
    </div>
  </div>
  <div className="flex w-[58px] h-full items-center justify-center">
    <img className="object-cover" src={LogoImage} />
  </div>
  <div className="flex flex-row w-[288px]" id="div-lan-them-utility-bar">
    <div className="w-full rounded-[50px] border-[1px] border-customOrange flex items-center justify-center">
      <a href="/auth/login" className="text-[19px] font-[300] font-libre text-[#0B0B0B] no-underline">Login</a>
    </div>
    <div className="w-full flex items-center justify-center rounded-[50px] bg-black">
      <a href="/auth/signup" className="text-[19px] font-[300] font-libre text-white no-underline">SignUp</a>
    </div>
    <div>

    </div>
  </div>
</div>
<div id="div-menu" className="w-full flex flex-row justify-between">
    <MenuItemsNav />
    <div className="w-full flex justify-end">
      < SearchBarNav />
    </div>
</div>
</header> */}

  return (
      <div className="min-vh-100 d-flex flex-col">
        <div className="relative h-[700px]" style={{backgroundImage:`url(${HeaderImage})`,    backgroundSize: "100% 100%", // Forces it to stretch
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",}}>
          <div className="flex flex-col items-center w-full h-[256px] bg-cover bg-center bg-no-repeat" style={{backgroundImage:{HeaderImage}}}>
            {/* <img src={HeaderImage} className="object-cover" /> */}
            <StickyHeader
              LogoImage={LogoImage}
              MenuItemsNav={MenuItemsNav}
              SearchBarNav={SearchBarNav}
            />
          </div>
          <SiteMap />

        </div>
        <div className="flex flex-col flex-grow min-h-screen">
          <main className="flex-grow mt-[-400px] bg-transparent z-10">
            <div className="py">
              <Outlet />
            </div>
          </main>

      <footer className="w-full h-[580px] gap-[10px] rounded-tl-[20px] bg-black rounded-tr-[20px] pt-[40px] pr-[28px] pb-[40px] pl-[28px]">
        <FooterElement />
      </footer>
    </div>
      </div>
    );
};

export default Layout;