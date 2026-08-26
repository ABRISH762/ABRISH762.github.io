/* =========================================================
   ABRAHAM ASHAGRE
   PROFESSIONAL PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       1. MOBILE NAVIGATION
    ====================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
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

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
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

            });

        });

    }


    /* =====================================================
       2. HEADER SCROLL EFFECT
    ====================================================== */

    const header =
        document.querySelector(".header");

    function updateHeader() {

        if (!header) {
            return;
        }

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
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       3. ACTIVE NAVIGATION LINK
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 140;


        sections.forEach(function (section) {

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


        navigationLinks.forEach(function (link) {

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


    /* =====================================================
       4. SMOOTH SCROLLING
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

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


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;


            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        });

    });


    /* =========================================================
   HERO TYPING EFFECT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const typingText = document.getElementById("typing-text");

    if (!typingText) return;

    const roles = [
        "IT Support Officer",
        "Junior Software Developer",
        "Web Developer",
        "Network Administrator",
        "IT Professional"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 90;
    const deletingSpeed = 55;
    const pauseAfterTyping = 1800;
    const pauseAfterDeleting = 500;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (!isDeleting) {

            typingText.textContent =
                currentRole.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentRole.length) {

                isDeleting = true;

                setTimeout(typeEffect, pauseAfterTyping);
                return;
            }

            setTimeout(typeEffect, typingSpeed);

        } else {

            typingText.textContent =
                currentRole.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                isDeleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {
                    roleIndex = 0;
                }

                setTimeout(typeEffect, pauseAfterDeleting);
                return;
            }

            setTimeout(typeEffect, deletingSpeed);
        }
    }

    typeEffect();
});
    /* =====================================================
       6. SCROLL REVEAL ANIMATION
    ====================================================== */

    const revealElements =
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


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal-element"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       7. PROJECT IMAGE HOVER
    ====================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image img"
        );


    projectImages.forEach(
        function (image) {

            image.addEventListener(
                "click",
                function () {

                    const imageSource =
                        image.getAttribute(
                            "src"
                        );

                    if (!imageSource) {
                        return;
                    }


                    openImageViewer(
                        imageSource,
                        image.alt
                    );

                }
            );

            image.style.cursor =
                "zoom-in";

        }
    );


    /* =====================================================
       8. IMAGE VIEWER
    ====================================================== */

    function openImageViewer(
        imageSource,
        imageAlt
    ) {

        const existingViewer =
            document.querySelector(
                ".image-viewer"
            );


        if (existingViewer) {

            existingViewer.remove();

        }


        const viewer =
            document.createElement(
                "div"
            );

        viewer.className =
            "image-viewer";


        viewer.innerHTML = `

            <div class="image-viewer-overlay"></div>

            <div class="image-viewer-content">

                <button
                    class="image-viewer-close"
                    type="button"
                    aria-label="Close image"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <img
                    src="${escapeHtml(imageSource)}"
                    alt="${escapeHtml(imageAlt || "Project image")}"
                >

            </div>

        `;


        document.body.appendChild(
            viewer
        );


        const closeButton =
            viewer.querySelector(
                ".image-viewer-close"
            );

        const overlay =
            viewer.querySelector(
                ".image-viewer-overlay"
            );


        function closeViewer() {

            viewer.classList.remove(
                "image-viewer-visible"
            );

            setTimeout(
                function () {

                    viewer.remove();

                },
                250
            );

        }


        closeButton.addEventListener(
            "click",
            closeViewer
        );


        overlay.addEventListener(
            "click",
            closeViewer
        );


        document.addEventListener(
            "keydown",
            function handleEscape(event) {

                if (
                    event.key === "Escape"
                ) {

                    closeViewer();

                    document.removeEventListener(
                        "keydown",
                        handleEscape
                    );

                }

            }
        );


        requestAnimationFrame(
            function () {

                viewer.classList.add(
                    "image-viewer-visible"
                );

            }
        );

    }


    /* =====================================================
       9. EXTERNAL LINKS
    ====================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(
        function (link) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );


    /* =====================================================
       10. CURRENT YEAR
    ====================================================== */

    const footer =
        document.querySelector(
            ".footer"
        );


    if (footer) {

        const footerParagraphs =
            footer.querySelectorAll(
                "p"
            );


        footerParagraphs.forEach(
            function (paragraph) {

                paragraph.innerHTML =
                    paragraph.innerHTML.replace(
                        "© 2026",
                        "© " +
                        new Date().getFullYear()
                    );

            }
        );

    }


    /* =====================================================
       11. PREVENT EMPTY HASH JUMP
    ====================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                    }
                );

            }
        );


    /* =====================================================
       12. ACCESSIBILITY — ESCAPE IMAGE VIEWER
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                const viewer =
                    document.querySelector(
                        ".image-viewer"
                    );

                if (viewer) {

                    viewer.remove();

                }

            }

        }
    );


    /* =====================================================
       13. SAFE HTML HELPER
    ====================================================== */

    function escapeHtml(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       14. PAGE LOADED
    ====================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
/* =========================================================
   BEAUTIFUL TYPING ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const typingText =
        document.getElementById("typingText");

    if (!typingText) {
        return;
    }


    const phrases = [

        "IT Support & Technical Assistance",

        "Computer Networking",

        "System Administration",

        "Database Management",

        "Software Development",

        "Computer Maintenance",

        "Problem Solving"

    ];


    let phraseIndex = 0;
    let characterIndex = 0;

    let isDeleting = false;


    const typingSpeed = 75;
    const deletingSpeed = 40;
    const pauseAfterTyping = 1800;
    const pauseAfterDeleting = 400;


    function typeEffect() {

        const currentPhrase =
            phrases[phraseIndex];


        /* =================================================
           TYPING
        ================================================= */

        if (!isDeleting) {

            typingText.textContent =
                currentPhrase.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;


            if (
                characterIndex ===
                currentPhrase.length
            ) {

                isDeleting = true;

                setTimeout(
                    typeEffect,
                    pauseAfterTyping
                );

                return;
            }


            setTimeout(
                typeEffect,
                typingSpeed
            );

            return;
        }


        /* =================================================
           DELETING
        ================================================= */

        typingText.textContent =
            currentPhrase.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            isDeleting = false;

            phraseIndex =
                (phraseIndex + 1) %
                phrases.length;


            setTimeout(
                typeEffect,
                pauseAfterDeleting
            );

            return;
        }


        setTimeout(
            typeEffect,
            deletingSpeed
        );
    }


    /* START */

    typeEffect();

});
