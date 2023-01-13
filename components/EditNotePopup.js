import styles from '../styles/Home.module.css'

import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

// Component shared between home and mynotes pages
// Enables a popup window for editing/creating notes
const EditNotePopup = ({ editingNote, setEditingNote, saveEdit }) => {
    // Auth0 user state
    const { user, isLoading } = useUser();

    return ( <>
            <div>{editingNote ? "Edit note" : "Create note"}</div><br/>
            <div className={styles.edittitlecontainer}>
                <div className={styles.edittitletext}>Title:</div>
                <input id="editNoteTitle" className={styles.editTitleInput} type="text"></input><br/>
            </div>
            <div className={styles.editcontentcontainer}>
                <div className={styles.editcontenttext}>Content:</div>
                <textarea id="editNoteContent" className={styles.editContentInput} type="text"></textarea><br/>
            </div>
            <br/>
            <div className={styles.editsharedusers}>
                <div className={styles.editshareduserstext}>Share with:</div>
                <input id="shareWith" className={styles.editShareWithInput} type="text"></input><br/><br/>
                <input type="checkbox" id="shareWith" name="shareWith" className={styles.editInput}/> <label> make public</label>
            </div>
            <div className={styles.popupbuttonscontainer}>
                <button className={styles.popupbuttonred} onClick={(e) => setEditingNote(null)}>cancel</button>
                <button className={styles.popupbutton}    onClick={(e) => saveEdit(e)}>save</button>
            </div>
    </>);
}

export default EditNotePopup;