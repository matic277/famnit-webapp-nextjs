import conn from '../../../lib/db'

export default function handler(req, res) {
    console.log("--------------------API request invoked (delete)------------------------");
    if (req.method !== 'DELETE') {
        res.status(405).send({ message: 'Request method ' + req.method + ' used, but only DELETE requests are allowed!' })
        return
    }
    try {
        const noteId = req.body.id_note;
        console.log("Trying to delete a note by id=", noteId);
        if (!noteId) throw new Error("Deleting a note but id_note is not set:", noteId);

        const query = 'DELETE FROM NOTE WHERE id_note=$1';
        const result = conn.query(query, [noteId]);
        result.then(r => { res.status(200); });
  } catch (err) {
      console.log("Error occured:", err);
  }
}
