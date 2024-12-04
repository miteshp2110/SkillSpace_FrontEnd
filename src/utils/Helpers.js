export function checkerFunction(res,logout){
    if(res.data.Error) {
        alert("Session Expired!!!")
        logout()
        window.location.href='/login';

    }
    return res.data;
}

export function teacherChecker(res,logout){
    if(res.data.Error) {
        if(res.data.data){
            if(!res.data.data.emailStatus){
                alert("Email Verification Required!");
                window.location.href='/emailVerification';
            }
            else{
                if(!res.data.data.profileStatus){
                    localStorage.setItem("profile","true");
                    window.location.href='/profileCompletion';

                }
            }
        }
        else{
            alert("Session Expired!!!")
            logout()
            window.location.href='/login';
        }
    }
    return res.data;
}
