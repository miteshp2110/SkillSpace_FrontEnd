import './Home.css'
import {
    getAllIssuesTeacher,
    getAllProjectTeacher,
    getCompletdProjectTeacher, getFeedbackTeacher,
    getOngoingProjectTeacher, getOpenIssueCountTeacher, getProjectDetailTeacher, getProjectMediaTeacher,
    getTotalProjectTeacher, postFeedbackTeacher
} from "../../../utils/controllers/TeacherController";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../utils/AppContext";
import {teacherChecker} from "../../../utils/Helpers";
import ScrollReveal from "scrollreveal";
import CountUp from "react-countup";
import ChatSection from "../ChatSection/ChatSection";

const Home =()=>{
    const {jwt,logout}  = useContext(AppContext);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeTab, setActiveTab] = useState("details");
    const [projectArrays, setProjectArrays] = useState([]);
    const [activeImage, setActiveImage] = useState(0);
    const [total, setTotal] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [ongoing, setOngoing] = useState(0);
    const [activeIssueCard, setActiveIssueCard] = useState(null);
    const [updateFeedback, setUpdateFeedback] = useState('');




    useEffect(() => {
        const init = async () => {

            const tp = (teacherChecker(await getTotalProjectTeacher(jwt),logout)).data.count
            const op = (teacherChecker(await getOngoingProjectTeacher(jwt),logout)).data.count
            const cp = (teacherChecker(await getCompletdProjectTeacher(jwt),logout)).data.count
            setOngoing(op)
            setCompleted(cp)
            setTotal(tp)

            const projectsData = await (teacherChecker(await getAllProjectTeacher(jwt),logout)).data.projects
            setProjectArrays(projectsData);
        }
        init()


    }, []);

    useEffect(() => {
        if(activeTab === "issues"){
            const currPrj = selectedProject

            const init = async () => {
                const iss = (await getAllIssuesTeacher(jwt,selectedProject.id)).data.data.issues
                currPrj.issues = iss;
                const issueCardContainer = document.getElementById("issueCardContainer");
                iss.forEach((issue)=>{

                    const issueCard = document.createElement("div");
                    issueCard.key = issue.issue_id;
                    issueCard.onclick = ()=>{
                        setActiveIssueCard(issueCard.key);
                        toggleActiveIssueTab(true)
                    }
                    issueCard.classList.add("issue-card");

                    const issueCardTitle = document.createElement("div");
                    issueCardTitle.classList.add("issue-card-title");
                    issueCardTitle.innerText = issue.issue_title;

                    const issueCardStatus = document.createElement("div");
                    issueCardStatus.classList.add("issue-card-status");
                    issueCardStatus.innerText = issue.issue_status===true?"Active":"Inactive";

                    issueCard.appendChild(issueCardTitle);
                    issueCard.appendChild(issueCardStatus);
                    issueCardContainer.appendChild(issueCard);
                })
                setSelectedProject(currPrj);

            }

            init()
        }

    },[activeTab]);


    useEffect(() => {
        ScrollReveal().reveal(".statsContainer, .projects-column", {
            origin: "bottom",
            distance: "50px",
            duration: 1000,
            easing: "ease-in-out",
            interval: 500,
        });

    }, []);




    const openProjectDetails = async (id) => {
        const projectD = (await getProjectDetailTeacher(jwt,id)).data.data.projects
        const projectM = (await getProjectMediaTeacher(jwt,id)).data.data.media
        let projectF
        try{
            projectF = ((await getFeedbackTeacher(jwt,id)).data.data.feedbacks[0]).feedback
        }
        catch(error){
            projectF = ""
        }

        const openIssueCount = (await getOpenIssueCountTeacher(jwt,id)).data.data.count

        const imgs = []
        projectM.forEach((elem) => {
            imgs.push(elem.media_url);
        })
        setActiveImage(0)

        const currProj =         {
            id: projectD.project.project_id,
            title: projectD.project.title,
            description: projectD.project.description,
            images: imgs,
            startDate: projectD.project.start_date,
            endDate: projectD.project.end_date === null?"-":projectD.project.end_date,
            completed: projectD.project.status_level === 4,
            mentor: projectD.studentName,
            feedbacks: projectF,
            openIssueCount: openIssueCount,
        }
        setSelectedProject(currProj);
        setActiveTab("details");
        document.body.style.overflow = "hidden";
    };

    const closeProjectDetails = () => {
        setSelectedProject(null);
        document.body.style.overflow = "";
    };



    function toggleActiveIssueTab(open){

        const issueCardContainer = document.getElementById("issueCardContainer")
        if(open === true){
            issueCardContainer.style.display = "none"
        }
        else{
            setActiveIssueCard(null)
            issueCardContainer.style.display = "block";

        }

    }

    async function setNewFeedback(){
        if(updateFeedback===''){
            alert("Provide Some Feedback")
            return;
        }
        const res = (teacherChecker( await postFeedbackTeacher(jwt,selectedProject.id,updateFeedback),logout))
        if(res.data.Error === true){
            alert("Some Error Occured")
        }
        else{
            window.location.href = "/"
        }
    }



    return (
        <div className="home-container">
            <div className={"statsContainer"} >
                <div className={"statItem medStat"}>
                    <span>TOTAL PROJECTS</span> <CountUp className={"counter"} end={total} start={0} duration={8}/>
                </div>
                <div className={"statItem medStat"}>
                    COMPLETED PROJECTS <CountUp className={"counter"} end={completed} start={0} duration={8}/>
                </div>
                <div className={"statItem medStat"}>
                    ONGOING PROJECTS <CountUp className={"counter"} end={ongoing} start={0} duration={8}/>
                </div>
            </div>
            <div className="projects-column">

                {total===0?<h1>No Projects under you. </h1>:""}
                {projectArrays.map((project) => (
                    <div
                        className="project-card"
                        key={project.project_id}
                        onClick={() => openProjectDetails(project.project_id)}
                    >
                        <h2 className="project-title">{project.title}</h2>
                        <p className={`project-description"`}>
                            {project.description}
                        </p>
                        <div className="project-dates">
                            <p>
                                <strong>Start Date:</strong> {project.start_date}
                            </p>
                            <p>
                                <strong>End Date:</strong> {project.end_date === null ? `-` : project.end_date}
                            </p>
                        </div>

                        <p className={`project-status ${project.status_level === 4 ? "completed" : "in-progress"}`}>
                            {project.status_level === 4 ? "Completed" : "In Progress"}
                        </p>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <div className="project-modal">
                    <div className="modal-header">
                        <h2>{selectedProject.title}</h2>
                        <button className="close-button" onClick={closeProjectDetails}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-tabs">
                        <button
                            className={`tab-button ${activeTab === "details" ? "active" : ""}`}
                            onClick={() => setActiveTab("details")}
                        >
                            Details
                        </button>
                        <button
                            className={`tab-button ${activeTab === "feedback" ? "active" : ""}`}
                            onClick={() => setActiveTab("feedback")}
                        >
                            Feedback
                        </button>
                        <button
                            className={`tab-button ${activeTab === "issues" ? "active" : ""}`}
                            onClick={() => setActiveTab("issues")}
                        >
                            Issues ({selectedProject.openIssueCount})
                        </button>
                    </div>
                    <div className="modal-content">
                        {}
                        {activeTab === "details" && (
                            <div className="details-tab">
                                <p>
                                    <strong>Description:</strong> {selectedProject.description}
                                </p>
                                <p>
                                    <strong>Start Date:</strong> {selectedProject.startDate}
                                </p>
                                <p>
                                    <strong>End Date:</strong> {selectedProject.endDate}
                                </p>
                                <p>
                                    <strong>Student:</strong> {selectedProject.mentor}
                                </p>


                                <div className="project-image-wrapper">
                                    <button
                                        className="arrow prev-arrow"
                                        onClick={() => {
                                            setActiveImage(activeImage - 1 === -1 ? selectedProject.images.length - 1 : activeImage - 1);
                                        }}
                                    >
                                        &lt;
                                    </button>
                                    <img
                                        src={selectedProject.images[activeImage]}
                                        alt={`Project ${selectedProject.id}`}
                                        className="project-image"
                                    />
                                    <button
                                        className="arrow next-arrow"
                                        onClick={() => {
                                            console.log("next")
                                            setActiveImage(activeImage + 1 === selectedProject.images.length ? 0 : activeImage + 1);
                                        }}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        )}
                        {activeTab === "feedback" && (
                            <div className="feedback-tab">
                                <h3>{selectedProject.feedbacks===""?"No Feedbacks":selectedProject.feedbacks}</h3>
                                <button className={'login-button'} id={'editFeedBackButton'} onClick={
                                    ()=>{
                                        const feedUp = document.getElementById("feedback-update");
                                        const editFeedBackButton = document.getElementById("editFeedBackButton");
                                        const closeEditFeedback = document.getElementById("closeEditFeedback");

                                        editFeedBackButton.style.display="none"
                                        feedUp.style.display="block";
                                        closeEditFeedback.style.display="block";
                                    }
                                }>Edit Feedback</button>
                                <button style={{display:"none"}} className={'login-button'} id={"closeEditFeedback"} onClick={()=>{
                                    const feedUp = document.getElementById("feedback-update");
                                    const editFeedBackButton = document.getElementById("editFeedBackButton");
                                    const closeEditFeedback = document.getElementById("closeEditFeedback");

                                    editFeedBackButton.style.display="block"
                                    feedUp.style.display="none";
                                    closeEditFeedback.style.display="none";
                                }} >Close</button>

                                <div className={'feedback-update'} id={'feedback-update'} style={{display:"none"}}>

                                        <textarea onChange={(event)=>{setUpdateFeedback(event.target.value)}} required={true} className={'inputField'} id={'feedbackHolder'} placeholder={'Feedback'} />
                                        <button onClick={async ()=>{
                                            await setNewFeedback()
                                        }} style={{marginTop:"-30px"}} className={'login-button'}>Update</button>
                                </div>

                            </div>
                        )}
                        {activeTab === "issues" && (
                            <div className="issues-tab">

                                <div className={"issue-cards-container"} id={"issueCardContainer"}>


                                </div>


                                {activeIssueCard!==null?<ChatSection issueId = {activeIssueCard} closeFun = {toggleActiveIssueTab}/>:""}
                            </div>


                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
