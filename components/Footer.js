import styles from "../styles/Layout.module.css";
import styles2 from '../styles/Home.module.css'

import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

const Footer = () => {
    // Auth0 user state
    const { user, isLoading } = useUser();

    return (
        <footer className={styles.footer}>
            FAMNIT Webapp
            <br/>
            Logged in as {user ? user.name + " via " + user.email : "anonymous"}
        </footer>
    );
}

export default Footer;