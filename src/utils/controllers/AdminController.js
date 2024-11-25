import {postRequest} from "../RequestMaker";


const host = process.env.REACT_APP_ADMIN_SERVICE_HOST;
const port = process.env.REACT_APP_ADMIN_SERVICE_PORT;

const protocol = "http"

const uri = protocol+"://"+host+":"+port+"/admin";

const expiredToken = "eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoidGVhY2hlciIsInN1YiI6ImtpbmdwYWxpd2FsNovwbAom8fXiMrZekKc9YdH4Rq6wUDj9XL6zpH3zTmMhorBe7I7"
const invalidToken = "eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoidGVhY2hlciIc9YdH4Rq6wUDj9XL6zpH3zTmMhorBe7I7"


export async function getAllAdmin(jwt){
    const url = uri+"/getAllAdmin";
    // console.log(url);
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function addAdmin(jwt,email,password){
    const url = uri + "/addAdmin"
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "email":email,
        "password":password
    }
    return await postRequest(url,body,header);
}

export async function deleteAdmin(jwt){
    const url = uri + "/deleteAdmin"
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getTotalProjectAdmin(jwt){
    const url = uri+"/getTotalProject";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getOngoingProjectAdmin(jwt){
    const url = uri+"/getOngoingProject";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getCompletedProjectAdmin(jwt){
    const url = uri+"/getCompletedProject";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function addTeacher(jwt,email,password){
    const url = uri+"/addTeacher";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "email":email,
        "password":password
    }
    return await postRequest(url,body,header);
}

export async function getAllTeacherAdmin(jwt){
    const url = uri+"/getAllTeacher";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}
