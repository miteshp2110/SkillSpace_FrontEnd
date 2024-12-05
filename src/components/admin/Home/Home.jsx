import './Home.css'
import {
    addAdmin, addTeacher,
    getAllAdmin, getAllTeacherAdmin,
    getCompletedProjectAdmin, getOngoingProjectAdmin,
    getTotalProjectAdmin
} from "../../../utils/controllers/AdminController";
import CountUp from 'react-countup';
import React, {useContext, useState} from "react";
import {AppContext} from "../../../utils/AppContext";
import ScrollReveal from "scrollreveal";
import LineBarLoader from "../../common/LoadingComponent/SingleLineBar";
import NotificationCard from "../../NotificationCard/NotificationCard";
import SingleLineBar from "../../common/LoadingComponent/SingleLineBar";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";

const Home =()=>{
    const {jwt,logout} = useContext(AppContext);
     const [total, setTotal] = useState(0);
     const [completed, setCompleted] = useState(0);
     const [ongoing, setOngoing] = useState(0);

     const [tempEmail,setTempEmail] = useState("");
     const [password,setPassword] = useState("");
     const [role,setRole] = useState("");
    const [isLoading,setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [partLoading,setPartLoading] = useState(false);


    function validateEmailAndPassword(email, password) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^.{8,}$/;

        const isEmailValid = emailRegex.test(email);
        const isPasswordValid = passwordRegex.test(password);

        return {
            isEmailValid,
            isPasswordValid,
        };
    }

    async function createUser(){
        const {isEmailValid,isPasswordValid} = validateEmailAndPassword(tempEmail, password);

        if(!isEmailValid){
            setNotification({
                id: new Date().getTime(),
                message:"Enter valid Email",
                type:'error'
            })
        }
        else{
            if(!isPasswordValid){
                setNotification({
                    id: new Date().getTime(),
                    message:"Password of min length 8",
                    type:'error'
                })
            }
            else{
                if(!role){
                    setNotification({
                        id: new Date().getTime(),
                        message:"Select a Role",
                        type:'error'
                    })
                }
                else{
                    if(role==='teacher'){
                        setPartLoading(true);
                        const res = await addTeacher(jwt,tempEmail,password);
                        setPartLoading(false);
                        if(res.data.Error === true){
                            if(res.data.status === 403){
                                setNotification({
                                    id: new Date().getTime(),
                                    message:"Email Already in Use",
                                    type:'error'
                                })
                            }
                        }
                        else{
                            setNotification({
                                id: new Date().getTime(),
                                message:"User Added",
                                type:'error'
                            })
                            setTimeout(()=>{
                                window.location.reload();
                            },2000)

                        }
                    }
                    else{
                        if(role==='admin'){
                            setPartLoading(true)
                            const res = await addAdmin(jwt,tempEmail,password);
                            setPartLoading(false)
                            if(res.data.Error === true){
                                if(res.data.status === 403){
                                    setNotification({
                                        id: new Date().getTime(),
                                        message:"Email Already in Use",
                                        type:'error'
                                    })
                                }
                            }
                            else{
                                setNotification({
                                    id: new Date().getTime(),
                                    message:"User Added",
                                    type:'error'
                                })
                                setTimeout(()=>{
                                    window.location.reload();
                                },2000)
                            }
                        }
                    }
                }
            }
        }
    }

    function checkerFunction(res){
        if(res.data.Error) {
            if(res.data.status === 401){
                alert("Session Expired!!!")
                logout()
                window.location.href='/login';
                return false;
            }
            else {
                if(res.data.status === 410){
                    alert("Email Verification Required!");
                    window.location.href='/emailVerification';
                    return false;
                }
            }

        }
        return res.data;
    }




    React.useEffect(() => {



        const initData = async ()=>{
            setLoading(true)
            const tp = checkerFunction(await getTotalProjectAdmin(jwt))
            const cp = checkerFunction(await getCompletedProjectAdmin(jwt))
            const op = checkerFunction(await getOngoingProjectAdmin(jwt))
            setLoading(false)
            setTotal(tp.data.count)
            setOngoing(op.data.count)
            setCompleted(cp.data.count)




        }

        initData();


    }, []);

    React.useEffect(()=>{
        if(!isLoading){

            const init = async () => {
                const listContainer = document.getElementById("listContainer")
                setPartLoading(true)
                const teachers = (checkerFunction(await getAllTeacherAdmin(jwt))).data.teachers
                const admins = (checkerFunction(await getAllAdmin(jwt))).data.admins
                setPartLoading(false)

                admins.forEach((teacher)=>{
                    const listItemCard = document.createElement('div');
                    listItemCard.classList.add('listItemCard');

                    const listItemId = document.createElement("div")
                    listItemId.classList.add("listItemId")
                    listItemId.innerHTML=(teacher.role).toString().toUpperCase();

                    const listItemEmail = document.createElement('div')
                    listItemEmail.classList.add('listItemEmail')
                    listItemEmail.innerHTML=teacher.email;

                    const listItemVerified = document.createElement('div')
                    listItemVerified.classList.add('listItemVerified')
                    listItemVerified.innerHTML=(teacher.emailStatus).toString().toUpperCase();

                    listItemCard.appendChild(listItemId)
                    listItemCard.appendChild(listItemEmail)
                    listItemCard.appendChild(listItemVerified)

                    listContainer.appendChild(listItemCard)
                })


                teachers.forEach((teacher)=>{
                    const listItemCard = document.createElement('div');
                    listItemCard.classList.add('listItemCard');

                    const listItemId = document.createElement("div")
                    listItemId.classList.add("listItemId")
                    listItemId.innerHTML=(teacher.role).toString().toUpperCase();

                    const listItemEmail = document.createElement('div')
                    listItemEmail.classList.add('listItemEmail')
                    listItemEmail.innerHTML=teacher.email;

                    const listItemVerified = document.createElement('div')
                    listItemVerified.classList.add('listItemVerified')
                    listItemVerified.innerHTML=(teacher.emailStatus).toString().toUpperCase();

                    listItemCard.appendChild(listItemId)
                    listItemCard.appendChild(listItemEmail)
                    listItemCard.appendChild(listItemVerified)

                    listContainer.appendChild(listItemCard)


                })
            }


            init()


            ScrollReveal().reveal('.statsContainer, .adminMainContainer', {
                origin: 'bottom',
                distance: '50px',
                duration: 1000,
                reset: true,
            });
        }
    },[isLoading])




    return <>

        {partLoading?<LineBarLoader/>:<></>}
        {notification && (
            <NotificationCard
                key={notification.id}
                message={notification.message}
                type={notification.type}
            />
        )}
        {isLoading?<LoadingScreen/>:
        <div className={"adminHomeContainer"}>
            <div className={"statsContainer"}>
                <div className={"statItem"}>
                    <span>TOTAL PROJECTS</span>  <CountUp className={"counter"} end={total} start={0} duration={8} />
                </div>
                <div className={"statItem"}>
                    COMPLETED PROJECTS <CountUp className={"counter"} end={completed} start={0} duration={8} />
                </div>
                <div className={"statItem"}>
                    ONGOING PROJECTS <CountUp className={"counter"} end={ongoing} start={0} duration={8} />
                </div>
            </div>
            <div className={"adminMainContainer"}>
                <div className={"teacherListContainer"}>
                    <div className={"listItemContainer"} id={"listContainer"}>
                        <div className={"listItemCard"}>
                            <div className={"listItemId"}>Role</div>
                            <div className={"listItemEmail"}>Email</div>
                            <div className={"listItemVerified"}>Verified</div>
                        </div>

                    </div>

                </div>

                <div className={"adminListContainer"}>

                    <div className={"userCreationContainer"}>
                        <h2>
                            Add User
                        </h2>

                        <input className={"inputField"} placeholder={"Email"} type={'email'} onChange={event => setTempEmail(event.target.value)}/>
                        <input className={"inputField"} placeholder={"Password"} type={'password'} onChange={event => setPassword(event.target.value)}/>

                        <select className={"inputField"} onChange={event => setRole(event.target.value)} value={role} >
                            <option value="" disabled={true}>Role</option>
                            <option value="admin">Admin</option>
                            <option value={"teacher"} >Teacher</option>
                        </select>

                        <button className={'roundedButton'} id={"createUserButton"}
                        onClick={async ()=>{
                            await createUser()
                        }}
                        >Create</button>


                    </div>

                </div>

            </div>
        </div>}
    </>
}

export default Home