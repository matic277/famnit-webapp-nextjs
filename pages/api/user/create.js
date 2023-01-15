import conn from '../../../lib/db'

async function createUser(name, sub) {
    const insert = 'INSERT INTO public.user (name, sub, timestamp) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING id_user';
    conn.query(insert, [name, sub])
        .then(r => {
            const userId = r.rows[0].id_note;
            console.log("Created user by id", userId);
            res.status(200).json({ id_user: userId });
        });
}

export default async function handler(req, res) {
    console.log("--------------------API request invoked (createuser)------------------------");
    try {
        const username = req.body.name;
        const sub = req.body.sub;
        console.log("Registering user=", username);
        console.log("Registering sub=", sub);

        const query = 'SELECT id_user FROM public.user WHERE sub=$1';
        await conn.query(query, [sub])
            .then(r => r.rows)
            .then(r => {
                // User does not exist
                if (r.length == 0) {
                    createUser(username, sub);
                    return;
                }
                const uid = r[0].id_user;
                console.log("User already exists id=", uid);
                res.status(200).json({ id_user: uid });
                return;
            });
    } catch (err) {
        console.log("Error occured:", err);
        res.status(500);
    }
    res.end();
    return res;
}

  
  