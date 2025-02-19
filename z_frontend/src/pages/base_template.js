import React, { useEffect, useState, useRef } from "react";
import { Search, User, LogOut, Settings, UserCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Outlet,useNavigate, Link, useLocation } from "react-router-dom";
import HeaderImage from '../public/images/AuctionHaiProfilePic1.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPageMenu from "../routes/login";
import LangThemFontUtility from "../routes/LanguageFontTheme";
import { colors } from "@mui/material";
import SiteMap from "../features/homepage/siteMap";
import { useAuth } from "../services/auth/useAuthHook";
import FooterElement from "../features/footeElement";
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

    // const Navigation = ({ navItems, checkPermission }) => {
    //   useEffect(() => {
    //     navItems.forEach((item) => {
    //       if (!item.subItems) {
    //         if (item.resource) {
    //           console.log(`Permission for ${item.name}:`, checkPermission(item.resource, item.action));
    //         }
    //       } else {
    //         item.subItems.forEach((subItem) => {
    //           if (!subItem.subItems) {
    //             console.log(`Permission for ${subItem.name}:`, checkPermission(subItem.resource, subItem.action));
    //           }
    //         });
    //       }
    //     });
    //   }, [navItems, checkPermission]);
    // }
    // console.log("Nav Items are : ",navItems);
    const MenuItem = ({ item, index }) => {
      console.log("Menu bhai ke pass gaya call");
      
      const [isHovered, setIsHovered] = useState(false);

      if (!item.subItems) {
        console.log("Menu bhai 1 render kiyela");

          return (
              <li className="nav-item">
                {checkPermission(item.resource, item.action) && 
                  <Link 
                  // onClick={handleNavItemNavigation(item)}
                    to={item.link || '/'}
                     className="nav-link text-white px-3 py-2 d-flex align-items-center transition-colors hover:bg-blue-700 rounded">
                      {item.name}
                  </Link>
                }
              </li>
          );
      }
      console.log("Menu bhai 2 render kiyela");

      return (

          checkPermission(item.resource, item.action) && (<li className="nav-item dropdown"
              onMouseEnter={() => handleDropdownEnter(index)}
              onMouseLeave={handleDropdownLeave}>
               <Link className="nav-link text-white px-3 py-2 d-flex align-items-center gap-1 transition-colors hover:bg-blue-700 rounded"
                 to={item.link || "#"}
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}>
                  {item.name}
                  <ChevronDown size={16} 
                      className={`transition-transform duration-200 ${isHovered || activeDropdown === index ? 'rotate-180' : ''}`}/>
              </Link>
            
              {(activeDropdown === index) && (
                  <div className="dropdown-menu show border-0 mt-0 text-black bg-blue-800 p-0 animate-fadeIn">
                      {item.subItems.map((subItem, subIndex) => (
                          <DropdownItem 
                              key={subIndex} 
                              item={subItem} 
                              isNested={true}
                          />
                      ))}
                  </div>
              )}
          </li>
        )
      );
  };

  const DropdownItem = ({ item, isNested }) => {
      const [showSubMenu, setShowSubMenu] = useState(false);

      if (!item.subItems) {
        return (
          
          checkPermission(item.resource, item.action) && (
            <Link              
            className="dropdown-item text-black py-2 px-4 transition-colors hover:bg-blue-700"
              to={item.link}
            >
              {item.name}
            </Link>
          )
        );
      }

      return (
          checkPermission(item.resource,item.action) &&   
        (<div className="dropdown-submenu position-relative"
               onMouseEnter={() => setShowSubMenu(true)}
               onMouseLeave={() => setShowSubMenu(false)}>
              <Link className="dropdown-item text-black py-2 px-4 d-flex align-items-center justify-content-between transition-colors hover:bg-blue-700"
                 to={item.link || "#"}>
                  {item.name}
                  <ChevronRight size={16} />
              </Link>
              {showSubMenu && (
                  <div className="dropdown-menu show position-absolute top-0 start-100 bg-blue-800 border-0">
                      {item.subItems.map((subItem, idx) => (
                          <DropdownItem 
                              key={idx} 
                              item={subItem} 
                              isNested={true}
                          />
                      ))}
                  </div>
              )}
          </div>)
      );
    };
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
  });

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

const [focus, setFocus] = useState(false);
const [placeholder, setPlaceholder] = useState("Bidder");

const placeholderValues = ["Bidder", "Vendor", "Auction"];

useEffect(() => {
  if (!focus) {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const nextIndex = (placeholderValues.indexOf(prev) + 1) % placeholderValues.length;
        return placeholderValues[nextIndex];
      });
    }, 1500); // Change every 1.5 seconds

    return () => clearInterval(interval);
  }
}, [focus]);


  return (
      <div className="min-vh-100 d-flex flex-column">
        <div className="flex items-center justify-center">
          <header className="custom-header">
            <div className="w-full flex flex-row justify-between h-[55px] pl-[15px] py-2">
              <div className="flex w-full">
                <a href="/home/#auction-table" className="text-black no-underline">
                    Skip to Main Content
                </a>
              </div>
              <div className="w-full flex flex-row w-[288px]" id="div-lan-them-utility-bar">
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
                <div className="mx-2 w-full flex flex-row item-center justify-between">
                  {/* Populate menuy items here */}
                  <ul>
                    {navItems.map((element,indx)=>{
                      < MenuItem key={indx} item={element} index={indx} />
                    })}
                  </ul>
                </div>
                <div className="w-full flex justify-end">
                  <div className="w-[331px] h-[45px] border border-gray-300 rounded-md flex items-center justify-between">
                    <input
                      type="text"
                      className="w-full h-full pl-[16px] text-gray-800 bg-transparent border-none outline-none text-[19px] font-[300] font-libre text-[#5C5C5C]"
                      placeholder={`Search for ${placeholder}`}
                      onFocus={() => setFocus(true)}
                      onBlur={() => setFocus(false)}
                    />
                    <div className="w-[45px] h-[46px] flex items-center justify-center">
                      <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25293 12.6556C6.25296 9.57516 8.42904 6.92374 11.4503 6.3229C14.4716 5.72205 17.4966 7.33914 18.6752 10.1852C19.8539 13.0312 18.8579 16.3135 16.2964 18.0247C13.735 19.7358 10.3214 19.3992 8.14349 17.2207C6.93295 16.0099 6.25291 14.3677 6.25293 12.6556Z" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.1655 19.1113L21.933 21.8788" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
            </div>
          </header>
        </div>

            <SiteMap />
            <main className="flex-grow-1 bg-light">
                <div className="py">
                    <Outlet />
                </div>
            </main>

            <footer className="footer-class w-[1440px] h-[400px] gap-[10px] rounded-tl-[20px] bg-black rounded-tr-[20px] pt-[40px] pr-[28px] pb-[40px] pl-[28px] " style={{}}>
              < FooterElement />
            </footer>
        </div>
    );
};

export default Layout;