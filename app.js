//navbar
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


const carousel = document.getElementById("carousel");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

function getScrollAmount() {
  const card = document.querySelector(".pet-item");
  if (!card) return 350; // fallback
  const cardStyle = getComputedStyle(card);
  const gap = parseInt(cardStyle.marginRight || 0) || 16; // default gap
  return card.offsetWidth + gap;
}

nextBtn.addEventListener("click", () => {
  const scrollAmount = getScrollAmount();
  carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  const scrollAmount = getScrollAmount();
  carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});
