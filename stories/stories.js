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
