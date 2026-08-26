/* =========================================================
   ABRAHAM ASHAGRE
   PROFESSIONAL PORTFOLIO
   PROGRESSIVE WEB APP SERVICE WORKER
========================================================= */

"use strict";


/* =========================================================
   1. CACHE CONFIGURATION
========================================================= */

const CACHE_NAME =
    "abraham-ashagre-portfolio-v1";


/* =========================================================
   2. CORE FILES
========================================================= */

const CORE_FILES = [

    "./",

    "./index.html",

    "./manifest.json",

    "./styles/style.css",

    "./scripts/script.js",

    "./scripts/theme.js",

    "./assets/images/favicon.png",

    "./assets/images/profile.jpg"

];


/* =========================================================
   3. INSTALL EVENT
========================================================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)

                .then(cache => {

                    return cache.addAll(
                        CORE_FILES
                    );

                })

                .then(() => {

                    return self.skipWaiting();

                })

        );

    }
);


/* =========================================================
   4. ACTIVATE EVENT
========================================================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()

                .then(cacheNames => {

                    return Promise.all(

                        cacheNames.map(
                            cacheName => {

                                if (
                                    cacheName !==
                                    CACHE_NAME
                                ) {

                                    return caches.delete(
                                        cacheName
                                    );

                                }

                                return null;

                            }
                        )

                    );

                })

                .then(() => {

                    return self.clients.claim();

                })

        );

    }
);


/* =========================================================
   5. FETCH EVENT
========================================================= */

self.addEventListener(
    "fetch",
    event => {

        /*
         * Only handle normal GET requests.
         */

        if (
            event.request.method !==
            "GET"
        ) {

            return;

        }


        /*
         * Do not interfere with external
         * resources such as LinkedIn,
         * Font Awesome CDN, etc.
         */

        const requestURL =
            new URL(
                event.request.url
            );


        if (
            requestURL.origin !==
            self.location.origin
        ) {

            return;

        }


        event.respondWith(

            caches.match(
                event.request
            )

            .then(cachedResponse => {

                /*
                 * Return cached version
                 * when available.
                 */

                if (cachedResponse) {

                    return cachedResponse;

                }


                /*
                 * Otherwise request it
                 * from the network.
                 */

                return fetch(
                    event.request
                )

                .then(networkResponse => {

                    /*
                     * Store successful
                     * responses in cache.
                     */

                    if (
                        networkResponse &&
                        networkResponse.status === 200 &&
                        networkResponse.type === "basic"
                    ) {

                        const responseClone =
                            networkResponse.clone();


                        caches.open(
                            CACHE_NAME
                        )

                        .then(cache => {

                            cache.put(
                                event.request,
                                responseClone
                            );

                        });

                    }


                    return networkResponse;

                })

                .catch(() => {

                    /*
                     * Offline fallback.
                     */

                    if (
                        event.request.mode ===
                        "navigate"
                    ) {

                        return caches.match(
                            "./index.html"
                        );

                    }

                });

            })

        );

    }
);


/* =========================================================
   6. MESSAGE HANDLER
========================================================= */

self.addEventListener(
    "message",
    event => {

        if (
            event.data &&
            event.data.action ===
                "skipWaiting"
        ) {

            self.skipWaiting();

        }

    }
);


/* =========================================================
   END OF SERVICE WORKER
========================================================= */
