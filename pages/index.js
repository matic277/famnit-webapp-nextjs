import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <>
            <div className={styles.contentContainer}>

                <div className={styles.topRow}>
                    <div className={styles.addNoteContainer}>
                        <p className={styles.addNoteText}>Add note</p>
                        <div className={styles.popupNoteContainer}>
                            <label className={styles.addNoteInputLabel}>Name</label><br/>
                            <input className={styles.addNoteName} type="text"></input><br/>

                            <label className={styles.addNoteInputLabel}>Content</label><br/>
                            <textarea className={styles.addNoteContent}></textarea><br/>
                            <button className={styles.addNoteBtn}>Add</button>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.note}>

                        <div className={styles.noteName}>note name</div>
                        <div className={styles.noteContentContainer}>
                            <div className={styles.noteContent}>content</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
