import Container from "../Container/Container";

import styles from "./About.module.css";

export default function About() {
    return (
        <section id="about" className={styles.about} aria-labelledby="about-heading">
            <Container className={styles.layout}>
                <div className={styles.media}>
                    <div className={styles.imageFrame}>
                        <img
                            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=85"
                            alt="A dog enjoying time outdoors with its walker"
                        />
                    </div>

                    <div className={styles.note}>
                        <span>Our approach</span>
                        <p>Calm, consistent care from someone your dog knows and trusts.</p>
                    </div>
                </div>

                <div className={styles.content}>
                    <p className={styles.eyebrow}>About Rosie & Company</p>

                    <h2 id="about-heading">
                        More than a walk around the block.
                    </h2>

                    <div className={styles.copy}>
                        <p>
                            We believe great dog walking starts with understanding the
                            individual dog. Their energy, confidence, routines, and
                            favourite places all shape the experience.
                        </p>

                        <p>
                            Our approach is personal and unhurried, giving every dog
                            consistent care and giving their people peace of mind while
                            they're away.
                        </p>
                    </div>

                    <div className={styles.principles}>
                        <div>
                            <h3>Familiar faces</h3>
                            <p>Consistent walkers help your dog feel comfortable and secure.</p>
                        </div>

                        <div>
                            <h3>Thoughtful matching</h3>
                            <p>Walks are shaped around temperament, pace, and social comfort.</p>
                        </div>

                        <div>
                            <h3>Clear communication</h3>
                            <p>Friendly updates help you stay connected to their day.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}