import conn from '../../../lib/db'

const fetchSize = 3;

export default function handler(req, res) {
  console.log("--------------------API request invoked------------------------")
    try {
        console.log("Trying to fetch data from db...");
        const userEmail = req.query.user_email;
        console.log("Query value:", userEmail,);
        const query = 'SELECT * FROM note WHERE id_note=$1';
        const result = conn.query(query, [userEmail]);
      result.then(r => {
        //console.log( "Got data: ", r.rows);
        res.status(200).json(r.rows);
      });
  } catch (err) {
      console.log("Error occured:", err);
  }
    // res.status(200).json({ name: 'John Doe' })
}
  
  
  