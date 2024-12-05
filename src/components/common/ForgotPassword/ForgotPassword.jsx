import './Forgotpassword.css'
import React, {useState} from "react";
import {sendForgotPasswordEmail, updatePassword} from "../../../utils/controllers/AuthControllers";
import ScrollReveal from "scrollreveal";
import LineBarLoader from "../LoadingComponent/SingleLineBar";
import NotificationCard from "../../NotificationCard/NotificationCard";

const ForgotPassword = () => {

    React.useEffect(() => {
        ScrollReveal().reveal('.loginContainer', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            reset: true,
        });
    }, []);

    const [isLoading,setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp,setOtp] = useState('')

    const forgotEmailInput = document.getElementById('forgotEmailInput')
    const forgotPasswordInput = document.getElementById('forgotPasswordInput')
    const forgotOtpInput = document.getElementById('forgotOtpInput')
    const requestOtpBtn = document.getElementById('requestOtpBtn')
    const updatePasswordBtn = document.getElementById('updatePasswordBtn')

    function validateEmailAndPassword(email, password) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^.{8,}$/;

        const isEmailValid = emailRegex.test(email);
        const isPasswordValid = passwordRegex.test(password);

        return {
            isEmailValid,
            isPasswordValid,
        };
    }

    async function forgotPasswordOtp(){
        const {isEmailValid} = validateEmailAndPassword(email);
        if(!isEmailValid){
            setNotification({
                id: new Date().getTime(),
                message:"Invalid Email",
                type:'error'
            })
        }
        else{
            setLoading(true);
            const res = await sendForgotPasswordEmail(email);
            setLoading(false)
            if(res.data.Error === true){
                if(res.data.status === 404){
                    setNotification({
                        id: new Date().getTime(),
                        message:"Email Not Found",
                        type:'error'
                    })
                }
                else{
                    setNotification({
                        id: new Date().getTime(),
                        message:"Some Error Occurred",
                        type:'error'
                    })
                }
            }

            else{
                setNotification({
                    id: new Date().getTime(),
                    message:"Otp Sent!!",
                    type:'error'
                })
                forgotEmailInput.disabled = true;
                forgotOtpInput.style.display="block";
                forgotPasswordInput.style.display="block";
                requestOtpBtn.style.display="none";
                updatePasswordBtn.style.display="block";
            }
        }
    }

    async function updatePass(){
        setLoading(true)
        const res = await updatePassword(email,password,otp)
        setLoading(false)
        if(res.data.Error === true){
            setNotification({
                id: new Date().getTime(),
                message:"Wrong OTP",
                type:'error'
            })
        }
        else{
            setTimeout(()=>{},2000)
            window.location.href="/login"
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
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh'}}>
            <div className="loginContainer" id={"loginContainer"}>

                <input type={'email'} placeholder={'Email'} id={"forgotEmailInput"} className={'inputField'} onChange={
                    event => setEmail(event.target.value)
                }/>

                <input type={'text'} placeholder={'Otp'} id={'forgotOtpInput'} className={'inputField'} style={{display: 'none'}}
                    onChange={event => setOtp(event.target.value)}
                />/>

                <input type={'password'} className={'inputField'}
                       id={'forgotPasswordInput'}
                       placeholder={' New Password'} style={{display: 'none'}}
                    onChange={event => setPassword(event.target.value)}
                />

                <button className={'roundedButton requestOtp'} id={'requestOtpBtn'}
                    onClick={async ()=>{
                        await forgotPasswordOtp();
                    }}
                >Request Otp</button>
                <button className={'roundedButton requestOtp'} id={"updatePasswordBtn"} style={{display:"none"}}
                    onClick={async ()=>{
                        await updatePass()
                    }}
                >Update Password</button>



            </div>
        </div>
            </>
    )
}
export default ForgotPassword