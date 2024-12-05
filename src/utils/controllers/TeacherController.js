import {postRequest} from "../RequestMaker";


const host = process.env.REACT_APP_TEACHER_SERVICE_HOST;
const port = process.env.REACT_APP_TEACHER_SERVICE_PORT;

const protocol = "http"

const uri = protocol+"://"+host+":"+port+"/teacher";

export async function getTeacherProfile(jwt){
    const url = uri + "/getProfile"
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getAllProjectTeacher(jwt){
    const url = uri + "/getAllProjects"
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getProjectDetailTeacher(jwt,project_id){
    const url = uri + "/getProjectDetails";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id": project_id
    }
    return await postRequest(url,body,header);
}

export async function getTotalProjectTeacher(jwt){
    const url = uri + "/totalProject"
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getOngoingProjectTeacher(jwt){
    const url = uri + "/ongoingProject";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getCompletdProjectTeacher(jwt){
    const url = uri + "/completedProject";
    let header = {
        Authorization:"Bearer "+jwt
    }
    return await postRequest(url,null,header);
}

export async function getProjectMediaTeacher(jwt,project_id){
    const url = uri + "/getProjectMedia";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":project_id,
    }
    return await postRequest(url,body,header);
}

export async function getIssueChatsTeacher(jwt,issue_id){
    const url = uri + "/getIssueChats";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "issue_id":issue_id
    }
    return await postRequest(url,body,header)
}

export async function postIssueChatTeacher(jwt,issue_id,message){
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

export async function getOpenIssueCountTeacher(jwt,project_id){
    const url = uri + "/getOpenIssuesCount";
    let header = {
        "Authorization":"Bearer "+jwt
    }
    let body = {
        "project_id":project_id
    }
    return await postRequest(url,body,header);
}

export async function getIssueDetailsTeacher(jwt,issue_id){
    const url = uri + "/getIssueDetails";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "issue_id":issue_id
    }
    return await postRequest(url,body,header)
}

export async function getAllIssuesTeacher(jwt,project_id){
    const url = uri + "/getAllIssues";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":project_id
    }
    return await postRequest(url,body,header);
}

export async function getFeedbackTeacher(jwt,project_id){
    const url = uri + "/getFeedback";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":project_id
    }

    return await postRequest(url,body,header)
}

export async function postFeedbackTeacher(jwt,project_id,feedback){
    const url = uri + "/postFeedback";
    let header = {
        Authorization:"Bearer "+jwt
    }
    let body = {
        "project_id":project_id,
        "feedback":feedback
    }
    return await postRequest(url,body,header)
}
