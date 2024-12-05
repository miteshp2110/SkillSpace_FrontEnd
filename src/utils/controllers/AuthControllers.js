import {getRequest, postRequest} from "../RequestMaker";


const prefixURL = process.env.REACT_APP_AUTH_SERVICE_URL;

export async function getDepartments(){
    const url = `${prefixURL}/departments`;
    return await getRequest(url);
}

export async function login(email,password){
    const url = `${prefixURL}/login`;
    let body ={
        "email":email,
        "password":password
    }
    return await postRequest(url,body,null)
}

export async function signupStudentRegistration(email,password){
    const url = `${prefixURL}/signupStudent`;
    let body ={
        "email":email,
        "password":password
    }
    return await postRequest(url,body,null)
}

export async function completeStudentProfile(formData,token){
    const url = `${prefixURL}/completeProfile/student`;
    let header = {
        Authorization:"Bearer "+token
    }
    return await postRequest(url,formData,header)

}

export async function completeTeacherProfile(formData,token){
    const url = `${prefixURL}/completeProfile/teacher`;
    let header = {
        Authorization:"Bearer "+token
    }
    return await postRequest(url,formData,header)
}


export async function sendEmailVerificationOtp(token){
    const url = `${prefixURL}/requestOtp`;
    let header = {
        Authorization:"Bearer "+token
    }
    return await postRequest(url,null,header);
}

export async function confirmEmailVerificationOtp(email,otp){
    const url = `${prefixURL}/verifyOtp`;
    let body={
        "email":email,
        "code":otp
    }
    return await postRequest(url,body,null)
}

export async function sendForgotPasswordEmail(email){
    const url = `${prefixURL}/requestForgotPassword`;
    let body = {
        "email":email
    }
    return await postRequest(url,body,null)
}
export async function updatePassword(email,newPassword,otp){
    const url = `${prefixURL}/updatePassword`;
    let body={
        "email":email,
        "newPassword":newPassword,
        "otp":otp
    }
    return await postRequest(url,body,null)
}
