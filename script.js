// Initialize AOS (Appear on Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

AOS.init({
  once: true,
  disable: function () {
    return window.innerWidth < 768;
  },
});

// Swiper Initialization
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  breakpoints: {
    768: { slidesPerView: 2 },
  },
  pagination: { el: ".swiper-pagination", clickable: true },
});

// Lightbox Logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const images = document.querySelectorAll(".gallery-img");

images.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    setTimeout(() => {
      lightboxImg.classList.remove("scale-95");
      lightboxImg.classList.add("scale-100");
    }, 10);
  });
});

function closeLightbox() {
  lightboxImg.classList.add("scale-95");
  setTimeout(() => {
    lightbox.style.display = "none";
  }, 200);
}

// FORM CODE BELOW

console.log("JS loaded");

const form = document.getElementById("contactForm");
const successBox = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");

const WEB_APP_URL = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault(); //

  console.log("Form submit intercepted");

  submitBtn.disabled = true;

  const formData = new FormData(form);

  const payload = {
    Date: new Date().toISOString(),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      successBox.classList.remove("hidden");
      form.reset();
    }
  } catch (err) {
    alert("Error submitting form");
    console.error(err);
  }

  submitBtn.disabled = false;
});
