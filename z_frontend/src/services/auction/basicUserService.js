import React from "react";
import apiService from "../auth/axiosUtils";

export const BasicUserAuctionService = {
    async searchAuction(data){
        console.log("Checking for the token");
        let config = null;
        // if(localStorage.getItem("authToken")!=""){
        //     let header = {
        //         Header : {
        //             "Authorization" : `Bearer ${localStorage.getItem("authToken")}`
        //         }
        //     }
        //     config=header;
        // }
        let params = new URLSearchParams();
        console.log(data);
        
        Object.entries(data).forEach(([key, value]) => {
            console.log("Key is", key, "Value is", value);
            
            if (key.trim() !== "" && value.trim() !== "") {
                console.log("Appending the paremeter : ",key.trim().toString());
                params.append(key, value);
            }
        });
        
        let url = `/searchAuction/`;
        
        if (params.toString().length > 0) {
            url += `?${params.toString()}`;
        }
        
        console.log("URL IS:", url);
        
        return apiService.get(url, config)
                .then(response =>{
                    console.log("Raw Repsonse is ",response);
                    return response.data;
                })
                .then(data => {
                    console.log("data is : ",data);
                    data.success = true;
                    return data;
                })
                .catch(error=>{
                    console.error("Error received while fetching the auction information ",error);
                    return {success:false,message:error};
                });
    }
}