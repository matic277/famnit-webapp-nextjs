import conn from '../../../lib/db'

const fetchSize = 3;

export default function handler(req, res) {
  console.log("--------------------API request invoked (user)------------------------")
    try {
        console.log("Trying to fetch data from db...");
        const username = req.query.name;
        console.log("Query value:", username);
        const query = 'SELECT u.name as username, n.* ' +
                      'FROM public.note as n JOIN public.user as u on n.id_user=u.id_user ' +
                      'WHERE u.name=$1;';
        const result = conn.query(query, [username]);
      result.then(r => {
        //console.log( "Got data: ", r.rows);
        res.status(200).json(r.rows);
      });
  } catch (err) {
      console.log("Error occured:", err);
  }
    // res.status(200).json({ name: 'John Doe' })
}
  
  
  