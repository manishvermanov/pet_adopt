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



const reviewData = [
  {
    id: "text1",
    texts: [
      "Max has brought so much joy and love into my life. The adoption process was easy and supportive. I’m so grateful to have him as part of my family!"
    ]
  },
  {
    id: "text2",
    texts: [
      "Buddy is the best companion I could ask for. The adoption was smooth, and he’s brought endless happiness to my days."
    ]
  },
  {
    id: "text3",
    texts: [
      "Luna has brought so much warmth and joy into my home. Adopting her was one of the best decisions I’ve made."
    ]
  },
  {
    id: "text4",
    texts: [
"Nibbles is such a sweet little companion. Caring for her has been a delightful experience every day."
    ]
  },
  {
    id: "text5",
    texts: [
      "Kiwi brought so much joy and color to my life. Watching her chirp and play is pure happiness!"


    ]
  },
  {
    id: "text6",
    texts: [
     "Thumper is such a gentle and loving companion. Caring for her has made my days brighter and full of smiles."
    ]
  }
];

reviewData.forEach((box) => {
  let charIndex = 0;
  const element = document.querySelector(`#${box.id} .typed-text`);

  const text = box.texts[0]; // assuming one review per box here

  function type() {
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, 50);
    }
    // No else part, so typing stops after finishing once
  }

  type();
});

// for post your review
const fileInput = document.getElementById("experiencePhoto");
const fileNameDisplay = document.getElementById("fileNameDisplay");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = "No file chosen";
  }
});

//post your own story
// === DOM references ===
const form = document.getElementById("experienceForm");
const modal = document.getElementById("thankYouModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");

const nameInput = document.getElementById("experienceName");
const petName = document.getElementById("petName");
const photoInput = document.getElementById("experiencePhoto");
const storyInput = document.getElementById("experienceInput");
const nameError = document.getElementById("nameError");
const petError = document.getElementById("petNameError")
const photoError = document.getElementById("photoError");
const storyError = document.getElementById("storyError");

// === Display filename when photo selected ===
photoInput.addEventListener("change", () => {
  if (photoInput.files.length > 0) {
    fileNameDisplay.textContent = photoInput.files[0].name;
  } else {
    fileNameDisplay.textContent = "No file chosen";
  }
});

// === Validation functions ===
function validateName() {
  const name = nameInput.value.trim();
  if (name.length < 3) {
    nameError.textContent = "Name must be at least 3 characters.";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validatePet() {
  const pet = petName.value.trim();
  if (pet.length < 3) {
    petError.textContent = "Name must be at least 3 characters.";
    return false;
  }
  petError.textContent = "";
  return true;
}

function validatePhoto() {
  const file = photoInput.files[0];
  if (!file) {
    photoError.textContent = "Please upload a photo.";
    return false;
  }
  if (file.size > 3 * 1024 * 1024) {
    photoError.textContent = "Photo size must be under 3MB.";
    return false;
  }
  photoError.textContent = "";
  return true;
}

function validateStory() {
  const story = storyInput.value.trim();
  if (story.length < 20) {
    storyError.textContent = "Story must be at least 20 characters.";
    return false;
  }
  storyError.textContent = "";
  return true;
}

// === Real-time validation on blur/change ===
nameInput.addEventListener("blur", validateName);
petName.addEventListener("blur",validatePet);
photoInput.addEventListener("change", validatePhoto);
storyInput.addEventListener("blur", validateStory);

// === Form submission ===
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isPetValid = validatePet();
  const isPhotoValid = validatePhoto();
  const isStoryValid = validateStory();

  if (isNameValid && isPhotoValid && isStoryValid && isPetValid) {
    modal.style.display = "flex";
    form.reset();
    fileNameDisplay.textContent = "No file chosen";
  }
});

// === Close modal on click of X button ===
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

// === Close modal if clicking outside the modal content ===
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
