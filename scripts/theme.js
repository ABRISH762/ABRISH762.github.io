"use strict";

/* =========================================================
   ABRISH762.github.io
   Dark / Light Theme Manager
========================================================= */

(function () {

    const STORAGE_KEY = "abraham-portfolio-theme";

    const DARK_THEME = "dark";
    const LIGHT_THEME = "light";


    /* =====================================================
       GET SAVED THEME
    ===================================================== */

    function getSavedTheme() {

        const savedTheme =
            localStorage.getItem(STORAGE_KEY);

        if (
            savedTheme === DARK_THEME ||
            savedTheme === LIGHT_THEME
        ) {

            return savedTheme;

        }

        return null;

    }


    /* =====================================================
       GET SYSTEM THEME
    ===================================================== */

    function getSystemTheme() {

        if (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
        ) {

            return DARK_THEME;

        }

        return LIGHT_THEME;

    }


    /* =====================================================
       APPLY THEME
    ===================================================== */

    function applyTheme(theme) {

        const isDark =
            theme === DARK_THEME;


        document.documentElement
            .classList
            .toggle(
                "dark-mode",
                isDark
            );


        document.body.classList.toggle(
            "dark-mode",
            isDark
        );


        updateThemeButton(isDark);

    }


    /* =====================================================
       UPDATE THEME BUTTON
    ===================================================== */

    function updateThemeButton(isDark) {

        const buttons =
            document.querySelectorAll(
                ".theme-toggle"
            );


        buttons.forEach(button => {

            const icon =
                button.querySelector("i");


            if (isDark) {

                if (icon) {

                    icon.classList.remove(
                        "fa-moon"
                    );

                    icon.classList.add(
                        "fa-sun"
                    );

                }


                button.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );


                button.setAttribute(
                    "title",
                    "Switch to light mode"
                );

            } else {

                if (icon) {

                    icon.classList.remove(
                        "fa-sun"
                    );

                    icon.classList.add(
                        "fa-moon"
                    );

                }


                button.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );


                button.setAttribute(
                    "title",
                    "Switch to dark mode"
                );

            }

        });

    }


    /* =====================================================
       SAVE THEME
    ===================================================== */

    function saveTheme(theme) {

        localStorage.setItem(
            STORAGE_KEY,
            theme
        );

    }


    /* =====================================================
       TOGGLE THEME
    ===================================================== */

    function toggleTheme() {

        const isDark =
            document.documentElement
                .classList
                .contains("dark-mode");


        const newTheme =
            isDark
                ? LIGHT_THEME
                : DARK_THEME;


        saveTheme(newTheme);

        applyTheme(newTheme);

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initializeTheme() {

        const savedTheme =
            getSavedTheme();


        const initialTheme =
            savedTheme ||
            getSystemTheme();


        applyTheme(initialTheme);

    }


    /* =====================================================
       THEME BUTTON EVENTS
    ===================================================== */

    function initializeButtons() {

        const buttons =
            document.querySelectorAll(
                ".theme-toggle"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                toggleTheme
            );

        });

    }


    /* =====================================================
       SYSTEM THEME CHANGES
    ===================================================== */

    function watchSystemTheme() {

        if (
            !window.matchMedia
        ) {

            return;

        }


        const mediaQuery =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            );


        mediaQuery.addEventListener(
            "change",
            event => {

                /*
                   Only follow the system if the
                   visitor has not manually selected
                   a theme.
                */

                const savedTheme =
                    getSavedTheme();


                if (savedTheme) {

                    return;

                }


                applyTheme(
                    event.matches
                        ? DARK_THEME
                        : LIGHT_THEME
                );

            }
        );

    }


    /* =====================================================
       PREVENT FLASHING WHEN PAGE LOADS
    ===================================================== */

    initializeTheme();


    /* =====================================================
       DOM READY
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            () => {

                initializeButtons();

                updateThemeButton(
                    document.documentElement
                        .classList
                        .contains("dark-mode")
                );

            }
        );

    } else {

        initializeButtons();

    }


    /* =====================================================
       WATCH SYSTEM SETTINGS
    ===================================================== */

    watchSystemTheme();


})();
