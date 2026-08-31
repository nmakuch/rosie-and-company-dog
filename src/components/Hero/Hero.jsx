import Container from "../Container/Container";

import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-heading">
            <Container className={styles.layout}>
                <div className={styles.content}>
                    <p className={styles.eyebrow}>Reliable care. Every walk.</p>

                    <h1 id="hero-heading">
                        Trusted local walks, tailored to your dog.
                    </h1>

                    <p className={styles.introduction}>
                        Personal dog walking designed around your dog's routine,
                        personality, and favourite places to explore.
                    </p>

                    <div className={styles.actions}>
                        <a className={styles.primaryAction} href="/booking">
                            Book a walk
                        </a>

                        <a className={styles.secondaryAction} href="#services">
                            Explore our services
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>

                    <p className={styles.details}>
                        Personal walks · Flexible scheduling · Friendly updates
                    </p>
                </div>

                <div className={styles.imageColumn}>
                    <div className={styles.imageFrame}>
                        <img
                            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85"
                            alt="Two dogs enjoying a walk outdoors"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}