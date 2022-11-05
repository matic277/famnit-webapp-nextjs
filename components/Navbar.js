import Link from 'next/link';

import { useState } from "react";

import styles from "../styles/Layout.module.css";
import styles2 from '../styles/Home.module.css'

const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false);
    const openMenu= ()=> setIsOpen(!isOpen);

    return (
        /*
        <nav>
            <div>Navbar</div>
            <Link href="/">Home</Link><br/>
            <Link href="/about">About</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </nav>
         */
        <header className={styles2.header}>
            <nav className={styles.navbar}>
                {/*<Link href='/'>*/}
                {/*    <a className={styles.navlogo}>[BrandLogo]</a>*/}
                {/*</Link>*/}
                <div className={styles.navmenu}>
                    <div className={styles.navitem}>
                        <Link href='/' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                            Home
                        </Link>
                    </div>
                    <div
                        className={styles.navitem}>
                        <Link href='/about' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                            About
                        </Link>
                    </div>
                    <div
                        className={styles.navitem}>
                        <Link href='/login' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                            Login
                        </Link>
                    </div>
                    <div
                        className={styles.navitem}>
                        <Link href='/register' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                            Register
                        </Link>
                    </div>
                </div>
                {/*<button className={isOpen === false ?*/}
                {/*    styles.hamburger : styles.hamburger+' '+styles.active}*/}
                {/*        onClick={openMenu}>*/}
                {/*    <span className={styles.bar}></span>*/}
                {/*    <span className={styles.bar}></span>*/}
                {/*    <span className={styles.bar}></span>*/}
                {/*</button>*/}
            </nav>
        </header>
    );
}

export default Navbar;