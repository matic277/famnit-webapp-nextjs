import conn from '../../lib/db'

const fetchSize = 3;

export default function handler(req, res) {
  console.log("--------------------API request invoked------------------------")
    try {
        console.log("Trying to fetch data from db...");
        const queryIndex = req.query.index;
        const startIndex = queryIndex * fetchSize;
        const endIndex   = startIndex + fetchSize - 1;
        console.log("Query value: ", queryIndex, " -> ", startIndex, " ", endIndex);
        const query = 'SELECT * FROM note WHERE id_note BETWEEN ' + startIndex + " AND " + endIndex;
        // const values = [req.body.content];
        const result = conn.query(
            query,
            // values
        );
      result.then(r => {
        //console.log( "Got data: ", r.rows);
        res.status(200).json(r.rows);
      });
  } catch (err) {
      console.log("Error occured:", err);
  }
    // res.status(200).json({ name: 'John Doe' })
}
  
  
  