import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import Signup from "./SignUp/Signup";
import AboutUs from "./AboutUs/AboutUs";
import {useContext} from "react";
import {AppContext} from "../../utils/AppContext";

function CommonRouter() {
    const {isLoggedIn} = useContext(AppContext);
    return (
        <>


        <div className="mainBody">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={isLoggedIn==='true'?<Navigate to="/"/>:<Login /> } />
                    <Route path="/signup" element={isLoggedIn==='true'?<Navigate to="/"/>:<Signup /> } />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
            </BrowserRouter>
        </div>
        </>
    )
}

export default CommonRouter;

