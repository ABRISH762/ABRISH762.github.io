/* =========================================================
   ABRAHAM ASHAGRE
   PROFESSIONAL PORTFOLIO
   THEME / DISPLAY CONTROLLER
========================================================= */

"use strict";


/* =========================================================
   1. THEME CONFIGURATION
========================================================= */

const THEME_KEY =
    "abrahamPortfolioTheme";


const THEMES = {

    light: "light",

    dark: "dark"

};


/* =========================================================
   2. GET SAVED THEME
========================================================= */

function getSavedTheme() {

    try {

        const savedTheme =
            localStorage.getItem(THEME_KEY);

        if (
            savedTheme === THEMES.light ||
            savedTheme === THEMES.dark
        ) {

            return savedTheme;

        }

    } catch (error) {

        console.warn(
            "Theme preference could not be loaded.",
            error
        );

    }


    return getSystemTheme();

}


/* =========================================================
   3. SYSTEM THEME
========================================================= */

function getSystemTheme() {

    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    ) {

        return THEMES.dark;

    }


    return THEMES.light;

}


/* =========================================================
   4. APPLY THEME
========================================================= */

function applyTheme(theme) {

    if (
        theme !== THEMES.light &&
        theme !== THEMES.dark
    ) {

        theme = THEMES.light;

    }


    document.documentElement.setAttribute(
        "data-theme",
        theme
    );


    document.body.classList.toggle(
        "dark-mode",
        theme === THEMES.dark
    );


    updateThemeControls(theme);


    updateThemeColor(theme);

}


/* =========================================================
   5. SAVE THEME
========================================================= */

function saveTheme(theme) {

    try {

        localStorage.setItem(
            THEME_KEY,
            theme
        );

    } catch (error) {

        console.warn(
            "Theme preference could not be saved.",
            error
        );

    }

}


/* =========================================================
   6. UPDATE THEME CONTROLS
========================================================= */

function updateThemeControls(theme) {

    const themeButtons =
        document.querySelectorAll(
            "[data-theme-toggle]"
        );


    themeButtons.forEach(button => {

        const icon =
            button.querySelector("i");


        if (theme === THEMES.dark) {

            button.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            button.setAttribute(
                "title",
                "Switch to light mode"
            );


            if (icon) {

                icon.classList.remove(
                    "fa-moon"
                );

                icon.classList.add(
                    "fa-sun"
                );

            }

        } else {

            button.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            button.setAttribute(
                "title",
                "Switch to dark mode"
            );


            if (icon) {

                icon.classList.remove(
                    "fa-sun"
                );

                icon.classList.add(
                    "fa-moon"
                );

            }

        }

    });

}


/* =========================================================
   7. UPDATE BROWSER THEME COLOR
========================================================= */

function updateThemeColor(theme) {

    const themeColorMeta =
        document.querySelector(
            'meta[name="theme-color"]'
        );


    if (!themeColorMeta) {
        return;
    }


    if (theme === THEMES.dark) {

        themeColorMeta.setAttribute(
            "content",
            "#111827"
        );

    } else {

        themeColorMeta.setAttribute(
            "content",
            "#0d6efd"
        );

    }

}


/* =========================================================
   8. TOGGLE THEME
========================================================= */

function toggleTheme() {

    const currentTheme =
        document.documentElement.getAttribute(
            "data-theme"
        ) || THEMES.light;


    const newTheme =
        currentTheme === THEMES.dark
            ? THEMES.light
            : THEMES.dark;


    applyTheme(newTheme);

    saveTheme(newTheme);

}


/* =========================================================
   9. INITIALIZE THEME BUTTONS
========================================================= */

function initializeThemeButtons() {

    const themeButtons =
        document.querySelectorAll(
            "[data-theme-toggle]"
        );


    if (!themeButtons.length) {
        return;
    }


    themeButtons.forEach(button => {

        button.addEventListener(
            "click",
            toggleTheme
        );

    });

}


/* =========================================================
   10. SYSTEM THEME CHANGES
========================================================= */

function initializeSystemThemeListener() {

    if (!window.matchMedia) {
        return;
    }


    const mediaQuery =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    const handleSystemThemeChange =
        event => {

            /*
             * Only follow the operating-system theme
             * when the visitor has not manually selected
             * a preference.
             */

            let manuallySaved = false;


            try {

                manuallySaved =
                    localStorage.getItem(
                        THEME_KEY
                    ) !== null;

            } catch (error) {

                manuallySaved = false;

            }


            if (manuallySaved) {
                return;
            }


            applyTheme(
                event.matches
                    ? THEMES.dark
                    : THEMES.light
            );

        };


    if (
        typeof mediaQuery.addEventListener ===
        "function"
    ) {

        mediaQuery.addEventListener(
            "change",
            handleSystemThemeChange
        );

    } else if (
        typeof mediaQuery.addListener ===
        "function"
    ) {

        mediaQuery.addListener(
            handleSystemThemeChange
        );

    }

}


/* =========================================================
   11. INITIALIZE
========================================================= */

function initializeTheme() {

    const savedTheme =
        getSavedTheme();


    applyTheme(savedTheme);

    initializeThemeButtons();

    initializeSystemThemeListener();

}


/* =========================================================
   12. START
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTheme
    );

} else {

    initializeTheme();

}


/* =========================================================
   END OF THEME.JS
========================================================= */
