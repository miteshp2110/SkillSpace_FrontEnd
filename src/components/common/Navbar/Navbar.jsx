import './Navbar.css'
import {getRole} from "../../../utils/AppController";
import {ReactComponent as Logo} from "../../../resources/svg/logo.svg"
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <>
            <nav className="navbarContainer">

                <div className="companyDetailsContainer">
                    <div className="companyLogoContainer">
                        <Logo style={{width: "50px"}}/>
                    </div>

                    <div className="companyNameContainer">
                        SkillSpace
                    </div>
                </div>

                <div className="buttonContainer">
                    <Link to="/">
                        <div className="navbarButton " id="homeButton">
                            HOME
                        </div>
                    </Link>

                    <Link to="/about">
                        <div className="navbarButton" id="aboutButton">
                            ABOUT
                        </div>
                    </Link>
                    <Link to="/signup">
                        <div className="navbarButton" id="signupButton">
                            SIGNUP
                        </div>
                    </Link>
                </div>


            </nav>
        </>
    )
}


export default Navbar