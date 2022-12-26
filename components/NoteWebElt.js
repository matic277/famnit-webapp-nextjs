import styles from '../styles/Note.module.css'
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

const NoteWebElt = ({note}) => {
    // Auth0 user state
    const { user, isLoading } = useUser();

    function onDeleteClicked(event) {
        console.log("Note delete clicked");
        // TODO bring notesList here somehow, track state just like in index page
    }

    return (
        <div className={styles.note}>
            <div className={styles.titleCotainer}>
                <div className={styles.noteTitle}>{note.title}</div>
                <div className={user.email == note.author ? styles.delete : styles.deleteHidden}
                     onClick={(e) => onDeleteClicked(e)}>delete</div>
            </div>
            <div className={styles.noteInfo}>
                <p className={styles.noteAuthor}>by user {note.author}</p>
                <p className={styles.noteTimestamp}> at {note.timestamp}</p>
            </div>

            <div className={styles.noteContentContainer}>
                <p className={styles.noteContent}>{note.content}</p>
            </div>
        </div>
    );
}

export default NoteWebElt