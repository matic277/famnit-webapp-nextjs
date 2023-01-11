import conn from '../../../lib/db'

import * as Const from '../../../lib/constants';
import UserUtils  from '../../../lib/user/UserUtils';

async function insertToSharedTable(noteId, userIds) {
    if (userIds.length < 1) return;

    const inserts = userIds.map(uid => "(" + uid + ", " + noteId + ")").join(",");
    const statement = "INSERT INTO public.shared(id_user, id_note) VALUES " + inserts + ";";
    try {
        const result = await conn.query(statement);
    }
    catch(err) {
        console.error("Error saving to shared, statement=", statement);
    }
}

export default async function handler(req, res) {
    console.log("--------------------API request invoked (create)------------------------");
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Request method ' + req.method + ' used, but only POST requests are allowed!' });
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
        const public_ = req.body.public;
        const sharedWith = req.body.share;

        // cache
        const userIdsByNames = {};
        for (const shared of sharedWith) {
            const cached = userIdsByNames[shared];
            userIdsByNames[shared] = cached ? cached : await UserUtils.getUserId(shared);
        }
        const sharedIds = Object.entries(userIdsByNames).map(([_, v]) => v).filter(x => x); // filter to throw away non numbers
        console.log("Shared with:", sharedWith);
        console.log("Shared with(resolved):", sharedIds);

        if (type == Const.creating) {
            console.log("creating");
            const query = 'INSERT INTO NOTE(ID_USER, TITLE, CONTENT, PUBLIC, TIMESTAMP) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING id_note';
            conn
                .query(query, [userId, title, content, public_])
                .then(r => {
                    const noteId = r.rows[0].id_note;
                    console.log("id of newly created note is:", noteId);
                    res.id_note = noteId;
                    return noteId;
                })
                .then(id => { insertToSharedTable(id, sharedIds); return id; })
                .then(id => res.status(201).json({ id_note: id }) );
        }
        else if (type == Const.editing) {
            if (!noteId) throw new Error("Editing note but id of note is not set:", noteId);
            const query = 'UPDATE public.note set TITLE=$1, CONTENT=$2, PUBLIC=$3, TIMESTAMP=CURRENT_TIMESTAMP where id_note=$4';
            return conn
                .query(query, [title, content, public_, noteId])
                .then(r => { console.log("UPDATED noteId:", noteId);
                             res.status(201).json({ id_note: noteId }); });
        }
        else {
            throw new Error("Unrecognized type mode:", type);
        }
  } catch (err) {
      console.log("Error occured:", err);
  }
}

  
  