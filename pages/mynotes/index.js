import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import { useState, useEffect } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import NoteWebElt from "../../components/NoteWebElt";
import EditNotePopup from "../../components/EditNotePopup";

import NoteUtils from "../../lib/client/NoteUtils";

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

    const [editingNote, setEditingNote] = useState(null);

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
                if (data.length > 0) setSharedNotes(data);
            });
    }, []);

    function saveEdit() {
        NoteUtils.saveEdit(editingNote, setEditingNote, setUserNotes, userNotes);
    }

    function editNote(note) {
        NoteUtils.editNote(
            note,
            setEditingNote,
            document.getElementById("editNoteTitle"),
            document.getElementById("editNoteContent"));
    }
    
    return (
        <>
            <div className={editingNote ? styles.contentContainerBlurred : styles.contentContainer}>

                <div className={styles.userPageNotesContainer}>
                    <div className={styles.containerTitle}>Your notes</div> <br/>

                    <div className={editingNote ? styles.popupContainer : styles.popupContainerHidden}>
                        <EditNotePopup key={-1}
                                       editingNote={editingNote}
                                       setEditingNote={() => setEditingNote()}
                                       saveEdit={() => saveEdit()}/>
                    </div> <br/>

                    { userNotes ?
                        userNotes.map(note => <NoteWebElt key={note.id_note}
                                                          note={note}
                                                          onRemove={() => NoteUtils.delete(setUserNotes, note.id_note)}
                                                          onEdit={() => editNote(note)}/>) :
                        <div className={styles.noNotesText}>
                            You have no notes</div> }
                </div>

                <br/>

                <div className={styles.userPageNotesContainer}>
                    <div className={styles.containerTitle}>Shared with you</div> <br/>
                        { sharedNotes ?
                            sharedNotes.map(note => <NoteWebElt key={note.id_note}
                                                                note={note}
                                                                onRemove={() => NoteUtils.delete(setSharedNotes, note.id_note)}/>) :
                            <div className={styles.noNotesText}>
                                No notes have been shared with you</div> }
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