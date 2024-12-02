import styles from "./Menu.module.css";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <header className={styles.header}>
            <h1 className={styles.titulo}>Movies Catalogue</h1>
            <nav className={styles.navegacao}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/create" className={styles.link}>Create</Link>
                <Link to="/update" className={styles.link}>Update</Link>
                <Link to="/delete" className={styles.link}>Delete</Link>
            </nav>
            <hr></hr>
        </header>
    );
}