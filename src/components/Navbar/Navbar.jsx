import { useState } from "react";
import { Link } from "react-router";

import Container from "../Container/Container";

import styles from "./Navbar.module.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className={styles.navbar}>
            <Container className={styles.inner}>
                <Link className={styles.brand} to="/" onClick={closeMenu}>
                    <span>Rosie & Company</span>
                    <small>Dog Walking</small>
                </Link>

                <button
                    className={styles.menuButton}
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="primary-navigation"
                    onClick={() => setMenuOpen((current) => !current)}
                >
                    {menuOpen ? "Close" : "Menu"}
                </button>

                <nav
                    id="primary-navigation"
                    className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""
                        }`}
                    aria-label="Primary navigation"
                >
                    <Link className={styles.navigationLink} to="/#how-it-works" onClick={closeMenu}>
                        How it works
                    </Link>

                    <Link className={styles.navigationLink} to="/#services" onClick={closeMenu}>
                        Services
                    </Link>

                    <Link className={styles.navigationLink} to="/#pricing" onClick={closeMenu}>
                        Pricing
                    </Link>

                    <Link className={styles.navigationLink} to="/#about" onClick={closeMenu}>
                        About
                    </Link>

                    <Link className={styles.navigationLink} to="/faq" onClick={closeMenu}>
                        FAQ
                    </Link>

                    <Link className={styles.cta} to="/booking" onClick={closeMenu}>
                        Book a walk
                    </Link>
                </nav>
            </Container>
        </header>
    );
}