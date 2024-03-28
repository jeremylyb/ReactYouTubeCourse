
import './Components.css';
import logoImage from "../Images/logo192.png";

export default function NavBar(){
    return (
        <nav>
            <img src={logoImage} alt="logoIcon" className="nav-icon"></img>
            <h3 className="nav-h3"> ReactFacts</h3>
            <h4 className="nav-h4"> React Course - Project 1</h4>
        </nav>
        )
}