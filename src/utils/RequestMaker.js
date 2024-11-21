import axios from "axios";


export async function getRequest(url){

    try{
        const response = await  axios.get(url);
        return {
            "data": {
                "Error": false,
                "data":response.data,
            }
        };
    }
    catch(err){
        return {
            "data": {
                "Error": true,
                "data":null
            }
        };
    }
}


export async function postRequest(url,body=null,header=null){

    try{
        const response = await axios.post(url,body,{headers:header});

        return {
            "data": {
                "Error": false,
                "data":response.data
            }
        };
    }
    catch(err){

        return {
            "data": {
                "Error": true,
                "data":null,
                "status":err.status,
            }
        };

    }

}


