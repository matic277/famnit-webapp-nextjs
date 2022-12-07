// import React from "react";
import styles from '../styles/Note.module.css'
import Note from './Note.js'

const NoteList = ({notes}) => {
    return (
        //<div className={styles.note}>
            //{
                notes.map((note) => (
                    <Note note={note}/>
                    // <div className={styles.note} key={note.id}>
                    //     <div className={styles.noteName}>{note.title}</div>
                    //     <div className={styles.noteContentContainer}>
                    //         <div className={styles.noteContent}>{note.body}</div>
                    //     </div>
                    // </div>
                ))
            //}
        //</div>
    );
}

export default NoteList