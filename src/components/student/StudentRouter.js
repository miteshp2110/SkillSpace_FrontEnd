import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";

function StudentRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default StudentRouter;