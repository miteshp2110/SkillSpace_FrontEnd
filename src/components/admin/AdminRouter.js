import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import Login from "../common/Login/Login";
import AboutUs from "../common/AboutUs/AboutUs";
import EmailVerification from "./EmailVerification/EmailVerification";

function AdminRouter() {
    return(
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs/>} />
                    <Route path="/emailVerification" element={<EmailVerification />} />
                </Routes>
                <Footer/>
            </BrowserRouter>

        </>
    )
}

export default AdminRouter;