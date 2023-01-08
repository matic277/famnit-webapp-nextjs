import conn from '../../../lib/db';
import UserUtils  from '../../../lib/user/UserUtils';

const fetchSize = 3;

export default async function handler(req, res) {
  console.log("--------------------API request invoked (shared)------------------------")
    try {
        const username = req.query.name;
        let userId = await UserUtils.getUserId(username);
        console.log("username", username, "resoved to id", userId);
        
        const query = 'SELECT n.* FROM public.note as n WHERE n.id_note in ' +
                      '    (SELECT id_note FROM public.shared WHERE id_user=$1)';
        const result = conn.query(query, [userId]);
      result.then(r => {
        console.log( "Got data: ", r.rows);
        res.status(200).json(r.rows);
      });
  } catch (err) {
      console.log("Error occured:", err);
  }
    // res.status(200).json({ name: 'John Doe' })
}
  
  
  