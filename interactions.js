const options = [
  "Talentmanagement",
  "Automotive",
  "Hospitalité",
  "Education",
  "Finance",
  "Licensing",
  "Construction",
  "Business support",
  "Social cause",
  "Environnement",
  "Municipality",
  "Architecture",
  "E commerce",
  "Software",
  "Marketing",
  "Beverage",
  "Cinema",
  "Medical",
  "Event",
  "Tecnology",
  "Art and culture",
  "Fintech",
  "Typography",
  "Gaming",
  "Leisure",
  "Design and production",
  "Fashion",
  "Design",
  "Design and marketing",
  "Sports",
  "Tourism",
  "Food",
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
