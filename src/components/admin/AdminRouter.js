import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home";

function AdminRouter() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AdminRouter;