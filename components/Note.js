import styles from '../styles/Note.module.css'

const Note = ({note}) => {
    return (
        <div className={styles.note} key={note.id}>

            <div className={styles.noteTitle}>
                {note.title}
            </div>
            <div className={styles.noteInfo}>
                <p className={styles.noteAuthor}>by user {note.userId}</p>
                <p className={styles.noteTimestamp}> at {note.timestamp}</p>
            </div>

            <div className={styles.noteContentContainer}>
                <p className={styles.noteContent}>{note.body}</p>
            </div>
        </div>
    );
}

export default Note