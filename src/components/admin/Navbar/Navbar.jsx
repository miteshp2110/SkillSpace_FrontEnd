import './Navbar.css'
import {ReactComponent as Logo} from "../../../resources/svg/logo.svg"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../../../utils/AppContext";
const Navbar = () => {
    const {logout} = useContext(AppContext);
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

                        <div className="navbarButton" id="signupButton" onClick={()=>{
                            logout()
                            window.location.href="/"
                        }}>
                            LOGOUT
                        </div>

                </div>


            </nav>
        </>
    )
}


export default Navbar