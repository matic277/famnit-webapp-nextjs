import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import { useState, useEffect } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import NoteWebElt from "../../components/NoteWebElt";
import NoteUtils from "../../lib/note/NoteUtils";

export default function Mynotes() {   
    // Auth0 user state
    const { user, isLoading } = useUser();
    if (!user) {
        return (<div>Not logged in</div>);
    }
    
    // Grab users notes
    const [userNotes, setUserNotes] = useState(null);
    // Grab shared notes
    const [sharedNotes, setSharedNotes] = useState(null);

    useEffect(() => {
        // User notes
        console.log("Loading user notes for user=", user.email);
        fetch("/api/notes/user?name=" + user.email)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched user notes=", data);
                setUserNotes(data);
            });
        
        // Shared notes
        console.log("Loading shared notes for user=", user.email);
        fetch("/api/notes/shared?name=" + user.email)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched shared notes=", data);
                setSharedNotes(data);
            });
    }, []);
    
    return (
        <>
            <div className={styles.contentContainer}>

                <div className={styles.userNotesContainer}>
                    <div>User notes:</div> <br/>
                    { userNotes ?
                        userNotes.map(note => <NoteWebElt key={note.id_note}
                                                          note={note}
                                                          onRemove={() => NoteUtils.deleteNote(setUserNotes, note.id_note)}/>) :
                        <div>No notes have been shared with you</div> }
                </div>

                <br/>

                <div className={styles.sharedNotesContainer}>
                    <div>Shared with you:</div> <br/>
                        { sharedNotes ?
                            sharedNotes.map(note => <NoteWebElt key={note.id_note}
                                                                note={note}
                                                                onRemove={() => NoteUtils.deleteNote(setSharedNotes, note.id_note)}/>) :
                            <div>No notes have been shared with you</div> }
                </div>
            </div>
        </>
    );
}

// Mynotes.getInitialProps = async (ctx) => {
//     const res = await fetch('/api/notes/user?id'); // TODO set actual id
//     const notesList = await res.json();
//     console.log("props: ", notesList);
//     return { notesList };
// }