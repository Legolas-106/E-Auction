import React, {useEffect,useState} from "react";
import { useAuth } from "../services/auth/useAuthHook";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown,ChevronUp, ChevronRight } from "lucide-react";
const MenuItemsNav = () =>{
    const [navItems,setNavItems] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(false);
    const {getCurrUserInfo, checkPermission} = useAuth();
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
    const handleDropdownEnter = (index) => {
        setActiveDropdown(index);
    };

    const handleDropdownLeave = () => {
        setActiveDropdown(null);
    };
    useEffect(() => {
        // Call generateNavItems whenever getCurrUserInfo changes
        console.log("get User Info is changed");
        const userType = getCurrUserInfo.userType;
        const updatedNavItems = generateNavItems(userType);
        setNavItems(updatedNavItems);
    }, [getCurrUserInfo]);

    const MenuItem = ({ item, index }) => {
        const [isHovered, setIsHovered] = useState(false);
        
        if (!item.subItems) {
          return (
            <li className="relative">
              {checkPermission(item.resource, item.action) && (
                <Link 
                  to={item.link || '/'}
                  className="no-underline px-1 py-2 d-flex align-items-center transition-colors rounded font-libre text-[18px] leading-[18px] focus:outline-none w-full text-nowrap"
                >
                  <motion.div
                    className="flex items-center gap-1"
                    initial="initial"
                    whileHover="hover"
                    animate="initial"
                  >
                    <motion.span
                      className="text-[#FE7008]"
                      variants={{
                        initial: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2 }
                        },
                        hover: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="#FE7008"/>
                      </svg>
                    </motion.span>
                    
                    <motion.span
                      variants={{
                        initial: {
                          color: '#0B0B0B',
                          fontWeight: 300,
                          transition: { duration: 0.2 }
                        },
                        hover: { 
                          color: '#FE7008',
                          fontWeight: 600,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                </Link>
              )}
            </li>
          );
        }
      
        return (
          checkPermission(item.resource, item.action) && (
            <li className="relative"
              onMouseEnter={() => handleDropdownEnter(index)}
              onMouseLeave={handleDropdownLeave}
            >
              <motion.div
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="w-full"
              >
                <Link 
                  className="text-white no-underline px-1 py-2 d-flex align-items-center gap-1 transition-colors rounded font-libre text-[18px] leading-[18px] w-full text-nowrap"
                  to={item.link || "#"}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.div className="flex items-center gap-1">
                    <motion.span
                      className="text-orange-500"
                      variants={{
                        initial: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2 }
                        },
                        hover: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="#FE7008"/>
                      </svg>
                    </motion.span>
                    
                    <motion.span
                      variants={{
                        initial: {
                          color: '#0B0B0B',
                          fontWeight: 300,
                          transition: { duration: 0.2 }
                        },
                        hover: { 
                          color: '#FE7008',
                          fontWeight: 600,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {item.name}
                    </motion.span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${isHovered || activeDropdown === index ? 'rotate-180 text-customOrange' : ''}`}
                    />
                  </motion.div>
                </Link>
              </motion.div>
              
              {(activeDropdown === index) && (
                <div className="dropdown-menu show border-0 mt-0 text-black bg-blue-800 p-0 animate-fadeIn absolute left-0 w-full">
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
              <motion.div
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="w-full"
              >
                <Link              
                  className="dropdown-item py-2 px-1 transition-colors font-libre text-[18px] leading-[18px] no-underline block w-full text-wrap"
                  to={item.link}
                >
                  <motion.div className="flex items-center gap-1">
                    <motion.span
                      className="text-orange-500"
                      variants={{
                        initial: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2 }
                        },
                        hover: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="#FE7008"/>
                      </svg>
                    </motion.span>
                    
                    <motion.span
                      variants={{
                        initial: {
                          color: '#0B0B0B',
                          fontWeight: 100,
                          transition: { duration: 0.2 }
                        },
                        hover: { 
                          color: '#FE7008',
                          fontWeight: 200,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            )
          );
        }
      
        return (
          checkPermission(item.resource, item.action) && (
            <div 
              className="dropdown-submenu position-relative w-full"
              onMouseEnter={() => setShowSubMenu(true)}
              onMouseLeave={() => setShowSubMenu(false)}
            >
              <motion.div
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="w-full"
              >
                <Link 
                  className={`dropdown-item py-2 px-1 d-flex align-items-center justify-content-between transition-colors font-libre text-[18px] leading-[18px] no-underline w-full text-wrap ${showSubMenu ? "text-customOrange" : "text-black"}`}
                  to={item.link || "#"}
                >
                  <motion.div className="flex items-center gap-1">
                    <motion.span
                      className="text-customOrange"
                      variants={{
                        initial: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2 }
                        },
                        hover: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="#FE7008"/>
                      </svg>
                    </motion.span>
                    
                    <motion.span
                      variants={{
                        initial: {
                          color: '#0B0B0B',
                          fontWeight: 200,
                          transition: { duration: 0.2 }
                        },
                        hover: { 
                          color: '#FE7008',
                          fontWeight: 300,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {item.name}
                    </motion.span>
                    <ChevronRight size={16} className={`${showSubMenu ? "text-customOrange" : "text-black"}`} />
                  </motion.div>
                </Link>
              </motion.div>
      
              {showSubMenu && (
                <div className="dropdown-menu show position-absolute w-full top-0 start-100 bg-blue-800 border-0">
                  {item.subItems.map((subItem, idx) => (
                    <DropdownItem 
                      key={idx} 
                      item={subItem} 
                      isNested={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        );
      };
    return (
        <div className="w-full flex flex-row item-center justify-between">
                  {/* Populate menuy items here */}
            <ul className="d-flex flex-row gap-1 mb-0 pl-0 pt-2">
            {navItems.map((item, index) => (
                        <MenuItem key={index} item={item} index={index} />
                    ))}
            </ul>
        </div>
    )
}

export default MenuItemsNav;