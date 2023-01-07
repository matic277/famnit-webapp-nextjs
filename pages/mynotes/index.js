import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import { useState, useEffect } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
//import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import NotesList from "../../components/NotesList";


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

    // useEffect(() => {
    //     console.log("Loading for userId=", userId);
    //     setNotesLoading(true);
    //     fetch("/api/notes/user?id=" + userId)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("Fetched notes=", data);
    //             setNotes(data);
    //             setNotesLoading(false);
    //         });
    // }, []);
    // if (!notes) return (<div>No notes</div>);

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
                    <NotesList notes={notes}/>
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