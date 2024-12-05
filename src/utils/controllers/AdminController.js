import {postRequest} from "../RequestMaker";

const prefixUri = process.env.REACT_APP_ADMIN_SERVICE_URL

const uri = prefixUri+"/admin";


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
