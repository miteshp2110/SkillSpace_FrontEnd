import './ProfileCompletion.css'
import React, {useContext, useEffect, useState} from "react";
import {completeTeacherProfile, getDepartments} from "../../../utils/controllers/AuthControllers";
import {AppContext} from "../../../utils/AppContext";
import ScrollReveal from "scrollreveal";
import LineBarLoader from "../../common/LoadingComponent/SingleLineBar";
import NotificationCard from "../../NotificationCard/NotificationCard";

const ProfileCompletion = () => {

    const [isLoading,setLoading] = useState(false);
    const [notification, setNotification] = useState(null);


    React.useEffect(() => {
        ScrollReveal().reveal(".form-container", {
            origin: "bottom",
            distance: "50px",
            duration: 1000,
            easing: "ease-in-out",
        });
    },[])

    const {jwt} = useContext(AppContext)

    const prf = localStorage.getItem('profile');

    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');

    useEffect(()=>{
        const departmentCont = document.getElementById('department')
        const init = async () => {
            const res = (await getDepartments()).data.data
            res.forEach(dept=>{
                const opt = document.createElement("option");
                opt.value = dept.id;
                opt.innerHTML = dept.name;
                departmentCont.appendChild(opt);

            })
        }
        if(prf==='true'){
            init()
        }
    },[])


    if(prf!=='true'){
        return(
            <>
                <h1>Unauthorized Access</h1>
            </>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append("department", department);

        setLoading(true);
        const res = await completeTeacherProfile(formData,jwt)
        setLoading(false)
        if(res.data.Error === true){
            setNotification({
                id: new Date().getTime(),
                message:"Some Error occurred",
                type:'error'
            })
        }
        else{
            setNotification({
                id: new Date().getTime(),
                message:"Profile Complete",
                type:'error'
            })
            localStorage.removeItem('profile');
            setTimeout(()=>{
                window.location.href = "/"
            },1500)
        }
    };





    return (
        <>
            {isLoading?<LineBarLoader/>:<></>}
            {notification && (
                <NotificationCard
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                />
            )}
        <div style={{height:'80vh',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div className="form-container">

                <form onSubmit={handleSubmit} >
                    <div className="form-group">

                        <input
                            className={'inputField'}
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <select
                            className={'inputField'}
                            id="department"
                            name="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="" disabled={true}>Department</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>

        </div>
            </>
    )
}

export default ProfileCompletion