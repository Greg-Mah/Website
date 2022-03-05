import React from "react";
import { BrowserRouter, Route , Routes } from "react-router-dom";
import Component404 from "./404";
import ConnectX from "./connectX/connectX";
import Home from "./home";
import '../style.css'
import NavBar from "./navbar";

const App=()=>
{

    return <div className="Index">
        
        <BrowserRouter>
        <NavBar></NavBar>
            <Routes>
                <Route exact path="/" element={<Home></Home>}>
                </Route>
                <Route path="/*" element={<Component404></Component404>}>
                </Route>
                <Route exact path="/connectx" element={<ConnectX></ConnectX>}></Route>
            </Routes>
        </BrowserRouter>
    </div>;
}

export default App;