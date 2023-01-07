import conn from '../../../lib/db'

export default function handler(req, res) {
    console.log("--------------------API request invoked (id)------------------------");
    try {
        const username = req.query.name;
        console.log("Getting id of user", username);

        const query = 'SELECT id_user FROM public.user WHERE name=$1';
        const result = conn.query(query, [username]);

        result.then(r => {
            console.log("Got data:", r.rows);
            if (r.rows.length > 1) {
                console.error("More than one user by that name:", r.rows);
            }
            if (r.rows.length == 0) {
                console.error("Zero users by that name");
            }
            res.status(200).json(r.rows[0]);
        });
  } catch (err) {
      console.log("Error occured:", err);
  }
}

  
  