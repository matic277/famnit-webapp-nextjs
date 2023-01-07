import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import { useState, useEffect } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
//import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import NoteWebElt from "../../components/NoteWebElt";
import NoteUtils from "../../lib/NoteUtils";

export default function Mynotes() {
// export default withPageAuthRequired(function Profile({ user }) {
    
    // Auth0 user state
    const { user, isLoading } = useUser();
    if (!user) {
        return (<div>No user logged in</div>);
    }
    
    // Grab users notes
    const [notes, setNotes] = useState(null);
    useEffect(() => {
        console.log("Loading for user=", user.email);
        // setNotesLoading(true);
        fetch("/api/notes/user?name=" + user.email)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched notes=", data);
                data.forEach(n => {
                    n.username = n.username == undefined ? "Anonymouse" : n.username;
                });
                setNotes(data);
                // setNotesLoading(false);
            });
    }, []);
    if (!notes) {
        return (<div>No notes</div>);
    }

    return (
        <>
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    {/* <NotesList notes={notes}/> */}
                    {
                    notes.map((note) => (
                        <NoteWebElt key={note.id_note} note={note} onRemove={() => NoteUtils.deleteNote(setNotes, note.id_note)}/>
                    ))
                    }
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