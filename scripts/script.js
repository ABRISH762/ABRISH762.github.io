/* =========================================================
   ABRAHAM ASHAGRE
   PROFESSIONAL PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const icon =
                menuToggle.querySelector("i");

            if (navMenu.classList.contains("active")) {

                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
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
            }

        });


        /* Close menu after clicking a link */

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

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

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =====================================================
       2. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(
            ".nav-menu a[href^='#']"
        );


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 150;


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

            const target =
                link.getAttribute("href");

            if (
                target === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       3. SMOOTH SCROLL
    ===================================================== */

    navigationLinks.forEach(function (link) {

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
                document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            const header =
                document.querySelector(".header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        });

    });


    /* =====================================================
       4. BACK TO TOP BUTTON
    ===================================================== */

    const backToTop =
        document.createElement("button");


    backToTop.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';


    backToTop.className =
        "back-to-top";


    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );


    document.body.appendChild(
        backToTop
    );


    const backToTopStyles =
        document.createElement("style");


    backToTopStyles.textContent = `

        .back-to-top {

            position: fixed;

            right: 22px;

            bottom: 22px;

            width: 46px;

            height: 46px;

            display: flex;

            align-items: center;

            justify-content: center;

            border: none;

            border-radius: 50%;

            background: #0d6efd;

            color: #ffffff;

            cursor: pointer;

            box-shadow:
                0 8px 25px rgba(0,0,0,0.18);

            opacity: 0;

            visibility: hidden;

            transform: translateY(15px);

            transition: all 0.3s ease;

            z-index: 999;

        }


        .back-to-top.show {

            opacity: 1;

            visibility: visible;

            transform: translateY(0);

        }


        .back-to-top:hover {

            transform:
                translateY(-4px);

            background: #084298;

        }


        .nav-menu a.active {

            color: #0d6efd;

        }


        @media (max-width: 768px) {

            .back-to-top {

                right: 15px;

                bottom: 15px;

                width: 42px;

                height: 42px;

            }

        }

    `;


    document.head.appendChild(
        backToTopStyles
    );


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 400) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    /* =====================================================
       5. CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       6. EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    externalLinks.forEach(function (link) {

        if (
            link.hostname !==
            window.location.hostname
        ) {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


    /* =====================================================
       7. DOCUMENT LINK CHECK
    ===================================================== */

    const documentLinks =
        document.querySelectorAll(
            'a[href$=".PDF"], a[href$=".pdf"]'
        );


    documentLinks.forEach(function (link) {

        link.addEventListener(
            "error",
            function () {

                console.warn(
                    "Document could not be loaded:",
                    link.href
                );

            }
        );

    });


    /* =====================================================
       8. IMAGE LAZY LOADING
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(function (image) {

        if (
            !image.hasAttribute("loading")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       9. FADE-IN ANIMATION
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".skill-card, " +
            ".stat-card, " +
            ".achievement-card, " +
            ".document-card, " +
            ".contact-card, " +
            ".project-card, " +
            ".education-card, " +
            ".about-card"
        );


    animatedElements.forEach(function (
        element
    ) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity 0.6s ease, " +
            "transform 0.6s ease";

    });


    const animationObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (
                    entry
                ) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(function (
        element
    ) {

        animationObserver.observe(
            element
        );

    });


    /* =====================================================
       10. EMAIL LINK PROTECTION
    ===================================================== */

    const emailLinks =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                console.log(
                    "Opening email application..."
                );

            }
        );

    });


    /* =====================================================
       11. PHONE LINK
    ===================================================== */

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );


    phoneLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                console.log(
                    "Opening phone application..."
                );

            }
        );

    });


    /* =====================================================
       12. WHATSAPP LINK
    ===================================================== */

    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );


    whatsappLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                console.log(
                    "Opening WhatsApp..."
                );

            }
        );

    });


    /* =====================================================
       13. PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "Abraham Ashagre Portfolio loaded successfully."
    );

});
/* =========================================================
   PROFESSIONAL TYPING ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const typingText =
        document.getElementById("typing-text");

    const typingContainer =
        document.querySelector(".typing-container");


    if (!typingText || !typingContainer) {
        return;
    }


    const texts = [

        "Aspiring IT Support Officer",

        "Information Technology Graduate",

        "IT Support Enthusiast",

        "Networking Enthusiast",

        "Technical Support Professional"

    ];


    let textIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    /*
     * Speed settings
     */

    const typingSpeed = 85;

    const deletingSpeed = 45;

    const typingPause = 2000;

    const deletingPause = 700;


    function animateTyping() {

        const currentText =
            texts[textIndex];


        /* =================================================
           TYPING
        ================================================= */

        if (!deleting) {

            typingText.textContent =
                currentText.substring(
                    0,
                    characterIndex + 1
                );


            characterIndex++;


            if (
                characterIndex >=
                currentText.length
            ) {

                deleting = true;


                setTimeout(
                    animateTyping,
                    typingPause
                );


                return;

            }


            setTimeout(
                animateTyping,
                typingSpeed
            );


            return;

        }


        /* =================================================
           DELETING
        ================================================= */

        typingText.textContent =
            currentText.substring(
                0,
                characterIndex - 1
            );


        characterIndex--;


        if (characterIndex <= 0) {

            characterIndex = 0;

            deleting = false;


            textIndex =
                (textIndex + 1) %
                texts.length;


            /*
             * Small pause before
             * next word starts
             */

            setTimeout(
                animateTyping,
                deletingPause
            );


            return;

        }


        setTimeout(
            animateTyping,
            deletingSpeed
        );

    }


    /*
     * Start animation
     */

    animateTyping();

});
