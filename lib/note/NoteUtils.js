class NoteUtils {

    static delete(setNotesFunct, id) {
        // first remove from interface
        setNotesFunct(prevNotes => prevNotes.filter(n => n.id_note != id));
        // send delete request to server
        fetch('api/notes/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_note: id }),
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
        await fetch('api/notes/create', {
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