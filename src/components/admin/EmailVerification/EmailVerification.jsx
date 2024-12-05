import './Emailverification.css'
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../utils/AppContext";
import {confirmEmailVerificationOtp, sendEmailVerificationOtp} from "../../../utils/controllers/AuthControllers";
import {useNavigate} from "react-router-dom";
import LineBarLoader from "../../common/LoadingComponent/SingleLineBar";
import NotificationCard from "../../NotificationCard/NotificationCard";

const EmailVerification = () => {
    const navigate = useNavigate();

    const [otp, setOtp] = useState('')
    const [isLoading,setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const {email,jwt} = useContext(AppContext)

    let requestBtn
    let verifyBtn
    let otpIn

    useEffect(() => {
        requestBtn = document.getElementById('requestBtn')
        verifyBtn = document.getElementById('verifyBtn')
        otpIn = document.getElementById('otpIn')
        const emailIn = document.getElementById("emailIn")
        emailIn.value = email
    }, [email]);

    async function sendOtp(){
        setLoading(true)
        const res = await sendEmailVerificationOtp(jwt)
        setLoading(false)
        if(res.data.Error === true){
            setNotification({
                id: new Date().getTime(),
                message:"Some Error Occurred",
                type:'error'
            })
        }
        else{
            setNotification({
                id: new Date().getTime(),
                message:"OTP sent!!",
                type:'error'
            })
            otpIn.style.display = "block"
            requestBtn.style.display = "none"
            verifyBtn.style.display = "block"
        }
    }

    async function verifyOtp(){
        setLoading(true)
        const res = await confirmEmailVerificationOtp(email,otp)
        setLoading(false)
        if(res.data.Error === true){
            setNotification({
                id: new Date().getTime(),
                message:"Wrong OTP",
                type:'error'
            })
        }
        else{
            setNotification({
                id: new Date().getTime(),
                message:"Email Verified",
                type:'error'
            })

            setTimeout(()=>{
                navigate("/")
            },1500)
        }

    }



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

            <div className="emailverification">
            <div className={"emailverificationContainer"}>
                <input disabled={true} className={'inputField'} type="email" placeholder="Email" id={'emailIn'} />

                <input  className={'inputField'} type={"number"} style={{display:"none"}} placeholder="OTP" id={'otpIn'} onChange={
                    event => setOtp(event.target.value)
                } />

                <button className={"roundedButton reqBtn"} id={"requestBtn"} onClick={async ()=>{
                    await sendOtp();
                }}>Request OTP</button>
                <button className={"roundedButton reqBtn"} id={"verifyBtn"} style={{display:"none"}}
                    onClick={async ()=>{
                        await verifyOtp()
                    }}
                >Verify OTP</button>
            </div>
        </div>
            </>
    )
}
export default EmailVerification