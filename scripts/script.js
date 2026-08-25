/* =========================================================
   ABRAHAM ASHAGRE - PROFESSIONAL PORTFOLIO
   ADVANCED JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   1. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initDarkMode();

    initTypingEffect();

    initScrollProgress();

    initHeaderEffect();

    initBackToTop();

    initScrollReveal();

    initActiveNavigation();

    initCurrentYear();

});


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");


        const icon =
            menuToggle.querySelector("i");


        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    /* Close menu after clicking a link */

    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");


            const icon =
                menuToggle.querySelector("i");


            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");


            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");


            const icon =
                menuToggle.querySelector("i");


            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   3. DARK / LIGHT MODE
========================================================= */

function initDarkMode() {

    const themeToggle =
        document.querySelector(".theme-toggle");


    if (!themeToggle) {
        return;
    }


    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    updateThemeIcon();


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");


        const isDark =
            document.body.classList.contains("dark-mode");


        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );


        updateThemeIcon();

    });


    function updateThemeIcon() {

        const icon =
            themeToggle.querySelector("i");


        if (!icon) {
            return;
        }


        const isDark =
            document.body.classList.contains("dark-mode");


        if (isDark) {

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            icon.classList.remove("fa-sun");

            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    }

}


/* =========================================================
   4. TYPING EFFECT
========================================================= */

function initTypingEffect() {

    const typingElement =
        document.querySelector(".typing-text");


    if (!typingElement) {
        return;
    }


    const words = [

        "Aspiring IT Support Officer",

        "IT Support Professional",

        "Network & System Enthusiast",

        "Software Developer",

        "Information Technology Graduate"

    ];


    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function type() {

        const currentWord =
            words[wordIndex];


        if (!deleting) {

            characterIndex++;

        } else {

            characterIndex--;

        }


        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        let speed =
            deleting ? 55 : 90;


        /* Pause after completing a word */

        if (
            !deleting &&
            characterIndex === currentWord.length
        ) {

            speed = 1800;

            deleting = true;

        }


        /* Move to next word */

        if (
            deleting &&
            characterIndex === 0
        ) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

            speed = 400;

        }


        setTimeout(type, speed);

    }


    type();

}


/* =========================================================
   5. SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    let progressBar =
        document.querySelector(".scroll-progress");


    /* Create automatically if it doesn't exist */

    if (!progressBar) {

        progressBar =
            document.createElement("div");

        progressBar.className =
            "scroll-progress";

        document.body.prepend(progressBar);

    }


    window.addEventListener(
        "scroll",
        () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            if (documentHeight <= 0) {
                return;
            }


            const progress =
                (scrollTop / documentHeight) * 100;


            progressBar.style.width =
                `${progress}%`;

        },
        { passive: true }
    );

}


/* =========================================================
   6. HEADER SCROLL EFFECT
========================================================= */

function initHeaderEffect() {

    const header =
        document.querySelector(".header");


    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   7. BACK TO TOP
========================================================= */

function initBackToTop() {

    let backToTop =
        document.querySelector(".back-to-top");


    /* Create automatically */

    if (!backToTop) {

        backToTop =
            document.createElement("button");

        backToTop.className =
            "back-to-top";

        backToTop.innerHTML =
            '<i class="fa-solid fa-arrow-up"></i>';

        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(
            backToTop
        );

    }


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        },
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   8. SCROLL REVEAL ANIMATION
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".section, .skill-card, " +
            ".stat-card, .project-card, " +
            ".achievement-card, .document-card, " +
            ".contact-card, .social-card"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(element => {

        element.classList.add("reveal");

    });


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add("active");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("active");


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   9. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    function updateActiveLink() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            const target =
                link.getAttribute("href");


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );


    updateActiveLink();

}


/* =========================================================
   10. AUTOMATIC COPYRIGHT YEAR
========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    if (!yearElements.length) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            currentYear;

    });

}


/* =========================================================
   11. SMOOTH INTERNAL LINKS
========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) {
            return;
        }


        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(
                targetId
            );


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }
);


/* =========================================================
   12. EXTERNAL LINKS
   Add security attributes automatically
========================================================= */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach(link => {

    if (
        !link.rel.includes("noopener")
    ) {

        link.rel +=
            " noopener noreferrer";

    }

});


/* =========================================================
   13. IMAGE ERROR HANDLING
========================================================= */

document.querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0.5";

                console.warn(
                    "Portfolio image could not be loaded:",
                    image.src
                );

            }
        );

    });


/* =========================================================
   14. CONSOLE MESSAGE
========================================================= */

console.log(
    "%cAbraham Ashagre | Professional Portfolio",
    "font-size: 18px; font-weight: bold;"
);

console.log(
    "Portfolio JavaScript loaded successfully."
);
