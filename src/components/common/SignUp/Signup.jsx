import './Signup.css';
import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../../utils/AppContext";
import {
    completeStudentProfile,
    confirmEmailVerificationOtp, getDepartments,
    sendEmailVerificationOtp,
    signupStudentRegistration
} from "../../../utils/controllers/AuthControllers";

const SignUp = () => {

    const navigate = useNavigate();

    const {email,setEmail,jwt,setJwt,setRole,setIsLoggedIn} = useContext(AppContext);
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const otpInput = document.getElementById("otpInput");
    const sendOtpButton  = document.getElementById("sendOtpButton");
    const verifyOtpButton = document.getElementById("verifyOtpButton");

    const signupContainerLeft = document.getElementById("signupContainerLeft");
    const signupContainerRight = document.getElementById("signupContainerRight");
    const openLeftContainerButton = document.getElementById("openLeftContainer");
    const openRightContainerButton = document.getElementById("openRightContainer");
    const signupLeftMain = document.getElementById("signupLeftMain");
    const signupRightMain = document.getElementById("signupRightMain");


    const openRightContainer = async () => {
        await fillBranchSelector();
        signupContainerRight.classList.remove("deactiveContainer");
        signupContainerLeft.classList.remove("activeContainer");
        signupContainerRight.classList.add("activeContainer");
        signupContainerLeft.classList.add("deactiveContainer");
        openRightContainerButton.style.display = "none";
        openLeftContainerButton.style.display = "block";
        otpInput.disabled = true;
        verifyOtpButton.disabled = true;
        signupLeftMain.style.display = "none";
        signupRightMain.style.display = "block";
    };

    const [password,setPassword] = useState("");
    const [tempEmail,setTempEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [name,setName] = useState("");
    const [branch,setBranch] = useState("");
    const [bio,setBio] = useState("");
    const [image,setImage] = useState(null);

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
    async function fillBranchSelector(){
        const branchSelector = document.getElementById("branchSelector");
        const res = await getDepartments()
        if(res.data.Error === false){
            const arr = res.data.data
            arr.forEach(element => {
                const opt = document.createElement("option");
                opt.value = element.id;
                opt.innerHTML = element.name;
                branchSelector.appendChild(opt);
            })
        }

    }

    async function signUpEmailPassword() {

        const { isEmailValid, isPasswordValid} = validateEmailAndPassword(tempEmail, password);
        if(!isEmailValid){
            alert("Please enter a valid email address");
        }

        else{
            if(!isPasswordValid){
                alert("Password of Minimum length 8");
            }
            else {

                const res1 = await signupStudentRegistration(tempEmail, password);
                if(res1.data.Error === true){
                    if(res1.data.status === 409){
                        alert("Email already exist");
                        return false
                    }
                    else{
                        alert("Some Error Occured")
                        return false;
                    }
                }
                else{
                    setEmail(tempEmail);
                    const data = res1.data.data;
                    return data.jwt
                }

            }
        }
    }

    async function sendOtp(){
        const jwt = await signUpEmailPassword()
        setJwt(jwt)
        if(jwt){
            const res = await sendEmailVerificationOtp(jwt);
            if(res.data.Error === true){
                alert("Some Error Occured")
            }
            else{
                emailInput.disabled = true;
                passwordInput.disabled = true;
                otpInput.disabled = false;
                otpInput.style.display = "block";
                sendOtpButton.style.display = "none";
                verifyOtpButton.style.display = "block";
                alert("Otp Sent SuccessFully!!!")

            }
        }

    }

    async function verifyEmailOtp(){
        const res = await confirmEmailVerificationOtp(email,otp);
        if(res.data.Error === true){
            if(res.data.status === 400){
                alert("Wrong Otp");
            }
            else{
                alert("Some Error Occured")
            }
        }
        else{

            openRightContainer()
        }
    }
    useEffect(()=>{
        fillBranchSelector()
    },[])

    async  function setProfile(){
        if(!name || !branch || !bio || !image){
            alert("Please enter all Details and Select Image");
        }
        else{
            const formData = new FormData();
            formData.append("name", name);
            formData.append("branch", branch);
            formData.append("bio",bio)
            formData.append("file", image);

            const res = await completeStudentProfile(formData,jwt);
            console.log(res)
            if(res.data.Error === true){
                alert("Some Error Occured")
            }
            else{
                setRole("student")
                setIsLoggedIn(true);
                window.location.href = "/";



            }
        }
    }




    return (

        <>
            <div className="signup">

                <div className="signupContainer">

                    <div className="signupContainerLeft activeContainer" id="signupContainerLeft">

                        <div className="openContainerButton" id="openLeftContainer" >→</div>

                        <div className="signupMainLeftContainer" id="signupLeftMain" style={{display:"block"}}>
                                <input className="inputField" type={'email'} id={"emailInput"} value={tempEmail} onChange={event => {setTempEmail(event.target.value)}} required={true}
                                       placeholder={"Email"} />

                                <input className="inputField" type={'password'} id={"passwordInput"} required={true}
                                       placeholder={"Password"} minLength={8} onChange={event => {setPassword(event.target.value)}} />



                            <input className="inputField" type={'number'} id={"otpInput"} required={true}
                                   placeholder={"Otp"} style={{display: "none"}} disabled={true} value={otp} onChange={event => {setOtp(event.target.value)}} />
                            <button type="submit" className="roundedButton" id="sendOtpButton" onClick={async ()=>{await sendOtp()}}>Send Otp</button>
                            <button type="submit" className="roundedButton" id="verifyOtpButton" style={{display:"none"}} onClick={async ()=>{ await verifyEmailOtp()}}>Verify Otp</button>

                            <div className="bottomText">Already Have an account? <span className="linkDecoration" ><Link to="/login" >LOGIN</Link></span></div>
                        </div>

                    </div>
                    <div className="signupContainerRight deactiveContainer" id="signupContainerRight" >

                        <div className="openContainerButton left" id="openRightContainer" style={{display:"block"}}>←</div>
                        <div className="signupMainRightContainer" id="signupRightMain" style={{display:"none"}}>
                            <input className="inputField" type={'text'} id={'nameInput'} value={name} placeholder={'Name'} onChange={event => {setName(event.target.value)}} required={true} />

                            <select className={'inputField'} id="branchSelector" onChange={event => (setBranch(event.target.value))} value={branch}>
                                <option value="" disabled={true} >Branch</option>
                            </select>

                            <textarea className={'inputField'} placeholder={'Bio'} onChange={event => {setBio(event.target.value)}} required={true} value={bio}/>

                            <input className={'inputField'} placeholder={'Profile Image'} type={'file'} accept={'image/*'} alt={'Profile Image'}
                                   onChange={(event)=>{
                                       const file = event.target.files[0];
                                       setImage(file);
                                   }}
                            />

                            <button className={'roundedButton'} id={'finishButton'} onClick={async ()=>{
                                await setProfile()
                            }}>Finish</button>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}
export default SignUp