// components/ScrollToTopButton/ScrollToTopButton.tsx
"use client";
import React, { useState, useEffect } from "react";

const ScrollToTopButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const threshold = window.innerHeight * 2; // show after scrolling one full viewport height

        const handleScroll = () => {
            setVisible(window.scrollY > threshold);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="
        fixed 
        bottom-6 md:bottom-8 
        right-6 md:right-8 
        p-3 
        bg-gray-800 bg-opacity-75 
        text-white 
        rounded-full 
        shadow-lg 
        transition-opacity duration-300 
        hover:bg-opacity-100 
        focus:outline-none
      "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export default ScrollToTopButton;
