import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import NoteWebElt from "../components/NoteWebElt";
import EditNotePopup from "../components/EditNotePopup";

import NoteUtils from "../lib/client/NoteUtils";
import * as Const from "../lib/constants";


export default function Home() {
    // Auth0 user state
    const { user, isLoading } = useUser();
    const [ userSaved, setUserSaved ] = useState(false);

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
        fetch("/api/note/stream?index=0")
            .then((res) => res.json())
            .then((data) => {
                data.map(n => n.username = n.username ? n.username : Const.byAnon);
                setNotes(data);
                setNotesLoading(false);
            });
    }, []);
    if (notesLoading) return (<div>Loading...</div>);
    if (!notes) return (<div>No notes</div>);
    if (user && !userSaved) {
        // Register user to DB
        fetch('api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: user.email, sub: user.sub })
        })
        .then(r => r.json())
        .then(r => {
            const userId = r.id_user;
            console.log("user resolved to id=", userId);
            setUserSaved(true);
            // Append userId to user struct
            user.id_user = userId;
        });
    }

    const fetchMoreNotes = async (index) => {
        const res = await fetch("/api/note/stream?index=" + index);
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
                n.username = n.username ? n.username : Const.byAnon;
                notes.unshift(n);
            });
            setNotes([...notes]);
         });         
    }

    function onSetLayoutClick(size) {
        setLayout(size);
        console.log("layout is now:", size);
    }

    function startNoteCreation(event) {
        NoteUtils.startNoteCreation(user, setEditingNote);
    }

    function editNote(note) {
        NoteUtils.editNote(
            note,
            setEditingNote,
            document.getElementById("editNoteTitle"),
            document.getElementById("editNoteContent"));
    }

    // Creating or editing a note
    async function saveEdit(event) {
        // update note with new values
        // editingNote should be not-null at this point
        NoteUtils.saveEdit(editingNote, setEditingNote, setNotes, notes);
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
                                                    onRemove={() => NoteUtils.delete(setNotes, note.id_note)}
                                                    onEdit={() => editNote(note)}/>) }
                </div>
                
            </div>
            
            <div className={editingNote ? styles.popupContainer : styles.popupContainerHidden}>
                <EditNotePopup key={-1}
                               editingNote={editingNote}
                               setEditingNote={() => setEditingNote()}
                               saveEdit={() => saveEdit()}/>
            </div>
        </>
    )
}

// export const getStaticProps = async () => {
//     const res = await fetch(
//         //"https://jsonplaceholder.typicode.com/posts?_limit=3"
//         (process.env.environment == 'production' ? "http://famnit-webapp-nextjs.vercel.app" : "http://localhost:3000") +
//         "/api/note/stream?index=0"
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
