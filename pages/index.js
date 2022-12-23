import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React, { useState } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import NotesList from "../components/NotesList";


export default function Home({ notesList }) {
    // Auth0 user state
    const { user, isLoading } = useUser();

    // Standard react stuff to change state on client and server
    const [notes, setNotes] = useState(notesList);

    // Append timestamp to dummy data
    // for (let i=0; i < notesList.length; i++) {
    //     let d = new Date();
    //     notesList[i].timestamp = d.getDay() + "." + d.getMonth() + "." + d.getFullYear();
    // }
    //console.log(notesList);

    // Track state of fetch index, increment on every button "Load more" press
    const [fetchIndex, setIndex] = useState(0);
    
    function onAddNoteClick(event) {        
        const title   = document.getElementById("noteTitle");
        const content = document.getElementById("noteContent");
        // TODO refactor: make a proper "Note" class
        const note = {
            id: undefined,
            title: title.value,
            body: content.value,
        };

        // Update state, adding new note
        notes.push(note);
        setNotes([...notes]);
        
        // TODO: perform content checking
        // TODO: send to server ->  get back Id -> set Id (use callback)
        //       immediately show note as if it's added. Then when we get a response
        //       from the server, set the id of the note - this will improve perceived responsivness.
    }

    const fetchMoreNotes = async (index) => {
        const res = await fetch(
            //"https://jsonplaceholder.typicode.com/posts?_limit=3"
            "http://localhost:3000/api/notes?index=" + index
            );
        const newNotes = await res.json();
        return newNotes;
    }
    //let fetchIndex = 1;
    function loadMoreNotes(event) {
        console.log("Getting new notes with index " + fetchIndex);
        const notesPromise = fetchMoreNotes(fetchIndex);
        notesPromise.then(function(newNotes) {
            newNotes.forEach(n  => { notes.push(n); console.log("Received notedid=", n.id_note)});
            setNotes([...notes]);
         });
         setIndex(1 + fetchIndex);
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
                    <button onClick={(e) => loadMoreNotes(e)}>Load more</button>
                </div>

                <div className={styles.content}>
                    <NotesList notes={notes}/>
                </div>
            </div>
        </>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(
        //"https://jsonplaceholder.typicode.com/posts?_limit=3"
        "http://localhost:3000/api/notes?index=0"
        );
    const notesList = await res.json();
    return {
        props: {
            notesList
        }
    };
}
