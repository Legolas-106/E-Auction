import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  // baseURL: process.env.BACKEND_API_BASE_URL + ":" + process.env.BACKEND_API_PORT,
  baseURL : "http://0.0.0.0:8080/api",
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(credentials) {
    try {
      console.log("Credentials are : ",credentials);
      const data_to_send = {
        "loginId" : credentials.email,
        "password" : credentials.password
      }
      try{

        console.log("URL IS : ",process.env.BACKEND_API_BASE_URL);
        const response = await api.post('/auth/login', data_to_send);
        console.log("Response is : ",response);
        localStorage.setItem('authToken', response.data.token);
        return response.data;
      }catch(err){
        console.log("Error is : ",err.message,err);
      }
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async setBidderFormDetail(data){
    const general = data.generalInformation;
    const companyData = data.companyDetails;
    const data_to_send = {
      "title" : general.title + general.name,
      "loginId" : general.loginId,
      "dob" : general.dateOfBirth,
      "contactNumber" : general.countryCode + general.mobileNumber,
      "desig" : general.designation,
      "corresEmail" : general.correspondenceEmail,
      "preferentialBidder" : companyData.preferentialBidder,
      "companyDetails" : {
        "companyName" : companyData.companyName,
        "companyRegNumber" : companyData.cin,
        "registerdAddress": companyData.registeredAddress,
        "partnersDetail": companyData.partnersDirectors,
        "foreignC": companyData.foreignCompany, 
        "city": companyData.city,
        "state": companyData.state,
        "postalCode": companyData.postalCode,
        "pan_tan": companyData.panNumber,
        "yoestabilishing": companyData.establishmentYear,
        "companyNature": companyData.natureOfBuisness,
        "companyLegalStatus": companyData.legalStatus,
        "companyCategory": companyData.companyCategory,
        "typeOfUserRegistered": "BIDDER"
      }
    }
    return data_to_send;
  },

  async bidderRegister(userData) {
    console.log("Now modifying the data to match the requestBody");
    try {
      // const data_to_send = this.setBidderFormDetail(userData);
      const data_to_send = {
        "loginId": "sssswd@cin.com",
        "password": "password123", 
        "corresEmail": "john.doe@example.com",
        "title": "Mr. Jhon Doe",
        "contactNumber": "+1234567890",
        "desig": "Manager",
        "dob": "1990-01-01",
        "typeOfUser": "Admin", 
        "userType" : "VENDOR",
        "companyDetails" : {
            "companyName": "Raisen Jilla",
            "companyRegNumber": "123456789",
            "registerdAddress": "123 Main St, Anytown, USA",
            "partnersDetail": "John Doe, Jane Smith",
            "foreignC": "N/A", 
            "city": "Anytown",
            "state": "Anystate",
            "postalCode": "12345",
            "pan_tan": "ABCDE1234F",
            "yoestabilishing": "2000",
            "companyNature": "Private Limited",
            "companyLegalStatus": "Active",
            "companyCategory": "Manufacturing",
            "typeOfUserRegistered": "BIDDER" 
            }
      };
      console.log(data_to_send);
      // return false;
      const response = await api.post('/bidder/register', data_to_send);
      console.log(response)
      if(response.data.token == null){
        console.log("User Already Exist");

      }
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response?.data || error.message;
    }
  },

  async vendorRegister(userData) {
    console.log(userData);
    try {
      const response = await api.post('/vendor/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async requestOtp(userData){
    console.log("User data is : ",userData);
    try{
      const data_to_send = {
        "loginId" : "sssswd@cin.com",
        "email" : "john.doe@example.com"
      }
      const response = await api.post("auth/emailVerificationotp", data_to_send);
      console.log(response.data);
      return response.data;
    }catch (err){
      throw err.response?.data || err.message;
    }
  },

  logout() {
    localStorage.removeItem('authToken');
  },

  isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
  },

  getAuthToken() {
    return localStorage.getItem('authToken');
  }
};