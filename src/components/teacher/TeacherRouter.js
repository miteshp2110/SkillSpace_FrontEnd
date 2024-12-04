import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import EmailVerification from "../admin/EmailVerification/EmailVerification";
import AboutUs from "../common/AboutUs/AboutUs";
import ProfileCompletion from "./ProfileCompletion/ProfileCompletion";
import Profile from "./Profile/Profile";

function TeacherRouter() {
    return (
        <>

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/emailVerification" element={<EmailVerification />} />
                <Route path="/profileCompletion" element={<ProfileCompletion />} />
                <Route path="/profile" element={<Profile />}  />

                <Route  path="/about" element={<AboutUs/>}  />
                <Route path="*" element={<ErrorPage/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>

        </>)
}

export default TeacherRouter;