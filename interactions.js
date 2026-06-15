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
];

const projectInput = document.getElementById("search-input");
const projectList = document.getElementById("dropdown-list");

function renderList(items, list, input, filter = "") {
  const filtered = items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase()),
  );

  list.innerHTML = "";

  filtered.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      input.value = item;
      list.classList.add("hidden");
    });
    list.appendChild(li);
  });

  list.classList.toggle("hidden", filtered.length === 0);
}

projectInput.addEventListener("focus", () => renderList(options, projectList, projectInput, projectInput.value));
projectInput.addEventListener("input", () => renderList(options, projectList, projectInput, projectInput.value));

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

async function searchCities(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10&featuretype=settlement`;
  const response = await fetch(url, {
    headers: { "Accept-Language": "en" },
  });

  if (!response.ok) return;

  const data = await response.json();
  const labels = [...new Set(data.map(formatCityCountry).filter(Boolean))];
  renderList(labels.slice(0, 8), cityList, cityInput);
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

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-container-project")) {
    projectList.classList.add("hidden");
  }
  if (!e.target.closest(".citycountry")) {
    cityList.classList.add("hidden");
  }
});

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
  if (!hero) return;
  const progress = Math.min(window.scrollY / window.innerHeight, 1);
  hero.style.opacity = String(1 - progress);
}

window.addEventListener("scroll", updateFormSlide, { passive: true });
window.addEventListener("resize", updateFormSlide);
updateFormSlide();
