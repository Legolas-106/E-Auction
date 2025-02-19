import React from "react";
import {Routes,Route} from 'react-router-dom';
import Layout from "../pages/base_template";
import HomePage from "../pages/home/homepage";
import AuthRouter from "./auth/AuthRouters";
import AuctionRouter from "./auction/AuctionRouter";
import LoginPage from "../pages/auth/login";

const BaseRouter =  () => {
    return (
        <Routes>
            <Route path="" element={< Layout />} >
                <Route path="" element={< HomePage />} />
                <Route path="auth">
                    <Route path="login" element={< LoginPage />} />
                </Route>
                <Route path="auctions" element={< AuctionRouter />} />
            </Route>
        </Routes>
    )
}

export default BaseRouter;