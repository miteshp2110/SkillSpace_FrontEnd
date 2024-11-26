export function checkerFunction(res,logout){
    if(res.data.Error) {
        alert("Session Expired!!!")
        logout()
        window.location.href='/login';

    }
    return res.data;
}