import React from 'react';
import './AboutUs.css';
import ScrollReveal from 'scrollreveal';

const AboutUs = () => {
    React.useEffect(() => {
        ScrollReveal().reveal('.about-content, .developers', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            reset: true,
        });
    }, []);

    return (
        <div className="about-container">
            <section className="about-content">
                <div className="about-image">
                    <img
                        src="https://via.placeholder.com/300"
                        // src="https://skillspaceprofileimages.s3.ap-south-1.amazonaws.com/aboutus.jpeg"
                        alt="SkillSpace illustration"
                    />
                </div>
                <div className="about-text">
                    <p>
                        SkillSpace is a web platform dedicated to enhancing collaboration and efficiency in managing student projects.
                        Students can upload their projects, track milestones, and showcase their work in a structured portfolio.
                        Teachers can seamlessly review project progress, provide valuable feedback, and address student queries,
                        creating a dynamic and supportive learning environment.
                    </p>
                    <p>
                        Designed with both students and teachers in mind, SkillSpace fosters innovation and productivity by enabling
                        streamlined communication, easy tracking of project development, and effective mentoring. Join us in building a
                        community where learning meets creativity!
                    </p>
                </div>
            </section>
            <section className="developers">
                <h2>Meet Our Developers</h2>
                <div className="developer-cards">
                    <div className="developer-card">
                        <h3>Shriya Pradhan</h3>
                        <p>
                            A passionate full-stack developer with expertise in building scalable web applications and a strong interest in education technology.
                        </p>
                    </div>
                    <div className="developer-card">
                        <h3>Mitesh Paliwal</h3>
                        <p>
                            A creative backend developer focused on delivering robust systems and enhancing functionality through intuitive and scalable design.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
