import styles from "../../styles/Login.module.css";
import styles2 from "../../styles/Register.module.css";


export default function Home() {
    return (
        <>
            <main className={styles.formSignin}>
                <form>
                    <h1>Register account</h1>
                    <div>
                        <label className={styles.inputLabel} htmlFor="usernameInput">Username</label><br/>
                        <input type="username" className={styles.inputBox} id="usernameInput" placeholder="Name"/>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.inputLabel} htmlFor="passwordInput">Password</label><br/>
                        <input type="password" className={styles.inputBox} id="passwordInput" placeholder="Password"/>
                    </div>
                    <div>
                        <label className={styles.inputLabel} htmlFor="passwordInput2">Repeat password</label><br/>
                        <input type="password" className={styles.inputBox} id="passwordInput2" placeholder="Password"/>
                    </div>

                    <br/>

                    <button className={styles.btn} type="submit">Register</button>
                </form>
            </main>
        </>
    )
}