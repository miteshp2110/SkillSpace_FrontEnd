import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import ErrorPage from "../common/ErrorPage/ErrorPage";

function TeacherRouter() {
    return (
        <>
            <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />


                <Route path="*" element={<ErrorPage/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>

        </>)
}

export default TeacherRouter;