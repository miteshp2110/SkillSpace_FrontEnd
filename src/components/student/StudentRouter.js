import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import AboutUs from "../common/AboutUs/AboutUs";
import AddProject from "./AddProject/AddProject";
import Profile from "./Profile/Profile";

function StudentRouter(){
    return(
        <>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/addProject" element={<AddProject />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addProject" element={<AddProject />} />
            </Routes>
            <Footer/>
        </BrowserRouter>

        </>)
}

export default StudentRouter;