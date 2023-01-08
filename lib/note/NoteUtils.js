class NoteUtils {
    
    // Does not work as expected, since deleting newly created notes we don't have an id from db yet
    // so deleting a note with no id, deletes all notes with no id
    static deleteNote(setNotesFunct, id) {
        // first remove from interface
        setNotesFunct(prevNotes => prevNotes.filter(n => n.id_note != id));
        // send delete request to server
        fetch('api/notes/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_note: id }),
        }).then(response => {
            console.log("Delete request=", response);
        });
    }

    static updateNote(note) {
        console.log("INVOKED UPDATE");
        fetch('api/notes/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        }).then(response => {
            console.log("Update request=", response);
        });
    }
}

export default NoteUtils;