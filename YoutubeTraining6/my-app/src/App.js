import logo from './logo.svg';
import './App.css';

import React from "react"
import Sidebar from "./Components/Sidebar"
import Editor from "./Components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

/**
 *    REFER TO AppExplanation.js for notes on explaining some of the function. This will be the actual code changes based on the challenge
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
    /*
            Part 1
                In order to interact to localStorage everytime note array changes, 
                we will want to set up a (out)side effect with react = useEffect
                - The Dependency array is the notes array state variable. So everytime notes 
                    changes, we will update to the localStorage
                - In the localStorage, we will be updating the notes key with the JSON.stringify
                    of notes array. This will turn the array into a string
            Part 2: REFER TO ABOVE useState
                Access the localStorage so we can preload with our app with whatever notes 
                we have saved in localStorage
                - NOTE: for the localStorage.get("notes"), if it is null, it returns null instead
                    of undefined, which is a good thing because we cannot parse undefined, will crash
                - Rather, if it returns null, which is a falsey value, it will return an empty array.
            Code breakdown:
                1. When user click "Create One Now", it will will execute the <div className="no-notes">
                    which will then execute the onClick event handler
                2. In the createNewNote function, it will then create a new const newNote and use notes
                    state variable's setter function to set new notes into notes array
                3. When setter is executed, it re-renders the app, which leads to running the useEffect
                4. the useEffect will then based on the dependency array which is the notes array changes
                    setItem within localStorage with the notes as key and stringify of notes array
                5. with the earlier re-renders, the also update the content of notes and based on the 
                    conditional in useState, which is based on whether JSON.parse(localStorage.getItem("notes"))
                    is a falsey value or not (will not because we already added new note) to determine
                    whether is an empty array or what is in the localStorage to display.
            
            Part 3. Lazy initialization.
                - Whenever there is Setter function such as the updateNote function below where whenever
                    user write notes on the Editor, it keeps re-rendering the page. This can be seen
                    if we uncomment the below State Initialization console log. 
                - This result in expensive operation, where there is a continually calling of 
                    certain function. Console log itself is fine and simple but when the initial state 
                    value depends on some expensive computation or side effect, like accessing the local 
                    storage or making a network request, the operation would be computationally intensive.
                - To mitigate this, we use lazy initialization by inserting a function within the state
                            React.useState( 
                                () => JSON.parse(localStorage.getItem("notes")) || []       
                            )
                - With lazy initialization, it will just interact with the useState once upon the initialization
            
            Part 4: adding summary as notes titles to the Siderbar
                - Refer to Sidebar.js

            Part 5: Bumping latest edited note up to the first note
                - We have a function updateNote(text), whenever we edit note, we will execute
                this
                - Currently we are using the .map() method such that our array of note stays in place
                within the index of the note array
                - Refer to updateNote(text) below

            Part 6: delete note

    */
    // const [state, setState] = React.useState(console.log("State initialization"))
    const [notes, setNotes] = React.useState( 
        () => JSON.parse(localStorage.getItem("notes")) || []       
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

   React.useEffect(()=> {
        localStorage.setItem("notes", JSON.stringify(notes))

   }, [notes])


    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    // This does not rearrange the notes/ ie bumping it up
    // function updateNote(text) {
    //     setNotes(oldNotes => oldNotes.map(oldNote => {
    //         return oldNote.id === currentNoteId
    //             ? { ...oldNote, body: text }
    //             : oldNote
    //     }))
    // }

    // This will bump it up
    function updateNote(text) {
        // When we are updating notes using setter method:
        setNotes(oldNotes => {
            
            // Create a new empty array
            const newArray = []
            // Loop over the original array
            for (let i = 0 ; i < oldNotes.length; i++){
                // indexing each note in oldNotes
                const oldNote = oldNotes[i]
                // if the the note that we are currently looking at : oldNotes.id
                // matches the note that the user is currently editing : currentNoteId, 
                // we unshift

                // Remember for our "currentNoteId" => it is initialize notes[0].id if note array is empty
                // Else, with every createNewNote function being execute, it setCurrentNoteId(newNote.id). 
                // Hence "currentNoteId" is a constantly updated state variable based on new note being created.
                // 
                if (oldNote.id === currentNoteId){
                    // put the updated note at the beginning of the new array
                    newArray.unshift({...oldNote, body: text})
                }
                else {
                    // push the old note to the end of the new array
                    newArray.push(oldNote)
                }
            // return the new array
            }
            return newArray
        })



    }

    function deleteNote(event, noteId) {
        /* stopPropagation: When trash icon handles the click event,
            stop propagating that click event to the parent like sidebar 
            div that is holding the entire note.
            In other words, the trash icon is a child element of the note
            at the side here. 
            When click the trash, currently it is propagating that click
            event through to the parent which is also handling a click event

            Challenge hints:
            NOTE: we need to use an array method to return a new array that
                    has filtered out one of the item in our case cause we
                    are deleting just one item based on some kind of 
                    condition.
            NOTE: we are passing two parameters in deleteNote.
                    Normally in an event listener, we dont get to choose 
                    what parameters we pass in. Need a workaround to pass
                    event object and noteId which is the note to be deleted, 
                    in to deleteNote
            WHY WE NEED THE stopPropagation:
                - We will get a error because React will try to select the 
                    note after deletion when the note already doesnt exist
                    in the note array
        */
        event.stopPropagation()
        // Your code here
        // console.log("deleted note", noteId)
        // After building the deleteNote function, we need to pass this function
        // down as prop into our Sidebar component

        /* In the setNotes setter method, we want to look through each note in
            our array and filter for noteId that is not equal to the noteId
            that we are trying to delete. This will result in all non delete notes
        */
        setNotes(oldNotes => oldNotes.filter((note)=>note.id !==noteId))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {

            notes.length > 0 
            ?
            // 
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >

                {/* This part conditionally renders a Sidebar component. It's passing several props to the Sidebar 
                    component: 

                    If both conditions (currentNoteId is truthy and there are notes present), it renders the Editor 
                    component. It's passing two props to the Editor component:
                */}
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    // passing in the deleteNote as a prop into our Sidebar component
                    // Refer to the Sidebar component
                    deleteNote={deleteNote}
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

