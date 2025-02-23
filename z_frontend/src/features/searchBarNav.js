import React, {useState,useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBarNav = () =>{
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
      else{
    
      }
    }, [focus]);

    return (
        <div className={`relative w-[331px] h-[45px] ${ focus ? "border-solid border-2 border-customOrange":"border border-black"}  rounded-md flex items-center justify-between`}>
            <input
            type="text"
            className={`w-full h-full pl-[16px] bg-transparent  outline-none text-[19px] font-[300] font-libre text-[#5C5C5C]`}
            // placeholder={`Search for ${placeholder}`}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            />
              {/* {!focus && (
                <span className="absolute left-[16px] top-1/2 -translate-y-1/2 pointer-events-none text-[19px] font-[300] font-libre">
                  Search for <span className="text-black font-[400]">{placeholder}</span>
                </span>
              )} */}
              {!focus && (
        <AnimatePresence mode="wait">
          <motion.span
            key={placeholder}
            initial={{ opacity: 0, y: 0 }} // Start below
            animate={{ opacity: 1, y: -13 }} // Move up
            exit={{ opacity: 0, y: -20 }} // Move out upwards
            transition={{ duration: 0.4 }}
            className="absolute left-[16px] top-1/2 -translate-y-1/2 pointer-events-none text-[19px] font-[300] font-libre"
          >
            Search for <span className="text-black font-[400]">{placeholder}</span>
          </motion.span>
        </AnimatePresence>
      )}
            <div className="w-[45px] h-[46px] flex justify-center items-center">
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25293 12.6556C6.25296 9.57516 8.42904 6.92374 11.4503 6.3229C14.4716 5.72205 17.4966 7.33914 18.6752 10.1852C19.8539 13.0312 18.8579 16.3135 16.2964 18.0247C13.735 19.7358 10.3214 19.3992 8.14349 17.2207C6.93295 16.0099 6.25291 14.3677 6.25293 12.6556Z" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.1655 19.1113L21.933 21.8788" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    );

}

export default SearchBarNav;