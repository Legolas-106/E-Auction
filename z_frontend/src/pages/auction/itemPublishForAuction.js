import React from "react";
import { useState, useEffect } from "react";
import { ChevronDown,ChevronUp } from "lucide-react";
import { useAuth } from "../../services/auth/useAuthHook";
import { AuctionService } from "../../services/auction/auctionService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateTimeField from "./customDateTimeField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import $ from 'jquery';

<script src="../public/script/customeDateTime.js" ></script>



const ItemPublishPage = ({itemData, onSubmit, setPublishForm}) =>{
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});
    // const [hasChanges,setHasChanges] = useState(false);
    const [isEditing,setIsEditing] = useState(true);
    const [showLotDetails,setShowLotDetails] = useState(false);

    const getFormattedDate = (date) => date.toISOString().split("T")[0];

    const getFormattedTime = (date) =>
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

    const getAmPm = (date) => (date.getHours() >= 12 ? "PM" : "AM");

    const now = new Date();
    const auctionStart = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours ahead
    const auctionPublish = new Date(auctionStart.getTime() - 2 * 60 * 60 * 1000); // 2 hours before start
    const auctionEnd = new Date(auctionStart.getTime() + 5 * 60 * 1000); // 5 minutes after start

    
    const [publishFormData, setPublishFormData] = useState({
      auctionPublishDate: auctionPublish,
      // auctionPublishTime: '',
      // auctionPublishAmPm: '',
      minBidderRequired: '',
      auctionStartDate: auctionStart,
      // auctionStartTime: '',
      // auctionStartAmPm: '',
      auctionEndDate: auctionEnd,
      // auctionEndTime: '',
      // auctionEndAmPm: '',
      companyName: itemData?.companyName || '',
      auctionType: itemData?.auctionType || '',
      auctionDescription: itemData?.auctionDescription || '',
      auctionTitle: itemData?.auctionTitle || '',
      auctionLotType: itemData.auctionLotType,
      auctionLotDetails: itemData?.auctionLotDetails?.map(lotItem => ({
        ...lotItem,
        lotEMD: lotItem.lotEMD || '',
        lotAuctionAmount: lotItem.lotAuctionAmount || '',
        productCategory: lotItem.productCategory || '',
        lotWeight: lotItem.lotWeight || '',
        lotDescription: lotItem.lotDescription || '',
        lotAddress: lotItem.lotAddress || '',
        lotCity: lotItem.lotCity || '',
        lotState: lotItem.lotState || '',
        lotPostalCode: lotItem.lotPostalCode || '',
        lotSellerContactNumber: lotItem.lotSellerContactNumber || '',
        images : lotItem.images ? [...lotItem.images] : []
      })) || []
    });

    // console.log(publishFormData);

    // const [selectedLot, setSelectedLot] = useState({});
    //   useEffect(() => {
    //     // Initialize publishFormData with lot data
    //   setPublishFormData({
    //     auctionPublishDate: '',
    //     minBidderRequired : '',
    //     auctionStartDate: '',
    //     auctionEndDate : '',
    //     companyName: itemData.companyName,
    //     auctionType: itemData.auctionType,
    //     auctionDescription: itemData.auctionDescription || '',
    //     auctionTitle: itemData.auctionTitle || '',
    //     auctionLotDetails: itemData.auctionLotDetails?.map(lotItem => ({
    //       ...lotItem,
    //       lotEMD: lotItem.lotEMD || '',
    //       lotAuctionAmount: lotItem.lotAuctionAmount || '',
    //       productCategory: lotItem.productCategory || '',
    //       lotWeight: lotItem.lotWeight || '',
    //       lotDescription: lotItem.lotDescription || '',
    //       lotAddress: lotItem.lotAddress || '',
    //       lotCity: lotItem.lotCity || '',
    //       lotState: lotItem.lotState || '',
    //       lotPostalCode: lotItem.lotPostalCode || '',
    //       lotSellerContactNumber: lotItem.lotSellerContactNumber || '',
    //     })) || []
    //   });
    //   console.log("Updated Form Data is : ",publishFormData);
    // }, [itemData]);


    const handleInputChange = (e, lotIndex = null, field = null) => {
      const { name, value } = e.target;
      console.log("Change for field:", name, "Value:", value);
    
      // Special handling for date fields
      const dateFields = ['auctionPublishDate', 'auctionStartDate', 'auctionEndDate'];
      
      if (lotIndex !== null && field) {
        // Handle lot detail fields
        setPublishFormData(prev => ({
          ...prev,
          auctionLotDetails: prev.auctionLotDetails.map((lot, idx) =>
            idx === lotIndex ? { ...lot, [field]: value } : lot
          )
        }));
      } else {
        // Handle main fields
        setPublishFormData(prev => {
          // For date fields, ensure we're getting a valid date string
          if (dateFields.includes(name) && value) {
            // If the input is empty, you might want to handle it differently
            if (value === '') {
              return {
                ...prev,
                [name]: ''
              };
            }
            
            try {
              // Ensure the date is in the correct format
              const dateValue = new Date(value).toISOString().slice(0, 16);
              return {
                ...prev,
                [name]: dateValue
              };
            } catch (error) {
              console.error(`Invalid date for ${name}:`, error);
              return prev; // Return previous state if date is invalid
            }
          }
          
          // For non-date fields, handle normally
          return {
            ...prev,
            [name]: value
          };
        });
      }
    
      // Optional: Log the updated state
      // Note: Due to state updates being asynchronous, this log won't show the updated values immediately
      console.log("Current form data:", publishFormData);
      return true;
    };
    const handleDateChange = (date, field) => {
      setPublishFormData(prev => ({
          ...prev,
          [field]: date
      }));
  };
    console.log(publishFormData);
    const validateForm = () => {
      const newErrors = {};
  
      // Validate main fields
      if (!publishFormData.auctionDescription) {
        newErrors.auctionDescription = 'Auction description is required';
      }
      if (!publishFormData.auctionTitle) {
        newErrors.auctionTitle = 'Auction title is required';
      }

      if(!publishFormData.auctionPublishDate){
        newErrors.auctionPublishDate = "Auction Publish Date is required";
      }
      if(!publishFormData.auctionStartDate){
        newErrors.auctionStartDate = "Auction Start Date is required";
      }
      console.log("Date is ",publishFormData.auctionEndDate);
      if(!publishFormData.auctionEndDate){
        newErrors.auctionEndDate = "Auction End Date is required";
      }

      let publishDateTime = publishFormData.auctionPublishDate.getTime();
      let startDateTime = publishFormData.auctionStartDate.getTime();
      let endDateTime = publishFormData.auctionEndDate.getTime();
      let now = new Date().getTime();

      if (publishDateTime < now) {
          newErrors.auctionPublishDate = "Publish date and time must be in the future";
      }
      if (startDateTime < now) {
          newErrors.auctionStartDate = "Auction start date and time must be in the future";
      }
      if (endDateTime < now) {
          newErrors.auctionEndDate = "Auction end date and time must be in the future";
      }

      let twoHoursBeforeStart = startDateTime - 2 * 60 * 60 * 1000;
      let twoHoursBeforeEnd = endDateTime - 2 * 60 * 60 * 1000;
      if (publishDateTime > twoHoursBeforeStart || publishDateTime > twoHoursBeforeEnd) {
          newErrors.auctionPublishDate =
              "Publish date must be at least 2 hours before the start and end date";
      }

      let minDifference = 5 * 60 * 1000;
      if (endDateTime - startDateTime < minDifference) {
          newErrors.auctionEndDate =
              "Auction End Date must be at least 5 minutes after the Start Date";
      }
    
  
      // Validate lot details
      // publishFormData.auctionLotDetails.forEach((lot, index) => {
      //   if (!lot.lotDescription) {
      //     newErrors[`lot_${index}_description`] = 'Lot description is required';
      //   }
      //   if (!lot.lotAuctionAmount) {
      //     newErrors[`lot_${index}_amount`] = 'Auction amount is required';
      //   }
      //   if (!lot.lotEMD) {
      //     newErrors[`lot_${index}_emd`] = 'EMD is required';
      //   }
      // });
  
      setErrors(newErrors);
      console.log(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const calculateLotsValue = () => {
      // console.log("Calculating the lots value : ",publishFormData.auctionEndDate,publishFormData.auctionPublishDate,publishFormData.auctionStartDate);
      let amount = 0;
      // console.log(publishFormData,itemData);
      if(publishFormData.auctionLotDetails){
        publishFormData.auctionLotDetails.forEach((val,ndx)=>{
            console.log(parseInt(val.lotAuctionAmount));
            amount += parseInt(val.lotAuctionAmount);
        })
      }
      return amount;
    }

    const {getCurrUserInfo} = useAuth();
    const handleSubmit = async (e) => {
      console.log("Hey ",publishFormData);

      // console.log("publishFormData is ",publishFormData);
      // console.log("Auction End date is ",publishFormData.auctionEndDate);
      // if (!hasChanges) {
      //   console.log("Has changed")
      //   setIsEditing(false);
      //   return;
      // }
  
      if (!validateForm()) {
        console.log("Form is Not validated");

        return;
      }
  
      try {
        console.log("Sending the publish the item Data");
        const response = await AuctionService.publishAuction(publishFormData,getCurrUserInfo().id,getCurrUserInfo().username);
        console.log("Response ",response);
        if(response){
          Swal.fire({
            title: 'Success',
            text: "Item Saved Successfully",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#46ee46',
            cancelButtonColor: '#d3c94d',
            confirmButtonText: 'Ok',
            cancelButtonText : 'Go back to list item',
            showCloseButton : true
          }).then((result) => {
            if (result.isConfirmed) {
              // Perform the action (e.g., delete) here
              console.log("Now going back to Auction Page");
              navigate("/vendor/myItems");
              setPublishForm(null);
            }
            else{

            }
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    // const publishFormData = itemData;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex w-full items-center mb-4">
              <h3 className="text-lg w-full font-bold">Publish Item For Auction</h3>
              <button 
                onClick={() => setPublishForm(null)}
                className="text-gray-500 right-0 hover:text-gray-700 bg-gray-400 px-1 text-lg min-w-[10px] max-w-[30px] my-1"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 pb-2">
              <div className="col-span-2 bg-gray-50 p-3 rounded">
                <h4 className="font-semibold mb-2"> Publish Information</h4>
                <div className="grid grid-cols-2 gap-2">
                {/* Auction Publish Date */}
                <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Auction Publish Date
                    </label>
                    <DatePicker
                        selected={publishFormData.auctionPublishDate}
                        onChange={(date) => handleDateChange(date, "auctionPublishDate")}
                        showTimeSelect
                        dateFormat="MM/dd/yyyy h:mm aa"
                        className="w-full px-2 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 placeholder-gray-400 outline-none"
                        disabled={!isEditing}
                    />
                    {errors.auctionPublishDate && <p className="text-red-500 mt-1 text-sm">{errors.auctionPublishDate}</p>}
                </div>

                {/* Auction Start Date */}
                <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Auction Start Date
                    </label>
                    <DatePicker
                        selected={publishFormData.auctionStartDate}
                        onChange={(date) => handleDateChange(date, "auctionStartDate")}
                        showTimeSelect
                        dateFormat="MM/dd/yyyy h:mm aa"
                        className="w-full px-2 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 placeholder-gray-400 outline-none"
                        disabled={!isEditing}
                    />
                    {errors.auctionStartDate && <p className="text-red-500 mt-1 text-sm">{errors.auctionStartDate}</p>}
                </div>

                {/* Auction End Date */}
                <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Auction End Date
                    </label>
                    <DatePicker
                        selected={publishFormData.auctionEndDate}
                        onChange={(date) => handleDateChange(date, "auctionEndDate")}
                        showTimeSelect
                        dateFormat="MM/dd/yyyy h:mm aa"
                        className="w-full px-2 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 placeholder-gray-400 outline-none"
                        disabled={!isEditing}
                    />
                    {errors.auctionEndDate && <p className="text-red-500 mt-1 text-sm">{errors.auctionEndDate}</p>}
                </div>


                  {/* Min Bidder Required */}
                  <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Bidder Required
                    </label>
                    <input
                      type="number"
                      name="minBidderRequired"
                      value={publishFormData.minBidderRequired}
                      onChange={handleInputChange}
                      className="
                        w-full px-2 py-2.5
                        text-gray-700
                        bg-white
                        border border-gray-300 
                        rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        hover:border-blue-400
                        transition-colors duration-200
                        placeholder-gray-400
                        outline-none
                      "
                      readOnly={!isEditing}
                      min="0"
                    />
                  </div>
                </div>
              </div>  
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-gray-50 p-3 rounded">
                <h4 className="font-semibold mb-2">Basic Information</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input 
                      name="companyName"
                      value={publishFormData.companyName || ''}
                      className="w-full p-2 border rounded bg-gray-100"
                      readOnly 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Auction Type</label>
                    <input 
                      name="auctionType"
                      value={publishFormData.auctionType || ''}
                      className="w-full p-2 border rounded bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Auction Description
                      {errors.auctionDescription && (
                        <span className="text-red-500 text-xs ml-2">{errors.auctionDescription}</span>
                      )}
                    </label>
                    <input 
                      name="auctionDescription"
                      value={publishFormData.auctionDescription || ''}
                      className={`w-full p-2 border rounded`}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Auction Title
                      {errors.auctionTitle && (
                        <span className="text-red-500 text-xs ml-2">{errors.auctionTitle}</span>
                      )}
                    </label>
                    <input 
                      name="auctionTitle"
                      value={publishFormData.auctionTitle || ''}
                      // onChange={handleInputChange}
                      className={`w-full p-2 border rounded`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
    
              <div className="col-span-2 rounded p-1">
                <div className="flex flex-row w-full items-center justify-center gap-4">

                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Total Auction Amount</label>
                      <input 
                        type="text"
                        className='p-2 border rounded'
                        value={calculateLotsValue()}
                        readOnly
                      />
                  </div>
                </div>
    
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-base">Auction Lots</h4>
                    <div className='flex flex-row'>
                        <div className='px-4 py-2'>
                            <button onClick={() => setShowLotDetails(!showLotDetails)}>
                                {showLotDetails ? <div className='flex justify-between font-bold'>Hide Lot Details <ChevronUp size={20}/> </div>: (<div className='flex justify-between font-bold'>Show Lot Details <ChevronDown size={20}/> </div>)}
                            </button>
                        </div>
                        <div className="bg-blue-100 px-4 py-2 rounded-full">
                            Total Lots: {publishFormData.auctionLotDetails?.length || 0}
                        </div>
                    </div>
                  </div>
                {showLotDetails && 
                  <div className="space-y-4">
                    {publishFormData.auctionLotDetails?.map((lotItem, index) => (
                      <div key={index} className="bg-white border rounded-lg shadow-sm p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-semibold">Lot #{lotItem.auctionLotNumber}</h5>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-600">
                              EMD
                              {errors[`lot_${index}_emd`] && (
                                <span className="text-red-500 text-xs ml-2">{errors[`lot_${index}_emd`]}</span>
                              )}
                            </label>
                            <input
                              value={lotItem.lotEMD}
                              className={`p-2 border rounded
                                ${errors[`lot_${index}_emd`] ? 'border-red-500' : ''}`}
                              readOnly
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-600">Category</label>
                            <input
                              value={lotItem.productCategory}
                              className={`w-full p-2 border rounded`}
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">
                              Amount
                              {errors[`lot_${index}_amount`] && (
                                <span className="text-red-500 text-xs ml-2">{errors[`lot_${index}_amount`]}</span>
                              )}
                            </label>
                            <input
                              value={lotItem.lotAuctionAmount}
                              className={`w-full p-2 border rounded
                                ${errors[`lot_${index}_amount`] ? 'border-red-500' : ''}`}
                              readOnly
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="text-sm text-gray-600">
                              Description
                              {errors[`lot_${index}_description`] && (
                                <span className="text-red-500 text-xs ml-2">{errors[`lot_${index}_description`]}</span>
                              )}
                            </label>
                            <textarea
                              value={lotItem.lotDescription}
                              className={`w-full p-2 border rounded
                                ${errors[`lot_${index}_description`] ? 'border-red-500' : ''}`}
                              readOnly
                            />
                          </div>
                          <div className="col-span-2 grid grid-cols-2 gap-4">
                            <input
                              placeholder="Address"
                              value={lotItem.lotAddress}
                              className={`p-2 border rounded`}
                              readOnly
                            />
                            <input
                              placeholder="City"
                              value={lotItem.lotCity}
                              className={`p-2 border rounded`}
                              readOnly
                            />
                            <input
                              placeholder="State"
                              value={lotItem.lotState}
                              className={`p-2 border rounded`}
                              readOnly
                            />
                            <input
                              placeholder="Postal Code"
                              value={lotItem.lotPostalCode}
                              className={`p-2 border rounded`}
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Contact</label>
                            <input
                              value={lotItem.lotSellerContactNumber}
                              className={`w-full p-2 border rounded`}
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Weight</label>
                            <input
                              value={lotItem.lotWeight}
                              className={`w-full p-2 border rounded`}
                              readOnly
                            />
                          </div>
                          <div className="space-y-2">
                            {lotItem.images && (<div>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                  {lotItem.images.map((image, imageIndex) => (
                                  <div key={imageIndex} className="relative group">
                                      <img
                                      src={image.url}
                                      alt={`Lot ${index + 1} image ${imageIndex + 1}`}
                                      className="w-full h-24 object-cover rounded-lg"
                                      />
                                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 rounded-lg" />
                                  </div>
                                  ))}
                              </div>
                            </div>)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                }
                </div>
              </div>
            </div>
    
            <div className="w-full flex flex-row justify-end mt-4 gap-2">
              
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setPublishFormData(itemData);
                  setErrors({});
                  // setHasChanges(false);
                  setPublishForm(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className='px-4 py-2 rounded focus:ring-2 focus:ring-offset-2 transition-colors
                  bg-green-500 text-white hover:bg-green-600 focus:ring-green-500' 
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      );
}

export default ItemPublishPage;