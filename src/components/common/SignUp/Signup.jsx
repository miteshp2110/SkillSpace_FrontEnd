import './Signup.css';
import {useEffect} from "react";
import {Link} from "react-router-dom";

const SignUp = () => {

    useEffect(() => {
        const signupContainerLeft = document.getElementById("signupContainerLeft");
        const signupContainerRight = document.getElementById("signupContainerRight");
        const openLeftContainerButton = document.getElementById("openLeftContainer");
        const openRightContainerButton = document.getElementById("openRightContainer");

        const openLeftContainer = () => {
            signupContainerLeft.classList.remove("deactiveContainer");
            signupContainerRight.classList.remove("activeContainer");
            signupContainerLeft.classList.add("activeContainer");
            signupContainerRight.classList.add("deactiveContainer");
            openLeftContainerButton.style.display = "none";
            openRightContainerButton.style.display = "block";
        };

        const openRightContainer = () => {
            signupContainerRight.classList.remove("deactiveContainer");
            signupContainerLeft.classList.remove("activeContainer");
            signupContainerRight.classList.add("activeContainer");
            signupContainerLeft.classList.add("deactiveContainer");
            openRightContainerButton.style.display = "none";
            openLeftContainerButton.style.display = "block";
        };

    }, []);


    return (
        <>
            <div className="signup">

                <div className="signupContainer">

                    <div className="signupContainerLeft activeContainer" id="signupContainerLeft">

                        <div className="openContainerButton" id="openLeftContainer" >→</div>

                        <div className="signupMainLeftContainer">
                                <input className="inputField" type={'email'} id={"emailInput"} required={true}
                                       placeholder={"Email"}/>

                                <input className="inputField" type={'password'} id={"passwordInput"} required={true}
                                       placeholder={"Password"} minLength={8}/>



                            <input className="inputField" type={'number'} id={"otpInput"} required={true}
                                   placeholder={"Otp"} style={{display: "block"}} disabled={true}/>
                            <button type="submit" className="roundedButton" id="sendOtpButton">Send Otp</button>
                            <button type="submit" className="roundedButton" id="verifyOtpButton" style={{display:"none"}}>Verify Otp</button>

                            <div className="bottomText">Already Have an account? <span className="linkDecoration" ><Link to="/login" >LOGIN</Link></span></div>
                        </div>

                    </div>
                    <div className="signupContainerRight deactiveContainer" id="signupContainerRight" >

                        <div className="openContainerButton left" id="openRightContainer">←</div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default SignUp