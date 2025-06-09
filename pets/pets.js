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




const API_KEY = "live_KfTFOTZFqrx7MFhD8dzHnKFP8FCL1yfsgTMn3gY4TTjX7n7aQkeUZ3yDizq7MXGN";
const DOG_API_URL = "https://api.thedogapi.com/v1/images/search?limit=6&has_breeds=true";

const cardsContainer = document.getElementById("animalCards");
const menuItems = document.querySelectorAll(".animal-menu li");

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
        temperament: " Friendly, Easygoing, Intelligent",
      },
    },
    {
      front: "images/pets/cat2.jpg",
      back: "images/pets/cat2-back.webp",
      name: "Longhair cat",
      alt: "Longhair Cat",
      breed_info: {
        weight: "4 - 6.5 kg",
        height: "25 - 30 cm",
        life_span: "12 - 17 years",
        temperament: "Curious, Gentle, Loyal",
      },
    },
  ],

  bird: [
    {
      front: "images/pets/5.webp",
      back: "images/pets/3.webp",
      name: "Eclectus Parrot",
      alt: "Squawks",
      breed_info: {
        weight: " 0.4 -0.6  kg ",
        height: "30 – 35 cm",
        life_spanpan: "30 – 40 years",
        temperament: "Curious, Gentle, Loyal",
      },
    },
    {
      front: "images/pets/6.webp",
      back: "images/pets/3.webp",
      name: "Feather Fury",
      alt: "Feather Fury",
      breed_info: {
        weight: " 0.5 -0.7  kg ",
        height: "30 – 55 cm",
        life_spanpan: "30 – 60 years",
        temperament: "Affectionate, Social, Demanding",
      },
    }
  ],
};

async function loadDogCards() {
  // Check localStorage first
  const cached = localStorage.getItem("dogCards");
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        console.log("Loading dog cards from localStorage");
        return parsed;
      }
    } catch {
      // If parsing fails, ignore and fetch new data
      console.warn("Failed to parse cached dog cards, fetching new data");
    }
  }

  // If no cached data, fetch from API
  try {
    console.log("Fetching dog data from API...");
    const response = await fetch(DOG_API_URL, {
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      console.error("API response not ok:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("No data or invalid data structure received from dog API");
      return [];
    }

    const cards = data.map((dog, index) => {
      const breed = dog.breeds && dog.breeds.length > 0 ? dog.breeds[0] : null;
      return {
        front: dog.url || "https://via.placeholder.com/200?text=No+Image",
        name: breed ? breed.name : `Doggo #${index + 1}`,
        alt: breed ? breed.name : `Dog ${index + 1}`,
        breed_info: breed
          ? {
              weight: breed.weight?.metric ? breed.weight.metric + " kg" : "N/A",
              height: breed.height?.metric ? breed.height.metric + " cm" : "N/A",
              life_span: breed.life_span || "N/A",
              temperament: breed.temperament || "Unknown",
            }
          : null,
      };
    });

    // Save to localStorage for future loads
    localStorage.setItem("dogCards", JSON.stringify(cards));
    return cards;
  } catch (error) {
    console.error("Error loading dogs:", error);
    return [];
  }
}


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
          <p><strong>Weight:</strong> ${card.breed_info.weight}</p>
          <p><strong>Height:</strong> ${card.breed_info.height}</p>
          <p><strong>Life Span:</strong> ${card.breed_info.life_span}</p>
          <p><strong>Temperament:</strong> ${card.breed_info.temperament}</p>
        `
        : `<p>No breed information available</p>`;

      return `
      <div class="character-card">
        <div class="card-inner">
          <div class="card-front">
            <img src="${card.front}" alt="${card.alt}" />
            <p>${card.name}</p>
          </div>
          <div class="card-back">
            ${backContent}
          </div>
        </div>
      </div>`;
    })
    .join("");
}

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

// Load dogs by default
(async () => {
  const dogs = await loadDogCards();
  renderCards(dogs);
})();
