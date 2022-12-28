import Link from 'next/link';

import { useState } from "react";
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import styles from "../styles/Layout.module.css";
import styles2 from '../styles/Home.module.css'

import Image from 'next/image'
import logo from "../public/sticky-note1.svg"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isLoading } = useUser();
    const openMenu = () => setIsOpen(!isOpen);

    return (
        <header className={styles2.header}>
            <nav className={styles.navbar}>
                {/*<Link href='/'>*/}
                {/*    <a className={styles.navlogo}>[BrandLogo]</a>*/}
                {/*</Link>*/}

                {/*Image by <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=147054">OpenClipart-Vectors</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=147054">Pixabay</a>*/}
                {/*<Image className={styles.logo} src={logo} alt={"?logo_image?"}/>*/}

                <div className={isOpen === false ? styles.navmenu : styles.navmenu +' '+ styles.active}>
                    {/* if used is logged in, show "log out", otherwise "log in" */}
                    {user && (<>
                        <div className={styles.navitem}>
                            <Link href='/api/auth/logout' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                                Log out
                            </Link>
                        </div>
                    </>)}
                    {/* if used is logged in, show their notes */}
                    {user && (<>
                        <div className={styles.navitem}>
                            <Link href='mynotes' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                                my notes
                            </Link>
                        </div>
                    </>)}
                    {!user && (<>
                        <div className={styles.navitem}>
                            <Link href='/api/auth/login' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                                Log in
                            </Link>
                        </div>
                    </>)}
                    <div className={styles.navitem}>
                        <Link href='/' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                            Home
                        </Link>
                    </div>
                    <div className={styles.navitem}>
                        <Link href='/about' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                            About
                        </Link>
                    </div>
                    <div className={styles.navitem}>
                        <Link href='/login' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                            Login
                        </Link>
                    </div>
                    <div className={styles.navitem}>
                        <Link href='/register' className={isOpen === false ? styles.navlink : styles.navlink+' '+styles.active} onClick={openMenu}>
                            Register
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;