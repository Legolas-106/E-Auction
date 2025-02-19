import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './services/auth/useAuthHook'; // Assuming the previous context is saved here
import LoginPage from './pages/auth/login';
import HomePage from './pages/home/homepage';
import Layout from './pages/base_template';
import AuctionRouter from './routes/auction/AuctionRouter';
import SignUpPageBidder from './pages/auth/signupBidder';
import SignUpPageVendor from './pages/auth/signupVendor';
import SignUp from './pages/auth/signup';
import AuctionListing from './features/auction/AuctionListing';
import ListItemForm from './pages/vendor/listItem';
import ItemDetailsPage from './pages/vendor/itemDetails';
import AuctionDetails from './pages/auction/auctionDetails';

import 'bootstrap';
import './App.css';
import PolicyPage from './pages/info/policyPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Layout />}>
              <Route path='home' element={<HomePage />} />
              <Route path="auth">
                <Route path="login" element={<LoginPage />} />
                <Route path='signup'>
                  <Route path='' element={< SignUp />} />
                  <Route path='bidder' element={<SignUpPageBidder />} />
                  <Route path='vendor' element={<SignUpPageVendor />} />
                </Route>
              </Route>
              <Route path="searchAuction" element={< AuctionListing />}>
                <Route path='auctionDetails' element={< AuctionDetails />} />
              </Route>
              {/* <Route path='auctionDetails' element={< AuctionDetails />} /> */}
              <Route path='vendor'>
                <Route path='listItem' element={< ListItemForm />} />
                <Route path='myItems' element={< ItemDetailsPage />} />
              </Route>
              <Route path="listItem" element={< ListItemForm />} />
              <Route path='MyLots' element={< ItemDetailsPage />} />
              <Route path="myAuction" element={< ListItemForm />} />
              <Route path='bidder'>
                <Route path='MyBids' />
              </Route>
              <Route path="MyBids" element={<AuctionRouter />} />
              <Route path="dashboard" element={<AuctionRouter />} />
              <Route path="policy" element={<AuctionRouter />} />
              <Route path="help" element={<AuctionRouter />} />
              <Route path='info/:what' element={< PolicyPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;