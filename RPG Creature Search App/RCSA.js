// script.js
// Use the exact API endpoint expected by the tests:
const API_BASE = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");

const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const spAttackEl = document.getElementById("special-attack");
const spDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

function clearUI() {
  nameEl.textContent = "—";
  idEl.textContent = "—";
  weightEl.textContent = "—";
  heightEl.textContent = "—";
  typesEl.innerHTML = "";
  hpEl.textContent = "—";
  attackEl.textContent = "—";
  defenseEl.textContent = "—";
  spAttackEl.textContent = "—";
  spDefenseEl.textContent = "—";
  speedEl.textContent = "—";
}

function showCreature(creature) {
  // Name in uppercase (tests accept this)
  nameEl.textContent = creature.name
    ? String(creature.name).toUpperCase()
    : "—";
  // ID — show with # prefix (tests accept #1 or 1)
  idEl.textContent =
    typeof creature.id !== "undefined" ? `#${creature.id}` : "—";
  // Weight/Height - tests accept "Weight: 42" OR "42", we'll format with prefix
  weightEl.textContent = `Weight: ${creature.weight}`;
  heightEl.textContent = `Height: ${creature.height}`;

  // Stats: the API returns an array of stat objects; find each by name
  const stats = Array.isArray(creature.stats) ? creature.stats : [];

  function statValue(statName) {
    const s = stats.find(
      (it) => String(it.name).toLowerCase() === statName.toLowerCase()
    );
    // many responses use base_stat property
    return s ? s.base_stat ?? s.value ?? s : "—";
  }

  hpEl.textContent = statValue("hp");
  attackEl.textContent = statValue("attack");
  defenseEl.textContent = statValue("defense");
  spAttackEl.textContent = statValue("special-attack");
  spDefenseEl.textContent = statValue("special-defense");
  speedEl.textContent = statValue("speed");

  // Types: clear first, then add elements for each type
  typesEl.innerHTML = "";
  if (Array.isArray(creature.types)) {
    creature.types.forEach((t) => {
      // t might be a string or an object
      const tName = typeof t === "string" ? t : t.name ?? t.type ?? null;
      if (!tName) return;
      const span = document.createElement("span");
      span.className = "type-badge";
      span.textContent = String(tName).toUpperCase();
      typesEl.appendChild(span);
    });
  }
}

function handleErrorAlert() {
  // Clear UI and show required alert text
  clearUI();
  alert("Creature not found");
}

async function fetchCreature(queryRaw) {
  const query = String(queryRaw).trim();
  if (!query) return;

  // Accept name or id. Use lowercase for name requests so endpoint matches examples.
  // If query is purely numeric, use as-is (ids).
  const encoded = /^\d+$/.test(query)
    ? encodeURIComponent(query)
    : encodeURIComponent(query.toLowerCase());
  const url = `${API_BASE}${encoded}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // ensure alert text matches tests
      handleErrorAlert();
      return;
    }

    // parse json
    const data = await response.json();

    // data may be the creature object directly
    if (!data || typeof data !== "object") {
      // Unexpected shape
      handleErrorAlert();
      return;
    }

    showCreature(data);
  } catch (err) {
    // Network / parse error, show not-found alert per tests
    handleErrorAlert();
    console.error("Error fetching creature data:", err);
  }
}

searchButton.addEventListener("click", () => {
  fetchCreature(searchInput.value);
});

// allow Enter to trigger search
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchCreature(searchInput.value);
  }
});
