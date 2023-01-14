import conn from '../../../lib/db'


export default function handler(req, res) {
    console.log("--------------------API request invoked (user)------------------------");
    try {
        console.log("Trying to fetch data from db...");
        const username = req.query.name;
        console.log("Query value:", username);
        const query = 'SELECT u.name as username, n.* ' +
                      'FROM public.note as n JOIN public.user as u on n.id_user=u.id_user ' +
                      'WHERE u.name=$1;';
        conn.query(query, [username])
            .then(r => res.status(200).json(r.rows))
            .then(r => res.end());
    } catch (err) {
        console.log("Error occured:", err);
        res.status(500);
    }
    // res.end();
    return res;
}
  
  
  