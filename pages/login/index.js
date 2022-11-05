// import globalStyles from '../../styles/globals.css'
import styles from '../../styles/Login.module.css'

export default function Login() {
    return (
        <>
            <main className={styles.formSignin}>
                <form>
                    <h1>Sign in</h1>

                    <div>
                        <label className={styles.inputLabel} htmlFor="usernameInput">Username</label><br/>
                        <input type="username" className={styles.inputBox} id="usernameInput" placeholder="Name"/>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.inputLabel} htmlFor="passwordInput">Password</label><br/>
                        <input type="password" className={styles.inputBox} id="passwordInput" placeholder="Password"/>
                    </div>

                    <br/>

                    <div>
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>

                    <br/>

                    <button className={styles.btn} type="submit">Sign in</button>
                </form>
            </main>

        </>
    )
}

