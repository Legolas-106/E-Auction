import React, { useState, useImperativeHandle,useEffect } from "react";
import { RefreshCcw } from 'lucide-react';
import { Card, CardContent } from '@mui/material';
import { useAuth } from "../../services/auth/useAuthHook";
import { BasicUserAuctionService } from "../../services/auction/basicUserService";

const AuctionSearchForm = React.forwardRef(({setTheData}, ref) => {
  const [data,setData] = useState(null);
  const [formData, setFormData] = useState({
    lotType: '',
    auctionId: '',
    keyword: '',
    auctionType: '',
    productCategory: '',
    fromDate: '',
    toDate: '',
    auctionStatus : '',
  });

  const populateTheFields = () =>{
    console.log("Now populating the fields");
    console.log(data);
    setTheData(data);
  }
  const {getCurrUserInfo} = useAuth();
  useEffect(() => {
    const fetchSearchData = async () => {
        try {
            console.log("Inside searching the auctions");
            const res = await BasicUserAuctionService.searchAuction(formData);
            console.log("Res is ",res);
            if (res?.success) {
              console.log("Setting up the data");
              setData(res);
            } else {
                console.warn("No valid data received.");
            }
        } catch (error) {
            console.error("Error fetching auction information:", error);
            setData({ success: false, message: error.message });
        }
    };

    fetchSearchData();
  }, []);

  useEffect(()=>{
    if(data){
      populateTheFields();
    }
  },[data]);

  // Define visible fields - this could come from props or context
  const visibleFields = {
    lotType: true,
    auctionId: true,
    keyword: true,
    productCategory: true,
    fromDate : true,
    toDate : true,
  };

  const handleFormFieldChange = (field) =>{
    console.log("Inside form field renedrer");
    if(field.length === 0){
      console.log("No fields are present");
      for(const key in visibleFields){
        visibleFields[key] = true;
      }
      return true;
    }
    console.log("Inside form field renedrer");
    field.forEach((ele)=>{
        if(visibleFields.hasOwnProperty(ele)){
          visibleFields[ele] = 'true';
        }
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
  };

  const renderField = (fieldName, component) => {
    if (!visibleFields[fieldName]) return null;
    return component;
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {renderField('productCategory',
              <div className="space-y-2" id="form-product-category">
                <label className="text-sm font-medium text-gray-700">
                  Product Category
                </label>
                <select
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-Select-</option>
                  <option value="1">Metal</option>
                  <option value="2">Plastic</option>
                  <option value="2">E-Waste</option>
                  <option value="2">Paper</option>
                  <option value="2">Glass</option>
                  <option value="2">ELV Vehicle</option>
                </select>
              </div>
            )} 

            {renderField('auctionId',
              <div className="space-y-2" id="form-auction-id">
                <label className="text-sm font-medium text-gray-700">
                  Auction ID
                </label>
                <input
                  type="text"
                  name="auctionId"
                  value={formData.auctionId}
                  onChange={handleInputChange}
                  placeholder="Auction ID"
                  maxLength={30}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

          </div>

          {/* Organization Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {renderField('keyword',
              <div className="space-y-2" id="form-keyword">
                <label className="text-sm font-medium text-gray-700">
                  Keyword
                </label>
                <input
                  type="text"
                  name="keyword"
                  value={formData.keyword}
                  onChange={handleInputChange}
                  placeholder="Keyword"
                  maxLength={50}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {renderField(
                'lotType',
                <div className="space-y-2" id="form-lot-type">
                  <div className="grid grid-cols-2 gap-4">
                    {/* First column: Lot Type Dropdown */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Lot Type
                      </label>
                      <select
                        name="lotType"
                        value={formData.lotType}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-Select-</option>
                        <option value="1">SingleLot</option>
                        <option value="2">MultiLot</option>
                      </select>
                    </div>

                    {/* Second column: Divided into two for date fields */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* From Date Field */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          From Date
                        </label>
                        <input
                          type="date"
                          name="fromDate"
                          value={formData.fromDate}
                          onChange={handleInputChange}
                          className="w-full rounded-md text-sm border border-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      {/* To Date Field */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          To Date
                        </label>
                        <input
                          type="date"
                          name="toDate"
                          value={formData.toDate}
                          onChange={handleInputChange}
                          className="w-full rounded-md text-sm border border-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                )}
          </div>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setFormData({})}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Clear
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
});

export default AuctionSearchForm;