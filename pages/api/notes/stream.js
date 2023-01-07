import conn from '../../../lib/db'

const fetchSize = 3;

export default function handler(req, res) {
  console.log("--------------------API request invoked (stream)------------------------")
    try {
        console.log("Trying to fetch data from db...");
        const queryIndex = req.query.index;
        const startIndex = queryIndex * fetchSize;
        const endIndex   = startIndex + fetchSize - 1;
        console.log("Query value: ", queryIndex, " -> ", startIndex, " ", endIndex);
        const query = 'SELECT u.name as username, n.* ' +
                      'FROM public.note as n LEFT JOIN public.user as u on n.id_user=u.id_user ' +
                      'WHERE n.id_note BETWEEN $1 AND $2';
        // const values = [req.body.content];
        const result = conn.query(query, [startIndex, endIndex]);
      result.then(r => { 
        // console.log( "Got data: ", r.rows);
        res.status(200).json(r.rows);
      });
  } catch (err) {
      console.log("Error occured:", err);
  }
    // res.status(200).json({ name: 'John Doe' })
}
  
  
  