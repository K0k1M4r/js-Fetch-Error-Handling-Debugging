// 1

// ============================================================================
// Snippet A
// ============================================================================
function getInitials(firstName, lastName) {
    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  }
  
  /* 
   * Error Type: Runtime Error
   * Why: The code attempts to read index [0] of the number 42 (lastName). Numbers 
   * do not have bracket indices like strings or arrays, so lastName[0] evaluates 
   * to undefined. Calling .toUpperCase() on undefined throws a TypeError during execution.
   */
  
  // Corrected Code:
  function getInitialsCorrected(firstName, lastName) {
    // Convert arguments to strings first to prevent reading indices of undefined/numbers
    const firstStr = String(firstName);
    const lastStr = String(lastName);
    
    const firstInitial = firstStr[0] ? firstStr[0].toUpperCase() : '';
    const lastInitial = lastStr[0] ? lastStr[0].toUpperCase() : '';
    
    return firstInitial + lastInitial;
  }
  console.log(getInitialsCorrected("Alice", 42)); // Prints: "A4"
  
  
  // ============================================================================
  // Snippet B
  // ============================================================================
  /* 
   * Error Type: Syntax Error
   * Why: The 'for' loop header is missing its closing parenthesis ')' right 
   * before the opening curly brace '{'. The JavaScript parser cannot compile 
   * the code due to this structural violation.
   */
  
  // Corrected Code:
  const scores =[88, 92, 75, 60];
  let total = 0;
  // Fixed: Added the closing parenthesis after i++
  for (let i = 0; i < scores.length; i++) { 
    total += scores[i];
  }
  console.log("Total:", total); // Prints: "Total: 315"
  
  
  // ============================================================================
  // Snippet C
  // ============================================================================
  function getAverage(numbers) {
    let sum = 0;
    for (let n of numbers) { sum += n; }
    return sum / 100;  // intended: divide by array length
  }
  
  /* 
   * Error Type: Logical Error
   * Why: The program runs smoothly without crashing, but it produces the wrong output. 
   * It hardcodes a divisor of 100 instead of dynamically dividing by the 
   * actual length of the numbers array (numbers.length).
   */
  
  // Corrected Code:
  function getAverageCorrected(numbers) {
    if (numbers.length === 0) return 0; // Handle potential division by zero
    let sum = 0;
    for (let n of numbers) { sum += n; }
    return sum / numbers.length; // Fixed: Dynamic division by array length
  }
  console.log(getAverageCorrected([10, 20, 30])); // Prints: 20
  
  
  // 2
  
  function withdraw(balance, amount) {
    try {
      // 1. Check if either argument is not a number
      if (typeof balance !== "number" || typeof amount !== "number" || isNaN(balance) || isNaN(amount)) {
        throw new TypeError("Both balance and amount must be numeric values.");
      }
  
      // 2. Check if the amount is 0 or negative
      if (amount <= 0) {
        throw new RangeError("Withdrawal amount must be greater than zero.");
      }
  
      // 3. Check if amount exceeds available balance
      if (amount > balance) {
        throw new Error("Insufficient funds for this withdrawal.");
      }
  
      // 4. Return new balance on success
      const newBalance = balance - amount;
      return `Withdrawal successful. Remaining: $${newBalance}`;
  
    } catch (error) {
      // Catch and return the error message for testing output clarity
      return `${error.name}: ${error.message}`;
    } finally {
      // 5. Always log this string regardless of success or failure
      console.log("Transaction ended.");
    }
  }
  
  // ============================================================================
  // Test All Cases
  // ============================================================================
  
  console.log(withdraw(500, "hundred")); 
  // Logs: "Transaction ended."
  // Prints: "TypeError: Both balance and amount must be numeric values."
  
  console.log(withdraw(500, -50));       
  // Logs: "Transaction ended."
  // Prints: "RangeError: Withdrawal amount must be greater than zero."
  
  console.log(withdraw(500, 600));       
  // Logs: "Transaction ended."
  // Prints: "Error: Insufficient funds for this withdrawal."
  
  console.log(withdraw(500, 200));       
  // Logs: "Transaction ended."
  // Prints: "Withdrawal successful. Remaining: $300"
  
  
  // 3
  
  function addToCart(productName, quantity, price) {
    // 1. Check if productName is a string
    if (typeof productName !== "string") {
      throw new TypeError("Product name must be a string.");
    }
  
    // 2. Check if productName has at least 2 characters
    if (productName.length < 2) {
      throw new Error("Product name must be at least 2 characters long.");
    }
  
    // 3. Check if quantity is a whole number between 1 and 99
    // Number.isInteger ensures it is a whole number
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new RangeError("Quantity must be a whole number between 1 and 99.");
    }
  
    // 4. Check if price is a positive number
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
      throw new RangeError("Price must be a positive number.");
    }
  
    // 5. Success path calculation and string construction
    const total = (quantity * price).toFixed(2);
    return `Added ${quantity}x ${productName} — Total: $${total}`;
  }
  
  // ============================================================================
  // Test All Cases Wrapped in try...catch
  // ============================================================================
  
  // Case 1: Name not a string
  try {
    console.log(addToCart(123, 2, 9.99));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
  
  // Case 2: Name too short
  try {
    console.log(addToCart("A", 2, 9.99));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
  
  // Case 3: Invalid quantity (zero)
  try {
    console.log(addToCart("Notebook", 0, 9.99));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
  
  // Case 4: Invalid price (negative)
  try {
    console.log(addToCart("Notebook", 3, -5));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
  
  // Case 5: Valid transaction
  try {
    console.log(addToCart("Notebook", 3, 9.99));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
  
  
  
  // 4
  
  const orders = [
    { id: 1, customer: "Sara",  item: "Pizza",  eta: 25,  status: "on the way" },
    { id: 2, customer: "Karim", item: "Sushi",  eta: 75,  status: "on the way" },
    { id: 3, customer: "Leila", item: "Burger", eta: 40,  status: "cancelled"  },
    { id: 4, customer: "Omar",  item: "Tacos",  eta: 90,  status: "on the way" },
    { id: 5, customer: "Nour",  item: "Salad",  eta: 20,  status: "delivered"  },
  ];
  
  // 1. Display the full list of orders cleanly in a visual grid format
  console.table(orders);
  
  // 2. Loop through each order to apply custom tracking rules
  for (const order of orders) {
    
    // Rule A: Log any order with a status of "cancelled"
    if (order.status === "cancelled") {
      console.error(`Order #${order.id} for ${order.customer} has been CANCELLED`);
    }
    
    // Rule B: Warn if an order's estimated delivery exceeds 60 minutes
    if (order.eta > 60) {
      console.warn(`Order #${order.id} for ${order.customer} — ETA ${order.eta} min (too long!)`);
    }
    
    // Rule C: Log a standard confirmation message for each delivered order
    if (order.status === "delivered") {
      console.log(`Order #${order.id} delivered to ${order.customer}. Enjoy your ${order.item}!`);
    }
  }
  
  
  // 5 
  async function searchPokemon(name) {
    const pokemonName = String(name).toLowerCase().trim();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP Error Status ${response.status}`);
      }
  
      const data = await response.json();
      const typeNames = data.types.map(t => t.type.name).join(", ");
  
      console.log(`Name:   ${data.name}`);
      console.log(`Height: ${data.height} dm`);
      console.log(`Weight: ${data.weight} hg`);
      console.log(`Types:  ${typeNames}`);
  
    } catch (error) {
      if (error.message.includes("404")) {
        console.error(`❌ Error: Pokemon "${name}" not found (404).`);
      } else if (error.message.includes("HTTP Error Status")) {
        console.error(`❌ API Error: ${error.message}`);
      } else {
        console.error(`❌ Network Failure: Unable to connect to the server. Details: ${error.message}`);
      }
    } finally {
      console.log("Search complete.");
    }
  }
  
  searchPokemon("pikachu");
  searchPokemon("cloudemon");
  
  // 6 
  
  // ==========================================
  // PROBLEM 5: POKEMON EXPLORER
  // ==========================================
    async function searchPokemon(name) {
    const pokemonName = String(name).toLowerCase().trim();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("HTTP Error Status " + response.status);
  
      const data = await response.json();
      const typeNames = data.types.map(t => t.type.name).join(", ");
  
      console.log("Name:   " + data.name);
      console.log("Height: " + data.height + " dm");
      console.log("Weight: " + data.weight + " hg");
      console.log("Types:  " + typeNames);
  
    } catch (error) {
      if (error.message.includes("404")) {
        console.error("❌ Error: Pokemon \"" + name + "\" not found (404).");
      } else {
        console.error("❌ Error: " + error.message);
      }
    } finally {
      console.log("Search complete.");
    }
  }
  
  // ==========================================
  // PROBLEM 6: COUNTRY REWRITE
  // ==========================================
  async function getCountry(name) {
    const url = `https://restcountries.com/v3.1/name/${name}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Country not found: " + response.status);
  
      const data = await response.json();
      const c = data[0];
  
      console.log("Country:",    c.name.common);
      console.log("Capital:",    c.capital[0]);
      console.log("Population:", c.population.toLocaleString());
      console.log("Region:",     c.region);
  
    } catch (error) {
      console.error("Failed:", error.message);
    } finally {
      console.log("Lookup finished.");
    }
  }
  
  // RUN THE TESTS
  searchPokemon("pikachu");
  searchPokemon("cloudemon");
  getCountry("Germany");
  getCountry("Neverland");
  
  // 7
  
  const questions = [
    { question: "Capital of France?",   correct: "Paris"  },
    { question: "5 + 3 = ?",            correct: "8"      },
    { question: "Largest ocean?",       correct: "Pacific"},
    { question: "H2O is...?",           correct: "Water"  },
    { question: "Opposite of hot?",     correct: "Cold"   },
  ];
   
  const studentAnswers = ["Paris", "8", "Atlantic", "Water", "Cold"];
   
  function gradeQuiz(questions, answers) {
    let score = 0;
   
    // FIX 1: Changed loop boundaries to 'let i = 0; i < questions.length; i++'
    // BUG 1 EXPLANATION: Array indexes are 0-based. Starting at 1 skips the first question ("Paris"). 
    // Using '<=' causes the loop to look for an index equal to the array length, which is out of bounds 
    // and throws a runtime exception ('Cannot read properties of undefined' when trying to read '.correct').
    for (let i = 0; i < questions.length; i++) {   
      if (questions[i].correct === answers[i]) {
        score++;
      }
    }
   
    // FIX 2: Replaced the hardcoded '10' divisor with 'questions.length'
    // BUG 2 EXPLANATION: The total count of questions was hardcoded to 10 instead of using the dynamic 
    // length of the array (5). This logical flaw results in a wrong calculation (score / 10 instead of score / 5).
    const percentage = (score / questions.length) * 100;            
   
    return {
      score: score,
      total: questions.length,
      percentage: percentage,
      // FIX 3: Replaced the arrow function 'percentage => 50' with a boolean comparison 'percentage >= 50'
      // BUG 3 EXPLANATION: An arrow function expression was written instead of a conditional comparison. 
      // This assigned an unexecuted function object to the 'passed' property instead of a true/false boolean value.
      passed: percentage >= 50,                     
    };
  }
   
  const result = gradeQuiz(questions, studentAnswers);
  console.log(result);
  // Correctly outputs: { score: 4, total: 5, percentage: 80, passed: true }
  
  
  // 8 

  // ============================================================================
// Country Explorer — app.js
// ============================================================================

const API_BASE = "https://restcountries.com/v3.1";
const FIELDS = "name,capital,population,region,flag,flags,languages,cca3";
const FAV_KEY = "atlas-favourites";

// A pool of well-known country names to pick 5 random ones from on load.
// (The REST Countries API has no "/random" endpoint, so we sample client-side.)
const COUNTRY_POOL = [
  "Germany", "Japan", "Brazil", "Kenya", "Norway", "Vietnam", "Peru",
  "Portugal", "Mongolia", "Morocco", "Canada", "Thailand", "Iceland",
  "Egypt", "Chile", "Finland", "Greece", "Nepal", "Jamaica", "Croatia",
  "Ghana", "Uruguay", "Estonia", "Bhutan", "Ecuador", "Latvia", "Fiji",
  "Namibia", "Slovenia", "Panama"
];

// Custom error for a blank search — lets us distinguish "user typed nothing"
// from a network failure or a 404 in the catch block.
class EmptySearchError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmptySearchError";
  }
}

// ---------------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------------
const statusEl = document.getElementById("status");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResultEl = document.getElementById("searchResult");
const countryGrid = document.getElementById("countryGrid");
const favouritesSection = document.getElementById("favouritesSection");
const favouritesGrid = document.getElementById("favouritesGrid");
const regionFilter = document.getElementById("regionFilter");

let shelfCountries = []; // the 5 auto-loaded countries currently on the shelf

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function pickRandomCountries(pool, count) {
  const copy = [...pool];
  const picks = [];
  while (picks.length < count && copy.length > 0) {
    const i = Math.floor(Math.random() * copy.length);
    picks.push(copy.splice(i, 1)[0]);
  }
  return picks;
}

async function fetchCountryByName(name) {
  const url = `${API_BASE}/name/${encodeURIComponent(name)}?fullText=true&fields=${FIELDS}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return data[0];
}

function getFavourites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavourites(list) {
  localStorage.setItem(FAV_KEY, JSON.stringify(list));
}

function isFavourite(cca3) {
  return getFavourites().some(c => c.cca3 === cca3);
}

function toggleFavourite(country) {
  const favs = getFavourites();
  const idx = favs.findIndex(c => c.cca3 === country.cca3);

  if (idx === -1) {
    favs.push(country);
  } else {
    favs.splice(idx, 1);
  }

  saveFavourites(favs);
  renderFavourites();
  // Refresh star state on any matching cards currently on screen
  document.querySelectorAll(`[data-cca3="${country.cca3}"] .fav-btn`).forEach(btn => {
    btn.classList.toggle("active", isFavourite(country.cca3));
    btn.textContent = isFavourite(country.cca3) ? "★ Favourited" : "☆ Favourite";
  });
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function flagMarkup(country) {
  if (country.flags && country.flags.png) {
    return `<img src="${country.flags.png}" alt="Flag of ${country.name.common}">`;
  }
  return country.flag || "🏳️";
}

function languagesText(country) {
  if (!country.languages) return "—";
  return Object.values(country.languages).join(", ");
}

function cardHTML(country) {
  const capital = country.capital && country.capital[0] ? country.capital[0] : null;

  if (!capital) {
    console.warn(`No listed capital for ${country.name.common}`);
  }

  const favActive = isFavourite(country.cca3);

  return `
    <article class="card" data-cca3="${country.cca3}">
      <div class="card-top">
        <div class="stamp">${flagMarkup(country)}</div>
        <div>
          <p class="card-name">${country.name.common}</p>
          <p class="card-region">${country.region || "Unknown region"}</p>
        </div>
      </div>
      <dl class="facts">
        <dt>Capital</dt>
        <dd class="${capital ? "" : "no-capital"}">${capital || "None listed"}</dd>
        <dt>Population</dt>
        <dd>${country.population.toLocaleString()}</dd>
        <dt>Region</dt>
        <dd>${country.region || "—"}</dd>
        <dt>Languages</dt>
        <dd>${languagesText(country)}</dd>
      </dl>
      <div class="card-actions">
        <button class="fav-btn ${favActive ? "active" : ""}" data-action="favourite">
          ${favActive ? "★ Favourited" : "☆ Favourite"}
        </button>
      </div>
    </article>
  `;
}

function renderGrid(target, countries) {
  if (countries.length === 0) {
    target.innerHTML = `<p class="empty-note">Nothing to show here yet.</p>`;
    return;
  }
  target.innerHTML = countries.map(cardHTML).join("");

  target.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cca3 = btn.closest(".card").dataset.cca3;
      const country =
        shelfCountries.find(c => c.cca3 === cca3) ||
        getFavourites().find(c => c.cca3 === cca3) ||
        lastSearchedCountry;
      if (country) toggleFavourite(country);
    });
  });
}

function renderFavourites() {
  const favs = getFavourites();
  favouritesSection.style.display = favs.length ? "block" : "none";
  if (favs.length) renderGrid(favouritesGrid, favs);
}

function applyRegionFilter() {
  const region = regionFilter.value;
  const filtered =
    region === "all" ? shelfCountries : shelfCountries.filter(c => c.region === region);
  renderGrid(countryGrid, filtered);
}

// ---------------------------------------------------------------------------
// Load 5 random countries on page load (Promise.all — parallel fetch)
// ---------------------------------------------------------------------------

async function loadRandomCountries() {
  setStatus("Searching...");
  try {
    const names = pickRandomCountries(COUNTRY_POOL, 5);
    const countries = await Promise.all(names.map(fetchCountryByName));

    shelfCountries = countries;
    applyRegionFilter();

    console.table(
      countries.map(c => ({
        name: c.name.common,
        capital: c.capital ? c.capital[0] : "—",
        population: c.population,
        region: c.region
      }))
    );
  } catch (error) {
    console.error("Failed to load random countries:", error);
    countryGrid.innerHTML = `<div class="error-card">Couldn't load the shelf right now. Check your connection and reload.</div>`;
  } finally {
    setStatus("");
  }
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

let lastSearchedCountry = null;

async function handleSearch(rawName) {
  searchResultEl.innerHTML = "";
  setStatus("Searching...");

  try {
    const name = rawName.trim();
    if (!name) {
      throw new EmptySearchError("Type a country name before searching.");
    }

    const country = await fetchCountryByName(name);
    lastSearchedCountry = country;

    searchResultEl.innerHTML = `<div class="grid">${cardHTML(country)}</div>`;
    // wire up the favourite button on the freshly-rendered search card
    searchResultEl.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", () => toggleFavourite(country));
    });

    console.table([{
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "—",
      population: country.population,
      region: country.region
    }]);

  } catch (error) {
    console.error("Search failed:", error);

    if (error instanceof EmptySearchError) {
      searchResultEl.innerHTML = `<div class="error-card">${error.message}</div>`;
    } else if (error.message.includes("404")) {
      searchResultEl.innerHTML = `<div class="error-card">No country found for "${rawName}". Check the spelling and try again.</div>`;
    } else {
      searchResultEl.innerHTML = `<div class="error-card">Something went wrong reaching the atlas. Check your connection and try again.</div>`;
    }
  } finally {
    setStatus("");
  }
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  handleSearch(searchInput.value);
});

regionFilter.addEventListener("change", applyRegionFilter);

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

renderFavourites();
loadRandomCountries();