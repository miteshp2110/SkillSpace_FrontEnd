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

                    <Link to="/addProject">
                        <div className="navbarButton " id="addPrjBtn">
                            ADD PROJECT
                        </div>
                    </Link>

                    <Link to="/about">
                        <div className="navbarButton" id="aboutButton">
                            ABOUT
                        </div>
                    </Link>
                    <Link to="/profile">
                        <div className="navbarButton" id="profileButton">
                            PROFILE
                        </div>
                    </Link>
                </div>


            </nav>
        </>
    )
}


export default Navbar