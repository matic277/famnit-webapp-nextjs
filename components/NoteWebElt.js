import styles from '../styles/Note.module.css';

import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPaperPlane,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import * as Const from '../lib/constants';

const NoteWebElt = ({note, onRemove, onEdit}) => {
    // Auth0 user state
    const { user, isLoading } = useUser();

    // function onShareWithClicked(event) {
    //     console.log("Note share clicked");
    //     // TODO bring notesList here somehow, track state just like in index page
    // }

    return (
        <>
        <div className={styles.note}>
            <div className={styles.titleCotainer}>
                <div className={styles.noteTitle}>{note.title} (id={note.id_note})</div>
                <div className={((user && user.email == note.username) || note.editable) ? styles.noteOptionsContainer : styles.noteOptionsContainerHidden}>
                    <FontAwesomeIcon icon={faEdit}       className={styles.noteOption}       onClick={(e) => onEdit(note)}/>
                    {/* <FontAwesomeIcon icon={faPaperPlane} className={styles.noteOption}       onClick={(e) => onShareWithClicked(e)}/> */}
                    <FontAwesomeIcon icon={faTrash}      className={styles.noteOptionDelete} onClick={(e) => onRemove(note.id_note)}/>
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