/* =========================================================
   ABRAHAM ASHAGRE - PROFESSIONAL PORTFOLIO
   File: js/script.js
   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close menu when a navigation link is clicked */

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   2. ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-menu a");

function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition = window.scrollY + 150;


    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================================
   3. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
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


/*
   Add the reveal class to elements
*/

revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


/*
   Create Intersection Observer
*/

const revealObserver = new IntersectionObserver(

    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "reveal-visible"
                );

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


/*
   Observe all reveal elements
*/

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   4. SMOOTH SCROLLING
========================================================= */

const internalLinks = document.querySelectorAll(
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


        const targetElement =
            document.querySelector(targetId);


        if (targetElement) {

            event.preventDefault();

            const header =
                document.querySelector(".header");

            const headerHeight =
                header ? header.offsetHeight : 0;


            const targetPosition =
                targetElement.offsetTop -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }

    });

});


/* =========================================================
   5. CURRENT YEAR
========================================================= */

const footer = document.querySelector(".footer");

if (footer) {

    const currentYear =
        new Date().getFullYear();

    footer.innerHTML =
        footer.innerHTML.replace(
            "© 2026",
            "© " + currentYear
        );

}


/* =========================================================
   6. PROFILE IMAGE FALLBACK
========================================================= */

const profileImage =
    document.querySelector(
        ".profile-frame img"
    );


if (profileImage) {

    profileImage.addEventListener(
        "error",
        function () {

            console.log(
                "Profile image could not be loaded."
            );

        }
    );

}


/* =========================================================
   7. DOCUMENT LINK CHECK
========================================================= */

const documentLinks =
    document.querySelectorAll(
        '.document-btn[href$=".pdf"]'
    );


documentLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            console.log(
                "Opening document:",
                link.getAttribute("href")
            );

        }
    );

});


/* =========================================================
   8. PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
