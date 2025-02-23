import { useAuth } from "../auth/useAuthHook";
import apiService from "../auth/axiosUtils";
// import { use } from "react";

const handleApiRequest = async (requestFn) => {
    try {
      console.log('Request payload:', requestFn.payload);
      const response = await requestFn();
      console.log('Response data:', response.data);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
  
      // Handle different types of errors
      if (!error.response) {
        // Network error or no response from server
        throw new Error('Network error - please check your connection');
      }
  
      switch (error.response.status) {
        case 400:
          throw new Error(error.response.data.message || 'Invalid request data');
        case 401:
          throw new Error('Authentication required');
        case 403:
          throw new Error('You do not have permission to perform this action');
        case 404:
          throw new Error('Resource not found');
        case 422:
          throw new Error(error.response.data.message || 'Validation error');
        case 429:
          throw new Error('Too many requests - please try again later');
        case 500:
          throw new Error('Server error - please try again later');
        default:
          throw new Error('Something went wrong - please try again');
      }
    }
  };

export const VendorService = {
    async listLot (data,id,username){
        console.log("Inside Sednig request to backend : ");
        // const {getCurrUserInfo} = useAuth();
        if(!id || !username){
            console.log("No User Info is present");
        }

        else{
            // let user = getCurrUserInfo.userInfo;
            console.log("User Trying to send the request is : ",username);
            console.log("Setting up the token in config");
            let token = localStorage.getItem("authToken");
            let config = {
              headers : {
                "Authorization" : `Bearer ${token}`
              }
            }
            try{
                let url = "/vendor/createItem";
                let data_to_send = JSON.parse(JSON.stringify(data));
                let imagesObj = {};  // To store images in nested structure

                console.log("Data before processing", data_to_send);
                console.log("For Data : ",data.auctionLotDetails[0].images[0]);
                data_to_send.auctionLotDetails.forEach((value, index) => {
                    imagesObj[value.auctionLotNumber] = value.images;  // Store images separately
                    delete data_to_send.auctionLotDetails[index].images;
                });
                // console.log("For Dat_to_send : ",imagesObj["1"]);
                console.log(data);

                data_to_send["username"] = username;
                data_to_send["loginId"] = id;

                // ✅ Create FormData object
                const formData = new FormData();
                console.log("Made FormData object");

                // ✅ Append JSON request data
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
                console.log("Data to send to backend", formData);
                
                const response = await apiService.post(url,formData,config);
                console.log(response);
                if (response.data.ErrorCode=="0"){
                    return true;
                }
            }catch(err){
                throw err.message;
            }
        }
    },
    async getAllItems(data){
      console.log("Inside Vendor service to load initial data");
      console.log("Login Id is",data);
      let url = `/vendor/getAllItems?loginId=${data}`
      let config = {
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem('authToken')}`
        }
      }
      console.log("Config is : ",config);
      const res = await apiService.get(url,config);
      if(res){
        // console.log("response is ",res.data);
        console.log("Type of response is : ",typeof(res));
        console.log("Object type of res.data is ",typeof(res.data));
        const res_json = res.data;
        console.log(res_json);
        return res_json;
      }
      return true;
    },
    async changeForm(data){
        console.log("Inside changing form data");
        let imgs = {};
        let new_data = data;
        data.auctionLotDetails.forEach((value,index)=>{
            console.log("hello",value);
            imgs[value.auctionLotNumber] = value.images;
            delete new_data.auctionLotDetails[index].images;
        });
        new_data['images'] = imgs;
        return new_data;
    }
};