const options = [
  "Architecture",
  "Art and culture",
  "Automotive",
  "Beverage",
  "Business support",
  "Cinema",
  "Construction",
  "Design",
  "Design and marketing",
  "Design and production",
  "E commerce",
  "Education",
  "Environnement",
  "Event",
  "Fashion",
  "Finance",
  "Fintech",
  "Food",
  "Gaming",
  "Hospitalité",
  "Leisure",
  "Licensing",
  "Marketing",
  "Medical",
  "Municipality",
  "Social cause",
  "Software",
  "Sports",
  "Talentmanagement",
  "Tecnology",
  "Tourism",
  "Typography",
  // paste your full list here
];

const input = document.getElementById("search-input");
const list = document.getElementById("dropdown-list");

function renderList(filter = "") {
  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(filter.toLowerCase()),
  );

  list.innerHTML = "";

  filtered.forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => {
      input.value = opt; // autofill the input
      list.classList.add("hidden");
    });
    list.appendChild(li);
  });

  list.classList.toggle("hidden", filtered.length === 0);
}

// Show list on focus
input.addEventListener("focus", () => renderList(input.value));

// Filter as user types
input.addEventListener("input", () => renderList(input.value));

// Hide list when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-container-project")) {
    list.classList.add("hidden");
  }
  if (!e.target.closest(".citycountry")) {
    cityList.classList.add("hidden");
  }
});

const cityInput = document.getElementById("City-country");
const cityList = document.getElementById("city-dropdown-list");
let cityDebounceTimer;

function formatCityCountry(place) {
  const addr = place.address || {};
  const city =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.municipality ||
    place.name;
  const country = addr.country;
  if (!city || !country) return null;
  return `${city}, ${country}`;
}

function renderCityList(results) {
  cityList.innerHTML = "";

  results.forEach((label) => {
    const li = document.createElement("li");
    li.textContent = label;
    li.addEventListener("click", () => {
      cityInput.value = label;
      cityList.classList.add("hidden");
    });
    cityList.appendChild(li);
  });

  cityList.classList.toggle("hidden", results.length === 0);
}

async function searchCities(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10&featuretype=settlement`;

  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en",
    },
  });

  if (!response.ok) return;

  const data = await response.json();
  const labels = [
    ...new Set(data.map(formatCityCountry).filter(Boolean)),
  ];

  renderCityList(labels.slice(0, 8));
}

function handleCitySearch() {
  clearTimeout(cityDebounceTimer);
  const query = cityInput.value.trim();

  if (query.length < 2) {
    cityList.classList.add("hidden");
    return;
  }

  cityDebounceTimer = setTimeout(() => searchCities(query), 400);
}

cityInput.addEventListener("input", handleCitySearch);
cityInput.addEventListener("focus", handleCitySearch);

const awardsInput = document.getElementById("awards");

function clampAwardsValue() {
  const value = parseInt(awardsInput.value, 10);
  if (awardsInput.value === "" || isNaN(value) || value < 0) {
    awardsInput.value = 0;
  } else {
    awardsInput.value = value;
  }
}

document.querySelectorAll(".number-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const step = btn.dataset.action === "increment" ? 1 : -1;
    const current = parseInt(awardsInput.value, 10) || 0;
    awardsInput.value = Math.max(0, current + step);
  });
});

awardsInput.addEventListener("input", () => {
  if (awardsInput.value === "") return;
  const value = parseInt(awardsInput.value, 10);
  if (!isNaN(value) && value < 0) {
    awardsInput.value = 0;
  }
});

awardsInput.addEventListener("blur", clampAwardsValue);

const hero = document.querySelector(".hero");

function updateFormSlide() {
  const heroHeight = window.innerHeight;
  const progress = Math.min(window.scrollY / heroHeight, 1);
  hero.style.opacity = String(1 - progress);
}

window.addEventListener("scroll", updateFormSlide, { passive: true });
window.addEventListener("resize", updateFormSlide);
updateFormSlide();
