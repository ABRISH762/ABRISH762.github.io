/* =========================================================
   ABRAHAM ASHAGRE
   PROFESSIONAL PORTFOLIO
   THEME MANAGEMENT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle =
        document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }


    const icon =
        themeToggle.querySelector("i");


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "dark") {

        document.documentElement.classList.add("dark-mode");

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );

    }


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    themeToggle.addEventListener(
        "click",
        function () {

            const isDark =
                document.documentElement.classList.toggle(
                    "dark-mode"
                );


            if (isDark) {

                /* DARK MODE */

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );


                icon.classList.remove(
                    "fa-moon"
                );

                icon.classList.add(
                    "fa-sun"
                );


                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to light mode"
                );

            } else {

                /* LIGHT MODE */

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );


                icon.classList.remove(
                    "fa-sun"
                );

                icon.classList.add(
                    "fa-moon"
                );


                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to dark mode"
                );

            }

        }
    );

});
