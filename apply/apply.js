//for nav bar

const navbar =document.querySelector("nav");
window.addEventListener("scroll", ()=>
    navbar.classList.toggle("sticky",window.scrollY >0)
);

const menu =document.querySelector(".menu");
const toggleMenu =()=> menu.classList.toggle("active");

document.querySelector(".menu-btn").addEventListener("click",toggleMenu);
document.querySelector(".close-btn").addEventListener("click",toggleMenu);


document
    .querySelectorAll(".menu a")
    .forEach((link)=>link.addEventListener("click",toggleMenu));


emailjs.init("ibRHtKsS0uRA-oFfN");


function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pet = document.getElementById("pet").value.trim();
  const message = document.getElementById("message").value.trim();

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("petError").textContent = "";
  document.getElementById("messageError").textContent = "";

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

  if (valid) {
    sendEmail(name, email, pet, message);
    document.getElementById("successModal").style.display = "block";
    document.querySelector(".adoption-form").reset();
  }

  return false;
}

function closeModal() {
  document.getElementById("successModal").style.display = "none";
}

function sendEmail(name, email, pet, message) {
  const templateParams = {
    name: name,
    email: email,
    title: pet,
    message: message
  };

  emailjs.send("service_dqo4wzw", "template_ll3vkl9", templateParams)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Email send failed:", error);
    });
}
