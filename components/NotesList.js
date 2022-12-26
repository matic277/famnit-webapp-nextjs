// import React from "react";
import styles from '../styles/Note.module.css'
import NoteWebElt from './NoteWebElt.js'

const NoteList = ({notes}) => {
    return (
        //<div className={styles.note}>
            //{
                notes.map((note) => (
                    <NoteWebElt key={note.id_note} note={note}/>
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