// import conn from '../../../lib/db'

// const fetchSize = 3;

// export default function stream(req, res) {
//   console.log("--------------------API request invoked------------------------")
//     try {
//         console.log("Trying to fetch data from db...");
//         const queryIndex = req.query.index;
//         const startIndex = queryIndex * fetchSize;
//         const endIndex   = startIndex + fetchSize - 1;
//         console.log("Query value: ", queryIndex, " -> ", startIndex, " ", endIndex);
//         const query = 'SELECT * FROM note WHERE id_note BETWEEN ' + startIndex + " AND " + endIndex;
//         // const values = [req.body.content];
//         const result = conn.query(
//             query,
//             // values
//         );
//       result.then(r => {
//         //console.log( "Got data: ", r.rows);
//         res.status(200).json(r.rows);
//       });
//   } catch (err) {
//       console.log("Error occured:", err);
//   }
//     // res.status(200).json({ name: 'John Doe' })
// }

// const getNotes = async (index) => {
//     const res = await fetch(
//         //"https://jsonplaceholder.typicode.com/posts?_limit=3"
//         (process.env.environment == 'production' ? "http://famnit-webapp-nextjs.vercel.app" : "http://localhost:3000") +
//         "/api/notes/stream?index=" + index
//     );
//     try {
//         const notesList = await res.json();
//         return { props: { notesList } };
//     }
//     catch(err) {
//         console.log("Err occured in (home) index getStaticProps, res=", res)
//         console.log("res.text=", res.text);
//         console.log("Error:", err);
//     }
//     return { props: { ok: false, reason: "err occured" } };
// }
  