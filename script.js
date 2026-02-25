/**
 * KHAKI FM - Core Website Logic 2026
 * Author: Amit Bharti
 */

let globalAudio = null;
let activePlayer = null;

document.addEventListener('DOMContentLoaded', () => {

    globalAudio = document.getElementById("globalAudio");

    // ==============================
    // STOP AUDIO WHEN CAROUSEL CHANGES
    // ==============================
    const carousel = document.getElementById('audioCarousel');

    if (carousel) {
        carousel.addEventListener('slide.bs.carousel', function () {
            if (globalAudio) {
                globalAudio.pause();
                resetActivePlayer();
            }
        });
    }

    // ==============================
    // HERO + VIDEO CAROUSEL INIT
    // ==============================
    if (document.querySelector('#heroCarousel')) {
        new bootstrap.Carousel('#heroCarousel', {
            interval: 5000,
            ride: 'carousel',
            pause: 'hover'
        });
    }

    if (document.querySelector('#videoAutoSlider')) {
        new bootstrap.Carousel('#videoAutoSlider', {
            interval: 4000,
            ride: 'carousel',
            wrap: true
        });
    }

    // ==============================
    // NAVBAR SCROLL EFFECT
    // ==============================
    const nav = document.getElementById('mainNavbar');

    window.addEventListener('scroll', () => {
        if (!nav) return;

        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

});



// ======================================
// PLAY EPISODE FUNCTION (PER SLIDE)
// ======================================

function playEpisode(src, title, btn) {

    if (!globalAudio) return;

    const player = btn.closest(".player-interface");

    const progressBar = player.querySelector(".progressBar");
    const currentTimeEl = player.querySelector(".currentTime");
    const durationEl = player.querySelector(".duration");

    // Pause if same audio clicked
    if (globalAudio.src.includes(src) && !globalAudio.paused) {
        globalAudio.pause();
        btn.innerText = "▶";
        return;
    }

    resetActivePlayer();

    globalAudio.src = src;
    globalAudio.play();

    btn.innerText = "⏸";
    activePlayer = player;

    globalAudio.onloadedmetadata = function () {
        durationEl.textContent = formatTime(globalAudio.duration);
    };

    globalAudio.ontimeupdate = function () {
        if (!globalAudio.duration) return;

        const percent = (globalAudio.currentTime / globalAudio.duration) * 100;
        progressBar.style.width = percent + "%";

        currentTimeEl.textContent = formatTime(globalAudio.currentTime);
    };

    globalAudio.onended = function () {
        btn.innerText = "▶";
        progressBar.style.width = "0%";
    };

    document.title = "Playing: " + title + " | Khaki FM";
}


// ======================================
// RESET PREVIOUS PLAYER
// ======================================

function resetActivePlayer() {

    document.querySelectorAll(".play-btn").forEach(btn => {
        btn.innerText = "▶";
    });

    if (activePlayer) {
        const bar = activePlayer.querySelector(".progressBar");
        if (bar) bar.style.width = "0%";
    }
}


// ======================================
// SEEK FUNCTION
// ======================================

function seek(e) {

    if (!globalAudio || !globalAudio.duration) return;

    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;

    globalAudio.currentTime = (clickX / width) * globalAudio.duration;
}


// ======================================
// FORMAT TIME
// ======================================

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

// ==============================
// FOOTER SCROLL REVEAL FIX
// ==============================

const revealElements = document.querySelectorAll('.footer-animate');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));



// ==============================
// IMPACT COUNTER ANIMATION
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    const speed = 200; // lower = faster

    const startCounter = (counter) => {

        const target = +counter.getAttribute("data-target");
        let count = 0;

        const increment = target / speed;

        const update = () => {
            count += increment;

            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
    };

    // Use Intersection Observer (Professional Way)
    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter(entry.target);
                obs.unobserve(entry.target); // run once only

            }

        });

    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

});