import conn from '../../../lib/db'

import * as Const from '../../../lib/constants';
import UserUtils  from '../../../lib/user/UserUtils';

// TODO this should be POST, but i need to return data (id of created note)
export default async function handler(req, res) {
    console.log("--------------------API request invoked (create)------------------------");
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Request method ' + req.method + ' used, but only POST requests are allowed!' })
        return
    }
    try {
        console.log("Saving new note...");
        console.log("request body=", req.body);
        
        // get user_id first if needed
        const username = req.body.username;
        let userId = username != Const.byAnon ? await UserUtils.getUserId(username) : null;
        console.log("username", username, "resoved to id", userId);

        const noteId = req.body.id_note;
        const title = req.body.title;
        const content = req.body.content;
        const type = req.body.type;
        
        if (type == Const.creating) {
            const query = 'INSERT INTO NOTE(ID_USER, TITLE, CONTENT, TIMESTAMP) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id_note';
            conn.query(query, [userId, title, content])
                .then(r => {
                    const noteId = r.rows[0].id_note;
                    console.log("id of newly created note is:", noteId);
                    res.status(200).json({ id_note: noteId });
                    res.id_note = noteId;
                });
        }
        else if (type == Const.editing) {
            if (!noteId) throw new Error("Editing note but id of note is not set:", noteId);
            const query = 'UPDATE public.note set TITLE=$1, CONTENT=$2, TIMESTAMP=CURRENT_TIMESTAMP where id_note=$4';
            conn.query(query, [userId, title, content])
                .then(r => { console.log("UPDATED noteId:", noteId);
                             res.status(200).json({ id_note: noteId }); });
        }
        else {
            throw new Error("Unrecognized type mode:", type);
        }
  } catch (err) {
      console.log("Error occured:", err);
  }
}

  
  