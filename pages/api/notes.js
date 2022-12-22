import conn from '../../lib/db'

export default function handler(req, res) {
    try {
        console.log("Trying to fetch data from db...");
        const query = 'SELECT * FROM note';
        // const values = [req.body.content];
        const result = conn.query(
            query,
            // values
        );
      
      result.then(rows => {
        console.log( "Got data: ", rows);
      });
  } catch (err) {
      console.log("Error occured:", err);
  }
    // res.status(200).json({ name: 'John Doe' })
}
  
  
  