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
    const navItems = [
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
        "link" : getCurrUserInfo.userType === 'BIDDER' ? "/searchAuction" : "/vendor/listItem",
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
      // {
      //   "name": "Notifications",
      //   "link": "/notification",
      //   "resource" : "notifications",
      //   "action" : "view"
      // },
      // {
      //   "name": "Wishlist",
      //   "link": "/wishlist",
      //   "resource" : "buy",
      //   "action" : "view"
      // },
      // {
      //   "name": "Cart",
      //   "link": "/cart",
      //   "resource" : "cart",
      //   "action" : "view"
      // },
      // {
      //   "name": "Help/FAQs",
      //   "link": "/help",
      //   "resource" : "help",
      //   "action" : "view"
      // },
      // {
      //   "name": "Community",
      //   "link": "/community",
      //     "resource" : "community",
      //   "action" : "view"
      // }
    ];

    
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
    
    const MenuItem = ({ item, index }) => {
      const [isHovered, setIsHovered] = useState(false);

      if (!item.subItems) {
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


  return (
      <div className="min-vh-100 d-flex flex-column">
        <header className="custom-header">
        <div className="w-full bg-gray-100 pb-2 flex">
           <div className="w-full flex flex-row justify-end">
              <div className="flex w-5/6">
                <a href="/home/#auction-table" className="text-black">
                    Skip to Main Content
                </a>
              </div>
            </div>

        </div>
      </header>

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