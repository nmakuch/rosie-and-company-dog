import { useState } from "react";
import { Link } from "react-router";

import Container from "../Container/Container";

import styles from "./Navbar.module.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    function toggleMenu() {
        setMenuOpen((current) => !current);
    }

    return (
        <header className={styles.navbar}>
            <Container className={styles.inner}>
                <Link className={styles.brand} to="/" onClick={closeMenu}>
                    <img
                        className={styles.brandLogo}
                        src="/images/logo/rosie-logo.svg"
                        alt=""
                        aria-hidden="true"
                    />

                    <span className={styles.brandText}>
                        <span className={styles.brandName}>
                            Rosie & Company
                        </span>

                        <small>Dog Walking</small>
                    </span>
                </Link>

                <button
                    className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ""
                        }`}
                    type="button"
                    aria-label={
                        menuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={menuOpen}
                    aria-controls="primary-navigation"
                    onClick={toggleMenu}
                >
                    <span className={styles.menuIcon} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                </button>

                <nav
                    id="primary-navigation"
                    className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""
                        }`}
                    aria-label="Primary navigation"
                >
                    <Link
                        className={styles.navigationLink}
                        to="/#how-it-works"
                        onClick={closeMenu}
                    >
                        How it works
                    </Link>

                    <Link
                        className={styles.navigationLink}
                        to="/#services"
                        onClick={closeMenu}
                    >
                        Services
                    </Link>

                    <Link
                        className={styles.navigationLink}
                        to="/#pricing"
                        onClick={closeMenu}
                    >
                        Pricing
                    </Link>

                    <Link
                        className={styles.navigationLink}
                        to="/#about"
                        onClick={closeMenu}
                    >
                        About
                    </Link>

                    <Link
                        className={styles.navigationLink}
                        to="/faq"
                        onClick={closeMenu}
                    >
                        FAQ
                    </Link>

                    <Link
                        className={styles.cta}
                        to="/booking"
                        onClick={closeMenu}
                    >
                        Book a walk
                    </Link>
                </nav>
            </Container>
        </header>
    );
}