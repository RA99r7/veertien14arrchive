/* =========================
   MUSIC PLAYER
========================= */

function playMusic(id, button) {

    const audio = document.getElementById(id);

    if (!audio) {
        console.error("Audio dengan ID '" + id + "' tidak ditemukan.");
        return;
    }

    const allAudio = document.querySelectorAll("audio");

    allAudio.forEach(function (item) {

        if (item !== audio) {
            item.pause();
            item.currentTime = 0;
        }

    });


    const allButtons = document.querySelectorAll(".play-btn");

    allButtons.forEach(function (item) {

        if (item !== button) {
            item.innerHTML = "▶ Play";
            item.classList.remove("playing");
        }

    });


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

            });

    } else {

        audio.pause();

        button.innerHTML = "▶ Play";
        button.classList.remove("playing");

    }


    audio.onended = function () {

        button.innerHTML = "▶ Play";
        button.classList.remove("playing");

    };

}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const navMenu =
        document.querySelector(".nav-menu");

    if (navMenu) {
        navMenu.classList.toggle("show");
    }

}


/* =========================
   DARK / LIGHT MODE
========================= */

function toggleTheme() {

    const body = document.body;
    const button =
        document.querySelector(".theme-toggle");

    body.classList.toggle("light-mode");


    if (body.classList.contains("light-mode")) {

        localStorage.setItem("theme", "light");

        if (button) {
            button.innerHTML = "🌙";
        }

    } else {

        localStorage.setItem("theme", "dark");

        if (button) {
            button.innerHTML = "☀️";
        }

    }

}


/* =========================
   LOAD THEME
========================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    const button =
        document.querySelector(".theme-toggle");


    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        if (button) {
            button.innerHTML = "🌙";
        }

    } else {

        document.body.classList.remove("light-mode");

        if (button) {
            button.innerHTML = "☀️";
        }

    }

}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTheme();


        /* CLOSE MOBILE MENU */

        const navLinks =
            document.querySelectorAll(".nav-menu a");

        const navMenu =
            document.querySelector(".nav-menu");


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

/* =========================
   LIGHTBOX
========================= */

let currentPhoto = 0;

let photos = [];


/* BUKA LIGHTBOX */

function openLightbox(index, image, caption) {

    currentPhoto = index;

    photos = [];

    const cards =
        document.querySelectorAll(".moment-card");

    cards.forEach(function (card) {

        const img =
            card.querySelector("img");

        const title =
            card.querySelector("span");

        if (img) {

            photos.push({
                image: img.src,
                caption: title
                    ? title.innerText
                    : ""
            });

        }

    });


    showPhoto();

    document
        .getElementById("lightbox")
        .classList.add("show");

    document.body.style.overflow = "hidden";
}


/* TAMPILKAN FOTO */

function showPhoto() {

    if (photos.length === 0) {
        return;
    }


    const image =
        document.getElementById("lightbox-image");

    const caption =
        document.getElementById("lightbox-caption");


    image.src =
        photos[currentPhoto].image;

    caption.innerText =
        photos[currentPhoto].caption;

}


/* FOTO BERIKUT / SEBELUMNYA */

function changePhoto(direction) {

    currentPhoto += direction;


    if (currentPhoto >= photos.length) {
        currentPhoto = 0;
    }


    if (currentPhoto < 0) {
        currentPhoto = photos.length - 1;
    }


    showPhoto();

}


/* TUTUP */

function closeLightbox() {

    document
        .getElementById("lightbox")
        .classList.remove("show");

    document.body.style.overflow = "auto";

}


/* KLIK AREA GELAP UNTUK MENUTUP */

document.addEventListener(
    "click",
    function (event) {

        const lightbox =
            document.getElementById("lightbox");

        if (
            event.target === lightbox
        ) {
            closeLightbox();
        }

    }
);


/* KEYBOARD */

document.addEventListener(
    "keydown",
    function (event) {

        const lightbox =
            document.getElementById("lightbox");

        if (
            !lightbox ||
            !lightbox.classList.contains("show")
        ) {
            return;
        }


        if (event.key === "ArrowRight") {
            changePhoto(1);
        }


        if (event.key === "ArrowLeft") {
            changePhoto(-1);
        }


        if (event.key === "Escape") {
            closeLightbox();
        }

    }
);

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loading-screen");

    if (loader) {
        setTimeout(function () {
            loader.classList.add("hide");
        }, 1200);
    }
});

/* =========================
   GUESTBOOK
========================= */

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


        function showMessages() {

            const messages =
                JSON.parse(
                    localStorage.getItem(
                        "veertienMessages"
                    )
                ) || [];


            container.innerHTML = "";


            if (messages.length === 0) {

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
                            ${escapeHTML(message.name)}
                        </strong>

                        <p>
                            ${escapeHTML(message.text)}
                        </p>

                        <span class="guest-date">
                            ${escapeHTML(message.date)}
                        </span>
                    `;


                    container.appendChild(div);

                }
            );

        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "guest-name"
                    ).value.trim();


                const message =
                    document.getElementById(
                        "guest-message"
                    ).value.trim();


                if (!name || !message) {
                    return;
                }


                const messages =
                    JSON.parse(
                        localStorage.getItem(
                            "veertienMessages"
                        )
                    ) || [];


                messages.unshift({

                    name: name,

                    text: message,

                    date:
                        new Date()
                        .toLocaleDateString(
                            "id-ID"
                        )

                });


                localStorage.setItem(
                    "veertienMessages",
                    JSON.stringify(messages)
                );


                form.reset();

                showMessages();

            }
        );


        showMessages();

    }
);


/* AMANKAN TEKS PENGUNJUNG */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

let currentSlide = 0;

function showSlide(index) {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (slides.length === 0) return;

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

setInterval(function () {
    showSlide(currentSlide + 1);
}, 5000);

const particleCanvas = document.getElementById("particle-canvas");

if (particleCanvas) {

    const particleCtx = particleCanvas.getContext("2d");

    let particles = [];
    let mouse = {
        x: null,
        y: null
    };

    function resizeParticleCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }

    resizeParticleCanvas();

    window.addEventListener("resize", resizeParticleCanvas);

    window.addEventListener("mousemove", function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener("mouseout", function () {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {

        constructor() {

            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;

            this.size = Math.random() * 2 + 1;

            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > particleCanvas.width) {
                this.speedX *= -1;
            }

            if (this.y < 0 || this.y > particleCanvas.height) {
                this.speedY *= -1;
            }

            if (mouse.x !== null && mouse.y !== null) {

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < 120) {

                    this.x -= dx / 40;
                    this.y -= dy / 40;
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

            particleCtx.fillStyle = "#ffffff";

            particleCtx.globalAlpha = 0.5;

            particleCtx.fill();

            particleCtx.globalAlpha = 1;
        }
    }

    function createParticles() {

        particles = [];

        const amount =
            window.innerWidth < 768 ? 40 : 80;

        for (let i = 0; i < amount; i++) {
            particles.push(new Particle());
        }
    }

    createParticles();

    window.addEventListener("resize", createParticles);

    function connectParticles() {

        for (let a = 0; a < particles.length; a++) {

            for (let b = a + 1; b < particles.length; b++) {

                const dx =
                    particles[a].x - particles[b].x;

                const dy =
                    particles[a].y - particles[b].y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {

                    particleCtx.strokeStyle = "#ffffff";

                    particleCtx.globalAlpha =
                        1 - distance / 100;

                    particleCtx.lineWidth = 0.5;

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

                    particleCtx.globalAlpha = 1;
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

        particles.forEach(function (particle) {
            particle.update();
            particle.draw();
        });

        connectParticles();

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

function openMemberLightbox(image, name, number) {

    const lightbox =
        document.getElementById("member-lightbox");

    const imageElement =
        document.getElementById("member-lightbox-image");

    const nameElement =
        document.getElementById("member-lightbox-name");

    const numberElement =
        document.getElementById("member-lightbox-number");

    if (!lightbox) return;

    imageElement.src = image;
    nameElement.innerText = name;
    numberElement.innerText = number;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";
}

function closeMemberLightbox() {

    const lightbox =
        document.getElementById("member-lightbox");

    if (!lightbox) return;

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";
}

document.addEventListener("click", function(event) {

    const lightbox =
        document.getElementById("member-lightbox");

    if (lightbox && event.target === lightbox) {
        closeMemberLightbox();
    }

});

document.addEventListener("keydown", function(event) {

    // ESC = tutup lightbox
    if (event.key === "Escape") {

        closeLightbox();
        closeMemberLightbox();

        return;
    }


    // Jika sedang mengetik di input,
    // shortcut tidak dijalankan
    const tag = event.target.tagName.toLowerCase();

    if (
        tag === "input" ||
        tag === "textarea"
    ) {
        return;
    }


    // SPACE = play / pause musik
    if (event.code === "Space") {

        event.preventDefault();

        if (typeof toggleGlobalMusic === "function") {
            toggleGlobalMusic();
        }

        return;
    }


    // → = lagu berikutnya
    if (event.key === "ArrowRight") {

        if (typeof nextSong === "function") {
            nextSong();
        }

        return;
    }


    // ← = lagu sebelumnya
    if (event.key === "ArrowLeft") {

        if (typeof previousSong === "function") {
            previousSong();
        }

        return;
    }

});

/* =========================
   THEME SELECTOR
========================= */

function toggleTheme() {
    const menu = document.getElementById("theme-menu");

    if (menu) {
        menu.classList.toggle("show");
    }
}

function setTheme(theme) {

    document.body.classList.remove(
        "theme-black",
        "theme-white",
        "theme-midnight",
        "theme-sunset"
    );

    document.body.classList.add("theme-" + theme);

    localStorage.setItem("veertienTheme", theme);

    const menu = document.getElementById("theme-menu");

    if (menu) {
        menu.classList.remove("show");
    }
}

function loadTheme() {

    const savedTheme =
        localStorage.getItem("veertienTheme") || "black";

    setTheme(savedTheme);
}

document.addEventListener("click", function(event) {

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
});

loadTheme();