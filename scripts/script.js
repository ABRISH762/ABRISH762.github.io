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

    initMobileMenu();
    initSmoothScrolling();
    initActiveNavigation();
    initScrollEffects();
    initTypingEffect();
    initExternalLinks();

});


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

function initMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        const icon = menuToggle.querySelector("i");

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


    /* Close menu when navigation link is clicked */

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
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
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
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

function initSmoothScrolling() {

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

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        );

    if (
        sections.length === 0 ||
        navLinks.length === 0
    ) {
        return;
    }


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


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

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
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
   5. SCROLL EFFECTS
========================================================= */

function initScrollEffects() {

    const header =
        document.querySelector(".header");

    if (!header) {
        return;
    }


    function handleScroll() {

        if (window.scrollY > 30) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();

}


/* =========================================================
   6. TYPING EFFECT
========================================================= */

function initTypingEffect() {

    /*
       The HTML currently uses:

       <h3>
           Aspiring IT Support Officer
       </h3>

       Therefore this function automatically converts
       the hero h3 into a typing animation.

       It also works with the dedicated:

       .typing-container
       .typing-text

       structure if added later.
    */


    const heroTitle =
        document.querySelector(".hero h3");

    if (!heroTitle) {
        return;
    }


    const phrases = [

        "Aspiring IT Support Officer",

        "IT Support & Technical Support",

        "Information Technology Graduate",

        "Networking & System Administration",

        "Computer Maintenance Specialist"

    ];


    let phraseIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    heroTitle.classList.add(
        "typing-active"
    );


    function typeText() {

        const currentPhrase =
            phrases[phraseIndex];


        if (!deleting) {

            characterIndex++;

            heroTitle.textContent =
                currentPhrase.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex >=
                currentPhrase.length
            ) {

                deleting = true;

                setTimeout(
                    typeText,
                    1800
                );

                return;

            }


            setTimeout(
                typeText,
                80
            );

        } else {

            characterIndex--;

            heroTitle.textContent =
                currentPhrase.substring(
                    0,
                    characterIndex
                );


            if (characterIndex <= 0) {

                deleting = false;

                phraseIndex =
                    (phraseIndex + 1) %
                    phrases.length;

                setTimeout(
                    typeText,
                    400
                );

                return;

            }


            setTimeout(
                typeText,
                45
            );

        }

    }


    typeText();

}


/* =========================================================
   7. EXTERNAL LINKS
========================================================= */

function initExternalLinks() {

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }
        );

    });

}


/* =========================================================
   8. IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
    "error",
    event => {

        const image = event.target;

        if (
            image &&
            image.tagName === "IMG"
        ) {

            image.classList.add(
                "image-error"
            );

        }

    },
    true
);


/* =========================================================
   9. BACK TO TOP SUPPORT
========================================================= */

function createBackToTopButton() {

    const button =
        document.createElement("button");

    button.type = "button";

    button.className =
        "back-to-top";

    button.setAttribute(
        "aria-label",
        "Back to top"
    );

    button.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(button);


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        },
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

}


/* =========================================================
   10. LAZY IMAGE OBSERVER
========================================================= */

function initImageObserver() {

    const images =
        document.querySelectorAll(
            'img[loading="lazy"]'
        );

    if (
        images.length === 0 ||
        !("IntersectionObserver" in window)
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const image =
                            entry.target;

                        image.classList.add(
                            "image-loaded"
                        );

                        observer.unobserve(
                            image
                        );

                    }

                });

            },
            {
                rootMargin:
                    "100px"
            }
        );


    images.forEach(image => {

        observer.observe(image);

    });

}


/* =========================================================
   11. CURRENT YEAR
========================================================= */

function updateCurrentYear() {

    const year =
        document.querySelector(
            ".current-year"
        );

    if (!year) {
        return;
    }

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   12. INITIALIZE OPTIONAL FEATURES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createBackToTopButton();

        initImageObserver();

        updateCurrentYear();

    }
);


/* =========================================================
   13. KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

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


                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );

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

    }
);


/* =========================================================
   END OF MAIN JAVASCRIPT
========================================================= */
