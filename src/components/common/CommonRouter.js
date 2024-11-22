import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import Signup from "./SignUp/Signup";
import AboutUs from "./AboutUs/AboutUs";

function CommonRouter() {
    return (
        <>


        <div className="mainBody">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
            </BrowserRouter>
        </div>
        </>
    )
}

export default CommonRouter;

