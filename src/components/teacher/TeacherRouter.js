import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Footer from "../common/Footer/Footer";

function TeacherRouter() {
    return (
        <>
            <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer/>
        </BrowserRouter>

        </>)
}

export default TeacherRouter;