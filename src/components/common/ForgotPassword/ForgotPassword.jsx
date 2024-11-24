import './Forgotpassword.css'
import {useState} from "react";
import {sendForgotPasswordEmail, updatePassword} from "../../../utils/controllers/AuthControllers";

const ForgotPassword = () => {

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
            alert("Please enter a valid email address");
        }
        else{
            const res = await sendForgotPasswordEmail(email);

            if(res.data.Error === true){
                if(res.data.status === 404){
                    alert("Email Not Found");
                }
                else{
                    alert("Some Error Occured");
                }
            }

            else{
                forgotEmailInput.disabled = true;
                forgotOtpInput.style.display="block";
                forgotPasswordInput.style.display="block";
                requestOtpBtn.style.display="none";
                updatePasswordBtn.style.display="block";
            }
        }
    }

    async function updatePass(){
        const res = await updatePassword(email,password,otp)
        if(res.data.Error === true){
            alert("Some Error Occured");
        }
        else{
            alert("Password Updated!")
            window.location.href="/login"
        }
    }

    return (
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
    )
}
export default ForgotPassword