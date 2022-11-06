// import globalStyles from '../../styles/globals.css'
import styles from '../../styles/Login.module.css'

import React, { useState, useEffect } from "react";

export default function Login() {


    function onSignInClick() {
        console.log("clicked")
    }

    return (
        <>
            <main className={styles.formSignin}>
                <form>
                    <h1>Sign in</h1>

                    <div>
                        <label className={styles.labelInitial} htmlFor="usernameInput">Username</label><br/>
                        <input type="username" className={styles.inputBoxInitial} id="usernameInput" placeholder="Name"
                            onChange={(e) => onUsrChange(e)}/>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.labelInitial} htmlFor="passwordInput">Password</label><br/>
                        <input type="password" className={styles.inputBoxInitial} id="passwordInput" placeholder="Password"
                               onChange={(e) => onPwChange(e)}/>
                    </div>

                    <br/>

                    <div>
                        <label><input type="checkbox" value="remember-me"/> Remember me</label>
                    </div>

                    <br/>

                    <button id="btn" className={styles.btn} type="submit" onClick={(e) => onSignInClick(e)}>Sign in</button>
                </form>
            </main>
        </>
    )
}

