import React, {useState, useEffect, useContext} from "react";
import "./Home.css";
import ScrollReveal from "scrollreveal";
import ChatSection from "../../common/ChatSection/ChatSection";
import {checkerFunction} from "../../../utils/Helpers";
import {
    addIssueStudent,
    getAllIssuesStudent,
    getAllProjectsStudent,
    getCompletedProjectStudent,
    getFeedbackStudent,
    getOngoingProjectStudent,
    getOpenIssueCountStudent,
    getProjectDetailsStudent,
    getProjectMediaStudent,
    getTotalProjectStudent, updateProjectStatus
} from "../../../utils/controllers/StudentController";
import {AppContext} from "../../../utils/AppContext";
import CountUp from "react-countup";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const {jwt,logout}  = useContext(AppContext);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeTab, setActiveTab] = useState("details");
    const [projectArrays, setProjectArrays] = useState([]);
    const [activeImage, setActiveImage] = useState(0);
    const [total, setTotal] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [ongoing, setOngoing] = useState(0);
    const [addIssueTab,setAddIssueTab] = useState(false);
    const [issueTitle,setIssueTitle] = useState("");
    const [issueDescription,setIssueDescription] = useState("");
    const [activeIssueCard, setActiveIssueCard] = useState(null);

    const navigate = useNavigate();



    useEffect(() => {
        const init = async () => {

            const tp = (checkerFunction(await getTotalProjectStudent(jwt),logout)).data.count
            const op = (checkerFunction(await getOngoingProjectStudent(jwt),logout)).data.count
            const cp = (checkerFunction(await getCompletedProjectStudent(jwt),logout)).data.count
            setOngoing(op)
            setCompleted(cp)
            setTotal(tp)

            const projectsData = await (checkerFunction(await getAllProjectsStudent(jwt,logout))).data.projects
            setProjectArrays(projectsData);
        }

        init()
    }, []);

    useEffect(() => {
        if(activeTab === "issues"){
            const currPrj = selectedProject

            const init = async () => {
                const iss = (await getAllIssuesStudent(jwt,selectedProject.id)).data.data.issues
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
        const projectD = (await getProjectDetailsStudent(jwt,id)).data.data.projects
        const projectM = (await getProjectMediaStudent(jwt,id)).data.data.media
        let projectF
        try{
            projectF = ((await getFeedbackStudent(jwt,id)).data.data.feedbacks[0]).feedback
        }
        catch(error){
            projectF = ""
        }
        const openIssueCount = (await getOpenIssueCountStudent(jwt,id)).data.data.count

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
                mentor: projectD.teacherName,
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

    function toggleAddIssueTab(){
        const issueCardContainer = document.getElementById("issueCardContainer")
        const addissuecontainer = document.getElementById("add-issue-container")
        if(addIssueTab===false){
            setAddIssueTab(true)
            issueCardContainer.style.display = "none";
            addissuecontainer.style.display = "block"
        }
        else{
            setAddIssueTab(false)
            issueCardContainer.style.display = "block";
            addissuecontainer.style.display = "none"
        }

    }

    async function addStudentIssue(){
        const res = await addIssueStudent(jwt,selectedProject.id,issueTitle,issueDescription)
        if(res.data.Error === true){
            alert("Some Error Occured")
        }
        else{
            alert("Issue Added...")
            window.location.reload();
        }
    }

    function toggleActiveIssueTab(open){

        const issueCardContainer = document.getElementById("issueCardContainer")
        const addissue = document.getElementById("add-issue")
        if(open === true){
            issueCardContainer.style.display = "none"
            addissue.style.display = "none"
        }
        else{
            setActiveIssueCard(null)
            issueCardContainer.style.display = "block";
            addissue.style.display = "block"

        }

    }

    async function completeProject(){
        const res = await updateProjectStatus(jwt,selectedProject.id)
        if(res.data.Error === true){
            alert("Some Error Occured")
        }
        else{
            alert("Project Marked as Completed")
            window.location.reload()
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

                {total===0?<button className={'login-button'} onClick={()=>{navigate("/addproject")}}>Add Project</button>:""}
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
                                    <strong>Mentor:</strong> {selectedProject.mentor}
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
                                            setActiveImage(activeImage + 1 === selectedProject.images.length ? 0 : activeImage + 1);
                                        }}
                                    >
                                        &gt;
                                    </button>
                                </div>

                                {selectedProject.completed ? <div></div> :
                                    <button className="finish-button" onClick={async () =>{await completeProject()}}>Mark Project as Finished</button>}
                            </div>
                        )}
                        {activeTab === "feedback" && (
                            <div className="feedback-tab">
                                <h3>{selectedProject.feedbacks === "" ? "No Feedbacks" : selectedProject.feedbacks}</h3>

                            </div>
                        )}
                        {activeTab === "issues" && (
                            <div className="issues-tab">
                                <button id={"add-issue"} disabled={selectedProject.endDate!=="-"} className={"add-issue"} onClick={() => {
                                    toggleAddIssueTab()
                                }}>{addIssueTab ? "Close" : "Add Issue"}</button>

                                <div className={"issue-cards-container"} id={"issueCardContainer"}>


                                </div>

                                <div className={"add-issue-container"} id={"add-issue-container"}
                                     style={{display: "none"}}>
                                    <input type={"text"} maxLength={15} placeholder={"Title"} className={"inputField"}
                                           onChange={(event) => {
                                               setIssueTitle(event.target.value)
                                           }}/>
                                    <input placeholder={"Description"} className={"inputField"} onChange={(event) => {
                                        setIssueDescription(event.target.value)
                                    }}/>
                                    <button className={"roundedButton reqBtn low-margin"} onClick={async () => {
                                        await addStudentIssue()
                                    }}>Add
                                    </button>
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
