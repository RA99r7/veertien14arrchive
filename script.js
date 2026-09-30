/* =====================================================
   VEERTIEN14ARRCHIVE - FINAL SCRIPT
===================================================== */


/* =====================================================
   MUSIC PLAYER
===================================================== */

function playMusic(id, button) {

    const audio = document.getElementById(id);

    if (!audio) {
        console.error("Audio tidak ditemukan:", id);
        return;
    }

    const allAudio = document.querySelectorAll("audio");
    const allButtons = document.querySelectorAll(".play-btn");


    /* Hentikan lagu lain */

    allAudio.forEach(function (item) {

        if (item !== audio) {
            item.pause();
            item.currentTime = 0;
        }

    });


    /* Reset tombol lain */

    allButtons.forEach(function (item) {

        if (item !== button) {
            item.innerHTML = "▶ Play";
            item.classList.remove("playing");
        }

    });


    /* Play / Pause */

    if (audio.paused) {

        audio.play()
            .then(function () {

                button.innerHTML = "⏸ Pause";
                button.classList.add("playing");

            })
            .catch(function (error) {

                console.error(
                    "Gagal memutar lagu:",
                    error
                );

                button.innerHTML = "▶ Play";
                button.classList.remove("playing");

                alert(
                    "Lagu tidak dapat diputar.\n\n" +
                    "Periksa nama file dan lokasi lagu."
                );

            });

    } else {

        audio.pause();

        button.innerHTML = "▶ Play";
        button.classList.remove("playing");

    }


    /* Saat lagu selesai */

    audio.onended = function () {

        button.innerHTML = "▶ Play";
        button.classList.remove("playing");

    };


    /* Jika file audio error */

    audio.onerror = function () {

        console.error(
            "File audio bermasalah:",
            audio.src
        );

    };

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const navMenu =
        document.querySelector(".nav-menu");

    if (!navMenu) return;

    navMenu.classList.toggle("show");

}


/* Tutup menu ketika klik link */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navMenu =
            document.querySelector(".nav-menu");

        const navLinks =
            document.querySelectorAll(".nav-menu a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (navMenu) {
                        navMenu.classList.remove("show");
                    }

                }
            );

        });

    }
);


/* =====================================================
   THEME SELECTOR
===================================================== */

function toggleTheme() {

    const menu =
        document.getElementById("theme-menu");

    if (!menu) return;

    menu.classList.toggle("show");

}


function setTheme(theme) {

    const themes = [
        "theme-black",
        "theme-white",
        "theme-midnight",
        "theme-sunset"
    ];


    /* Hapus tema lama */

    document.body.classList.remove(...themes);


    /* Cek tema */

    const allowedThemes = [
        "black",
        "white",
        "midnight",
        "sunset"
    ];


    if (!allowedThemes.includes(theme)) {
        theme = "black";
    }


    /* Tambahkan tema baru */

    document.body.classList.add(
        "theme-" + theme
    );


    /* Simpan */

    localStorage.setItem(
        "veertienTheme",
        theme
    );


    /* Tutup menu */

    const menu =
        document.getElementById("theme-menu");

    if (menu) {
        menu.classList.remove("show");
    }

}


/* Load theme */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("veertienTheme") ||
        "black";

    setTheme(savedTheme);

}


/* Tutup theme menu jika klik di luar */

document.addEventListener(
    "click",
    function (event) {

        const selector =
            document.querySelector(".theme-selector");

        const menu =
            document.getElementById("theme-menu");


        if (
            selector &&
            menu &&
            !selector.contains(event.target)
        ) {

            menu.classList.remove("show");

        }

    }
);


/* =====================================================
   MOMENT LIGHTBOX
===================================================== */

let currentPhoto = 0;
let photos = [];


function openLightbox(
    index,
    image,
    caption
) {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) return;


    const cards =
        document.querySelectorAll(".moment-card");


    photos = [];


    cards.forEach(function (card) {

        const img =
            card.querySelector("img");

        if (!img) return;


        const title =
            card.querySelector("span");


        photos.push({

            image: img.src,

            caption:
                title
                    ? title.innerText
                    : ""

        });

    });


    if (photos.length === 0) return;


    currentPhoto = index;


    if (
        currentPhoto < 0 ||
        currentPhoto >= photos.length
    ) {
        currentPhoto = 0;
    }


    showPhoto();


    lightbox.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function showPhoto() {

    if (photos.length === 0) return;


    const image =
        document.getElementById(
            "lightbox-image"
        );

    const caption =
        document.getElementById(
            "lightbox-caption"
        );


    if (!image) return;


    image.src =
        photos[currentPhoto].image;


    if (caption) {

        caption.innerText =
            photos[currentPhoto].caption;

    }

}


function changePhoto(direction) {

    if (photos.length === 0) return;


    currentPhoto += direction;


    if (
        currentPhoto >= photos.length
    ) {
        currentPhoto = 0;
    }


    if (currentPhoto < 0) {
        currentPhoto =
            photos.length - 1;
    }


    showPhoto();

}


function closeLightbox() {

    const lightbox =
        document.getElementById("lightbox");


    if (!lightbox) return;


    lightbox.classList.remove("show");

    document.body.style.overflow =
        "";

}


/* =====================================================
   MEMBER LIGHTBOX
===================================================== */

function openMemberLightbox(
    image,
    name,
    number
) {

    const lightbox =
        document.getElementById(
            "member-lightbox"
        );

    const imageElement =
        document.getElementById(
            "member-lightbox-image"
        );

    const nameElement =
        document.getElementById(
            "member-lightbox-name"
        );

    const numberElement =
        document.getElementById(
            "member-lightbox-number"
        );


    if (
        !lightbox ||
        !imageElement
    ) {
        console.error(
            "Member lightbox tidak ditemukan."
        );

        return;
    }


    imageElement.src = image;


    if (nameElement) {
        nameElement.innerText =
            name;
    }


    if (numberElement) {
        numberElement.innerText =
            number || "";
    }


    lightbox.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeMemberLightbox() {

    const lightbox =
        document.getElementById(
            "member-lightbox"
        );


    if (!lightbox) return;


    lightbox.classList.remove("show");

    document.body.style.overflow =
        "";

}


/* =====================================================
   LIGHTBOX CLICK
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const momentLightbox =
            document.getElementById(
                "lightbox"
            );

        const memberLightbox =
            document.getElementById(
                "member-lightbox"
            );


        if (
            momentLightbox &&
            event.target === momentLightbox
        ) {

            closeLightbox();

        }


        if (
            memberLightbox &&
            event.target === memberLightbox
        ) {

            closeMemberLightbox();

        }

    }
);


/* =====================================================
   LOADING SCREEN
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loader =
            document.getElementById(
                "loading-screen"
            );


        if (!loader) return;


        setTimeout(
            function () {

                loader.classList.add(
                    "hide"
                );

            },
            800
        );

    }
);


/* =====================================================
   GUESTBOOK
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "guestbook-form"
            );

        const container =
            document.getElementById(
                "messages-container"
            );


        if (!form || !container) {
            return;
        }


        function getMessages() {

            try {

                return JSON.parse(
                    localStorage.getItem(
                        "veertienMessages"
                    )
                ) || [];

            } catch (error) {

                console.error(
                    "Data guestbook rusak:",
                    error
                );

                return [];

            }

        }


        function showMessages() {

            const messages =
                getMessages();


            container.innerHTML = "";


            if (
                messages.length === 0
            ) {

                container.innerHTML =
                    "<p>Tuliskan pesan pertama!</p>";

                return;

            }


            messages.forEach(
                function (message) {

                    const div =
                        document.createElement(
                            "div"
                        );


                    div.className =
                        "guest-message";


                    div.innerHTML = `

                        <strong>
                            ${escapeHTML(
                                message.name
                            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                                message.text
                            )}
                        </p>

                        <span class="guest-date">
                            ${escapeHTML(
                                message.date
                            )}
                        </span>

                    `;


                    container.appendChild(
                        div
                    );

                }
            );

        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "guest-name"
                    );

                const messageInput =
                    document.getElementById(
                        "guest-message"
                    );


                if (
                    !nameInput ||
                    !messageInput
                ) {
                    return;
                }


                const name =
                    nameInput.value.trim();

                const message =
                    messageInput.value.trim();


                if (
                    !name ||
                    !message
                ) {
                    return;
                }


                const messages =
                    getMessages();


                messages.unshift({

                    name: name,

                    text: message,

                    date:
                        new Date()
                        .toLocaleString(
                            "id-ID"
                        )

                });


                localStorage.setItem(

                    "veertienMessages",

                    JSON.stringify(
                        messages
                    )

                );


                form.reset();

                showMessages();

            }
        );


        showMessages();

    }
);


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =====================================================
   SLIDESHOW
===================================================== */

let currentSlide = 0;


function showSlide(index) {

    const slides =
        document.querySelectorAll(
            ".slide"
        );

    const dots =
        document.querySelectorAll(
            ".dot"
        );


    if (slides.length === 0) {
        return;
    }


    if (
        index >= slides.length
    ) {

        currentSlide = 0;

    } else if (
        index < 0
    ) {

        currentSlide =
            slides.length - 1;

    } else {

        currentSlide = index;

    }


    slides.forEach(
        function (slide) {

            slide.classList.remove(
                "active"
            );

        }
    );


    dots.forEach(
        function (dot) {

            dot.classList.remove(
                "active"
            );

        }
    );


    slides[
        currentSlide
    ].classList.add("active");


    if (dots[currentSlide]) {

        dots[
            currentSlide
        ].classList.add("active");

    }

}


function changeSlide(direction) {

    showSlide(
        currentSlide + direction
    );

}


/* Hanya jalankan slideshow jika ada */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const slides =
            document.querySelectorAll(
                ".slide"
            );


        if (slides.length === 0) {
            return;
        }


        showSlide(0);


        setInterval(
            function () {

                showSlide(
                    currentSlide + 1
                );

            },
            5000
        );

    }
);


/* =====================================================
   PARTICLE BACKGROUND
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const particleCanvas =
            document.getElementById(
                "particle-canvas"
            );


        if (!particleCanvas) {
            return;
        }


        const particleCtx =
            particleCanvas.getContext(
                "2d"
            );


        let particles = [];


        const mouse = {

            x: null,

            y: null

        };


        function resizeParticleCanvas() {

            particleCanvas.width =
                window.innerWidth;

            particleCanvas.height =
                window.innerHeight;

        }


        resizeParticleCanvas();


        window.addEventListener(
            "resize",
            resizeParticleCanvas
        );


        window.addEventListener(
            "mousemove",
            function (event) {

                mouse.x =
                    event.clientX;

                mouse.y =
                    event.clientY;

            }
        );


        window.addEventListener(
            "mouseout",
            function () {

                mouse.x = null;
                mouse.y = null;

            }
        );


        class Particle {

            constructor() {

                this.x =
                    Math.random() *
                    particleCanvas.width;

                this.y =
                    Math.random() *
                    particleCanvas.height;


                this.size =
                    Math.random() * 2 + 1;


                this.speedX =
                    (Math.random() - 0.5) *
                    0.5;


                this.speedY =
                    (Math.random() - 0.5) *
                    0.5;

            }


            update() {

                this.x +=
                    this.speedX;

                this.y +=
                    this.speedY;


                if (
                    this.x < 0 ||
                    this.x >
                    particleCanvas.width
                ) {

                    this.speedX *= -1;

                }


                if (
                    this.y < 0 ||
                    this.y >
                    particleCanvas.height
                ) {

                    this.speedY *= -1;

                }


                if (
                    mouse.x !== null &&
                    mouse.y !== null
                ) {

                    const dx =
                        mouse.x - this.x;

                    const dy =
                        mouse.y - this.y;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance < 120
                    ) {

                        this.x -=
                            dx / 40;

                        this.y -=
                            dy / 40;

                    }

                }

            }


            draw() {

                particleCtx.beginPath();


                particleCtx.arc(

                    this.x,

                    this.y,

                    this.size,

                    0,

                    Math.PI * 2

                );


                particleCtx.fillStyle =
                    "#ffffff";


                particleCtx.globalAlpha =
                    0.5;


                particleCtx.fill();


                particleCtx.globalAlpha =
                    1;

            }

        }


        function createParticles() {

            particles = [];


            const amount =
                window.innerWidth < 768
                    ? 40
                    : 80;


            for (
                let i = 0;
                i < amount;
                i++
            ) {

                particles.push(
                    new Particle()
                );

            }

        }


        createParticles();


        window.addEventListener(
            "resize",
            createParticles
        );


        function connectParticles() {

            for (
                let a = 0;
                a < particles.length;
                a++
            ) {

                for (
                    let b = a + 1;
                    b < particles.length;
                    b++
                ) {

                    const dx =
                        particles[a].x -
                        particles[b].x;


                    const dy =
                        particles[a].y -
                        particles[b].y;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance < 100
                    ) {

                        particleCtx.strokeStyle =
                            "#ffffff";


                        particleCtx.globalAlpha =
                            1 -
                            distance / 100;


                        particleCtx.lineWidth =
                            0.5;


                        particleCtx.beginPath();


                        particleCtx.moveTo(

                            particles[a].x,

                            particles[a].y

                        );


                        particleCtx.lineTo(

                            particles[b].x,

                            particles[b].y

                        );


                        particleCtx.stroke();


                        particleCtx.globalAlpha =
                            1;

                    }

                }

            }

        }


        function animateParticles() {

            particleCtx.clearRect(

                0,

                0,

                particleCanvas.width,

                particleCanvas.height

            );


            particles.forEach(
                function (particle) {

                    particle.update();

                    particle.draw();

                }
            );


            connectParticles();


            requestAnimationFrame(
                animateParticles
            );

        }


        animateParticles();

    }
);


/* =====================================================
   KEYBOARD SHORTCUT
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        const tag =
            event.target.tagName
                .toLowerCase();


        /* Jangan jalankan shortcut
           saat mengetik */

        if (
            tag === "input" ||
            tag === "textarea" ||
            tag === "select"
        ) {

            return;

        }


        /* ESC */

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

            closeMemberLightbox();

            return;

        }


        /* MOMENT LIGHTBOX */

        const momentLightbox =
            document.getElementById(
                "lightbox"
            );


        if (
            momentLightbox &&
            momentLightbox.classList.contains(
                "show"
            )
        ) {

            if (
                event.key === "ArrowRight"
            ) {

                changePhoto(1);

                return;

            }


            if (
                event.key === "ArrowLeft"
            ) {

                changePhoto(-1);

                return;

            }

        }


        /* SPACE = MUSIC */

        if (
            event.code === "Space"
        ) {

            event.preventDefault();


            const playing =
                document.querySelector(
                    "audio:not(:paused)"
                );


            if (playing) {

                const button =
                    document.querySelector(
                        ".play-btn.playing"
                    );


                playing.pause();


                if (button) {

                    button.innerHTML =
                        "▶ Play";

                    button.classList.remove(
                        "playing"
                    );

                }

            }

        }

    }
);