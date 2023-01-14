import conn from '../../../lib/db'

export default function handler(req, res) {
    console.log("--------------------API request invoked (createuser)------------------------");
    try {
        const username = req.body.name;
        console.log("Registering user", username);
        
        const query = 'SELECT id_user FROM public.user WHERE name=$1';
        conn.query(query, [username])
            .then(r => r.rowCount > 0)
            .then(userAlreadyExists => {
                if (userAlreadyExists) {
                    console.log("User already exists");
                    return;
                }
                const insert = 'INSERT INTO public.user (name, timestamp) VALUES($1, CURRENT_TIMESTAMP)';
                conn.query(insert, [username]).then(r => console.log("r->",r));
            });
        res.status(200);
    } catch (err) {
        console.log("Error occured:", err);
        res.status(500);
    }
    res.end();
    return res;
}

  
  