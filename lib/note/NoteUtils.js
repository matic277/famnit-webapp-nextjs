class NoteUtils {
    static deleteNote(setNotesFunct, id) {
        // first remove from interface
        setNotesFunct(prevNotes => prevNotes.filter(n => n.id_note != id));

        // send delete request to server
        fetch('api/notes/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        }).then(response => {
            console.log("Delete request=", response);
        });
    }

    static updateNote(note, titleField, contentField) {
        
    }
}

export default NoteUtils;