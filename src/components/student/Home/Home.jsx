import React, {useState, useEffect, useContext} from "react";
import "./Home.css";
import ScrollReveal from "scrollreveal";
import ChatSection from "../../common/ChatSection/ChatSection";
import {checkerFunction} from "../../../utils/Helpers";
import {
    getAllProjectsStudent,
    getCompletedProjectStudent,
    getFeedbackStudent,
    getOngoingProjectStudent,
    getOpenIssueCountStudent,
    getProjectDetailsStudent,
    getProjectMediaStudent,
    getTotalProjectStudent
} from "../../../utils/controllers/StudentController";
import {AppContext} from "../../../utils/AppContext";
import CountUp from "react-countup";

const Home = () => {
    const {jwt,logout}  = useContext(AppContext);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeTab, setActiveTab] = useState("details");
    const [projectArrays, setProjectArrays] = useState([]);
    const [activeImage, setActiveImage] = useState(0);
    const [total, setTotal] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [ongoing, setOngoing] = useState(0);

    useEffect(() => {
        const init = async () => {

            const tp = (checkerFunction(await getTotalProjectStudent(jwt))).data.count
            const op = (checkerFunction(await getOngoingProjectStudent(jwt))).data.count
            const cp = (checkerFunction(await getCompletedProjectStudent(jwt))).data.count
            setOngoing(op)
            setCompleted(cp)
            setTotal(tp)

            const projectsData = await (checkerFunction(await getAllProjectsStudent(jwt,logout))).data.projects
            setProjectArrays(projectsData);
        }

        init()
    }, []);

    useEffect(() => {

    },[]);


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
        document.body.style.overflow = "hidden"; // Prevent scrolling
    };

    const closeProjectDetails = () => {
        setSelectedProject(null);
        document.body.style.overflow = ""; // Restore scrolling
    };


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
                                    <button className="finish-button">Mark Project as Finished</button>}
                            </div>
                        )}
                        {activeTab === "feedback" && (
                            <div className="feedback-tab">
                                <h3>{selectedProject.feedbacks}</h3>

                            </div>
                        )}
                        {activeTab === "issues" && (
                            <div className="issues-tab">
                                <button>Add Issue</button>

                                {/*<ChatSection selectedProject={selectedProject}/>*/}
                            </div>


                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
