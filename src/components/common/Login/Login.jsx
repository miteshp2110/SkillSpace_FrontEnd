import './Login.css'
import React, {useContext, useState} from "react";
import {login} from "../../../utils/controllers/AuthControllers";
import {AppContext} from "../../../utils/AppContext";
import {useNavigate} from "react-router-dom";
import ScrollReveal from "scrollreveal";
import LineBarLoader from "../LoadingComponent/SingleLineBar";
import NotificationCard from "../../NotificationCard/NotificationCard";



const Login = () => {



    const [isLoading,setLoading] = useState(false);
    const [notification, setNotification] = useState(null);


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
            setNotification({
                id: new Date().getTime(),
                message:"Invalid Email",
                type:'error'
            })
        }
        else{
            if(!isPasswordValid){
                setNotification({
                    id: new Date().getTime(),
                    message:"Password of legnth 8",
                    type:'error'
                })
            }
            else{
                setLoading(true);
                const res = await login(tempEmail, password);
                setLoading(false);
                // console.log(res);
                if(res.data.Error === true){
                    if(res.data.status === 401){
                        setNotification({
                            id: new Date().getTime(),
                            message:"Wrong Password",
                            type:'error'
                        })
                        // alert("Wrong Password");
                    }
                    else{
                        if(res.data.status === 404){
                            setNotification({
                                id: new Date().getTime(),
                                message:"User Not Found",
                                type:'error'
                            })
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

        <>
            {isLoading?<LineBarLoader/>:<></>}
            {notification && (
                <NotificationCard
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                />
            )}

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
        </>
    )
}

export default Login