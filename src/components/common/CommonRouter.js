import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";

function CommonRouter() {
    return (
        <>
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default CommonRouter;

