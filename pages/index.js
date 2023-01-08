import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import NoteWebElt from "../components/NoteWebElt";

import NoteUtils from "../lib/note/NoteUtils";
import * as Const from "../lib/constants";


export default function Home() {
    // Auth0 user state
    const { user, isLoading } = useUser();

    // TODO: getting userId from db is not needed?
    //       just use email, should be unique anyways...?
    // const [ userId, setUserId ] = useState(null); // Id of user in db
    // if (user) {
    //     fetch("/api/user/id?name=" + user.email)
    //         .then((res) => res.json())
    //         .then((user) => {
    //             console.log("-----> Got user id=", user);
    //             setUserId(user.id_user);
    //         });
    // }

    const [editingNote, setEditingNote] = useState(null);

    // State of selected layout
    // -> default layout at start is "1 x n"
    const [layout, setLayout] = useState(1);

    // Track state of fetch index, increment on every button "Load more" press
    const [fetchIndex, setIndex] = useState(0);

    const [notes, setNotes] = useState(null);
    const [notesLoading, setNotesLoading] = useState(false);
    useEffect(() => {
        setNotesLoading(true);
        fetch("/api/notes/stream?index=0")
            .then((res) => res.json())
            .then((data) => {
                setNotes(data);
                setNotesLoading(false);
            });
    }, []);
    if (notesLoading) return (<div>Loading...</div>);
    if (!notes) return (<div>No notes</div>);

    // Standard react stuff to change state on client and server
    //const [notes, setNotes] = useState(notesList);

    // Append timestamp to dummy data
    // for (let i=0; i < notesList.length; i++) {
    //     let d = new Date();
    //     notesList[i].timestamp = d.getDay() + "." + d.getMonth() + "." + d.getFullYear();
    // }
    //console.log(notesList);

    function createUserAndGetId() {
        console.log("test");
    }

    const fetchMoreNotes = async (index) => {
        const res = await fetch(
            //"https://jsonplaceholder.typicode.com/posts?_limit=3"
            //(process.env.environment == 'production' ? "https://famnit-webapp-nextjs.vercel.app" : "http://localhost:3000") +
            "/api/notes/stream?index=" + index
        );
        const newNotes = await res.json();
        return newNotes;
    }
    function loadMoreNotes(event) {
        const index = 1 + fetchIndex;
        setIndex(1 + fetchIndex);
        console.log("Getting new notes with index", index);
        const notesPromise = fetchMoreNotes(index);
        notesPromise.then(newNotes => {
            newNotes.forEach(n  => {
                const username = !n.id_note || !n.username ? Const.byAnon : "TODO";
                console.log("Got:",n);
                n.username = username;
                notes.push(n);
            });
            setNotes([...notes]);
         });         
    }

    function onSetLayoutClick(size) {
        setLayout(size);
        console.log("layout is now:", size);
    }

    function startNoteCreation(event) {
        const username = user && user.email? user.email : Const.byAnon;
        // Dummy note, that will be "edited"
        const note = {
            username: username,
            title: "",
            content: "",
            editable: true, // if you are the owner, you can edit it. But not after reloading TODO fix this
            type: Const.creating, // signal we are in "creation mode"
        };
        
        // open popup by setting value with note we're creating (editing)
        setEditingNote(note);
    }

    function editNote(note) {
        // populate input fields with existing data
        document.getElementById("editNoteTitle")  .value = note.title;
        document.getElementById("editNoteContent").value = note.content;

        // editing mode
        note.type = Const.editing;

        // open popup by setting value with note we're editing
        setEditingNote(note);
    }

    // Creating or editing a note
    function saveEdit(event) {
        // update note with new values
        // editingNote should be not-null at this point
        editingNote.title   = document.getElementById("editNoteTitle")  .value
        editingNote.content = document.getElementById("editNoteContent").value

        // parse users
        const userParser = text => {
            if (!text) return [];
            return text.split(';').filter(x => x.length > 1).map(user => user.trim());
        }
        const sharedUsers = userParser(document.getElementById("shareWith").value);
        console.log("sharing with users:", sharedUsers);
        
        // TODO add field length checking
        // title & content
        
        if (editingNote.type == Const.editing) {
            NoteUtils.updateNote(editingNote);
        }
        else if (editingNote.type == Const.creating) {
            // TODO
            // fix this GET-POST request... when note is added to ui I need id_note from DB
            fetch('api/notes/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Expose-Headers': 'Location'
                },
                body: JSON.stringify(editingNote)
            }).then(response => {
                console.log("Server response=", response);

                // Add id property, which was returned by api create
                editingNote.id_note = response.id_note;
                console.log("got id_note=", response.id_note);
                console.log("bgot id_note=", response.headers.get('Location'));
                // Update state, adding new note
                notes.unshift(editingNote);
                setNotes([...notes]);
            });
        }1

        // close popup
        setEditingNote(null);
    }

    return (
        <>
            <div className={editingNote ? styles.contentContainerBlurred : styles.contentContainer}>
                <div className={styles.topRow}>
                    <br/>
                    <div className={styles.layoutOptionsContainer}>
                        <div className={styles.selectLayoutText}>Layout:</div>
                        <div className={layout == 1 ? styles.layoutOptionSelected : styles.layoutOption} onClick={(e) => onSetLayoutClick(1)}>1 x n</div>
                        <div className={layout == 2 ? styles.layoutOptionSelected : styles.layoutOption} onClick={(e) => onSetLayoutClick(2)}>2 x n</div>
                        <div className={layout == 3 ? styles.layoutOptionSelected : styles.layoutOption} onClick={(e) => onSetLayoutClick(3)}>3 x n</div>
                        <div className={layout == 4 ? styles.layoutOptionSelected : styles.layoutOption} onClick={(e) => onSetLayoutClick(4)}>flow</div>
                    </div>

                    <br/>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.optionsButton} onClick={(e) => startNoteCreation(e)}>Create note</button>
                        <button className={styles.optionsButton} onClick={(e) => loadMoreNotes(e)}>Load more</button>
                    </div>
                </div>
                
                
                {/* this does not work? -> layout does not change*/}
                {/* <div className={'styles.notesContainer'+layout+'xn'}> */}
                <div className={layout == 1 ? styles.notesContainer1xn :
                                layout == 2 ? styles.notesContainer2xn :
                                layout == 3 ? styles.notesContainer3xn :
                                layout == 4 ? styles.notesContainerFlow :
                                'throwerror'}>
                
                    {/* <NotesList notes={notes} parent={() => console.log("AYYY") }/> */}
                    { notes.map(note => <NoteWebElt key={note.id_note}
                                                    note={note}
                                                    onRemove={() => NoteUtils.deleteNote(setNotes, note.id_note)}
                                                    onEdit={() => editNote(note)}/>) }
                </div>
                
            </div>
            
            {/* Popup window for editing a note */}
            <div className={editingNote ? styles.popupContainer : styles.popupContainerHidden}>
                    <div>{editingNote ? "Edit note" : "Create note"}</div><br/>
                    <div className={styles.edittitlecontainer}>
                        <div className={styles.edittitletext}>Title:</div>
                        <input id="editNoteTitle" className={styles.edittitleinput} type="text"></input><br/>
                    </div>
                    <div className={styles.editcontentcontainer}>
                        <div className={styles.editcontenttext}>Content:</div>
                        <textarea id="editNoteContent" className={styles.editcopntentinput} type="text"></textarea><br/>
                    </div>
                    <br/>
                    <div className={styles.editsharedusers}>
                        <div className={styles.editshareduserstext}>Share with:</div>
                        <input id="shareWith" className={styles.edittitleinput} type="text"></input><br/>
                    </div>
                    <div className={styles.popupbuttonscontainer}>
                        <button className={styles.popupbuttonred} onClick={(e) => setEditingNote(null)}>cancel</button>
                        <button className={styles.popupbutton}    onClick={(e) => saveEdit(e)}>save</button>
                    </div>
            </div>
        </>
    )
}

// export const getStaticProps = async () => {
//     const res = await fetch(
//         //"https://jsonplaceholder.typicode.com/posts?_limit=3"
//         (process.env.environment == 'production' ? "http://famnit-webapp-nextjs.vercel.app" : "http://localhost:3000") +
//         "/api/notes/stream?index=0"
//     );
//     try {
//         const notesList = await res.json();
//         return { props: { notesList } };
//     }
//     catch(err) {
//         console.log("Err occured in (home) index getStaticProps, res=", res)
//         console.log("res.text=", res.text);
//         console.log("Error:", err);
//     }
//     return { props: { ok: false, reason: "err occured" } };
// }
