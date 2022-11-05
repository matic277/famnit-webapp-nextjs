import styles from "../../styles/Login.module.css";
import styles2 from "../../styles/Register.module.css";


export default function Register() {

    function onRegisterClick(event) {
        event.preventDefault(); // prevent page reload

        console.log("register clicked");

        let usr = document.getElementById("usernameInput");
        let pw1 = document.getElementById("passwordInput1");
        let pw2 = document.getElementById("passwordInput2")

        console.log("usr=" + usr.value + ", pw1=" + pw1.value + ", pw2=" + pw2.value);

        checkPasswords(pw1, pw2);
    }

    function checkPasswords(pw1Elt, pw2Elt) {
        let pw1 = pw1Elt.value;
        let pw2 = pw2Elt.value;
        if (pw1 == null || pw1.length === 0 ||
            pw2 == null || pw2.length === 0) {
            console.log("pw length too short");
            return;
        }
        if (pw1 !== pw2) {
            console.log("pws dont match");
            return;
        }
        console.log("pws are okay!");
        return () => { };
    }




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
                        <label className={styles.inputLabel} htmlFor="passwordInput1">Password</label><br/>
                        <input type="password" className={styles.inputBox} id="passwordInput1" placeholder="Password"/>
                    </div>
                    <div>
                        <label className={styles.inputLabel} htmlFor="passwordInput2">Repeat password</label><br/>
                        <input type="password" className={styles.inputBox} id="passwordInput2" placeholder="Password"/>
                    </div>

                    <br/>

                    <button className={styles.btn} type="submit" onClick={(e) => onRegisterClick(e)}>Register</button>
                </form>
            </main>
        </>
    )
}