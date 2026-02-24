/**
 * KHAKI FM - Core Website Logic 2026
 * Author: Amit Bharti
 * Description: Handles UI interactions, Audio Engine, and Scroll Animations
 */


// --- 7. CAROUSEL INITIALIZATION ---
const heroCarousel = new bootstrap.Carousel('#heroCarousel', {
    interval: 5000, // 5 seconds per slide
    ride: 'carousel',
    pause: 'hover' // Pauses when user hovers to read
});

const videoSlider = new bootstrap.Carousel('#videoAutoSlider', {
    interval: 4000, // 4 seconds per slide
    ride: 'carousel',
    wrap: true // Infinite looping
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PREMIUM LOADER LOGIC ---
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("loader-hidden");
                // Remove from DOM after transition to save resources
                setTimeout(() => { loader.style.display = "none"; }, 1000);
            }, 2000); 
        });
    }

    // --- 2. NAVBAR SCROLL EFFECT ---
    const nav = document.getElementById('mainNavbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 3. SMOOTH SCROLL WITH OFFSET ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = 100; // Adjusted for better visibility
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // --- 4. AUDIO PLAYER ENGINE ---
    const audio = document.getElementById('audio-ep84');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    if (audio) {
        // Toggle Play/Pause
        window.toggleAudio = function() {
            if (audio.paused) {
                audio.play();
                playBtn.innerHTML = "<span>⏸</span>"; 
                playBtn.classList.add('playing');
            } else {
                audio.pause();
                playBtn.innerHTML = "<span>▶</span>";
                playBtn.classList.remove('playing');
            }
        };

        // Update Progress & Time
        audio.ontimeupdate = () => {
            const percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${percentage}%`;

            // Format Time (MM:SS)
            currentTimeDisplay.innerText = formatTime(audio.currentTime);
        };

        // Load Duration
        audio.onloadedmetadata = () => {
            durationDisplay.innerText = formatTime(audio.duration);
        };

        // Click on Progress Bar to Seek
        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = audio.duration;
                audio.currentTime = (clickX / width) * duration;
            });
        }

        // Reset when ended
        audio.onended = () => {
            playBtn.innerHTML = "<span>▶</span>";
            progressBar.style.width = "0%";
        };
    }

    // Helper: Time Formatter
    function formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    // --- 5. SCROLL REVEAL (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.glass-card, .footer-animate, .news-card');
    
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Unobserve after showing once
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. AI DATA STREAM ANIMATION (SIMBA Section) ---
    const dataStream = document.querySelector('.data-stream');
    if (dataStream) {
        // Create random "binary" particles for the AI box
        for (let i = 0; i < 15; i++) {
            const bit = document.createElement('div');
            bit.className = 'binary-bit';
            bit.innerText = Math.round(Math.random());
            bit.style.left = Math.random() * 100 + '%';
            bit.style.animationDelay = Math.random() * 3 + 's';
            dataStream.appendChild(bit);
        }
    }
});


const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  counter.innerText = '0';

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;

    const increment = target / 200;

    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(updateCounter, 10);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});