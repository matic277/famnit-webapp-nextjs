import styles from '../styles/Note.module.css'
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPaperPlane,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

const NoteWebElt = ({note}) => {
    // Auth0 user state
    const { user, isLoading } = useUser();

    function onEditClicked(event) {
        console.log("Note edit clicked");
        // TODO bring notesList here somehow, track state just like in index page
    }

    function onShareWithClicked(event) {
        console.log("Note share clicked");
        // TODO bring notesList here somehow, track state just like in index page
    }

    function onDeleteClicked(event) {
        console.log("Note delete clicked");
        // TODO bring notesList here somehow, track state just like in index page
    }

    return (
        <>
        <div className={styles.note}>
            <div className={styles.titleCotainer}>
                <div className={styles.noteTitle}>{note.title}</div>
                <div className={(user && user.email == note.username) ? styles.noteOptionsContainer : styles.noteOptionsContainerHidden}>
                    <FontAwesomeIcon icon={faEdit}       className={styles.noteOption}       onClick={(e) => onEditClicked(e)}/>
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.noteOption}       onClick={(e) => onShareWithClicked(e)}/>
                    <FontAwesomeIcon icon={faTrash}      className={styles.noteOptionDelete} onClick={(e) => onDeleteClicked(e)}/>
                </div>
            </div>
            <div className={styles.noteInfo}>
                <p className={styles.noteAuthor}>by user {note.username}</p>
                <p className={styles.noteTimestamp}> at {note.timestamp}</p>
            </div>

            <div className={styles.noteContentContainer}>
                <p className={styles.noteContent}>{note.content}</p>
            </div>
        </div>
        </>
    );
}

export default NoteWebElt