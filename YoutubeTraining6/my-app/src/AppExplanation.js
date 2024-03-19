import logo from './logo.svg';
import './App.css';

import React from "react"
import Sidebar from "./Components/Sidebar"
import Editor from "./Components/Editor"
import { data } from "./data"

// Third party library - to split pane to allow user to resize the pane divider diving Editor component render
// and Sidebar component render
import Split from "react-split"
import {nanoid} from "nanoid"

/**
 * 
 *    [Challenge]
 * 1. Every time the `notes` array changes, save it 
 *    in localStorage. You'll need to use JSON.stringify()
 *    to turn the array into a string to save in localStorage.
 * 2. When the app first loads, initialize the notes state
 *    with the notes saved in localStorage. You'll need to
 *    use JSON.parse() to turn the stringified array back
 *    into a real JS array.
 *      
 *    [Challenge ]
 *      Features to Add
 *      - Sync notes with localStorage
 *          - A way to save our notes when we refreshes the app.
 *          - Use the browser's localStorage to save the changes that happened to the notes
 *      - Upgrade each notes by providing a note summary to annotate the each note on the sidebar - Using the first line in our Editor to represent the summary
 *      - Most relevant note: bumping up the note that we updated most recently
 *      - Delete note
 */

export default function App() {

    
    // Saving all of our notes in state with initializing as an empty array
    const [notes, setNotes] = React.useState( || [])        // When app first load, should initialize with notes saved in localStorage. Use json.parse


    /*
        Creating a localStorage
            - localStorage.getItem("key")
            - localStorage.setItem("key", value)
                - NOTE: value must be a string, so if you have a more complex value like an array or object to save,  will need to use JSON.stringify(value)
                    so as to convert it JSON version which can be saved in localStorage
                - When time to pull it out of localStorage, we then need to use JSON.parse(stringifiedValue) to convert it back

    */


    /* Initializing a state variable currentNoteId base on following logic:
        (notes[0] && notes[0].id) || "": 
        This expression is determining the initial state value. It checks if notes[0] exists 
        (i.e., if the notes array is not empty) and if notes[0].id exists (i.e., if the first 
        note in the notes array has an id). If both conditions are true, it assigns notes[0].id 
        as the initial state value. If either condition is false (i.e., if notes[0] does not 
        exist or does not have an id), it assigns an empty string ("") as the initial state value.
    */
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        
        /* createNewNote function utilize notes state variable's setter function
            to add new note to existing notes array
            It also set the currentNoteId state variable base on this new noteId
            NOTE: This is just to create new notes, ie creating notes on the 
                  Sidebar component. It does not actually create the note content
                  The updateNote function then updates the note content
        */
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
    }
    // findCurrentNote is a function for us to identify the current note we are at
    // which is utilized in both Editor and Sidebar component
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            /*  Conditional rendering the split component if the notes length is > 0
                or else when we initialize cause else notes array length = 0
            */
            notes.length > 0 
            ?
            // 
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />


                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

