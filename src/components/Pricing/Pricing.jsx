import Container from "../Container/Container";

import styles from "./Pricing.module.css";

const plans = [
    {
        name: "Quick walk",
        price: "$24",
        unit: "per walk",
        description: "A neighbourhood walk for dogs who need a reliable break during the day.",
        features: ["30-minute walk", "Fresh water", "Post-walk update"],
    },
    {
        name: "Adventure walk",
        price: "$36",
        unit: "per walk",
        description: "More time to explore, exercise, and enjoy their favourite outdoor places.",
        features: ["60-minute walk", "Fresh water", "Post-walk update"],
        featured: true,
    },
    {
        name: "Drop-in visit",
        price: "$22",
        unit: "per visit",
        description: "At-home care for dogs who need company, food, or a quick outdoor break.",
        features: ["30-minute visit", "Food and water", "Visit update"],
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className={styles.pricing} aria-labelledby="pricing-heading">
            <Container>
                <div className={styles.heading}>
                    <div>
                        <p className={styles.eyebrow}>Simple pricing</p>
                        <h2 id="pricing-heading">Choose the care that suits their day.</h2>
                    </div>

                    <p className={styles.introduction}>
                        Straightforward options make it easy to find the right amount
                        of exercise, attention, and companionship.
                    </p>
                </div>

                <div className={styles.plans}>
                    {plans.map((plan) => (
                        <article
                            className={`${styles.plan} ${plan.featured ? styles.featured : ""
                                }`}
                            key={plan.name}
                        >
                            {plan.featured && (
                                <span className={styles.badge}>Most popular</span>
                            )}

                            <h3>{plan.name}</h3>

                            <div className={styles.price}>
                                <span>{plan.price}</span>
                                <small>{plan.unit}</small>
                            </div>

                            <p className={styles.description}>{plan.description}</p>

                            <ul>
                                {plan.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>

                            <a href="/booking">Choose this option</a>
                        </article>
                    ))}
                </div>

                <p className={styles.disclaimer}>
                    Final rates may vary based on location and scheduling.
                </p>
            </Container>
        </section>
    );
}