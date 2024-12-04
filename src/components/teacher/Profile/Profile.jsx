import './Profile.css'
import React, {useContext} from "react";
import ScrollReveal from "scrollreveal";
import {AppContext} from "../../../utils/AppContext";
import {teacherChecker} from "../../../utils/Helpers";
import {getTeacherProfile} from "../../../utils/controllers/TeacherController";

const Profile = ()=>{

    const {jwt,logout} = useContext(AppContext);

    const [name, setName] = React.useState("");
    const [department, setDepartment] = React.useState("");
    const [email, setEmail] = React.useState("");

    React.useEffect(() => {

        const init = async ()=>{
            const resp = (teacherChecker(await getTeacherProfile(jwt),logout)).data.profile

            setDepartment(resp.department)
            setName(resp.name)
            setEmail(resp.email)
        }
        init()

        ScrollReveal().reveal(".profile-section", {
            origin: "bottom",
            distance: "50px",
            duration: 1000,
            easing: "ease-in-out",
        });
    }, []);

    const handleLogout = () => {
        logout()
        window.location.href = "/"
    };


    return (
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
        </div>
    );
};

export default Profile;
