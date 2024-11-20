import {getRequest} from "../RequestMaker";

const host = process.env.REACT_APP_AUTH_SERVICE_HOST;
const port = process.env.REACT_APP_AUTH_SERVICE_PORT;

export async function getDepartments(){
    const url = `http://${host}:${port}/departments`;
    return await getRequest(url);
}


