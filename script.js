//---current page & nav load----//

document.addEventListener("DOMContentLoaded", () => {
  fetch("nav.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

      // highlight current page
      const currentPage = window.location.pathname.split("/").pop();
      document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
    })
    .catch(error => console.error("Navbar load failed:", error));
});

//-----carousel script-----//
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const intervalTime = 3000; // 3 seconds

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

document.querySelector(".next").addEventListener("click", () => {
  nextSlide();
  resetTimer();
});

document.querySelector(".prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
    resetTimer();
  }
});

function nextSlide() {
  currentIndex++;
  if (currentIndex >= totalSlides) currentIndex = 0;
  showSlide(currentIndex);
}

// Auto-slide
let slideTimer = setInterval(nextSlide, intervalTime);

// Reset timer after manual navigation
function resetTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, intervalTime);
}

// Dots functionality
const dots = document.querySelectorAll(".dot");

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// Update dots whenever slide changes
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  updateDots();
}

// Optional: Make dots clickable
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    showSlide(currentIndex);
    resetTimer();
  });
})
