import conn from '../../../lib/db'

export default function handler(req, res) {
    console.log("--------------------API request invoked (delete)------------------------");
    if (req.method !== 'DELETE') {
        res.status(405)
            .send({ message: 'Request method ' + req.method + ' used, but only DELETE requests are allowed!' })
            .end();
        return res;
    }
    try {
        const noteId = req.body.id_note;
        console.log("Trying to delete a note by id=", noteId);
        if (!noteId) {
            const errMsg = "Deleting a note but id_note is not set: " + noteId;
            console.error(errMsg);
            res.status(400).send({ message: errMsg }).end();
            return;
        }
        const query1 = 'DELETE FROM public.note WHERE id_note=$1';
        const query2 = 'DELETE FROM public.share WHERE id_note=$1';
        return Promise.allSettled([conn.query(query1, [noteId]), conn.query(query2, [noteId])])
                      .then(r => res.status(200).end());
  } catch (err) {
    const errMsg = 
      res.status(500).end();
      console.log("Error occured:", err);
      return res;
  }
}
