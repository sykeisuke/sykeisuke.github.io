function toggleSection(id, header = null) {
    const section = document.getElementById(id);
    const isOpen = section.style.display === "block";
    section.style.display = isOpen ? "none" : "block";
    if (header) {
        const label = header.textContent.replace(/^▼|▶/, '').trim();
        header.innerHTML = (isOpen ? '▶' : '▼') + ' ' + label;
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

    // Add event listeners to arrow buttons
    document.querySelector(".arrow-left").addEventListener("click", prevImage);
    document.querySelector(".arrow-right").addEventListener("click", nextImage);

    // Auto slide
    setInterval(nextImage, 5000); // Change image every 5 seconds
});

