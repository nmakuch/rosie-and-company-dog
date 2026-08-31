import Container from "../../components/Container/Container";

import styles from "./FAQPage.module.css";

const questions = [
    {
        question: "How do I get started?",
        answer:
            "Tell us a little about your dog, your location, and the type of care you need. We’ll arrange an introduction before confirming the first walk.",
    },
    {
        question: "Can my dog join a group walk?",
        answer:
            "Group walks are best for friendly, social dogs who are comfortable around others. We consider temperament, energy, and walking pace before making a match.",
    },
    {
        question: "Will my dog have the same walker?",
        answer:
            "Consistency helps dogs feel safe and comfortable, so we aim to keep your dog with a familiar walker whenever scheduling allows.",
    },
    {
        question: "What happens during bad weather?",
        answer:
            "Walks usually continue through light rain or snow. In unsafe conditions, we’ll adjust the route, shorten the outdoor portion, or arrange an alternative with you.",
    },
    {
        question: "Will I receive an update?",
        answer:
            "Yes. After every walk or visit, you’ll receive a short update so you know how your dog’s time went.",
    },
    {
        question: "Can I change or cancel a walk?",
        answer:
            "Yes. Plans change, so contact us as early as possible and we’ll help adjust your dog’s schedule.",
    },
    {
        question: "What areas do you serve?",
        answer:
            "Availability depends on your neighbourhood and the current walking schedule. Send us your location and we’ll confirm whether you’re within the service area.",
    },
];

export default function FAQPage() {
    return (
        <section className={styles.page} aria-labelledby="faq-heading">
            <div className={styles.hero}>
                <Container className={styles.heroLayout}>
                    <div>
                        <p className={styles.eyebrow}>Frequently asked questions</p>

                        <h1 id="faq-heading">
                            Everything you need to know before the first walk.
                        </h1>
                    </div>

                    <p className={styles.introduction}>
                        Learn more about scheduling, group walks, updates, weather, and what to expect when getting started. Explore the frequently asked questions below to find the information you need before your dog’s first walk.
                    </p>
                </Container>
            </div>

            <div className={styles.content}>
                <Container className={styles.layout}>
                    <aside className={styles.aside}>
                        <p className={styles.asideLabel}>Still have a question?</p>

                        <p>
                            Tell us what you need and we'll be happy to help find the
                            right care for your dog.
                        </p>

                        <a href="mailto:hello@rosie.com">
                            Get in touch
                            <span aria-hidden="true">→</span>
                        </a>
                    </aside>

                    <div className={styles.questions}>
                        {questions.map((item) => (
                            <details className={styles.question} key={item.question}>
                                <summary>{item.question}</summary>
                                <p>{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </Container>
            </div>
        </section>
    );
}