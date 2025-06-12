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

// ID Generator Helpers
const usedPetIds = new Set(Object.values(JSON.parse(localStorage.getItem("dogIdMap") || "{}")));

function generateRandomPetId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const getLetters = () => chars.charAt(Math.floor(Math.random() * 26)) + chars.charAt(Math.floor(Math.random() * 26));
  const getDigits = () => Math.floor(1000 + Math.random() * 9000); // 4 digits
  let id;
  do {
    id = getLetters() + getDigits();
  } while (usedPetIds.has(id));
  usedPetIds.add(id);
  return id;
}

function getOrGenerateDogId(imageUrl) {
  let idMap = JSON.parse(localStorage.getItem("dogIdMap") || "{}");
  if (idMap[imageUrl]) return idMap[imageUrl];

  const newId = generateRandomPetId();
  idMap[imageUrl] = newId;
  localStorage.setItem("dogIdMap", JSON.stringify(idMap));
  return newId;
}

// API Info
const API_KEY = "live_KfTFOTZFqrx7MFhD8dzHnKFP8FCL1yfsgTMn3gY4TTjX7n7aQkeUZ3yDizq7MXGN";
const DOG_API_URL = "https://api.thedogapi.com/v1/images/search?limit=6&has_breeds=true";

const cardsContainer = document.getElementById("animalCards");
const menuItems = document.querySelectorAll(".animal-menu li");

// Static Animal Cards
const animalCards = {
  cat: [
    {
      front: "images/pets/cat1.jpg",
      back: "images/pets/cat1-back.webp",
      name: "Shorthair Cat",
      alt: "Whiskers Cat",
      breed_info: {
        weight: "3.5 – 5.5 kg",
        height: "23 – 28 cm",
        life_span: "12 - 15 years",
        temperament: "Friendly, Easygoing, Intelligent",
      },
      id: "CA0001",
    },
    {
      front: "images/pets/cat2.jpg",
      back: "images/pets/cat2-back.webp",
      name: "Longhair Cat",
      alt: "Longhair Cat",
      breed_info: {
        weight: "4 - 6.5 kg",
        height: "25 - 30 cm",
        life_span: "12 - 17 years",
        temperament: "Curious, Gentle, Loyal",
      },
      id: "CA0002",
    },
  ],
  bird: [
    {
      front: "images/pets/5.webp",
      back: "images/pets/3.webp",
      name: "Eclectus Parrot",
      alt: "Squawks",
      breed_info: {
        weight: "0.4 - 0.6 kg",
        height: "30 – 35 cm",
        life_span: "30 – 40 years",
        temperament: "Curious, Gentle, Loyal",
      },
      id: "BI0001",
    },
    {
      front: "images/pets/6.webp",
      back: "images/pets/3.webp",
      name: "Feather Fury",
      alt: "Feather Fury",
      breed_info: {
        weight: "0.5 - 0.7 kg",
        height: "30 – 55 cm",
        life_span: "30 – 60 years",
        temperament: "Affectionate, Social, Demanding",
      },
      id: "BI0002",
    },
  ],
};

// Dog Loader
async function loadDogCards() {
  const cached = localStorage.getItem("dogCards");
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach((dog) => {
          dog.id = getOrGenerateDogId(dog.front);
        });
        return parsed;
      }
    } catch (e) {
      console.warn("Invalid cache, refetching...");
    }
  }

  try {
    const response = await fetch(DOG_API_URL, {
      headers: { "x-api-key": API_KEY },
    });
    const data = await response.json();

    const cards = data.map((dog) => {
      const breed = dog.breeds?.[0] || null;
      const imageUrl = dog.url || "https://via.placeholder.com/200?text=No+Image";
      return {
        front: imageUrl,
        name: breed?.name || "Unknown Doggo",
        alt: breed?.name || "Dog",
        breed_info: breed
          ? {
              weight: breed.weight?.metric + " kg" || "N/A",
              height: breed.height?.metric + " cm" || "N/A",
              life_span: breed.life_span || "N/A",
              temperament: breed.temperament || "Unknown",
            }
          : null,
        id: getOrGenerateDogId(imageUrl),
      };
    });

    localStorage.setItem("dogCards", JSON.stringify(cards));
    return cards;
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
}

// Card Renderer
function renderCards(cards) {
  if (!cards.length) {
    cardsContainer.innerHTML = "<p>No cards to display</p>";
    return;
  }

  cardsContainer.innerHTML = cards
    .map((card) => {
      const backContent = card.breed_info
        ? `
        <h2>${card.name}</h2>
         <p><strong>Pet ID:</strong> ${card.id}</p>
        <p><strong>Weight:</strong> ${card.breed_info.weight}</p>
        <p><strong>Height:</strong> ${card.breed_info.height}</p>
        <p><strong>Life Span:</strong> ${card.breed_info.life_span}</p>
        <p><strong>Temperament:</strong> ${card.breed_info.temperament}</p>
       
      `
        : `<p>No breed info<br><strong>Pet ID:</strong> ${card.id}</p>`;

      return `
      <div class="character-card">
        <div class="card-inner">
          <div class="card-front">
            <img src="${card.front}" alt="${card.alt}" />
            <p>${card.name}</p>
          </div>
          <div class="card-back">
            ${backContent}
            <a class="adopt-btn" href="../apply/apply.html?petId=${card.id}&name=${encodeURIComponent(card.name)}">Adopt</a>

          </div>
        </div>
      </div>`;
    })
    .join("");
}

// Menu Interaction
menuItems.forEach((item) => {
  item.addEventListener("click", async () => {
    menuItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const animalType = item.getAttribute("data-animal");

    if (animalType === "dog") {
      const dogs = await loadDogCards();
      renderCards(dogs);
    } else if (animalType === "cat" || animalType === "bird") {
      renderCards(animalCards[animalType]);
    } else {
      cardsContainer.innerHTML = "<p>No cards to display</p>";
    }
  });
});

// Load Dogs by Default
(async () => {
  const dogs = await loadDogCards();
  renderCards(dogs);
})();
