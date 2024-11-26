import {postRequest} from "../RequestMaker";

const host = process.env.REACT_APP_STUDENT_SERVICE_HOST;
const port = process.env.REACT_APP_STUDENT_SERVICE_PORT;

const protocol = "http"

const uri = protocol+"://"+host+":"+port+"/student";


export async function getTotalProjectStudent(jwt){

    const url = uri + "/totalProject"
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getCompletedProjectStudent(jwt){

    const url = uri + "/completedProject";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getOngoingProjectStudent(jwt){

    const url = uri + "/ongoingProject"
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function updateProjectStatus(jwt,status,projectId){
    const url = uri + "/updateProjectStatus";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":projectId,
        "status":status,
    }
    return await postRequest(url,body,header);
}

export async function getProjectDetailsStudent(jwt,projectId){
    const url = uri + "/getProjectDetails";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":projectId
    }
    return await postRequest(url,body,header);
}

export async function getAllProjectsStudent(jwt){
    const url = uri + "/getAllProjects";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function addProject(jwt,student_id,teacher_id,title,description){
    const url = uri + "/addProject";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "student_id":student_id,
        "teacher_id":teacher_id,
        "title":title,
        "description":description
    }
    return await postRequest(url,body,header)
}

export async function getProjectMediaStudent(jwt,project_id){
    const url = uri + "/getProjectMedia";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":project_id,
    }
    return await postRequest(url,body,header);
}

export async function addProjectMedia(jwt,body){
    const url = uri + "/addProjectMedia";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,body,header);
}

export async function getProfileStudent(jwt){
    const url = uri + "/getProfile"
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getAllTeacherStudent(jwt){
    const url = uri + "/getAllTeacher";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getOpenIssueCountStudent(jwt,project_id){
    const url = uri + "/getOpenIssuesCount";
    let header = {
        "Authorization":"Bearer "+jwt
    }
    let body = {
        "project_id":project_id
    }
    return await postRequest(url,body,header);
}

export async function addIssueStudent(jwt,project_id,issue_title,description){
    const url = uri + "/addIssue";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":project_id,
        "issue_title":issue_title,
        "issue_description":description
    }
    return await postRequest(url,body,header);
}

export async function getAllIssuesStudent(jwt,project_id){
    const url = uri + "/getAllIssues";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":project_id
    }
    return await postRequest(url,body,header);
}

export async function getIssueDetailsStudent(jwt,issue_id){
    const url = uri + "/getIssueDetails";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "issue_id":issue_id
    }
    return await postRequest(url,body,header)
}

export async function markIssueSolvedStudent(jwt,issue_id){
    const url = uri+"/markIssueSolved"
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "issue_id":issue_id
    }
    return await postRequest(url,body,header);
}

export async function getIssueChatsStudent(jwt,issue_id){
    const url = uri + "/getIssueChats";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "issue_id":issue_id
    }
    return await postRequest(url,body,header)
}

export async function postIssueChat(jwt,issue_id,message){
    const url = uri + "/postIssueChat";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "issue_id":issue_id,
        "message":message
    }
    return await postRequest(url,body,header);
}

export async function getFeedbackStudent(jwt,project_id){
    const url = uri + "/getFeedback";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":project_id
    }

    return await postRequest(url,body,header)
}