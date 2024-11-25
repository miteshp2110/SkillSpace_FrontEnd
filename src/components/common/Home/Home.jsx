import React from 'react';
import './Home.css';
import ScrollReveal from 'scrollreveal';
import {useNavigate} from "react-router-dom";

const Home = () => {

    const navigate  = useNavigate();

    React.useEffect(() => {
        ScrollReveal().reveal('.home-section', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            reset: true,
        });
    }, []);

    const sections = [
        {
            text: {
                heading: 'Welcome to SkillSpace',
                content:
                    'SkillSpace is your ultimate platform for managing student projects and fostering effective communication between students and teachers. Upload your projects, track progress, and receive valuable feedback from mentors who care about your success.',
                button: 'Login',
            },
            image: {
                src: 'https://skillspace.ai/wp-content/uploads/2022/01/Skillspace.ai-LP-1-min.png',
                // src: 'https://via.placeholder.com/400',
                alt: 'Introduction illustration',
            },
            reverse: false,
        },
        {
            text: {
                heading: 'Streamlined Portfolio Management',
                content:
                    'Students can easily organize and showcase their projects on SkillSpace. Our platform helps you track milestones, visualize progress, and build a comprehensive portfolio that demonstrates your skills and creativity.',
            },
            image: {
                src: 'https://skillspace.ai/wp-content/uploads/2021/12/g12-1.png',
                // src: 'https://via.placeholder.com/400',
                alt: 'Portfolio management illustration',
            },
            reverse: true,
        },
        {
            text: {
                heading: 'Teacher-Student Collaboration',
                content:
                    'Teachers can review student projects, provide timely feedback, and resolve queries to ensure academic excellence. Our collaborative tools make it easy to mentor students and help them reach their full potential.',
            },
            image: {
                // src: 'https://via.placeholder.com/400',
                src: 'https://skillspace.ai/wp-content/uploads/2023/07/Untitled-design-66.png',
                alt: 'Collaboration illustration',
            },
            reverse: false,
        },
        {
            text: {
                heading: 'Fostering Innovation',
                content:
                    'At SkillSpace, we empower students and teachers to innovate. By providing a platform that focuses on collaboration, transparency, and growth, we aim to transform project management into an engaging and rewarding experience.',
            },
            image: {
                src: 'https://skillspace.ai/wp-content/uploads/2021/12/g10-2.svg',
                alt: 'Innovation illustration',
            },
            reverse: true,
        },
    ];

    return (
        <div className="home-container">
            {sections.map((section, index) => (
                <section
                    key={index}
                    className={`home-section ${section.reverse ? 'alternate-section' : ''}`}
                >
                    <div className="home-text">
                        <h2>{section.text.heading}</h2>
                        <p>{section.text.content}</p>
                        {section.text.button && <button className="login-button" onClick={()=>{navigate("/login")}}>{section.text.button}</button>}
                    </div>
                    <div className="home-image">
                        <img src={section.image.src} alt={section.image.alt} style={{height:"400px",width:"400px"}} />
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Home;
