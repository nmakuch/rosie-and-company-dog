import About from "../../components/About/About";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Pricing from "../../components/Pricing/Pricing";
import Services from "../../components/Services/Services";

export default function HomePage() {
    return (
        <>
            <Hero />
            <Services />
            <About />
            <HowItWorks />
            <Pricing />
        </>
    );
}