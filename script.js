function toggleSection(id, button = null) {
    const section = document.getElementById(id);
    const isOpen = section.style.display === "block";
    section.style.display = isOpen ? "none" : "block";
    if (button) {
        button.setAttribute("aria-expanded", String(!isOpen));
        const arrow = button.querySelector(".toggle-arrow");
        if (arrow) arrow.textContent = isOpen ? "▶" : "▼";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const carouselImages = document.querySelectorAll(".carousel-img");
    let currentIndex = 0;

    function showImage(index) {
        carouselImages.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        showImage(currentIndex);
    }

    const left = document.querySelector(".arrow-left");
    const right = document.querySelector(".arrow-right");
    const pauseButton = document.querySelector(".carousel-pause");
    if (!left || !right || carouselImages.length === 0) return;

    left.addEventListener("click", prevImage);
    right.addEventListener("click", nextImage);

    // Auto slide every 5 seconds, with a pause control (WCAG 2.2.2).
    // Visitors who prefer reduced motion start paused.
    let timer = null;
    const start = () => {
        timer = setInterval(nextImage, 5000);
        if (pauseButton) {
            pauseButton.textContent = "Pause";
            pauseButton.setAttribute("aria-label", "Pause slideshow");
        }
    };
    const stop = () => {
        clearInterval(timer);
        timer = null;
        if (pauseButton) {
            pauseButton.textContent = "Play";
            pauseButton.setAttribute("aria-label", "Play slideshow");
        }
    };
    if (pauseButton) {
        pauseButton.addEventListener("click", () => (timer ? stop() : start()));
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        stop();
    } else {
        start();
    }
});

