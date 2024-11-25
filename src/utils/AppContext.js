import React, {createContext, useEffect} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [email, setEmail] = React.useState(()=>{
        return localStorage.getItem("email") || '';
    });

    const [jwt,setJwt] = React.useState(()=>{
        return localStorage.getItem("jwt") || '';
    });

    const [isLoggedIn, setIsLoggedIn] = React.useState(()=>{
        return localStorage.getItem("isLoggedIn") || false;
    });

    const [role,setRole] = React.useState(()=>{
        return localStorage.getItem("role") || '';
    })

    useEffect(() => {
        if(role){
            localStorage.setItem("role",role);
        }
        else{
            localStorage.removeItem("role");
        }
    }, [role]);

    useEffect(()=>{
        if(isLoggedIn === true){
            localStorage.setItem("isLoggedIn",isLoggedIn)
        }
        else{
            localStorage.removeItem("isLoggedIn");
        }
    })




    useEffect(()=>{
        if(jwt){
            localStorage.setItem('jwt',jwt)
        }
        else{
            localStorage.removeItem('jwt')
        }
    },[jwt])


    useEffect(()=>{
        if(email)
        {
            localStorage.setItem('email',email)
        }
        else {
            localStorage.removeItem('email');
        }
    },[email])



    function logout(){
        localStorage.removeItem('jwt')
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('role')
        localStorage.removeItem('email')
    }

    return (
        <AppContext.Provider value={{ email, setEmail , jwt, setJwt , isLoggedIn, setIsLoggedIn , role, setRole ,logout }}>
            {children}
        </AppContext.Provider>
    )
}