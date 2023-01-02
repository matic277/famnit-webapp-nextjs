import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import React, { useState } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
//import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import NotesList from "../../components/NotesList";


export default function Mynotes({ notesList }) {
//export default withPageAuthRequired(function Profile({ user }) {
    // Auth0 user state
    //const { user, isLoading } = useUser();

    // Standard react stuff to change state on client and server
    //const [notes, setNotes] = useState(notesList);
    
    console.log("notes: ", notesList);

    // const fetchNotesForUser = async () => {
    //     const res = await fetch(
    //         //"https://jsonplaceholder.typicode.com/posts?_limit=3"
    //         "http://localhost:3000/api/user/notes?user_email=" + user.email
    //     );
    //     const newNotes = await res.json();
    //     return newNotes;
    // }
    // function loadNotes(event) {
    //     const userEmail = user ? user.email : "AB";
    //     console.log("Getting new notes for user", userEmail);
    //     const notesPromise = fetchNotesForUser();
    //     notesPromise.then(function(newNotes) {
    //         newNotes.forEach(n  => {
    //             const author = userEmail;
    //             console.log("Received notedid=", n.id_note, "by", author);
    //             n.author = author;
    //             notes.push(n);
    //         });
    //         setNotes([...notes]);
    //      });         
    // }
    //loadNotes(null);
    return (
        <>
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    {
                        notesList ?
                        <NotesList notes={notesList}/>
                        :
                        <div>loading</div>
                    }
                </div>
            </div>
        </>
    );
}

Mynotes.getInitialProps = async (ctx) => {
    const res = await fetch(
        (process.env.environment == 'production' ? "https://famnit-webapp-nextjs.vercel.app" : "http://localhost:3000") +
        '/api/notes/user?user_email=2'); // TODO set actual id
    const notesList = await res.json();
    console.log("props: ", notesList);
    return { notesList };
}