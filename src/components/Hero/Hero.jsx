import Container from "../Container/Container";

import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-heading">
            <Container className={styles.layout}>
                <div className={styles.content}>
                    <p className={styles.eyebrow}>Proudly serving the toronto area</p>

                    <h1 id="hero-heading">
                        Reliable walks. Happier dogs.
                    </h1>

                    <p className={styles.introduction}>
                        A trusted choice for dog walking in Toronto, with personalized walks shaped around your dog's routine, personality, and favourite places to explore.
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
                            src="/images/main-page/hero-dog-840.webp"
                            srcSet="/images/main-page/hero-dog-420.webp 420w,/images/main-page/hero-dog-840.webp 840w"
                            sizes="(max-width: 56rem) calc(100vw - 3rem), 40vw"
                            alt="Two dogs enjoying a walk outdoors"
                            width="840"
                            height="630"
                            loading="eager"
                            fetchPriority="high"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}