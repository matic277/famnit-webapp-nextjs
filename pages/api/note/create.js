import * as Const from "../../../lib/constants";
import conn from '../../../lib/db'
import UserUtils from '../../../lib/user/UserUtils'


async function postNote(note, res) {
    console.log("Creating note=", note);
    
    // get user_id first if needed
    const username = note.username;
    const userId = username != Const.byAnon ? await UserUtils.getUserId(username) : null;
    console.log("username", username, "resoved to id", userId);
    
    // resolve shared users
    const sharedWith = note.share;
    // cache (TODO this should be done outside this function)
    const userIdsByNames = {};
    for (const shared of sharedWith) {
        const cached = userIdsByNames[shared];
        userIdsByNames[shared] = cached ? cached : await UserUtils.getUserId(shared);
    }
    const sharedIds = Object.entries(userIdsByNames).map(([_, v]) => v).filter(x => x); // filter to throw away non numbers
    console.log("Shared with:", sharedWith);
    console.log("Shared with(resolved):", sharedIds);

    const query = "INSERT INTO public.note(ID_USER, TITLE, CONTENT, PUBLIC, TIMESTAMP) " +
                  "VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING id_note";
    await conn.query(query, [userId, note.title, note.content, note.public])
              .then(r => {
                  const noteId = r.rows[0].id_note;
                  console.log("Created note id=", noteId);
                  return noteId;
              })
              .then(id => { insertToSharedTable(id, sharedIds); return id; })
              .then(id => res.status(201).json({ id_note: id }) );
}

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
    console.log("-------------------------API request invoked (note create)-----------------------------");
    if (req.method == 'POST') {
        const noteData = req.body;
        await postNote(noteData, res);
    } else {
        res.status(405)
           .send({ message: 'Unsupported request method ' + req.method + ' used, only POST is allowed' });
    }
    res.end();
    return res;
}