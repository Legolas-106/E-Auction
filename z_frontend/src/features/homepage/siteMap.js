import React from "react";
import { useLocation } from "react-router-dom";
import AuctionForm from "../../pages/auction/AuctionSearchForm";
import { patch } from "@mui/system";

const SiteMap = () =>{
    const location = useLocation();
    const currentPath = location.pathname;

    if(currentPath.includes("/home","/home/#auction-table")){
        return null;
    }
    let actualPath = currentPath.split('/').filter(part => part);
    // console.log(actualPath);
    // console.log(currentPath);

    // actualPath = actualPath.filter(element => !['auth','signup'].includes(element));
    // console.log(actualPath);
    let urlMap = {};
    const values = ['Home','auth'];
    let path = ""
    actualPath.forEach((value,ndx) => {
        if (!values.includes(value)) { // Check if value is not in values
            if (value === 'login'){
                urlMap['Login'] = path + "/" + value;
            }
            else if (value === 'bidder') {
                urlMap['Bidder Registration'] = path + "/" + value;
            } else if (value === 'vendor') {
                urlMap['Vendor Registration'] = path + "/" + value;
            } 
            else if(value === 'signup'){
                urlMap['Sing Up'] = path + "/" +value;
            }
            else if(value === 'myLots') {
                urlMap['My Lots'] = path + "/" + value;
            }
            else if(value === 'searchAuction'){
                urlMap['Auction Search'] = path + "/" + value;
            }
            else if(value === "listAuction"){
                urlMap["List an item"] = path + "/" + value;
            }

        }
        path = path+ "/" + value;
        // console.log("Path is : ",path);
    });



    // console.log(actualPath);

    return (
        <div className="flex flex-col items-center">
            <div id="div-id-sitemap" className="flex flex-row w-2/3 py-2 items-start">
                <span>
                    <a title="Home" href="/" className=" text-gray-600 p-1">
                        Home
                    </a>
                </span>
                {Object.entries(urlMap).map(([key, item], index) => (
                    <React.Fragment key={index}>
                        <span className="text-gray-600"> / </span>
                        <span className="text-gray-600 px-1">
                            <a title={key} href={item} className="text-gray-600">
                                {key}
                            </a>
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default SiteMap;