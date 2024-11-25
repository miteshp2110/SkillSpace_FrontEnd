import './Emailverification.css'
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../utils/AppContext";
import {confirmEmailVerificationOtp, sendEmailVerificationOtp} from "../../../utils/controllers/AuthControllers";
import {useNavigate} from "react-router-dom";

const EmailVerification = () => {
    const navigate = useNavigate();

    const [otp, setOtp] = useState('')
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
        const res = await sendEmailVerificationOtp(jwt)
        if(res.data.Error === true){
            alert("Some Error Occured")
        }
        else{
            otpIn.style.display = "block"
            requestBtn.style.display = "none"
            verifyBtn.style.display = "block"
        }
    }

    async function verifyOtp(){
        const res = await confirmEmailVerificationOtp(email,otp)
        if(res.data.Error === true){
            alert("Wrong Otp");
        }
        else{
            navigate("/")
        }

    }



    return (
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
    )
}
export default EmailVerification