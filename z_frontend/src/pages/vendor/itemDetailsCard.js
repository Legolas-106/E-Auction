import { ChevronUp, ChevronDown } from 'lucide-react';
import React, { useState, useEffect, use } from 'react';

const LotDetailCard = ({ item, setSelectedItem, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showLotDetails,setShowLotDetails] = useState(false);
  const [errors, setErrors] = useState({});
  console.log(item);
  useEffect(() => {
    // Initialize formData with lot data
    setFormData({
      companyName: item.companyName,
      auctionType: item.auctionType,
      auctionDescription: item.auctionDescription || '',
      auctionTitle: item.auctionTitle || '',
      auctionStartDate: item.auctionStartDate || '',
      auctionEndDate: item.auctionEndDate || '',
      minBidderRequired : item.minBidderRequired || '',
      minBidIncrement : item.minBidIncrement || '',
      auctionPublishDate: item.auctionPublishDate || '',
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

  const validateForm = () => {
    const newErrors = {};

    // Validate main fields
    if (!formData.auctionDescription) {
      newErrors.auctionDescription = 'Auction description is required';
    }
    if (!formData.auctionTitle) {
      newErrors.auctionTitle = 'Auction title is required';
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
          <h3 className="text-xl font-bold">Item Details</h3>
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
                  className="w-full p-2 border rounded bg-gray-100"
                  readOnly 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Auction Type</label>
                <input 
                  name="auctionType"
                  value={formData.auctionType || ''}
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
            </div>
          </div>

          <div className="col-span-2 rounded p-1">
            <div className="flex flex-row w-full items-center justify-center gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Auction Start Date</label>
                <input 
                  type="date"
                  name="auctionStartDate"
                  value={formData.auctionStartDate || ''}
                  onChange={handleInputChange}
                  className={`p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Auction Publish Date</label>
                <input 
                  type="date"
                  name="auctionPublishDate"
                  value={formData.auctionPublishDate || ''}
                  onChange={handleInputChange}
                  className={`p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  readOnly={!isEditing}
                />
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
                        <input
                          placeholder="Address"
                          value={lotItem.lotAddress}
                          onChange={(e) => handleInputChange(e, index, 'lotAddress')}
                          className={`p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                          readOnly={!isEditing}
                        />
                        <input
                          placeholder="City"
                          value={lotItem.lotCity}
                          onChange={(e) => handleInputChange(e, index, 'lotCity')}
                          className={`p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                          readOnly={!isEditing}
                        />
                        <input
                          placeholder="State"
                          value={lotItem.lotState}
                          onChange={(e) => handleInputChange(e, index, 'lotState')}
                          className={`p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                          readOnly={!isEditing}
                        />
                        <input
                          placeholder="Postal Code"
                          value={lotItem.lotPostalCode}
                          onChange={(e) => handleInputChange(e, index, 'lotPostalCode')}
                          className={`p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                          readOnly={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Contact</label>
                        <input
                          value={lotItem.lotSellerContactNumber}
                          onChange={(e) => handleInputChange(e, index, 'lotSellerContactNumber')}
                          className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
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
                      <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">Start Date</label>
                          <input
                            type="date"
                            value={lotItem.lotAuctionStartDate}
                            onChange={(e) => handleInputChange(e, index, 'lotAuctionStartDate')}
                            className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            readOnly={!isEditing}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">End Date</label>
                          <input
                            type="date"
                            value={lotItem.lotAuctionEndDate}
                            onChange={(e) => handleInputChange(e, index, 'lotAuctionEndDate')}
                            className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            readOnly={!isEditing}
                          />
                        </div>
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