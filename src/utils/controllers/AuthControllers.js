import {getRequest, postRequest} from "../RequestMaker";

const host = process.env.REACT_APP_AUTH_SERVICE_HOST;
const port = process.env.REACT_APP_AUTH_SERVICE_PORT;

const sampleToken = "eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJwYWxpd2FsbWl0ZXNoMjExMEBnbWFpbC5jb20iLCJpYXQiOjE3MzIxNzIwNjIsImV4cCI6MTczMjI1ODQ2Mn0.kEaM5LP6O3wYY4j-J0QPj0cdgiEgCOpronSUBWiG_hkNGBK3W_cqU5uXx8_3iUI2"
const sampleTokenInvalid = "eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJwYWxpd2FsbWl0ZXNoMjExMEBnbWFpbC5jb20iLCJpYXQiOsdasdaeawdawasdawdjI1ODQ2Mn0.kEaM5LP6O3wYY4j-J0QPj0cdgiEgCOpronSUBWiG_hkNGBK3W_cqU5uXx8_3iUI2"
const sampleTokenExpired = "eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJwYWxpd2FsbWl0ZXNoMjExMEBnbWFpbC5jb20iLCJpYXQiOjE3MzA4OTAxNzgsImV4cCI6MTczMDk3NjU3OH0.vrpx_Gn8AUkuTzlQbHYzke_BmhEAPTPm9PNI7OIlgI0f_pmYR-dtU3YbPZrYY_oQ"

export async function getDepartments(){
    const url = `http://${host}:${port}/departments`;
    return await getRequest(url);
}

export async function jwtStatus(){
    const url = `http://${host}:${port}/jwtStatus`;
    let header = {
        Authorization:"Bearer "+sampleTokenExpired
    }
    return await postRequest(url,null,header);
}
export async function getRefreshToken(){
    const url = `http://${host}:${port}/refreshToken`;
    let header = {
        Authorization:"Bearer "+sampleTokenInvalid
    }
    return await postRequest(url,null,header);
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
