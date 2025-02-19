import React from "react";
import axios from "axios";
import apiService from "../auth/axiosUtils";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

export const AuctionService = {
    async publishAuction(data,username,id){
        if(username == null){
            let res = {
                "ErrorCode" : "-1",
                "message" : "UserName not found"
            }
            return res;
        }

        try{
            console.log("Sending the request");
            console.log("Withing AuctionSrvice");
            let url = "/vendor/createAndPublishItem"
            console.log("Setting up the token in config");
            let token = localStorage.getItem("authToken");
            let config = {
              headers : {
                "Authorization" : `Bearer ${token}`
              }
            }
            const data_to_send = JSON.parse(JSON.stringify(data));
            const image = {};

            data_to_send.auctionLotDetails.map((lot,indx)=>{
                image[lot.auctionLotNumber] = lot.images;
                delete data_to_send.auctionLotDetails[indx].images;
            });


            console.log(data_to_send);

            data_to_send['username'] = id;
            data_to_send['loginId'] = username;

            const formData = new FormData();

            console.log("Created the formData object");

            formData.append('request', new Blob([JSON.stringify(data_to_send)], { type: "application/json" }));

            // ✅ Append images inside "images" object
            console.log("Converting the images");
            console.log(";;llll");
            data.auctionLotDetails.forEach((lot) => {
                console.log("[[[[]]]]]]");
                lot.images.forEach((file,ind) => {
                    console.log("Image file is ",file);
                    formData.append(`images[${lot.auctionLotNumber}][${ind}]`, file.file);
                });
            });
            // formData.append('images',new Blob([JSON.stringify()]))
            console.log("Date_to_send is : ",data_to_send);
            console.log("Data to send to backend", formData);
            const response = await apiService.post(url,formData,config);
            console.log(response);
            if (response.data.ErrorCode=="0"){
                return true;
            }
            else{
                let res = {
                    "ErrorCode" : "-3",
                    "message" : "Error in sending request to backend"
                }
                return res;
            }
        }catch(err){
            let res = {
                "ErrorCode" : "-2",
                "message" : "Error in sending the response"
            }
            return res;
        }
    }
}