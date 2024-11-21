import './Home.css'
import {
    confirmEmailVerificationOtp,
    getDepartments,
    getRefreshToken,
    jwtStatus,
    login,
    sendEmailVerificationOtp, sendForgotPasswordEmail, updatePassword
} from "../../../utils/controllers/AuthControllers";

const Home =()=>{

    return <>
        <h1>
            Home common
        </h1>
        <button onClick={async () => {
            const res = await getDepartments();
            if (res.data.Error === true) {
                console.log(res.data.Error)
            } else {
                console.log(res.data);
            }
        }}>departments
        </button>
        <br/>
        <button onClick={async () => {
            const res = await jwtStatus();
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>jwt status
        </button>
        <br/>
        <button onClick={async () => {
            const res = await getRefreshToken();
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>refresh Token
        </button>
        <br/>
        <button onClick={async () => {
            const res = await login("miteshpaliwal2110@gmail.com", "Mi12te34@")
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>login
        </button>
        <br/>
        <button onClick={async () => {
            const res = await sendEmailVerificationOtp()
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>otp
        </button>
        <br/>
        <button onClick={async () => {
            const res = await confirmEmailVerificationOtp("paliwalmitesh2110@gmail.com", 2429)
            if (res.data.Error === true) {
                console.log(res.data.status === 400 ? "WrongOTP" : "Invalid Reqeust")
            } else {
                console.log(res.data);
            }
        }}>otp confirm
        </button>
        <br/>
        <button onClick={async () => {
            const res = await sendForgotPasswordEmail("miteshpaliwal2110@gmail.com")
            if (res.data.Error === true) {
                console.log(res.data.status)
            } else {
                console.log(res.data);
            }
        }}>forgt pass Otp
        </button>

        <br/>
        <button onClick={async () => {
            const res = await updatePassword("miteshpaliwal2110@gmail.com","Mi12te34@",2913)
            if (res.data.Error === true) {
                console.log(res.data.status === 400 ? "WrongOTP" : "Invalid Reqeust")
            } else {
                console.log(res.data);
            }
        }}>update Password
        </button>

    </>
}

export default Home