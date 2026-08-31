import { useEffect, useRef, useState } from "react";

import Container from "../../components/Container/Container";
import styles from "./BookingPage.module.css";

const questions = [
    {
        id: "fullName",
        section: "Your information",
        heading: "What is your full name?",
        helper: "We'll use this when we follow up about your request.",
        label: "Full name",
        type: "text",
        autoComplete: "name",
    },
    {
        id: "email",
        section: "Your information",
        heading: "What is your email address?",
        helper: "We'll send updates about your request to this address.",
        label: "Email address",
        type: "email",
        autoComplete: "email",
        validate: (value) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? ""
                : "Enter a valid email address.",
    },
    {
        id: "phone",
        section: "Your information",
        heading: "What is the best phone number to reach you?",
        helper:
            "We'll only use it to discuss your request or arrange an introduction.",
        label: "Phone number",
        type: "tel",
        inputMode: "tel",
        autoComplete: "tel",
        validate: (value) =>
            value.replace(/\D/g, "").length >= 10
                ? ""
                : "Enter a phone number with at least 10 digits.",
    },
    {
        id: "dogName",
        section: "About your dog",
        heading: "What is your dog's name?",
        helper: "This helps make the rest of the request feel more personal.",
        label: "Dog's name",
        type: "text",
        autoComplete: "off",
    },
    {
        id: "dogAge",
        section: "About your dog",
        heading: "How old is your dog?",
        helper: "An approximate age is completely fine.",
        label: "Age in years",
        type: "number",
        inputMode: "decimal",
        min: "0.1",
        max: "30",
        step: "0.5",
        autoComplete: "off",
        validate: (value) => {
            const age = Number(value);

            if (age <= 0 || age > 30) {
                return "Enter an age between 0.1 and 30 years.";
            }

            return "";
        },
    },
    {
        id: "dogSize",
        section: "About your dog",
        heading: "What size is your dog?",
        helper:
            "Choose the option that most closely matches their current weight.",
        label: "Dog size",
        type: "choice",
        options: [
            {
                value: "Small",
                label: "Small",
                description: "Under 25 pounds",
            },
            {
                value: "Medium",
                label: "Medium",
                description: "25–50 pounds",
            },
            {
                value: "Large",
                label: "Large",
                description: "50–80 pounds",
            },
            {
                value: "Extra large",
                label: "Extra large",
                description: "Over 80 pounds",
            },
        ],
    },
    {
        id: "dogComfort",
        section: "About your dog",
        heading: (data) =>
            `How comfortable is ${data.dogName || "your dog"
            } around other dogs?`,
        helper:
            "Choose the answer that best reflects their usual behaviour.",
        label: "Comfort around other dogs",
        type: "choice",
        options: [
            {
                value: "Very comfortable",
                label: "Very comfortable",
            },
            {
                value: "Usually comfortable",
                label: "Usually comfortable",
            },
            {
                value: "Needs some space",
                label: "Needs some space",
            },
            {
                value: "Not sure",
                label: "I'm not sure",
            },
        ],
    },
    {
        id: "service",
        section: "Choose a service",
        heading: "What kind of care are you looking for?",
        helper:
            "Choose the closest option. We can adjust the details after reviewing your request.",
        label: "Requested service",
        type: "choice",
        options: [
            {
                value: "Individual walk",
                label: "Individual walk",
                description: "One-on-one care for 30 or 60 minutes.",
            },
            {
                value: "Small group walk",
                label: "Small group walk",
                description:
                    "A carefully matched walk with a few companions.",
            },
            {
                value: "Drop-in visit",
                label: "Drop-in visit",
                description:
                    "At-home attention, food, water, or a quick outdoor break.",
            },
        ],
    },
    {
        id: "preferredDays",
        section: "Preferred schedule",
        heading: "Which days would work best?",
        helper:
            "Enter one or more days, such as Monday, Wednesday, and Friday.",
        label: "Preferred days",
        type: "text",
        autoComplete: "off",
    },
    {
        id: "frequency",
        section: "Preferred schedule",
        heading: (data) =>
            `How often would you like ${data.dogName || "your dog"
            } to receive care?`,
        helper:
            "Choose the option that most closely matches the routine you need.",
        label: "Requested frequency",
        type: "choice",
        options: [
            {
                value: "One time",
                label: "One time",
                description: "A single walk or visit.",
            },
            {
                value: "Every week",
                label: "Every week",
                description: "A consistent recurring schedule.",
            },
            {
                value: "Occasionally",
                label: "Occasionally",
                description: "Care arranged as needed.",
            },
        ],
    },
    {
        id: "preferredTime",
        section: "Preferred schedule",
        heading: "What time of day would work best?",
        helper:
            "Your selection is a preference and will still need to be confirmed.",
        label: "Preferred time",
        type: "choice",
        options: [
            {
                value: "Morning",
                label: "Morning",
                description: "Before 11 a.m.",
            },
            {
                value: "Midday",
                label: "Midday",
                description: "Between 11 a.m. and 2 p.m.",
            },
            {
                value: "Afternoon",
                label: "Afternoon",
                description: "After 2 p.m.",
            },
            {
                value: "Flexible",
                label: "Flexible",
                description: "Any available time works.",
            },
        ],
    },
    {
        id: "location",
        section: "Location",
        heading: "Where will care take place?",
        helper:
            "A neighbourhood or postal code is enough for the initial request.",
        label: "Neighbourhood or postal code",
        type: "text",
        autoComplete: "postal-code",
    },
    {
        id: "additionalNotes",
        section: "Additional details",
        heading: "Is there anything else we should know?",
        helper:
            "Share any behaviour, mobility, medical, or routine details that may help us understand your dog.",
        label: "Additional notes (optional)",
        type: "textarea",
        autoComplete: "off",
        required: false,
    },
];

const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    dogName: "",
    dogAge: "",
    dogSize: "",
    dogComfort: "",
    service: "",
    preferredDays: "",
    frequency: "",
    preferredTime: "",
    location: "",
    additionalNotes: "",
};

export default function BookingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState("");
    const [isEditingAnswer, setIsEditingAnswer] = useState(false);

    const headingRef = useRef(null);

    const totalQuestions = questions.length;
    const question = questions[currentStep - 1];

    const isWelcomeScreen = currentStep === 0;
    const isReviewScreen = currentStep === totalQuestions + 1;
    const isConfirmationScreen = currentStep === totalQuestions + 2;

    const questionHeading =
        typeof question?.heading === "function"
            ? question.heading(formData)
            : question?.heading;

    const progressValue = isWelcomeScreen
        ? 0
        : isEditingAnswer
            ? totalQuestions
            : Math.min(currentStep, totalQuestions);

    const progress = (progressValue / totalQuestions) * 100;

    const reviewSections = [
        {
            title: "Your information",
            items: [
                {
                    label: "Name",
                    value: formData.fullName,
                    questionId: "fullName",
                },
                {
                    label: "Email",
                    value: formData.email,
                    questionId: "email",
                },
                {
                    label: "Phone",
                    value: formData.phone,
                    questionId: "phone",
                },
            ],
        },
        {
            title: "Your dog",
            items: [
                {
                    label: "Name",
                    value: formData.dogName,
                    questionId: "dogName",
                },
                {
                    label: "Age",
                    value: `${formData.dogAge} years`,
                    questionId: "dogAge",
                },
                {
                    label: "Size",
                    value: formData.dogSize,
                    questionId: "dogSize",
                },
                {
                    label: "Around dogs",
                    value: formData.dogComfort,
                    questionId: "dogComfort",
                },
            ],
        },
        {
            title: "Service",
            items: [
                {
                    label: "Requested care",
                    value: formData.service,
                    questionId: "service",
                },
            ],
        },
        {
            title: "Schedule",
            items: [
                {
                    label: "Days",
                    value: formData.preferredDays,
                    questionId: "preferredDays",
                },
                {
                    label: "Frequency",
                    value: formData.frequency,
                    questionId: "frequency",
                },
                {
                    label: "Time",
                    value: formData.preferredTime,
                    questionId: "preferredTime",
                },
            ],
        },
        {
            title: "Location and notes",
            items: [
                {
                    label: "Location",
                    value: formData.location,
                    questionId: "location",
                },
                {
                    label: "Notes",
                    value:
                        formData.additionalNotes ||
                        "No additional notes",
                    questionId: "additionalNotes",
                },
            ],
        },
    ];

    useEffect(() => {
        if (!isWelcomeScreen) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
            });

            headingRef.current?.focus({
                preventScroll: true,
            });
        }
    }, [currentStep, isWelcomeScreen]);

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    }

    function handleQuestionSubmit(event) {
        event.preventDefault();

        const value = formData[question.id];
        const isEmpty =
            typeof value === "string" && !value.trim();

        if (question.required !== false && isEmpty) {
            setError(
                `Choose or enter your ${question.label.toLowerCase()}.`
            );
            return;
        }

        const validationError = question.validate?.(value.trim());

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        if (isEditingAnswer) {
            setIsEditingAnswer(false);
            setCurrentStep(totalQuestions + 1);
            return;
        }

        setCurrentStep((current) => current + 1);
    }

    function goBack() {
        setError("");

        if (isEditingAnswer) {
            setIsEditingAnswer(false);
            setCurrentStep(totalQuestions + 1);
            return;
        }

        setCurrentStep((current) =>
            Math.max(current - 1, 0)
        );
    }

    function editQuestion(questionId) {
        const questionIndex = questions.findIndex(
            (item) => item.id === questionId
        );

        if (questionIndex === -1) {
            return;
        }

        setError("");
        setIsEditingAnswer(true);
        setCurrentStep(questionIndex + 1);
    }

    function handleRequestSubmit(event) {
        event.preventDefault();

        // This currently simulates a successful submission.
        setCurrentStep(totalQuestions + 2);
    }

    return (
        <section
            className={styles.bookingPage}
            aria-labelledby="booking-heading"
        >
            <Container className={styles.layout}>
                <aside
                    className={styles.progressArea}
                    aria-label="Request progress"
                >
                    <p className={styles.progressLabel}>
                        {isWelcomeScreen && "Getting started"}

                        {question &&
                            (isEditingAnswer
                                ? "Editing your answer"
                                : `Question ${currentStep} of ${totalQuestions}`)}

                        {isReviewScreen &&
                            "Review your answers"}

                        {isConfirmationScreen &&
                            "Request complete"}
                    </p>

                    <div
                        className={styles.progressTrack}
                        role="progressbar"
                        aria-label="Request progress"
                        aria-valuemin="0"
                        aria-valuemax={totalQuestions}
                        aria-valuenow={progressValue}
                    >
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    <p className={styles.sectionLabel}>
                        {question?.section}
                        {isWelcomeScreen && "Request a walk"}
                        {isReviewScreen && "Review request"}
                        {isConfirmationScreen &&
                            "Request received"}
                    </p>
                </aside>

                <div className={styles.formArea}>
                    {isWelcomeScreen && (
                        <div>
                            <p className={styles.eyebrow}>
                                Request a walk
                            </p>

                            <h1 id="booking-heading">
                                Let's plan your dog's first walk.
                            </h1>

                            <p className={styles.introduction}>
                                We'll ask one question at a time
                                about you, your dog, and the care
                                you're looking for. Nothing is
                                booked until availability has been
                                confirmed.
                            </p>

                            <ul className={styles.reassurance}>
                                <li>
                                    Takes about three minutes
                                </li>
                                <li>
                                    No payment required today
                                </li>
                                <li>
                                    Nothing is confirmed yet
                                </li>
                            </ul>

                            <button
                                className={styles.primaryAction}
                                type="button"
                                onClick={() =>
                                    setCurrentStep(1)
                                }
                            >
                                Get started
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    )}

                    {question && (
                        <form
                            onSubmit={handleQuestionSubmit}
                            noValidate
                        >
                            <p className={styles.eyebrow}>
                                {question.section}
                            </p>

                            <h1
                                id="booking-heading"
                                ref={headingRef}
                                tabIndex="-1"
                            >
                                {questionHeading}
                            </h1>

                            <p className={styles.introduction}>
                                {question.helper}
                            </p>

                            {question.type === "choice" && (
                                <fieldset
                                    className={
                                        styles.choiceFieldset
                                    }
                                    aria-invalid={Boolean(error)}
                                    aria-describedby={
                                        error
                                            ? `${question.id}-error`
                                            : undefined
                                    }
                                >
                                    <legend
                                        className={styles.srOnly}
                                    >
                                        {question.label}
                                    </legend>

                                    <div
                                        className={
                                            styles.choiceList
                                        }
                                    >
                                        {question.options.map(
                                            (option) => (
                                                <label
                                                    className={
                                                        styles.choice
                                                    }
                                                    key={
                                                        option.value
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        name={
                                                            question.id
                                                        }
                                                        value={
                                                            option.value
                                                        }
                                                        checked={
                                                            formData[
                                                            question
                                                                .id
                                                            ] ===
                                                            option.value
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />

                                                    <span
                                                        className={
                                                            styles.choiceContent
                                                        }
                                                    >
                                                        <strong>
                                                            {
                                                                option.label
                                                            }
                                                        </strong>

                                                        {option.description && (
                                                            <span>
                                                                {
                                                                    option.description
                                                                }
                                                            </span>
                                                        )}
                                                    </span>
                                                </label>
                                            )
                                        )}
                                    </div>

                                    {error && (
                                        <p
                                            id={`${question.id}-error`}
                                            className={
                                                styles.error
                                            }
                                            role="alert"
                                        >
                                            {error}
                                        </p>
                                    )}
                                </fieldset>
                            )}

                            {question.type === "textarea" && (
                                <div className={styles.field}>
                                    <label htmlFor={question.id}>
                                        {question.label}
                                    </label>

                                    <textarea
                                        id={question.id}
                                        name={question.id}
                                        value={
                                            formData[question.id]
                                        }
                                        autoComplete={
                                            question.autoComplete
                                        }
                                        aria-invalid={Boolean(
                                            error
                                        )}
                                        aria-describedby={
                                            error
                                                ? `${question.id}-error`
                                                : undefined
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                    />

                                    {error && (
                                        <p
                                            id={`${question.id}-error`}
                                            className={
                                                styles.error
                                            }
                                            role="alert"
                                        >
                                            {error}
                                        </p>
                                    )}
                                </div>
                            )}

                            {question.type !== "choice" &&
                                question.type !==
                                "textarea" && (
                                    <div
                                        className={styles.field}
                                    >
                                        <label
                                            htmlFor={
                                                question.id
                                            }
                                        >
                                            {question.label}
                                        </label>

                                        <input
                                            id={question.id}
                                            name={question.id}
                                            type={question.type}
                                            value={
                                                formData[
                                                question.id
                                                ]
                                            }
                                            inputMode={
                                                question.inputMode
                                            }
                                            autoComplete={
                                                question.autoComplete
                                            }
                                            min={question.min}
                                            max={question.max}
                                            step={question.step}
                                            required={
                                                question.required !==
                                                false
                                            }
                                            aria-invalid={Boolean(
                                                error
                                            )}
                                            aria-describedby={
                                                error
                                                    ? `${question.id}-error`
                                                    : undefined
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                        />

                                        {error && (
                                            <p
                                                id={`${question.id}-error`}
                                                className={
                                                    styles.error
                                                }
                                                role="alert"
                                            >
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                )}

                            <div className={styles.actions}>
                                <button
                                    className={
                                        styles.backAction
                                    }
                                    type="button"
                                    onClick={goBack}
                                >
                                    <span aria-hidden="true">
                                        ←
                                    </span>

                                    {isEditingAnswer
                                        ? "Back to review"
                                        : "Back"}
                                </button>

                                <button
                                    className={
                                        styles.primaryAction
                                    }
                                    type="submit"
                                >
                                    {isEditingAnswer
                                        ? "Save change"
                                        : currentStep ===
                                            totalQuestions
                                            ? "Review request"
                                            : "Continue"}

                                    <span aria-hidden="true">
                                        →
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}

                    {isReviewScreen && (
                        <form onSubmit={handleRequestSubmit}>
                            <p className={styles.eyebrow}>
                                Review request
                            </p>

                            <h1
                                id="booking-heading"
                                ref={headingRef}
                                tabIndex="-1"
                            >
                                Check everything before
                                submitting.
                            </h1>

                            <p className={styles.introduction}>
                                Nothing is booked or charged when
                                you submit. We'll follow up to
                                confirm availability and arrange
                                an introduction.
                            </p>

                            <div
                                className={styles.reviewSections}
                            >
                                {reviewSections.map(
                                    (section) => (
                                        <section
                                            className={
                                                styles.reviewSection
                                            }
                                            key={section.title}
                                        >
                                            <h2>
                                                {section.title}
                                            </h2>

                                            <dl
                                                className={
                                                    styles.reviewDetails
                                                }
                                            >
                                                {section.items.map(
                                                    (item) => (
                                                        <div
                                                            className={
                                                                styles.reviewRow
                                                            }
                                                            key={
                                                                item.questionId
                                                            }
                                                        >
                                                            <dt>
                                                                {
                                                                    item.label
                                                                }
                                                            </dt>

                                                            <dd>
                                                                <span
                                                                    className={
                                                                        styles.reviewValue
                                                                    }
                                                                >
                                                                    {
                                                                        item.value
                                                                    }
                                                                </span>

                                                                <button
                                                                    className={
                                                                        styles.editAction
                                                                    }
                                                                    type="button"
                                                                    aria-label={`Edit ${item.label.toLowerCase()} in ${section.title.toLowerCase()}`}
                                                                    onClick={() =>
                                                                        editQuestion(
                                                                            item.questionId
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            </dd>
                                                        </div>
                                                    )
                                                )}
                                            </dl>
                                        </section>
                                    )
                                )}
                            </div>

                            <div className={styles.actions}>
                                <button
                                    className={
                                        styles.backAction
                                    }
                                    type="button"
                                    onClick={goBack}
                                >
                                    <span aria-hidden="true">
                                        ←
                                    </span>
                                    Back
                                </button>

                                <button
                                    className={
                                        styles.primaryAction
                                    }
                                    type="submit"
                                >
                                    Submit request
                                    <span aria-hidden="true">
                                        →
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}

                    {isConfirmationScreen && (
                        <div
                            className={styles.confirmation}
                            aria-live="polite"
                        >
                            <p className={styles.eyebrow}>
                                Request received
                            </p>

                            <h1
                                id="booking-heading"
                                ref={headingRef}
                                tabIndex="-1"
                            >
                                Thanks—we'll be in touch about{" "}
                                {formData.dogName}'s first walk.
                            </h1>

                            <p className={styles.introduction}>
                                The next step is confirming
                                availability and arranging a short
                                introduction before any walks are
                                scheduled.
                            </p>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}