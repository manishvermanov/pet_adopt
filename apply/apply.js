// Sticky Navbar
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () =>
  navbar.classList.toggle("sticky", window.scrollY > 0)
);

const menu = document.querySelector(".menu");
const toggleMenu = () => menu.classList.toggle("active");

document.querySelector(".menu-btn").addEventListener("click", toggleMenu);
document.querySelector(".close-btn").addEventListener("click", toggleMenu);
document.querySelectorAll(".menu a").forEach((link) =>
  link.addEventListener("click", toggleMenu)
);

// Prefill Pet ID and Breed from URL
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const petId = urlParams.get("petId");
  const breed = urlParams.get("name");

  if (petId) {
    const petIdInput = document.getElementById("petId");
    if (petIdInput) petIdInput.value = petId;
  }

  if (breed) {
    const breedInput = document.getElementById("breed");
    if (breedInput) breedInput.value = decodeURIComponent(breed);
  }
});

// Initialize EmailJS
emailjs.init("ibRHtKsS0uRA-oFfN");

function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pet = document.getElementById("pet").value.trim();
  const message = document.getElementById("message").value.trim();
  const petId = document.getElementById("petId").value.trim();
  const breed = document.getElementById("breed").value.trim();
  const followUpRadio = document.querySelector('input[name="followUp"]:checked');

  // Clear previous error messages
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("petError").textContent = "";
  document.getElementById("messageError").textContent = "";
  document.getElementById("petIdError").textContent = "";
  document.getElementById("breedError").textContent = "";
  document.getElementById("followUpError").textContent = "";

  let valid = true;

  if (name.length < 5) {
    document.getElementById("nameError").textContent = "Please enter a valid name (min 5 characters).";
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    valid = false;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    document.getElementById("phoneError").textContent = "Enter a 10-digit valid phone number.";
    valid = false;
  }

  if (pet === "") {
    document.getElementById("petError").textContent = "Please select a pet.";
    valid = false;
  }

  if (message.length < 20) {
    document.getElementById("messageError").textContent = "Please provide more details. (min 20 characters)";
    valid = false;
  }

  const petIdPattern = /^[A-Za-z]{2}[0-9]{4}$/;
  if (!petIdPattern.test(petId)) {
    document.getElementById("petIdError").textContent =
      "Pet ID must be 2 letters followed by 4 digits (e.g., AB1234).";
    valid = false;
  }

  if (breed === "") {
    document.getElementById("breedError").textContent = "Please enter the pet breed.";
    valid = false;
  }

  if (!followUpRadio) {
    document.getElementById("followUpError").textContent = "Please select a follow-up option.";
    valid = false;
  }

  const followUp = followUpRadio ? followUpRadio.value : "";

  if (valid) {
    sendEmail(name, email, pet, message, followUp, petId, breed);
    document.getElementById("successModal").style.display = "block";
    document.querySelector(".adoption-form").reset();
  }

  return false;
}

function closeModal() {
  document.getElementById("successModal").style.display = "none";
}

function sendEmail(name, email, pet, message, followUp, petId, breed) {
  const templateParams = {
    name: name,
    email: email,
    title: pet,
    message: message,
    pet_id: petId,
    breed: breed,
    follow_up: followUp,
  };

  let templateId = "";

  if (followUp === "Call") {
    templateId = "template_mlp4z1a";
  } else if (followUp === "Visit") {
    templateId = "template_ll3vkl9";
  } else if (followUp === "Video") {
    templateId = "template_xyz123"; 
  }

  emailjs
    .send("service_dqo4wzw", templateId, templateParams)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Email send failed:", error);
    });
}
