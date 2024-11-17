import axios from "axios";

const host = "127.0.0.1";
const port = "8080"
let url = "http://"+host+":"+port;


export async function getRequest(endpoint){
    url = `${url}/${endpoint}`;
    try{
        const response = await  axios.get(url);
        console.log(response);
        return response.data;
    }
    catch(err){
        console.log(err);
        return {"Error":"Some error Occured"};
    }
}
