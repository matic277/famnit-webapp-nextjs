import conn from '../../../lib/db'

export default function handler(req, res) {
    console.log("--------------------API request invoked (delete)------------------------");
    if (req.method !== 'DELETE') {
        res.status(405).send({ message: 'Request method ' + req.method + ' used, but only DELETE requests are allowed!' });
        return;
    }
    try {
        const noteId = req.body.id_note;
        console.log("Trying to delete a note by id=", noteId);
        if (!noteId) {
            const errMsg = "Deleting a note but id_note is not set: " + noteId;
            console.error(errMsg);
            res.status(405).send({ message: errMsg })
            return;
        }
        const query = 'DELETE FROM NOTE WHERE id_note=$1';
        const result = conn.query(query, [noteId]);
        result.then(r => { res.status(204); });
  } catch (err) {
    const errMsg = 
      res.status(495);
      console.log("Error occured:", err);
  }
}
