import React, { useState, useEffect } from "react";
import {ChevronUp} from "lucide-react";

export const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 50) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: "fixed",
                right: "10px",
                padding: "10px 15px",
                fontSize: "16px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                bottom: isVisible ? "10px" : "-60px",
                zIndex: 99,
                transition: "all 0.5s ease-in-out"
            }}
        >
            <ChevronUp />
        </button>
    );
};