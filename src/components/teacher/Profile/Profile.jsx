import './Profile.css'
import React, {useContext, useState} from "react";
import ScrollReveal from "scrollreveal";
import {AppContext} from "../../../utils/AppContext";
import {teacherChecker} from "../../../utils/Helpers";
import {getTeacherProfile} from "../../../utils/controllers/TeacherController";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";

const Profile = ()=>{

    const {jwt,logout} = useContext(AppContext);
    const [isLoading,setLoading] = useState(false);

    const [name, setName] = React.useState("");
    const [department, setDepartment] = React.useState("");
    const [email, setEmail] = React.useState("");

    React.useEffect(() => {

        const init = async ()=>{
            setLoading(true)
            const resp = (teacherChecker(await getTeacherProfile(jwt),logout)).data.profile

            setDepartment(resp.department)
            setName(resp.name)
            setEmail(resp.email)
            setLoading(false)
        }
        init()

    }, []);

    React.useEffect(() => {
        if(!isLoading){
            ScrollReveal().reveal(".profile-section", {
                origin: "bottom",
                distance: "50px",
                duration: 1000,
                easing: "ease-in-out",
            });
        }
    },[isLoading])

    const handleLogout = () => {
        logout()
        window.location.href = "/"
    };


    return (
        <>
            {isLoading?<LoadingScreen/>:
        <div className="profile-section">
            <h1 className="profile-name">{name}</h1>
            <p className="profile-branch">{department}</p>
            <div  className="profile-email">
                {email}
            </div>
            <div className="logout-button" onClick={()=>{
                handleLogout()
            }}>
                Logout
            </div>
        </div>}
        </>
    );
};

export default Profile;
