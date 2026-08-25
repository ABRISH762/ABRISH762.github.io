/* =========================================================
   ABRAHAM ASHAGRE
   PROFESSIONAL PORTFOLIO
   DARK / LIGHT THEME
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       1. CREATE THEME BUTTON
    ===================================================== */

    function createThemeButton() {

        if (document.querySelector(".theme-toggle")) {
            return;
        }


        const button =
            document.createElement("button");


        button.className =
            "theme-toggle";


        button.type =
            "button";


        button.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );


        button.setAttribute(
            "title",
            "Switch theme"
        );


        button.innerHTML =
            '<i class="fa-solid fa-moon"></i>';


        const header =
            document.querySelector(".navbar");


        if (header) {

            const menuToggle =
                document.querySelector(".menu-toggle");


            if (menuToggle) {

                header.insertBefore(
                    button,
                    menuToggle
                );

            } else {

                header.appendChild(
                    button
                );

            }

        }


        addThemeButtonStyles();

    }


    /* =====================================================
       2. THEME BUTTON STYLES
    ===================================================== */

    function addThemeButtonStyles() {

        if (
            document.querySelector(
                "#theme-button-styles"
            )
        ) {

            return;

        }


        const style =
            document.createElement("style");


        style.id =
            "theme-button-styles";


        style.textContent = `

            .theme-toggle {

                width: 42px;

                height: 42px;

                display: flex;

                align-items: center;

                justify-content: center;

                border: 1px solid #d1d5db;

                border-radius: 50%;

                background: #ffffff;

                color: #1f2937;

                cursor: pointer;

                font-size: 16px;

                transition: all 0.3s ease;

            }


            .theme-toggle:hover {

                transform: rotate(15deg);

                background: #0d6efd;

                color: #ffffff;

                border-color: #0d6efd;

            }


            body.dark-theme {

                --primary-color: #4d9cff;

                --primary-dark: #78b5ff;

                --secondary-color: #35c878;

                --text-color: #f3f4f6;

                --text-light: #b8c0cc;

                --background: #111827;

                --background-alt: #182233;

                --card-background: #1f2937;

                --border: #374151;

                --shadow:
                    0 10px 30px rgba(0,0,0,0.30);

                --shadow-hover:
                    0 15px 40px rgba(0,0,0,0.40);

            }


            body.dark-theme .header {

                background:
                    rgba(17, 24, 39, 0.96);

            }


            body.dark-theme .nav-menu {

                background:
                    #111827;

            }


            body.dark-theme .nav-menu a {

                color:
                    #f3f4f6;

            }


            body.dark-theme .hero {

                background:
                    linear-gradient(
                        135deg,
                        #111827 0%,
                        #18263a 100%
                    );

            }


            body.dark-theme .profile-frame {

                background:
                    #1f2937;

            }


            body.dark-theme
            .about-icon,
            body.dark-theme
            .education-icon,
            body.dark-theme
            .project-icon,
            body.dark-theme
            .contact-icon {

                background:
                    #243b5a;

            }


            body.dark-theme .project-tags span {

                background:
                    #263852;

                color:
                    #9bc7ff;

            }


            body.dark-theme .skill-tags span {

                color:
                    #7eb7ff;

                border-color:
                    #4d9cff;

            }


            body.dark-theme .cgpa {

                background:
                    #163d2b;

                color:
                    #74d9a0;

            }


            body.dark-theme
            .document-icon {

                background:
                    #49252a;

            }


            body.dark-theme
            .achievement-icon {

                background:
                    #493b1d;

            }


            body.dark-theme .footer {

                background:
                    #080c14;

            }


            @media (max-width: 768px) {

                .theme-toggle {

                    margin-left: auto;

                    margin-right: 8px;

                }

            }

        `;


        document.head.appendChild(style);

    }


    /* =====================================================
       3. APPLY THEME
    ===================================================== */

    function applyTheme(theme) {

        const body =
            document.body;


        const button =
            document.querySelector(
                ".theme-toggle"
            );


        if (theme === "dark") {

            body.classList.add(
                "dark-theme"
            );


            if (button) {

                button.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';


                button.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );


                button.setAttribute(
                    "title",
                    "Switch to light mode"
                );

            }

        } else {

            body.classList.remove(
                "dark-theme"
            );


            if (button) {

                button.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';


                button.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );


                button.setAttribute(
                    "title",
                    "Switch to dark mode"
                );

            }

        }

    }


    /* =====================================================
       4. DETERMINE INITIAL THEME
    ===================================================== */

    function getInitialTheme() {

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            );


        if (savedTheme === "dark" ||
            savedTheme === "light") {

            return savedTheme;

        }


        /* Use device preference */

        if (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
        ) {

            return "dark";

        }


        return "light";

    }


    /* =====================================================
       5. TOGGLE THEME
    ===================================================== */

    function toggleTheme() {

        const body =
            document.body;


        const isDark =
            body.classList.contains(
                "dark-theme"
            );


        const newTheme =
            isDark
                ? "light"
                : "dark";


        applyTheme(newTheme);


        localStorage.setItem(
            "portfolio-theme",
            newTheme
        );

    }


    /* =====================================================
       6. INITIALIZE
    ===================================================== */

    function initializeTheme() {

        createThemeButton();


        const initialTheme =
            getInitialTheme();


        applyTheme(
            initialTheme
        );


        const button =
            document.querySelector(
                ".theme-toggle"
            );


        if (button) {

            button.addEventListener(
                "click",
                toggleTheme
            );

        }

    }


    /* =====================================================
       7. START AFTER DOM LOAD
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeTheme
        );

    } else {

        initializeTheme();

    }

})();
