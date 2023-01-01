import conn from '../../../lib/db'

export default function handler(req, res) {
    console.log("--------------------API request invoked------------------------");
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Request method ' + req.method + ' used, but only Only POST requests are allowed!' })
        return
    }
    try {
        // TODO
        console.log("Saving new note...");
        const title = "title";
        const content = "content";
        const userId = "NULL";
        const query = 'INSERT INTO NOTE(ID_USER, TITLE, CONTENT, TIMESTAMP) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';
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

  
  