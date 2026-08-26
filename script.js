/* ===============================
   TYPING EFFECT
================================ */

const typing =
    document.getElementById("typing");


const words = [

    "Java",
    "HTML",
    "MySQL",
    "Software "

];


let wordIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const word =
        words[wordIndex];


    if (!deleting) {

        typing.textContent =
            word.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex ===
            word.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1200
            );

            return;
        }

    } else {

        typing.textContent =
            word.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % words.length;
        }

    }


    setTimeout(

        typeEffect,

        deleting
            ? 45
            : 85

    );

}



/* ===============================
   LIVE UPDATES
================================ */

const updates = [

    {
        date: "AUG 2026",

        tag: "CERTIFICATION",

        title:
            "NPTEL Industrial IoT Completed",

        text:
            "Completed Introduction to Industry 4.0 Industrial IoT through NPTEL."
    },


   {
    date: "2026",
    tag: "CERTIFICATION",
    title: "CCNA 1 Completed",
    text: "Completed CCNA: Introduction to Networks through Cisco Networking Academy."
},

{
    date: "2026",
    tag: "CERTIFICATION",
    title: "CCNA 2 / SRWE Completed",
    text: "Completed Switching, Routing, and Wireless Essentials through Cisco Networking Academy."
},


    {
        date: "2026",

        tag: "INTERNSHIP",

        title:
            "Full Stack Java Internship Completed",

        text:
            "Completed a Full Stack Java Development internship at SCORWWO, Vijayawada."
    },


    {
        date: "2026",

        tag: "PROJECT",

        title:
            "Smart City Grievance System",

        text:
            "Built a PHP and MySQL based civic grievance management application."
    }

];


const updatesGrid =
    document.getElementById(
        "updatesGrid"
    );


function loadUpdates() {

    if (!updatesGrid) {

        return;
    }


    updatesGrid.innerHTML = "";


    updates.forEach(update => {


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "update-card";


        card.innerHTML = `

            <div class="update-top">

                <span class="update-tag">

                    ${update.tag}

                </span>


                <span class="update-date">

                    ${update.date}

                </span>

            </div>


            <h3>

                ${update.title}

            </h3>


            <p>

                ${update.text}

            </p>

        `;


        updatesGrid.appendChild(
            card
        );

    });

}



/* ===============================
   MOBILE MENU
================================ */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );


const navLinks =
    document.getElementById(
        "navLinks"
    );


menuBtn.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle(
            "open"
        );


        const icon =
            menuBtn.querySelector(
                "i"
            );


        icon.classList.toggle(
            "fa-bars"
        );


        icon.classList.toggle(
            "fa-xmark"
        );

    }
);



/* Close mobile menu */

document
    .querySelectorAll(
        ".nav-links a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "open"
                );


                const icon =
                    menuBtn.querySelector(
                        "i"
                    );


                icon.classList.add(
                    "fa-bars"
                );


                icon.classList.remove(
                    "fa-xmark"
                );

            }
        );

    });



/* ===============================
   HEADER + ACTIVE NAV
================================ */

const header =
    document.getElementById(
        "header"
    );


const topBtn =
    document.getElementById(
        "topBtn"
    );


window.addEventListener(
    "scroll",
    () => {


        /* Header */

        if (
            window.scrollY > 30
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }



        /* Back to top */

        if (
            window.scrollY > 500
        ) {

            topBtn.classList.add(
                "show"
            );

        } else {

            topBtn.classList.remove(
                "show"
            );

        }



        /* Active navigation */

        let current =
            "home";


        document
            .querySelectorAll(
                "section[id]"
            )
            .forEach(section => {


                const sectionTop =
                    section.offsetTop
                    - 150;


                if (
                    window.scrollY
                    >= sectionTop
                ) {

                    current =
                        section.id;

                }

            });



        document
            .querySelectorAll(
                ".nav-links a"
            )
            .forEach(link => {


                const target =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(

                    "active",

                    target ===
                    `#${current}`

                );

            });

    }
);



/* ===============================
   BACK TO TOP
================================ */

topBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* ===============================
   INITIALIZE
================================ */

loadUpdates();

typeEffect();