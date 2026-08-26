/* =========================================================
   ABRAHAM ASHAGRE
   PROFESSIONAL PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   1. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeMobileMenu();

    initializeSmoothScrolling();

    initializeActiveNavigation();

    initializeHeaderScroll();

    initializeScrollReveal();

    initializeExternalLinks();

    initializeImageFallback();

});


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

function initializeMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                isOpen
            );

        }

    });


    /* Close menu after clicking a navigation link */

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        }

    });

}


/* =========================================================
   3. SMOOTH SCROLLING
========================================================= */

function initializeSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   4. ACTIVE NAVIGATION
========================================================= */

function initializeActiveNavigation() {

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


    const updateActiveLink = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 150;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.remove("active");

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();

}


/* =========================================================
   5. HEADER SCROLL EFFECT
========================================================= */

function initializeHeaderScroll() {

    const header =
        document.querySelector(".header");

    if (!header) {
        return;
    }


    const updateHeader = () => {

        if (window.scrollY > 20) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();

}


/* =========================================================
   6. SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-card, " +
            ".stat-card, " +
            ".education-card, " +
            ".skill-card, " +
            ".project-card, " +
            ".achievement-card, " +
            ".document-card, " +
            ".contact-card"
        );


    if (!elements.length) {
        return;
    }


    /*
       Add initial reveal class.
       The CSS can animate these elements
       when the class "show" is added.
    */

    elements.forEach(element => {

        element.classList.add(
            "reveal"
        );

    });


    /* Respect reduced-motion preference */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reduceMotion) {

        elements.forEach(element => {

            element.classList.add("show");

        });

        return;

    }


    /* Intersection Observer */

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

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

    } else {

        /* Fallback for older browsers */

        elements.forEach(element => {

            element.classList.add("show");

        });

    }

}


/* =========================================================
   7. EXTERNAL LINKS
========================================================= */

function initializeExternalLinks() {

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

}


/* =========================================================
   8. IMAGE FALLBACK
========================================================= */

function initializeImageFallback() {

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                /*
                   Prevent repeated error events.
                */

                image.removeAttribute(
                    "src"
                );

            },
            {
                once: true
            }
        );

    });

}


/* =========================================================
   9. RESIZE HANDLING
========================================================= */

window.addEventListener(
    "resize",
    () => {

        const navMenu =
            document.querySelector(".nav-menu");

        const menuToggle =
            document.querySelector(".menu-toggle");


        /*
           Return navigation to desktop state
           when screen becomes larger.
        */

        if (
            window.innerWidth > 768 &&
            navMenu &&
            menuToggle
        ) {

            navMenu.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );


            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   10. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        const navMenu =
            document.querySelector(".nav-menu");

        const menuToggle =
            document.querySelector(".menu-toggle");


        if (
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove(
                "active"
            );

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    }
);


/* =========================================================
   11. CURRENT YEAR
========================================================= */

function updateCopyrightYear() {

    const year =
        new Date().getFullYear();

    const footer =
        document.querySelector(".footer");

    if (!footer) {
        return;
    }

    const paragraphs =
        footer.querySelectorAll("p");

    if (!paragraphs.length) {
        return;
    }

    paragraphs[0].innerHTML =
        `© ${year} Abraham Ashagre. All Rights Reserved.`;

}


updateCopyrightYear();


/* =========================================================
   12. PAGE LOADED
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
