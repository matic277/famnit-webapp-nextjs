import conn from '../db'

class UserUtils {
    static async getUserId(username) {
        try {
            const query = 'SELECT id_user FROM public.user WHERE name=$1';
            const result = await conn.query(query, [username]);
            if (result.rows.length != 1) {
                console.warn("Expected 1 user, but got " + result.rows.length + " instead:", result.rows);
                return null;
            } else {
                const response = result.rows[0].id_user;
                return response;
            }
        }
        catch (err) {
            console.log("Error occured getting id of user " + username + ":", err);
        }
    }
}

export default UserUtils;