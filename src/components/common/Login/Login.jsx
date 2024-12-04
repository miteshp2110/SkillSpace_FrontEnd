import './Login.css'
import React, {useContext, useEffect, useState} from "react";
import {login} from "../../../utils/controllers/AuthControllers";
import {AppContext} from "../../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import ScrollReveal from "scrollreveal";

const Login = () => {


    React.useEffect(() => {
        ScrollReveal().reveal('.loginContainer', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            reset: true,
        });
    }, []);

    const navigate = useNavigate();

    const {setEmail,setRole,setJwt,setIsLoggedIn} = useContext(AppContext)

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
    const [tempEmail,setTempEmail] = useState("");
    const [password,setPassword] = useState("");

    async function loginUser(){
        const {isEmailValid,isPasswordValid} = validateEmailAndPassword(tempEmail,password);
        if(!isEmailValid ){
            alert("Please enter a valid email address");
        }
        else{
            if(!isPasswordValid){
                alert("Password of Minimum length 8");
            }
            else{
                const res = await login(tempEmail, password);
                // console.log(res);
                if(res.data.Error === true){
                    if(res.data.status === 401){
                        alert("Wrong Password");
                    }
                    else{
                        if(res.data.status === 404){
                            alert("User not found");
                        }
                    }
                }
                else{
                   const data = res.data.data
                    setEmail(tempEmail);
                   setRole(data.role);
                   setJwt(data.jwt)
                    setIsLoggedIn(true);
                    window.location.href = "/";

                }

            }
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',width: '100%', height: '80vh'}}>
            <div className="loginContainer">

                <input type={'email'} placeholder={'Email'} className={'inputField'} onChange={event => setTempEmail(event.target.value)} />

                <input type={'password'} className={'inputField'} placeholder={'Password'} onChange={event => setPassword(event.target.value)} />

                <button className={'forgotPassword'} onClick={()=>{
                    navigate('/forgotPassword')
                }}>Forgot Password ?</button>

                <button className={'roundedButton'} id={'loginButton'} onClick={async ()=>{
                    await loginUser()
                }}>Login</button>
            </div>
        </div>
    )
}

export default Login