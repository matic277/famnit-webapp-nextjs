import Link from 'next/link';
import styles from "../../styles/Login.module.css";
import styles2 from "../../styles/Register.module.css";

import React, { useState, useEffect } from "react";

export default function Register() {

    const password1OriginalLabelValue = "Password";
    const password2OriginalLabelValue = "Repeat password";

    // Disable initially
    useEffect(() => {
        disableElts(document.getElementById("passwordInput1"),
                    document.getElementById("passwordInput2"),
                    document.getElementById("btn"));
    });

    function onRegisterClick(event) {
        event.preventDefault(); // prevent page reload

        console.log("register clicked");

        let usr = document.getElementById("usernameInput");
        let pw1 = document.getElementById("passwordInput1");
        let pw2 = document.getElementById("passwordInput2")

        console.log("usr=" + usr.value + ", pw1=" + pw1.value + ", pw2=" + pw2.value);

        //checkPasswords(pw1, pw2);
    }


    function usernameAvailable(name) {
        return true; // TODO implement
    }

    function onUsrUnfocused(usrInput) {
        let usrElt = usrInput.target;
        let usr = usrElt.value;
        let label = document.getElementById("usrLabel");

        const resetAll = () => {
            resetAllElts(pw1, pw2);
        };

        if (usr == null || usr.length === 0) {
            usrElt.className = styles.inputBoxBad;
            label.innerHTML = "Invalid empty input!";
            label.className = styles.labelBad;
            resetAllElts();
        }
        else if (!usernameAvailable(usr)) {
            usrElt.className = styles.inputBoxBad;
            label.innerHTML = "Username already taken!";
            label.className = styles.labelBad;
            resetAllElts();
        }
        else {
            usrElt.className = styles.inputBoxOk;
            label.innerHTML = "Username: ✔️";
            label.className = styles.labelOk;
            document.getElementById("passwordInput1").disabled = false;
        }
    }

    function onPw1Unfocused(pwInput) {
        let pwElt = pwInput.target;
        let pw = pwElt.value;
        let label = document.getElementById("pw1Label");
        if (pw == null || pw.length === 0) {
            pwElt.className = styles.inputBoxBad;
            label.innerHTML = "Invalid empty input!";
            label.className = styles.labelBad;
        } else {
            pwElt.className = styles.inputBoxOk;
            label.innerHTML = "Password: ✔️";
            label.className = styles.labelOk;
            document.getElementById("passwordInput2").disabled = false;
        }
    }

    function onPw2Unfocused(pwInput) {
        let pwElt = pwInput.target;
        let pw2 = pwElt.value;
        let pw1 = document.getElementById("passwordInput1").value;
        let label = document.getElementById("pw2Label");
        if (pw1 !== pw2) {
            pwElt.className = styles.inputBoxBad;
            label.innerHTML = "Passwords don't match!";
            label.className = styles.labelBad;
            disableElts(document.getElementById("btn"));
        } else {
            pwElt.className = styles.inputBoxOk;
            label.innerHTML = "Password: ✔️";
            label.className = styles.labelOk;
            document.getElementById("btn").disabled = false;
        }
    }

    function resetAllElts() {
        let pw1 = document.getElementById("passwordInput1");
        pw1.className = styles.inputBoxInitial;

        let pw2 = document.getElementById("passwordInput2");
        pw2.className = styles.inputBoxInitial;

        let pwLbl1 = document.getElementById("pw1Label");
        pwLbl1.innerHTML = password1OriginalLabelValue;
        pwLbl1.className = styles.labelInitial;

        let pwLbl2 = document.getElementById("pw2Label");
        pwLbl2.innerHTML = password2OriginalLabelValue;
        pwLbl2.className = styles.labelInitial;

        disableElts(pw1, pw2, document.getElementById("btn"));
    }

    function disableElts() {
        for(let i=0; i<arguments.length; ++i) {
            arguments[i].disabled = true;
        }
    }

    function onPw1Change(e) {
        let pwLbl2 = document.getElementById("pw2Label");
        pwLbl2.innerHTML = password2OriginalLabelValue;
        pwLbl2.className = styles.labelInitial;

        let pw2 = document.getElementById("passwordInput2");
        pw2.className = styles.inputBoxInitial;

        disableElts(document.getElementById("btn"));
    }

    return (
        <>
            <main className={styles2.formRegister}>
                <form className={styles.container}>
                    <h1>Register account</h1>
                    <div>
                        <label id="usrLabel"  className={styles.labelInitial} htmlFor="usernameInput">Username</label><br/>
                        <input type="username" className={styles.inputBoxInitial} id="usernameInput" placeholder="Name"
                               onBlur={(e) => onUsrUnfocused(e)}/>
                    </div>
                    <br/>
                    <div>
                        <label id="pw1Label" className={styles.labelInitial} htmlFor="passwordInput1">Password</label><br/>
                        <input type="password" className={styles.inputBoxInitial} id="passwordInput1" placeholder="Password"
                               onBlur={(e) => onPw1Unfocused(e)}
                               onChange={(e) => onPw1Change(e)}/>
                    </div>
                    <div>
                        <label id="pw2Label" className={styles.labelInitial} htmlFor="passwordInput2">Repeat password</label><br/>
                        <input type="password" className={styles.inputBoxInitial} id="passwordInput2" placeholder="Password"
                               onBlur={(e) => onPw2Unfocused(e)}/>
                    </div>

                    <br/>
                    
                    <div className={styles2.buttonContainer}>
                        <button id="btn" className={styles.btn} type="submit" onClick={(e) => onRegisterClick(e)}>Register</button>
                        <Link href="/api/auth/login" className={styles2.auth0UUrl}> or register with auth0</Link>
                    </div> 
                </form>
            </main>
        </>
    )
}