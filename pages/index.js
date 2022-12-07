import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Note } from './Note.js'
import NotesList from "../components/NotesList";

export default function Home({ notes }) {


    for (let i=0; i < notes.length; i++) {
        let d = new Date();
        notes[i].timestamp = d.getDay() + "." + d.getMonth() + "." + d.getFullYear();
    }
    console.log(notes);
    

    function onAddNoteClick(event) {
        event.preventDefault(); // prevent page reload
    }

    return (
        <>
            <div className={styles.contentContainer}>

                <div className={styles.topRow}>
                    <div className={styles.addNoteContainer}>
                        <p className={styles.addNoteText}>Add note</p>
                        <div className={styles.popupNoteContainer}>
                            <label className={styles.addNoteInputLabel}>Name</label><br/>
                            <input className={styles.addNoteName} type="text"></input><br/>

                            <label className={styles.addNoteInputLabel}>Content</label><br/>
                            <textarea className={styles.addNoteContent}></textarea><br/>
                            <button className={styles.addNoteBtn} onClick={(e) => onAddNoteClick(e)} >Add</button>
                        </div>
                    </div>
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
        "https://jsonplaceholder.typicode.com/posts?_limit=3");
    const notes = await res.json();
    return {
        props: {
            notes
        }
    };
}
