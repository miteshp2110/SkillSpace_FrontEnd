import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../utils/AppContext";
import {
    getIssueChatsStudent,
    getIssueDetailsStudent, markIssueSolvedStudent,
    postIssueChat
} from "../../../utils/controllers/StudentController";
import {
    getIssueChatsTeacher,
    getIssueDetailsTeacher,
    postIssueChatTeacher
} from "../../../utils/controllers/TeacherController";

const ChatSection = ({issueId,closeFun}) => {

    const [issueDetails, setIssueDetails] = useState();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState("");

    const {email,jwt} = useContext(AppContext)
    useEffect(() => {
        const init = async () => {
            const res = (await getIssueDetailsTeacher(jwt,issueId)).data.data.issues
            setIssueDetails(res)
            const chats = (await getIssueChatsTeacher(jwt,res.issue_id)).data.data.chats
            setChats(chats)
        }
        init()
    }, []);


    async function addMessage(){
        const res = (await postIssueChatTeacher(jwt,issueDetails.issue_id,messages))
        if(res.data.Error){
            alert("Some Error Occured")
        }
        else{
            const chatSec=document.getElementById("chatSec")
            const msgElem = document.createElement("div");
            msgElem.classList.add("chat-message")
            msgElem.classList.add("right")
            msgElem.innerText=messages
            chatSec.appendChild(msgElem);
            const msgInpu = document.getElementById("msgInpu")
            msgInpu.value=""

        }
    }


    if(!issueDetails){
        return (<></>)
    }

    return (
        <>
            <div className="chat-section-container">
                <button className={'close-chats-button'} onClick={()=>{closeFun()}}> ←</button>
                <h1>{issueDetails.issue_title}</h1>
                <h3>{issueDetails.issue_description}</h3>
                <div className="chat-section" id={"chatSec"}>
                    {chats.map((chat,index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                chat.sender_email === email ? "right" : "left"
                            }`}
                        >
                            {chat.message}
                        </div>
                    ))}
                </div>
                <div className="chat-input" style={{display:`${issueDetails.issue_status?"flex":"none"}`}}>
                    <input
                        onChange={(event) =>{setMessages(event.target.value)}}
                        type="text"
                        placeholder="Type a message..."
                        id={"msgInpu"}
                    />
                    <button onClick={async () =>{await addMessage()}} >Send</button>
                </div>

            </div>
        </>
    )
}

export default ChatSection;