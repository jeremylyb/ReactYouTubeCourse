import './Components.css';

export default function Main(){
    return (
       
        // semantic html element and it represents the main section of our app 
        <main>
            <h1 className="main-title">Fun facts of about React</h1>
            <ul className= "main-facts">
                <li> Has well over 100k stars on Github</li>
                <li> Is maintained by Facebook</li>
                <li> Powers thousands of enterprise apps, including mobile apps</li>
            </ul>
        </main>
    )
}
