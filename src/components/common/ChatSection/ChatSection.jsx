import React, {useContext} from "react";
import {AppContext} from "../../../utils/AppContext";

const ChatSection = ({selectedProject,status}) => {
    const {email} = useContext(AppContext)
    return (
        <>
            <div className="chat-section-container">
                <button className={'close-chats-button'}> ←</button>
                <h1>Title</h1>
                <h3>Learning React is exciting for developetions es virtual DOM optimizes performance, while tools like hooks enhance functionality. Its vast ecosystem, including libraries like Redux, ensures robust solutions for modern web development.</h3>
                <button className={"mark-as-solved finish-button"}>Mark as Solved</button>
                <div className="chat-section">
                    {selectedProject.issues.map((issue, index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                issue.email === email ? "right" : "left"
                            }`}
                        >
                            {issue.message}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        disabled={status}
                        type="text"
                        placeholder="Type a message..."
                    />
                    <button>Send</button>
                </div>

            </div>
        </>
    )
}

export default ChatSection;