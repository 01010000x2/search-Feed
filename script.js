// script.js — improved version
// - case-insensitive search (name + bio)
// - debounce on input
// - shows all users when input is empty
// - shows "No results found" when nothing matches
// - small accessibility and performance tweaks (lazy images, alt text)

const users = [
  { name: "amisha rathore", pic: "https://i.pinimg.com/736x/cd/9b/1c/cd9b1cf5b96e8300751f952488d6c002.jpg", bio: "silent chaos in a loud world 🌑🖤 | not for everyone" },
  { name: "amita mehta",   pic: "https://i.pinimg.com/736x/1f/2f/85/1f2f856bf3a020ed8ee9ecb3306ae074.jpg", bio: "main character energy 🎬 | coffee > everything ☕✨" },
  { name: "isha oberoi",    pic: "https://i.pinimg.com/736x/23/48/7e/23487ef1268cfe017047a0640318c0d0.jpg", bio: "walking through dreams in doc martens 💭🖤 | late night thinker" },
  { name: "Ojin Oklawa",    pic: "https://i.pinimg.com/736x/01/be/94/01be94b0b5bf03a50b5d6c4bfec78063.jpg", bio: "too glam to give a damn 💅 | filter free soul" },
  { name: "diya bansal",    pic: "https://i.pinimg.com/736x/74/b0/67/74b067e6c5ece09d99f68c42c5f6754e.jpg", bio: "a little chaos, a lot of art 🎨✨ | just vibes" },
  { name: "tanay rawat",    pic: "https://i.pinimg.com/736x/9b/78/b9/9b78b95425278ee37e88869b8c5fb2c6.jpg", bio: "don’t text, just vibe 🪩 | soft heart, sharp mind" },
  { name: "mohit chhabra",  pic: "https://i.pinimg.com/736x/22/8b/cf/228bcf5a0800f813cd1744d4ccbf01ea.jpg", bio: "aesthetic overload 📸🕊️ | living in lowercase" }
];

const cardsContainer = document.querySelector(".cards");
const inp = document.querySelector(".inp");

// Debounce helper: wait until user stops typing
function debounce(fn, delay = 180) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Build a single card element
function createCard(user) {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("role", "listitem");
  card.tabIndex = 0;

  const img = document.createElement("img");
  img.className = "bg-img";
  img.src = user.pic;
  img.alt = user.name;
  img.loading = "lazy"; // performance: lazy-load images

  const blurredLayer = document.createElement("div");
  blurredLayer.className = "blurred-layer";
  blurredLayer.style.backgroundImage = `url(${user.pic})`;

  const content = document.createElement("div");
  content.className = "content";

  const heading = document.createElement("h3");
  heading.textContent = user.name;

  const para = document.createElement("p");
  para.textContent = user.bio;

  content.appendChild(heading);
  content.appendChild(para);

  card.appendChild(img);
  card.appendChild(blurredLayer);
  card.appendChild(content);

  // Example keyboard action: Enter to trigger click
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter") card.click();
  });

  // Example click action: alert (replace with real navigation/modal)
  card.addEventListener("click", (e) => {
    e.preventDefault();
    alert(`${user.name}\n\n${user.bio}`);
  });

  return card;
}

// Render list of users (array)
function render(list) {
  cardsContainer.innerHTML = ""; // clear previous
  cardsContainer.setAttribute("role", "list");

  if (!list.length) {
    const message = document.createElement("p");
    message.style.color = "rgba(255,255,255,0.8)";
    message.textContent = "No results found.";
    cardsContainer.appendChild(message);
    return;
  }

  // Use DocumentFragment for performance
  const frag = document.createDocumentFragment();
  list.forEach(user => frag.appendChild(createCard(user)));
  cardsContainer.appendChild(frag);
}

// Case-insensitive filter on name and bio
function filterUsers(query) {
  const q = query.trim().toLowerCase();
  if (!q) return users.slice(); // return all if query empty

  return users.filter(u => {
    return u.name.toLowerCase().includes(q) || (u.bio && u.bio.toLowerCase().includes(q));
  });
}

// Input handler (debounced)
const onInput = debounce((e) => {
  const value = e.target.value;
  const matched = filterUsers(value);
  render(matched);
}, 180);

// Init
inp.addEventListener("input", onInput);
render(users); // initial render: show all
