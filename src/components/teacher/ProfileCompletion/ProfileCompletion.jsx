import './ProfileCompletion.css'
import React, {useContext, useEffect, useState} from "react";
import {completeTeacherProfile, getDepartments} from "../../../utils/controllers/AuthControllers";
import {AppContext} from "../../../utils/AppContext";
import ScrollReveal from "scrollreveal";

const ProfileCompletion = () => {


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

        const res = await completeTeacherProfile(formData,jwt)
        if(res.data.Error === true){
            alert("Some Error Occured")
        }
        else{
            localStorage.removeItem('profile');
            window.location.href = "/"
        }
    };





    return (
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
    )
}

export default ProfileCompletion