import * as Const from "../../../lib/constants";
import conn from '../../../lib/db'

async function getNote(id, res) {
    console.log("GET note by id=", id);
    const query = 'SELECT u.name as username, n.* ' +
                  'FROM public.note as n LEFT JOIN public.user as u on n.id_user=u.id_user ' +
                  'WHERE n.id_note = $1 AND n.public=true';
    return conn.query(query, [id])
               .then(r => {
                    if (r.rows.length != 1) {
                        res.status(404);
                        return undefined;
                    }
                    const note = r.rows[0];
                    console.log("Resolved to", note);
                    res.status(200).json(r.rows);
                    return note;
               });
}

async function deleteNote(id, res) {
    try {
        console.log("DELETE note by id=", id);
        if (!id) {
            const errMsg = "Deleting a note but id_note is not set: " + id;
            console.error(errMsg);
            res.status(400).send({ message: errMsg });
            return;
        }
        const query1 = "DELETE FROM public.note WHERE id_note=$1";
        const query2 = "DELETE FROM public.share WHERE id_note=$1";
        Promise.allSettled([conn.query(query1, [id]), conn.query(query2, [id])])
               .then(r => res.status(200));
    } catch (err) {
        res.status(500);
        console.error("Error occured:", err);
    }
}

async function postNote(note, res) {
    console.log("postNote=", note);
    if (note.id_note) updateNote(note, res);
    return res.status(404);
}

// TODO missing update for shared table
async function updateNote(note, res) {
    const noteId = note.id_note;
    console.log("Updating note with id=", noteId);
    const query = "UPDATE public.note set TITLE=$1, CONTENT=$2, PUBLIC=$3, TIMESTAMP=CURRENT_TIMESTAMP where id_note=$4";
    await conn.query(query, [note.title, note.content, note.public, noteId])
              .then(r => res.status(201));
    return res;
}

// TODO code duplication from create.js
async function insertToSharedTable(noteId, userIds) {
    if (userIds.length < 1) return;
    console.log("Inserting to shared for users=", userIds);
    const inserts = userIds.map(uid => "(" + uid + ", " + noteId + ")").join(",");
    const statement = "INSERT INTO public.shared(id_user, id_note) VALUES " + inserts + ";";
    try {
        await conn.query(statement);
    }
    catch(err) {
        console.error("Error saving to shared, statement=", statement);
    }
}

export default async function handler(req, res) {
    const noteId = req.query.id;
    console.log("-------------------------API request invoked (note)-----------------------------");
    console.log("request=", req.method, "id=", noteId);
    if (req.method == 'GET') {
        await getNote(noteId, res);
    }
    else if (req.method == 'DELETE') {
        await deleteNote(noteId, res);
    }
    else if (req.method == 'POST') {
        const noteData = req.body;
        await postNote(noteData, res);
    } else {
        res.status(405)
           .send({ message: 'Unsupported request method ' + req.method + ' used.' });
    }
    res.end();
    return res;
}