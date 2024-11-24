import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";

function StudentRouter(){
    return(
        <>
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>

        </>)
}

export default StudentRouter;