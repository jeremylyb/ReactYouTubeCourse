
import './App.css'
import {useState} from "react"
import Navbar from "./Components/Navbar.js"
import Main from "./Components/Main.js"

/*
    Both our Navbar and Main component takes in props (refer to the respective component for more details)
      Main(props){
         <main className={props.darkMode ? "dark" : ""}>
      }

      Navbar(props){
        <nav 
            className={props.darkMode ? "dark": ""}
        >
      }

      For Navbar, it takes in additionally a prop = toggleDarkmark, which is 
      an onCLick event handler listening to if the the click to turn on dark
      mode is activated.
      
      Given both child components need "darkMode" prop, we will set this 
      state variable in the parent App component
      
*/

export default function App() {

  // Creating useState darkMode field with boolean as value
  const [darkMode, setDarkMode] = useState(true)

  // Create a toggle function which will update the state value
  function toggleDarkMode(){
    // Since we just want to flip the boolean of darkMode, simple inverse
    setDarkMode(prevMode => !prevMode) 
  }

    return (

        /* After creating darkMode state and the toggle function which
            determines the change state, we pass it into Navbar and Main
            as props

            Note that how the slider button works is through the toggleDarkMode
            to update the darkMode boolean value accordingly.
            
            The value of darkMode is then passed in as props to the Main and 
            Navbar components, and used to determine the className of the Main
            and Nav tag element. It is conditional rendering, depending on
            the value of darkMode, the className is defined conditionally

            With the className udpated accordingly, the Main and Nav bar will
            render corresponding display background according to the matched 
            className in css.
        */ 
        <div className="container">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <Main darkMode={darkMode} />
        </div>
    )
}