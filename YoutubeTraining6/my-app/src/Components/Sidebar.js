import React from "react"

export default function Sidebar(props) {

    // Taking the array of notes and map into noteElements which will be used
    // to displayed in the render display
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                /* Conditionar rendering, depending if the currentNote id and
                    the selected note id are the same, it will dynamically define 
                    the className which will then define the css display
                    This will change the display, toggle across and highlight the
                    selected note in the Sidebar
                    
                    Also, it dynamically updates what note with have for that 
                    specific note in the Editor
                */  
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >

                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    // Your onClick event handler here
                    /* Since we receive the deleteNote function passed into as prop into our
                        Sidebar component, we will use it through an onClick event handler
                        NOTE:
                            Since by default, whatever funciton we passed into an event 
                            handler, it will receive an event as the parameter. Hence, 
                            we cannot use props.deleteNote here. 
                            In order to workaround, we can use .bind or another callback
                            function which will call the deleteNote function. This
                            way, i can take the event that was passed in as parameter,
                            and pass it along into the callback function props.deleteNote()
                            As shown below, instead of 
                                onClick={props.deleteNote()}
                            Next, go to App.js to finish up the deleteNote() function
                    */
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
                {/* <h4 className="text-snippet">Note {index + 1}</h4> */}
                {/* 
                    Part 4: adding summary as notes titles to the Siderbar 
                            Since we have access to each individual note, we can access
                            the body content and split it based on the new line syntax
                            After that, we can just access the first line
                            With this, it will update to notes title with every key stroke
                */}
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
