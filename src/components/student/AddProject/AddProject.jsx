import React, {useContext, useState} from "react";
import "./Addproject.css"
import ScrollReveal from "scrollreveal";
import {AppContext} from "../../../utils/AppContext";
import {checkerFunction} from "../../../utils/Helpers";
import {
    addProject,
    addProjectMedia,
    getAllTeacherStudent,
    getProfileStudent
} from "../../../utils/controllers/StudentController";
import {useNavigate} from "react-router-dom";

const AddProject = () => {
    const navigate = useNavigate();
    const {logout,jwt} = useContext(AppContext);
    const [studentId, setStudentId] = useState("");
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teacher, setTeacher] = useState("");
    const [Files, setFiles] = useState([]);



    React.useEffect(() => {
        const teacherSelect = document.getElementById("teacher");

        const init = async () => {
            const res =(checkerFunction(await getProfileStudent(jwt),logout)).data;

            const teachers = (checkerFunction(await getAllTeacherStudent(jwt))).data
            setStudentId(res.id)
            teachers.forEach((teacher) => {
                const opt = document.createElement("option");
                opt.value = teacher.id;
                opt.innerHTML = teacher.name;
                teacherSelect.appendChild(opt);
            })

        }

        init()


        ScrollReveal().reveal(".add-project-container", {
            origin: "bottom",
            distance: "50px",
            duration: 1000,
            easing: "ease-in-out",
        });
    }, []);

    const handleImageUpload = (e) => {
        const dt = e.target.files
        const files = Array.from(e.target.files);
        setFiles(dt);

        if (files.length + images.length > 4) {
            alert("You can only upload up to 4 images.");
            return;
        }
        const previewImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...previewImages]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const id = (checkerFunction(await addProject(jwt,studentId,teacher,title,description))).data.id

        Array.from(Files).forEach((file) => {
            formData.append("media", file);
        })

        formData.append("project_id", id);
        const res = await addProjectMedia(jwt,formData);

        if(res.data.Error === true){
            alert("Some Error Occured")
            window.location.reload();
        }
        else{
            alert("Project Added...")
            navigate("/")
        }
    };

    return (
        <div style={{height:'100vh'}}>
        <div className="add-project-container">
            <h1 className="title">Add a New Project</h1>
            <form className="add-project-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Project Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter project title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Project Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="images">Project Images</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        required
                        onChange={handleImageUpload}
                    />
                    <div className="image-preview">
                        {images.map((src, index) => (
                            <div key={index} className="image-container">
                                <img src={src} alt={`preview ${index}`} />
                                <button
                                    type="button"
                                    className="remove-image"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="teacher">Assign Teacher</label>
                    <select
                        id="teacher"
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select a teacher
                        </option>
                    </select>
                </div>
                <button type="submit" className="submit-button">
                    Submit Project
                </button>
            </form>
        </div>
        </div>
    );
};

export default AddProject;
