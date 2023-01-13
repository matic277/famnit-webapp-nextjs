
import * as Const from '../constants';

// Client side utils
// Shared code between home(pages/index.js) and mynotes(pages/mynotes/index.js) pages
class NoteUtils {
    
    static startNoteCreation(user, setEditingNote) {
        const username = user && user.email? user.email : Const.byAnon;
        // Dummy note, that will be "edited"
        const note = {
            username: username,
            title: "",
            content: "",
            editable: true, // if you are the owner, you can edit it. But not after reloading TODO fix this
            type: Const.creating, // signal we are in "creation mode"
        };
        
        // open popup by setting value with note we're creating (editing)
        setEditingNote(note);
    }

    static editNote(note, setEditingNote, editTitleElt, editContentElt) {
        // populate input fields with existing data
        editTitleElt.value = note.title;
        editContentElt.value = note.content;

        // editing mode
        note.type = Const.editing;
        
        // open popup by setting value with note we're editing
        setEditingNote(note);
    }
    
    // Creating or editing a note
    static async saveEdit(editingNote, setEditingNote, setNotes, notes) {
        // update note with new values
        // editingNote should be not-null at this point
        editingNote.title   = document.getElementById("editNoteTitle")  .value;
        editingNote.content = document.getElementById("editNoteContent").value;
        editingNote.content = document.getElementById("editNoteContent").value;
        editingNote.public  = document.getElementById("shareWith").checked;
        
        // parse users
        const userParser = text => {
            if (!text) return [];
            return text.split(';').filter(x => x.length > 1).map(user => user.trim());
        }
        const sharedUsers = userParser(document.getElementById("shareWith").value);
        console.log("sharing with users:", sharedUsers);
        editingNote.share = sharedUsers;
        
        // TODO add field length checking
        // title & content
        
        if (editingNote.type == Const.editing) {
            console.log("EDITING ", editingNote);
            NoteUtils.update(editingNote);
        }
        else if (editingNote.type == Const.creating) {
            console.log("CREATING");
            await NoteUtils.create(editingNote);
            
            // Update state, adding new note
            notes.unshift(editingNote);
            setNotes([...notes]);
        } else {
            console.log("UNKNOWN");
        }

        // close popup
        setEditingNote(null);
    }

    static delete(setNotesFunct, id) {
        // first remove from interface
        setNotesFunct(prevNotes => prevNotes.filter(n => n.id_note != id));
        // send delete request to server
        fetch('api/note/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    }
    
    static update(note) {
        fetch('api/note/' + note.id_note, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note),
        });
    }

    static async create(note) {
        await fetch('api/note/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        })
        .then(r => r.json())
        .then(r => {
            const newNoteId = r.id_note;
            // Add id property, which was returned by post request
            note.id_note = newNoteId;
        });
    }
}

export default NoteUtils;