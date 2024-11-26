import React, {useContext, useState} from "react";
import "./profile.css";
import ScrollReveal from "scrollreveal";
import {AppContext} from "../../../utils/AppContext";
import {checkerFunction} from "../../../utils/Helpers";
import {getProfileStudent} from "../../../utils/controllers/StudentController";

const Profile = () => {

    const{jwt,logout} = useContext(AppContext);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[branch,setBranch]=useState("");
    const [bio,setBio]=useState("");
    const [image,setImage]=useState("");

    React.useEffect(() => {
        const init = async () =>{
            const res = (checkerFunction(await getProfileStudent(jwt),logout)).data;
            setBio(res.bio);
            setImage(res.profileImage_url);
            setBranch(res.branch);
            setName(res.name);
            setEmail(res.email);
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
            <img alt={"profileimage"} className="profile-image" src={image}></img>
            <h1 className="profile-name">{name}</h1>
            <p className="profile-branch">{branch}</p>
            <p className="profile-bio">
                {bio}
            </p>
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
