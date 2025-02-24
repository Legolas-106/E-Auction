import { ChevronUp, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import React, { useState, useEffect, use } from 'react';
import { formatISO } from 'date-fns';

const LotDetailCard = ({ item, setSelectedItem, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showLotDetails,setShowLotDetails] = useState(false);
  const [errors, setErrors] = useState({});
  console.log(item);
  const now = new Date();


  // Setting the formData
  useEffect(() => {
    // Initialize formData with lot data
    setFormData({
      companyName: item.companyName,
      auctionType: item.auctionType,
      auctionDescription: item.auctionDescription || '',
      auctionTitle: item.auctionTitle || '',
      auctionStartDate: item.auctionStartDate || new Date(now.getTime() + 3*60*60*1000 ),
      auctionEndDate: item.auctionEndDate || new Date(now.getTime() + 3*60*60*1000 + 5*60*1000),
      minBidderRequired : item.minBidderRequired || '0',
      minBidIncrement : item.minBidIncrement || '1%',
      auctionPublishDate: item.auctionPublishDate || new Date(now.getTime() + 2*60*60*1000),
      auctionLotDetails: item.lots?.map(lotItem => ({
        ...lotItem,
        lotEMD: lotItem.emd || '',
        lotAuctionAmount: lotItem.auctionAmount || '',
        productCategory: lotItem.productCategory || '',
        lotWeight: lotItem.weight || '',
        lotDescription: lotItem.lotDescription || '',
        lotAddress: lotItem.address || '',
        lotCity: lotItem.city || '',
        lotState: lotItem.state || '',
        lotPostalCode: lotItem.postalCode || '',
        lotSellerContactNumber: lotItem.contactNumber || '',
      })) || []
    });
  }, [item]);

  const handleInputChange = (e, lotIndex = null, field = null) => {
    const { name, value } = e.target;
    
    setHasChanges(true);
    
    if (lotIndex !== null && field) {
      // Handle lot detail fields
      setFormData(prev => ({
        ...prev,
        auctionLotDetails: prev.auctionLotDetails.map((lot, idx) =>
          idx === lotIndex ? { ...lot, [field]: value } : lot
        )
      }));
    } else {
      // Handle main fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (date,field) =>{
    setFormData((prev)=>({
      ...prev,
      [field] : date
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate main fields
    if (!formData.auctionDescription) {
      newErrors.auctionDescription = 'Auction description is required';
    }
    if (!formData.auctionTitle) {
      newErrors.auctionTitle = 'Auction title is required';
    }

    if(!formData.auctionStartDate){
      newErrors.auctionStartDate = "Auction Start Date is required";
    }
    if(!formData.auctionEndDate){
      newErrors.auctionEndDate = "Auction End Date is required"
    }

    if(!formData.auctionPublishDate){
      newErrors.auctionPublishDate = "Auction Publish Date is required"
    }

    //Checking time differences between them
    let publishDateTime = formData.auctionPublishDate;
    let startDateTime = formData.auctionStartDate;
    let endDateTime = formData.auctionEndDate;
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
    formData.auctionLotDetails.forEach((lot, index) => {
      if (!lot.lotDescription) {
        newErrors[`lot_${index}_description`] = 'Lot description is required';
      }
      if (!lot.lotAuctionAmount) {
        newErrors[`lot_${index}_amount`] = 'Auction amount is required';
      }
      if (!lot.lotEMD) {
        newErrors[`lot_${index}_emd`] = 'EMD is required';
      }
      if (!lot.lotAddress){
        newErrors[`lot_${index}_address`] = "Lot Address is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateLotsValue = () => {
    console.log("Calculating the lots value");
    let amount = 0;
    if(formData.auctionLotDetails){
      formData.auctionLotDetails.forEach((val,ndx)=>{
          console.log(parseInt(val.lotAuctionAmount));
          amount += parseInt(val.lotAuctionAmount);
      })
    }
    return amount;
  }
  const handleSubmit = async () => {
    if (!hasChanges) {
      setIsEditing(false);
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      setIsEditing(false);
      setHasChanges(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{"zIndex":"1000"}}>
      <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-bold">Item Details</h3>
          <button 
            onClick={() => setSelectedItem(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-gray-50 p-3 rounded">
            <h4 className="font-semibold mb-2">Basic Information</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input 
                  name="companyName"
                  value={formData.companyName || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-gray-100"
                  readOnly 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Auction Type</label>
                <input 
                  name="auctionType"
                  value={formData.auctionType || ''}
                  onChange={handleInputChange}
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
                  value={formData.auctionDescription || ''}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'} 
                    ${errors.auctionDescription ? 'border-red-500' : ''}`}
                  readOnly={!isEditing}
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
                  value={formData.auctionTitle || ''}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}
                    ${errors.auctionTitle ? 'border-red-500' : ''}`}
                  readOnly={!isEditing}
                />
              </div>
                         {/* Auction Start Date */}

            </div>
            <div className='grid grid-cols-3 gap-2 mt-3'>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Auction Publish Date</label>
                <DatePicker 
                  selected={formData.auctionPublishDate}
                  showTimeSelect
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="w-full px-2 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 placeholder-gray-400 outline-none"
                  onChange={(date)=>handleDateChange(date,"auctionPublishDate")}
                />
                {errors.auctionPublishDate && <p className="text-red-500 mt-1 text-sm">{errors.auctionPublishDate}</p>}
              </div>
              <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                      Auction Start Date
                  </label>
                  <DatePicker
                      selected={formData.auctionStartDate}
                      onChange={(date) => handleDateChange(date, "auctionStartDate")}
                      showTimeSelect
                      dateFormat="MM/dd/yyyy h:mm aa"
                      className="w-full px-2 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 placeholder-gray-400 outline-none"
                  />
                  {errors.auctionStartDate && <p className="text-red-500 mt-1 text-sm">{errors.auctionStartDate}</p>}
              </div>
              <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                      Auction End Date
                  </label>
                  <DatePicker
                      selected={formData.auctionEndDate}
                      onChange={(date) => handleDateChange(date, "auctionEndDate")}
                      showTimeSelect
                      dateFormat="MM/dd/yyyy h:mm aa"
                      className="w-full px-2 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 placeholder-gray-400 outline-none"
                  />
                  {errors.auctionEndDate && <p className="text-red-500 mt-1 text-sm">{errors.auctionEndDate}</p>}
              </div>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                    Min Bidder Required
                </label>
                <input
                  type='text'
                  className='p-2 border rounded'
                  value={formData.minBidderRequired}
                  onChange={handleInputChange}
                />
                {errors.minBidderRequired && <p className='form-error'>{errors.minBidderRequired}</p>}
              </div>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                    Bid Increment Rate
                </label>
                <input
                  type='text'
                  className='p-2 border rounded'
                  value={formData.minBidIncrement}
                  onChange={handleInputChange}
                />
                {errors.minBidIncrement && <p className='form-error'>{errors.minBidIncrement}</p>}
              </div>
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
          </div>

          <div className="col-span-2 rounded p-1">
            <div className="flex flex-row w-full items-center justify-center gap-4">
              {/* <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Auction Start Date</label>
                <input 
                  type="date"
                  name="auctionStartDate"
                  value={formData.auctionStartDate || ''}
                  onChange={handleInputChange}
                  className={`p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  readOnly={!isEditing}
                />
              </div> */}
   
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg">Auction Lots</h4>
                <div className='flex flex-row'>
                    <div className='px-4 py-2'>
                        <button onClick={() => setShowLotDetails(!showLotDetails)}>
                            {showLotDetails ? <div className='flex justify-between font-bold'>Hide Lot Details <ChevronUp size={20}/> </div>: (<div className='flex justify-between font-bold'>Show Lot Details <ChevronDown size={20}/> </div>)}
                        </button>
                    </div>
                    <div className="bg-blue-100 px-4 py-2 rounded-full">
                        Total Lots: {formData.auctionLotDetails?.length || 0}
                    </div>
                </div>
              </div>
            {showLotDetails && 
              <div className="space-y-4">
                {formData.auctionLotDetails?.map((lotItem, index) => (
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
                          onChange={(e) => handleInputChange(e, index, 'lotEMD')}
                          className={`p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}
                            ${errors[`lot_${index}_emd`] ? 'border-red-500' : ''}`}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Category</label>
                        <input
                          value={lotItem.productCategory}
                          onChange={(e) => handleInputChange(e, index, 'productCategory')}
                          className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                          readOnly={!isEditing}
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
                          onChange={(e) => handleInputChange(e, index, 'lotAuctionAmount')}
                          className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}
                            ${errors[`lot_${index}_amount`] ? 'border-red-500' : ''}`}
                          readOnly={!isEditing}
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
                          onChange={(e) => handleInputChange(e, index, 'lotDescription')}
                          className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}
                            ${errors[`lot_${index}_description`] ? 'border-red-500' : ''}`}
                          readOnly={!isEditing}
                        />
                      </div>
                      <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div className='space-y-2'>
                          <label className='form-label-center'>
                              Lot Address
                              {errors[`lot_${index}_address`] && (
                                <span className="text-red-500 text-xs ml-2">{errors[`lot_${index}_address`]}</span>
                              )}
                          </label>
                          <input
                            placeholder="Address"
                            value={lotItem.lotAddress}
                            onChange={(e) => handleInputChange(e, index, 'lotAddress')}
                            className={`form-input ${isEditing ? 'bg-white' : 'bg-gray-100'}
                            ${errors[`lot_${index}_address`] ? 'border-red-500' : ''}`}
                            readOnly={!isEditing}
                          />
                        </div>
                        <div className='space-y-2'>
                          <label className='form-label-center'>
                              Lot City
                              {errors[`lot_${index}_city`] && (
                                <span className="text-red-500 text-xs ml-2">{errors[`lot_${index}_city`]}</span>
                              )}
                          </label>
                          <input
                            placeholder="City"
                            value={lotItem.lotCity}
                            onChange={(e) => handleInputChange(e, index, 'lotCity')}
                            className={`form-input ${isEditing ? 'bg-white' : 'bg-gray-100'}
                            ${errors[`lot_${index}_city`] ? 'border-red-500' : ''}`}
                            readOnly={!isEditing}
                          />
                        </div>
                        <div className='space-y-2'>
                          <label className='form-label-center'>
                              Lot State
                              {errors[`lot_${index}_state`] && (
                                <span className="text-red-500 text-xs ml-2">{errors[`lot_${index}_state`]}</span>
                              )}
                          </label>
                          <input
                            placeholder="State"
                            value={lotItem.lotState}
                            onChange={(e) => handleInputChange(e, index, 'lotState')}
                            className={`form-input ${isEditing ? 'bg-white' : 'bg-gray-100'}
                            ${errors[`lot_${index}_state`] ? 'border-red-500' : ''}`}
                            readOnly={!isEditing}
                          />
                        </div>
                        <div className='space-y-2'>
                          <label className='form-label-center'>
                              Lot Postal Code
                              {errors[`lot_${index}_postalCode`] && (
                                <span className="text-red-500 text-xs ml-2">{errors[`lot_${index}_postalCode`]}</span>
                              )}
                          </label>
                          <input
                            placeholder="Postal Code"
                            value={lotItem.lotPostalCode}
                            onChange={(e) => handleInputChange(e, index, 'lotPostalCode')}
                            className={`form-input ${isEditing ? 'bg-white' : 'bg-gray-100'}
                            ${errors[`lot_${index}_postalCode`] ? 'border-red-500' : ''}`}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Contact</label>
                        <input
                          value={lotItem.lotSellerContactNumber}
                          onChange={(e) => handleInputChange(e, index, 'lotSellerContactNumber')}
                          className={`w-full form-input ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                          readOnly={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Weight</label>
                        <input
                          value={lotItem.lotWeight}
                          onChange={(e) => handleInputChange(e, index, 'lotWeight')}
                          className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                          readOnly={!isEditing}
                        />
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
          {!isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Edit Details
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setFormData(item);
                  setErrors({});
                  setHasChanges(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className={`px-4 py-2 rounded focus:ring-2 focus:ring-offset-2 transition-colors
                  ${hasChanges 
                    ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                disabled={!hasChanges}
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LotDetailCard;