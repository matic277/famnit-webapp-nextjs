import conn from '../../../lib/db'

export default function handler(req, res) {
    console.log("--------------------API request invoked (create)------------------------");
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Request method ' + req.method + ' used, but only Only POST requests are allowed!' })
        return
    }
    try {
        // TODO
        console.log("Saving new note...");
        console.log("request body=", req.body);

        const title = req.body.title;
        const content = req.body.content;
        const userId = req.body.author == undefined ? null : req.body.author;

        const query = 'INSERT INTO NOTE(ID_USER, TITLE, CONTENT, TIMESTAMP) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)';
        const result = conn.query(
            query,
            [userId, title, content]
        );
        result.then(r => {
            console.log("Got data:", r.rows);
            res.status(200).json(r.rows);
        });
  } catch (err) {
      console.log("Error occured:", err);
  }
}

  
  