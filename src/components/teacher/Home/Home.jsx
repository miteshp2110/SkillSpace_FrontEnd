import './Home.css'
import {getTeacherProfile} from "../../../utils/controllers/TeacherController";
import {useContext} from "react";
import {AppContext} from "../../../utils/AppContext";
import {teacherChecker} from "../../../utils/Helpers";

const Home =()=>{
    const {jwt} = useContext(AppContext)
    return <>
        <h1>
            Home teacher
        </h1>
        <button onClick={async ()=>{
            const res = teacherChecker(await getTeacherProfile(jwt))
            console.log(res)
        }}>Profile</button>
    </>
}

export default Home