import Container from "../Container/Container";

import styles from "./Services.module.css";

const services = [
    {
        number: "01",
        title: "Individual walks",
        description:
            "One-on-one walks shaped around your dog’s pace, routine, and favourite neighbourhood routes.",
        detail: "30 or 60 minutes",
    },
    {
        number: "02",
        title: "Small group walks",
        description:
            "Friendly, carefully matched walks for social dogs who enjoy exploring with a few companions.",
        detail: "Small groups",
    },
    {
        number: "03",
        title: "Drop-in visits",
        description:
            "At-home visits for puppies, senior dogs, or companions who need attention between longer walks.",
        detail: "Flexible visits",
    },
];

export default function Services() {
    return (
        <section id="services" className={styles.services} aria-labelledby="services-heading">
            <Container>
                <div className={styles.heading}>
                    <div>
                        <p className={styles.eyebrow}>Our services</p>

                        <h2 id="services-heading">
                            Care that fits naturally into their day.
                        </h2>
                    </div>

                    <p className={styles.introduction}>
                        Every dog has their own energy, comfort level, and routine.
                        We’ll choose a service that gives them the care and activity
                        they need.
                    </p>
                </div>

                <div className={styles.serviceList}>
                    {services.map((service) => (
                        <article className={styles.service} key={service.number}>
                            <span className={styles.number}>{service.number}</span>

                            <h3>{service.title}</h3>

                            <p className={styles.description}>{service.description}</p>

                            <p className={styles.detail}>{service.detail}</p>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}