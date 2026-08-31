import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToLocation() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = decodeURIComponent(hash.slice(1));

            const animationFrame = requestAnimationFrame(() => {
                const target = document.getElementById(targetId);

                target?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });

            return () => cancelAnimationFrame(animationFrame);
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });
    }, [pathname, hash]);

    return null;
}