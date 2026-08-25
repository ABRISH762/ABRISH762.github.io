"use strict";

/* =========================================================
   ABRISH762.github.io
   Main Portfolio JavaScript
   Theme functionality is handled separately by theme.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initScrollProgress();
    initHeaderEffect();
    initBackToTop();
    initScrollReveal();
    initActiveNavigation();
    initTypingEffect();
    initSmoothScrolling();
    initExternalLinks();
    initImageErrorHandling();
    initCurrentYear();

});


/* =========================================================
   1. MOBILE MENU
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

        const isOpen =
            navMenu.classList.toggle("active");


        const icon =
            menuToggle.querySelector("i");


        if (isOpen) {

            if (icon) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            }

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        } else {

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* Close menu after selecting a section */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   2. SCROLL PROGRESS BAR
========================================================= */

function initScrollProgress() {

    let progress =
        document.querySelector(".scroll-progress");


    /*
       If it does not exist in HTML,
       create it automatically.
    */

    if (!progress) {

        progress =
            document.createElement("div");

        progress.className =
            "scroll-progress";

        document.body.prepend(progress);

    }


    function updateProgress() {

        const scrollTop =
            window.scrollY;


        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (pageHeight <= 0) {

            progress.style.width = "0%";

            return;

        }


        const percentage =
            (scrollTop / pageHeight) * 100;


        progress.style.width =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();

}


/* =========================================================
   3. HEADER SCROLL EFFECT
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


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   4. BACK TO TOP
========================================================= */

function initBackToTop() {

    let button =
        document.querySelector(".back-to-top");


    /*
       Create automatically if HTML does not
       already contain the button.
    */

    if (!button) {

        button =
            document.createElement("button");

        button.className =
            "back-to-top";

        button.type =
            "button";

        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        button.innerHTML =
            '<i class="fa-solid fa-arrow-up"></i>';

        document.body.appendChild(button);

    }


    function updateButton() {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    updateButton();

}


/* =========================================================
   5. SCROLL REVEAL ANIMATION
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".section, " +
            ".skill-card, " +
            ".stat-card, " +
            ".project-card, " +
            ".achievement-card, " +
            ".document-card, " +
            ".contact-card, " +
            ".social-card"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(element => {

        element.classList.add("reveal");

    });


    /*
       Fallback for older browsers
    */

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

                        entry.target.classList.add(
                            "active"
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

}


/* =========================================================
   6. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const links =
        document.querySelectorAll(
            ".nav-menu a"
        );


    if (
        !sections.length ||
        !links.length
    ) {

        return;

    }


    function updateActiveNavigation() {

        let current =
            "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;


            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.id;

            }

        });


        links.forEach(link => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();

}


/* =========================================================
   7. TYPING EFFECT
========================================================= */

function initTypingEffect() {

    const typingElement =
        document.querySelector(".typing-text");


    if (!typingElement) {
        return;
    }


    /*
       These are the professional roles
       displayed in the hero section.
    */

    const roles = [

        "Aspiring IT Support Officer",

        "Information Technology Graduate",

        "IT Support Professional",

        "Network & System Enthusiast",

        "Software Developer"

    ];


    let roleIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeText() {

        const currentRole =
            roles[roleIndex];


        if (deleting) {

            characterIndex--;

        } else {

            characterIndex++;

        }


        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        let speed =
            deleting ? 50 : 85;


        /*
           Wait after completing the
           complete sentence.
        */

        if (
            !deleting &&
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            speed = 1800;

        }


        /*
           Move to the next role.
        */

        if (
            deleting &&
            characterIndex === 0
        ) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

            speed = 400;

        }


        setTimeout(
            typeText,
            speed
        );

    }


    typeText();

}


/* =========================================================
   8. SMOOTH SCROLLING
========================================================= */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

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

    });

}


/* =========================================================
   9. EXTERNAL LINK SECURITY
========================================================= */

function initExternalLinks() {

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(link => {

        const currentRel =
            link.getAttribute("rel") || "";


        if (
            !currentRel.includes("noopener")
        ) {

            link.setAttribute(
                "rel",
                `${currentRel} noopener noreferrer`
                    .trim()
            );

        }

    });

}


/* =========================================================
   10. IMAGE ERROR HANDLING
========================================================= */

function initImageErrorHandling() {

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Portfolio image could not be loaded:",
                    image.src
                );


                image.classList.add(
                    "image-error"
                );

            }
        );

    });

}


/* =========================================================
   11. AUTOMATIC COPYRIGHT YEAR
========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    if (!yearElements.length) {
        return;
    }


    const year =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            year;

    });

}


/* =========================================================
   12. KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           ESC closes the mobile menu.
        */

        if (
            event.key === "Escape"
        ) {

            const navMenu =
                document.querySelector(
                    ".nav-menu"
                );


            const menuToggle =
                document.querySelector(
                    ".menu-toggle"
                );


            if (
                navMenu &&
                navMenu.classList.contains(
                    "active"
                )
            ) {

                navMenu.classList.remove(
                    "active"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }

    }
);


/* =========================================================
   13. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
           Stop unnecessary activity when
           the browser tab is hidden.
        */

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* =========================================================
   14. CONSOLE INFORMATION
========================================================= */

console.log(
    "Abraham Ashagre | Professional Portfolio"
);

console.log(
    "Main portfolio JavaScript loaded successfully."
);
