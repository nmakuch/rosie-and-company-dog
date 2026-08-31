import { Link } from "react-router";
import Container from "../Container/Container";

import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.callout}>
                <Container className={styles.calloutLayout}>
                    <div>
                        <p className={styles.eyebrow}>Ready for a happier routine?</p>

                        <h2>Let's plan your dog's next adventure.</h2>
                    </div>

                    <a className={styles.calloutAction} href="mailto:hello@example.com">
                        Book a walk
                        <span aria-hidden="true">→</span>
                    </a>
                </Container>
            </div>

            <Container className={styles.footerContent}>
                <div className={styles.brand}>
                    <a href="#top">Rosie & Company</a>
                    <p>Personal dog walking with care, patience, and plenty of fresh air, thoughtfully tailored to your dog’s pace and daily routine.</p>
                </div>

                <div className={styles.linkGroup}>
                    <p className={styles.groupHeading}>Explore</p>
                    <Link to="/#how-it-works">How it works</Link>
                    <Link to="/#services">Services</Link>
                    <Link to="/#pricing">Pricing</Link>
                    <Link to="/#about">About</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/booking">Book a walk</Link>
                </div>

                <div className={styles.linkGroup}>
                    <p className={styles.groupHeading}>Get in touch</p>

                    <a href="mailto:hello@rosie&co.ca">hello@rosie&co.ca</a>
                    <p>Toronto, Ontario</p>
                    <p>(123) 456-7890</p>
                </div>

                <div className={styles.footerBottom}>
                    <p>© {currentYear} Rosie & Company</p>
                    <p>Thoughtful care for every walk.</p>
                </div>
            </Container>
        </footer>
    );
}