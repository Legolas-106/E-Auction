import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, AlertCircle, X, Trash2 } from 'lucide-react';
import { GiCrossMark } from "react-icons/gi";
import { useAuth } from '../../services/auth/useAuthHook';
import { VendorService } from '../../services/vendor/vendorService';
import ItemPublishPage from '../auction/itemPublishForAuction';


const ListItemForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    auctionType: "",
    auctionTitle: "",
    auctionDescription: "",
    auctionLotType: "single",
    auctionLotDetails: [{
      auctionLotNumber: "1",
      productCategory: "",
      lotWeight: "",
      lotDescription: "",
      lotAddress: "",
      lotCity : "",
      lotState : "",
      lotPostalCode : "",
      lotSellerContactNumber: "",
      lotEMD: "",
      lotAuctionAmount: "",
      images: [],
    }],
    // totalWieght: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [publishForm, setPublishForm] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.auctionType) newErrors.auctionType = "Auction type is required";
    if (!formData.auctionTitle) newErrors.auctionTitle = "Auction title is required";
    
    const phoneRegex = /^\d{10}$/;
    // if (!phoneRegex.test(formData.sellerContactNumber)) {
    //   newErrors.sellerContactNumber = "Enter valid 10-digit number";
    // }

    const lotErrors = formData.auctionLotDetails.map((lot, index) => {
      const lotError = {};
      if (!lot.auctionLotNumber) lotError.auctionLotNumber = "Lot number required";
      if (!lot.productCategory) lotError.productCategory = "Category required";
      if (!lot.lotWeight) lotError.lotWeight = "Weight required";
      if (!lot.lotDescription) lotError.lotDescription = "Lot Description is required";
      if (!lot.lotAddress) lotError.lotAddress = "Lot Address is required";
      if (!lot.lotCity) lotError.lotCity = "Lot City is required";
      if (!lot.lotState) lotError.lotState = "Lot State is required";
      if (!lot.lotPostalCode) lotError.lotPostalCode = "Lot Postal Code is required";
      if (!lot.lotSellerContactNumber || !phoneRegex.test(lot.lotSellerContactNumber)) lotError.lotSellerContactNumber = "Lot Seller Contact number is required in correct format";



      if (!lot.images || lot.images.length === 0) lotError.images = "At least 1 image required";
      return Object.keys(lotError).length ? lotError : null;
    });

    if (lotErrors.some(error => error !== null)) {
      newErrors.auctionLotDetails = lotErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLotChange = (index, field, value) => {
    setFormData(prev => {
      const newLots = [...prev.auctionLotDetails];
      newLots[index] = {
        ...newLots[index],
        [field]: value
      };
      return {
        ...prev,
        auctionLotDetails: newLots
      };
    });
  };

  const handleImageUpload = (index, event) => {
    const files = Array.from(event.target.files);
    const lot = formData.auctionLotDetails[index];
    
    if (lot.images.length + files.length > 10) {
      setAlerts(prev => [...prev, {
        type: 'error',
        message: 'Maximum 10 images allowed per lot'
      }]);
      return;
    }

    console.log("New Image is : ", files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));

    handleLotChange(index, 'images', [...lot.images, ...newImages]);
  };

  const removeImage = (lotIndex, imageIndex) => {
    console.log("Remove image is called");
    const lot = formData.auctionLotDetails[lotIndex];
    const newImages = lot.images.filter((_, idx) => idx !== imageIndex);
    handleLotChange(lotIndex, 'images', newImages);
  };

  const removeAllImages = (lotIndex) => {
    handleLotChange(lotIndex, 'images', []);
    setAlerts(prev => [...prev, {
      type: 'info',
      message: `All images removed from Lot ${lotIndex + 1}`
    }]);
  };

  const addLot = () => {
    setFormData(prev => ({
      ...prev,
      auctionLotDetails: [...prev.auctionLotDetails, {
        auctionLotNumber: formData.auctionLotDetails.length+1,
        productCategory: "",
        lotAddress: "",
        lotCity : "",
        lotState : "",
        lotPostalCode : "",
        lotSellerContactNumber : "",
        lotEMD: "",
        lotAuctionAmount: "",
        lotWeight: "",
        lotDescription: "",
        images: [],
      }]
    }));
  };

  const removeLot = (index) => {
    setFormData(prev => ({
      ...prev,
      auctionLotDetails: prev.auctionLotDetails.filter((_, i) => i !== index)
    }));
  };
  const {getCurrUserInfo} = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (validateForm()) {
      console.log("Form submitted:",  );
      console.log("Sending the data to save");
      if(getCurrUserInfo()){
        const response = await VendorService.listLot(formData,getCurrUserInfo().id,getCurrUserInfo().username);
        console.log(response);
        if(response){
          alert("Items have been listed");
        }
      }

    } else {
      setAlerts(prev => [...prev, {
        type: 'error',
        message: 'Please fix the form errors before submitting'
      }]);
    }
  };

  const removeAlert = (index) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };
  useEffect(()=>{
    console.log("Checking Value to pre-filled in the form");
    if(!formData.companyName){
      console.log("Company Name need to be pre-filled");
      if(getCurrUserInfo()){
        let userCompanyName = getCurrUserInfo().companyInfo.companyName;
        console.log(userCompanyName);
        setFormData(prev=>({
          ...prev,
          companyName : userCompanyName
        }));
      }
    }
  });
  const fillDefaultAddress = (index,e) =>{
    console.log("Filling the Default Address in Lot");
    let lotDetail = formData.auctionLotDetails[index];
    console.log(lotDetail);
    if(getCurrUserInfo()){
      let locationDetail = getCurrUserInfo().locationInfo;
      lotDetail.lotAddress = locationDetail.address;
      lotDetail.lotCity = locationDetail.city;
      lotDetail.lotState = locationDetail.state;
      lotDetail.lotPostalCode = locationDetail.postalCode;
      lotDetail.lotSellerContactNumber = locationDetail.phoneNumber;

      setFormData(prevFormData=>{
        const updatedLotDetails = [...prevFormData.auctionLotDetails];
        updatedLotDetails[index] = lotDetail;
        return {
          ...prevFormData,
          auctionLotDetails : updatedLotDetails
        };
      });
    }
    else{
      alert("Address info not found, avoid this method");
      return false;

    }
  };

  const handlePublishAuctionSubmit = async (e) =>{
    console.log("Handling publish the item for Auction");
    e.preventDefault();
    setSubmitted(true);
    console.log("VAlidating the form data");

    if(validateForm()){
        console.log("Form is validated");
        console.log("Previewing The AuctionPublishPage");
        setPublishForm(formData);
        
    }
    else{
      console.log("Got Errors");
      if(alerts.length){
        console.log("Alerts are already setted",alerts);
      }
      else{
        console.log("Setting the alerts");
        setAlerts(prev => [...prev,{
          type: 'error',
          message: 'Please fix the form errors before submitting'
        }]);
      }
    }
    setSubmitted(false);
    return false;
  }

  return (
    <div className='w-full flex flex-col relative bg-gray-50'>
        <div className='pt-2 mt-2'>
          <h2>Lot Detail Form</h2>
        </div>
        <div className="w-full max-w-4xl mx-auto p-6">
          {/* Alerts */}
          <div className="space-y-2 mb-4">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-4 rounded-lg ${
                  alert.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}
              >
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>{alert.message}</span>
                </div>
                <button 
                  onClick={() => removeAlert(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Previous form fields remain the same */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    // onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                    readOnly
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Auction Description</label>
                    <textarea
                      placeholder="Auction Description"
                      name='auctionDescription'
                      value={formData.auctionDescription}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.auctionDescription ? 'border-red-500' : 'border-gray-300'}`}
                      rows={3}
                    />
                </div>
              </div>

              {/* Auction Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Auction Type</label>
                  <select
                    name="auctionType"
                    value={formData.auctionType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Type</option>
                    <option value="forward">Forward</option>
                    <option value="reverse">Reverse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Auction Title</label>
                  <input
                    type="text"
                    name="auctionTitle"
                    value={formData.auctionTitle}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Lot Type Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Lot Type</label>
                <select
                  name="auctionLotType"
                  value={formData.auctionLotType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="single">Single Lot</option>
                  <option value="multiple">Multiple Lots</option>
                </select>
              </div>

              {/* Lot Details */}
              <div className="space-y-4">
                {formData.auctionLotType === "multiple" && (
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Total Lots: {formData.auctionLotDetails.length}</h3>
                    <button
                      type="button"
                      onClick={addLot}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <PlusCircle className="w-5 h-5 mr-1" />
                      Add Lot
                    </button>
                  </div>
                )}

                {formData.auctionLotDetails.map((lot, index) => (
                  <div key={index} className="px-4 pb-4 pt-1 border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium">Lot {index + 1}</h4>
                      {formData.auctionLotType === "multiple" && (
                        <button
                          type="button"
                          onClick={() => removeLot(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <MinusCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <label htmlFor="lotId" className="block text-sm font-medium text-gray-700">
                          Lot ID
                        </label>
                        <input
                          id="lotId"
                          type="text"
                          value={lot.auctionLotNumber}
                          className="w-full p-2 border rounded-md bg-gray-50"
                          readOnly
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Product Category
                        </label>
                        <select
                          id="category"
                          value={lot.productCategory}
                          onChange={(e) => handleLotChange(index, 'productCategory', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">--Select--</option>
                          <option value="metal">Metal</option>
                          <option value="plastic">Plastic</option>
                          <option value="paper">Paper</option>
                          <option value="e-wast">E-Waste</option>
                          <option value="glass">Glass</option>
                          <option value="EMV vehicle">EMV Vehicle</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                          Weight
                        </label>
                        <input
                          id="weight"
                          type="text"
                          placeholder="Weight"
                          value={lot.lotWeight}
                          onChange={(e) => handleLotChange(index, 'lotWeight', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="emd" className="block text-sm font-medium text-gray-700">
                          EMD Amount
                        </label>
                        <input
                          id="emd"
                          type="text"
                          placeholder="EMD Amount"
                          value={lot.lotEMD}
                          onChange={(e) => handleLotChange(index, 'lotEMD', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="auctionAmount" className="block text-sm font-medium text-gray-700">
                          Auction Amount
                        </label>
                        <input
                          id="auctionAmount"
                          type="text"
                          placeholder="Auction Amount"
                          value={lot.lotAuctionAmount}
                          onChange={(e) => handleLotChange(index, 'lotAuctionAmount', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Lot Address
                        </label>
                        <input
                          id="address"
                          type="text"
                          placeholder="Lot Address"
                          value={lot.lotAddress}
                          onChange={(e) => handleLotChange(index, 'lotAddress', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          placeholder="Lot City"
                          value={lot.lotCity}
                          onChange={(e) => handleLotChange(index, 'lotCity', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          id="state"
                          type="text"
                          placeholder="Lot State"
                          value={lot.lotState}
                          onChange={(e) => handleLotChange(index, 'lotState', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                          Postal Code
                        </label>
                        <input
                          id="postalCode"
                          type="text"
                          placeholder="Lot Postal Code"
                          value={lot.lotPostalCode}
                          onChange={(e) => handleLotChange(index, 'lotPostalCode', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                            Contact Number
                          </label>
                          <input
                            id="contactNumber"
                            type="tel"
                            placeholder="Contact Number"
                            value={lot.lotSellerContactNumber}
                            onChange={(e) => handleLotChange(index, 'lotSellerContactNumber', e.target.value)}
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="useRegisteredAddress"
                            onChange={(e) => fillDefaultAddress(index, e)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="useRegisteredAddress"
                            className="text-sm font-medium text-gray-700"
                          >
                            Use registered address
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <textarea
                      placeholder="Lot Description"
                      value={lot.lotDescription}
                      onChange={(e) => handleLotChange(index, 'lotDescription', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      rows={3}
                    />

                    {/* Image Upload Section */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">
                            Images ({lot.images.length}/10)
                        </label>
                        <div className="flex items-center gap-2">
                            {lot.images.length > 0 && (
                            <button
                                type="button"
                                onClick={() => removeAllImages(index)}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove All
                            </button>
                            )}
                            <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageUpload(index, e)}
                            className="hidden"
                            id={`lot-images-${index}`}
                            disabled={lot.images.length >= 10}
                            />
                            <label
                            htmlFor={`lot-images-${index}`}
                            className={`cursor-pointer inline-flex items-center px-4 py-2 rounded-md text-sm font-medium
                                ${lot.images.length >= 10 
                                ? 'bg-gray-300 text-gray-500'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                            Upload Images
                            </label>
                        </div>
                        </div>
                        
                        {errors.auctionLotDetails?.[index]?.images && (
                        <p className="text-red-500 text-sm">{errors.auctionLotDetails[index].images}</p>
                        )}

                        {/* Enhanced Image Preview Grid */}
                        {lot.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {lot.images.map((image, imageIndex) => (
                            <div key={imageIndex} className="relative group">
                                <img
                                src={image.url}
                                alt={`Lot ${index + 1} image ${imageIndex + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                                />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index, imageIndex)}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 border-double border-gray-300 rounded-full p-1
                                      opacity-50 group-hover:opacity-100 transition-opacity duration-200 z-10 cursor-pointer hover:opacity-100
                                      flex items-center justify-center"
                                    title="Remove image"
                                  >
                                    <GiCrossMark className="w-4 h-4 text-white" />
                                  </button>
                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 rounded-lg" />
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <div className='flex justify-between'>
                <button
                  type="button"
                  onClick={(e)=>handlePublishAuctionSubmit(e)}
                  className="bg-yellow-200 text-black px-6 mx-1 py-2 rounded-md hover:bg-yellow-500"
                >
                  Publish for Auction
                </button>
                <button
                  type="submit"
                  className="bg-lime-600 text-black mx-1 px-6 py-2 rounded-md hover:bg-lime-800"
                >
                  Submit Lot Form
                </button>
              </div>
            </div>

            {/* Error Summary */}
            {submitted && Object.keys(errors).length > 0 && (
              <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <h3 className="font-medium">Please fix the following errors:</h3>
                </div>
                <ul className="mt-2 list-disc list-inside">
                  {Object.entries(errors).map(([key, value]) => {
                    if (key === 'auctionLotDetails') {
                      return value.map((lotError, index) => {
                        if (lotError) {
                          return Object.entries(lotError).map(([field, error]) => (
                            <li key={`${index}-${field}`} className="ml-4">
                              Lot {index + 1}: {error}
                            </li>
                          ));
                        }
                        return null;
                      });
                    }
                    return (
                      <li key={key} className="ml-4">
                        {value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </form>
        </div>
        <div className='relative'>
          {publishForm && < ItemPublishPage itemData={formData} setPublishForm={setPublishForm} />}
        </div>
    </div>
  );
};

export default ListItemForm;