import {getRequest, postRequest} from "../RequestMaker";

const host = process.env.REACT_APP_AUTH_SERVICE_HOST;
const port = process.env.REACT_APP_AUTH_SERVICE_PORT;

export async function getDepartments(){
    const url = `http://${host}:${port}/departments`;
    return await getRequest(url);
}

export async function login(email,password){
    const url = `http://${host}:${port}/login`;
    let body ={
        "email":email,
        "password":password
    }
    return await postRequest(url,body,null)
}

export async function signupStudentRegistration(email,password){
    const url = `http://${host}:${port}/signupStudent`;
    let body ={
        "email":email,
        "password":password
    }
    return await postRequest(url,body,null)
}

export async function completeStudentProfile(formData,token){
    const url = `http://${host}:${port}/completeProfile/student`;
    let header = {
        Authorization:"Bearer "+token
    }
    return await postRequest(url,formData,header)

}

export async function completeTeacherProfile(formData,token){
    const url = `http://${host}:${port}/completeProfile/teacher`;
    let header = {
        Authorization:"Bearer "+token
    }
    return await postRequest(url,formData,header)
}


export async function sendEmailVerificationOtp(token){
    const url = `http://${host}:${port}/requestOtp`;
    let header = {
        Authorization:"Bearer "+token
    }
    return await postRequest(url,null,header);
}

export async function confirmEmailVerificationOtp(email,otp){
    const url = `http://${host}:${port}/verifyOtp`;
    let body={
        "email":email,
        "code":otp
    }
    return await postRequest(url,body,null)
}

export async function sendForgotPasswordEmail(email){
    const url = `http://${host}:${port}/requestForgotPassword`;
    let body = {
        "email":email
    }
    return await postRequest(url,body,null)
}
export async function updatePassword(email,newPassword,otp){
    const url = `http://${host}:${port}/updatePassword`;
    let body={
        "email":email,
        "newPassword":newPassword,
        "otp":otp
    }
    return await postRequest(url,body,null)
}
