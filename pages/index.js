import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import NoteWebElt from "../components/NoteWebElt";

import NoteUtils from "../lib/NoteUtils";


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
    
    function onAddNoteClick(event) {        
        const title   = document.getElementById("noteTitle");
        const content = document.getElementById("noteContent");
        // TODO refactor: make a proper "Note" class
        console.log("user: ", user ? user.email : "Anonymous");
        const username = user && user.email? user.email : undefined;
        const note = {
            username: username,
            title: title.value,
            content: content.value,
        };
        
        //console.log("body=", JSON.stringify(note));
        
        // TODO
        // fix this GET-POST request... when note is added to ui I need id_note from DB
        fetch('api/notes/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        }).then(response => {
            console.log("Server response=", response);

            // Add id property, which was returned by api create
            note.id_note = response.id_note;
            console.log("got id_note=", response.id_note);
            // Update state, adding new note
            notes.unshift(note);
            setNotes([...notes]);
        });
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
        notesPromise.then(function(newNotes) {
            newNotes.forEach(n  => {
                const author = (n.id_note == undefined || n.id_note == null) ? "Anonymous" : "TODO"; // TODO alter select sql to also return author name
                console.log("Received notedid=", n.id_note, "by", author);
                n.author = author;
                notes.push(n);
            });
            setNotes([...notes]);
         });         
    }

    function onSetLayoutClick(size) {
        setLayout(size);
        console.log("layout is now:", size);
    }

    function removeNote(id) {
        setNotes(prevNotes => prevNotes.filter(n => n.id_note != id));
    }

    return (
        <>
            <div className={styles.contentContainer}>
                <div className={styles.topRow}>
                    <div className={styles.addNoteContainer}>
                        <p className={styles.addNoteText}>Add note</p>
                        <div className={styles.popupNoteContainer}>
                            <label className={styles.addNoteInputLabel}>Name</label><br/>
                            <input id="noteTitle" className={styles.addNoteName} type="text"></input><br/>

                            <label className={styles.addNoteInputLabel}>Content</label><br/>
                            <textarea id="noteContent" className={styles.addNoteContent}></textarea><br/>
                            <button className={styles.addNoteBtn} onClick={(e) => onAddNoteClick(e)}>Add</button>
                        </div>
                    </div>

                    <br/>
                    <div className={styles.layoutOptionsContainer}>
                        <div className={styles.selectLayoutText}>Layout:</div>
                        <div className={layout == 1 ? styles.layoutOptionSelected : styles.layoutOption} onClick={(e) => onSetLayoutClick(1)}>1 x n</div>
                        <div className={layout == 2 ? styles.layoutOptionSelected : styles.layoutOption} onClick={(e) => onSetLayoutClick(2)}>2 x n</div>
                        <div className={layout == 3 ? styles.layoutOptionSelected : styles.layoutOption} onClick={(e) => onSetLayoutClick(3)}>3 x n</div>
                        <div className={layout == 4 ? styles.layoutOptionSelected : styles.layoutOption} onClick={(e) => onSetLayoutClick(4)}>flow</div>
                    </div>
                </div>

                <br/>
                <br/>
                <button onClick={(e) => loadMoreNotes(e)}>Load more</button>
                <br/>
                <br/>
                <button onClick={(e) => createUserAndGetId(e)}>create</button>

                {/* this does not work? -> layout does not change*/}
                {/* <div className={'styles.notesContainer'+layout+'xn'}> */}
                <div className={layout == 1 ? styles.notesContainer1xn :
                                layout == 2 ? styles.notesContainer2xn :
                                layout == 3 ? styles.notesContainer3xn :
                                layout == 4 ? styles.notesContainerFlow :
                                'throwerror'}>

                    {/* <NotesList notes={notes} parent={() => console.log("AYYY") }/> */}
                    {
                    notes.map((note) => (
                        <NoteWebElt key={note.id_note} note={note} onRemove={() => NoteUtils.deleteNote(setNotes, note.id_note)}/>
                    ))
                    }
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
