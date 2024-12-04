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