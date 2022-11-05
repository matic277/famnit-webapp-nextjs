import Link from 'next/link';

import { useState } from "react";

import styles from "../styles/Layout.module.css";
import styles2 from '../styles/Home.module.css'

import Image from 'next/image'
import logo from "../public/sticky-note1.svg"

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

        // Image by <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=147054">OpenClipart-Vectors</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=147054">Pixabay</a>

        <header className={styles2.header}>
            <nav className={styles.navbar}>
                {/*<Link href='/'>*/}
                {/*    <a className={styles.navlogo}>[BrandLogo]</a>*/}
                {/*</Link>*/}

                {/*<Image className={styles.logo} src={logo} alt={"?logo_image?"}/>*/}

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