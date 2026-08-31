import Container from "../Container/Container";

import styles from "./HowItWorks.module.css";

const steps = [
    {
        number: "01",
        title: "Tell us about your dog",
        description:
            "Share their routine, personality, energy level, and anything that helps us understand their needs.",
    },
    {
        number: "02",
        title: "Meet your walker",
        description:
            "We’ll arrange an introduction so everyone feels comfortable before the first scheduled walk.",
    },
    {
        number: "03",
        title: "Enjoy worry-free walks",
        description:
            "Your dog gets reliable exercise and attention while you receive a friendly update after each visit.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className={styles.howItWorks}
            aria-labelledby="process-heading"
        >
            <Container>
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>How it works</p>

                    <h2 id="process-heading">
                        Starting a better walking routine couldn’t be easier.
                    </h2>
                </div>

                <div className={styles.steps}>
                    {steps.map((step) => (
                        <article className={styles.step} key={step.number}>
                            <span className={styles.number}>{step.number}</span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </article>
                    ))}
                </div>

                <div className={styles.actionRow}>
                    <p>Ready to find the right routine for your dog?</p>
                </div>
            </Container>
        </section>
    );
}