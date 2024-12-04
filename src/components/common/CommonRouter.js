import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import Signup from "./SignUp/Signup";
import AboutUs from "./AboutUs/AboutUs";
import {useContext} from "react";
import {AppContext} from "../../utils/AppContext";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Footer from "./Footer/Footer";
import ErrorPage from "./ErrorPage/ErrorPage";

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
                    <Route path="/forgotPassword" element={isLoggedIn==='true'?<Navigate to="/"/>:<ForgotPassword />} />
                    <Route path="*" element={<ErrorPage/>} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
        </>
    )
}

export default CommonRouter;

