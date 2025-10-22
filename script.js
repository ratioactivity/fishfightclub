// ======= CONFIG =======
const MAX_FISH = 10;
const INITIAL_FISH = 4; // start with four
const ARENA = { w: 0, h: 0 };

const NAME_POOL = [
  "Pico","Soap","Pringle","Mexico","Guantanamo","Arte","Hose","Mingle","Beardgunk","Slayer",
  "Doom","Bruh","Butter Thief","Dust Bowl","Magenta","Varnie","Allosaurus","Utahraptor",
  "Spinosaurus","Widdle","Miku","Noodle","Pico de Gallo","Siberian Guy","Chef","Chernobyl",
  "Crinkle Cut","Dino Nugget","Pinky","Fallout","Tsar Bomba","Marlboro","Ms. Grieves","Angelboots",
  "Javier","Snoop","Bathe","Rat","Soup","Jensen","Reyes","Vzejrin","Azieran","Wableau","Crouton",
  "Bugle","Spounch","Lint","Kevin","Grater","Rebar","Radium","Uranium","Tong","Tonka","Biscuit",
  "Sashimi","Calamari","Sushi","Chutney","Darnell","Hanky","Rickle","Crenshaw","Honda Odyssey",
  "Isotope","Neutrino","Halogen","Joyce","Fanta","Faygo","Queso","Hunger","Opossum","Lore",
  "Necrosis of the Liver","Fish","1997","Myspace","LiveLeak","Free Palestine","Queef","Condom",
  "Mozzarell","Varnish","Weevil","Vaquita","Chad","Thad","Brad","Rad","Vlad","Brady","Brody",
  "Brock","Brent","Brant","Brett","Bront","Brunt","Borst","John Cena","Mystery Liquid","Glass",
  "Glask","Audio Jack","Muffin","Dog1","Dog2","Dog3","Dog4","Dog5","Dog6","Dog7","Poker",
  "Dogs Playing Poker","HTML/JS/CSS","Plausible","Esra","Taro","Squirt","Shasta","Cosmic Brownie",
  "Cannibalism","Kenny","Dribble a Little","Pike","Nether Wart"
];

const TRAITS = [
  "Communist","Capitalist","Anarchist","Liberal","Feminist","Alcoholic","Cannibal","Pees a Lot",
  "Stoner","High","Crack Dealer","Robs Old Ladies","Runs a Non-Profit","Vegan","Vegetarian",
  "Has Alpha-Gal","Has Interstitial Cystitis","Loves Killer Whales","Collects Radium","Has Thin Hair",
  "Petty Thief","Almost His Birthday","Very Confused","In a Hat","Thinks He's Cool","Blind",
  "Hungry as Fuck","Needs Affection","Watches One Piece","Hates Otters","From Whales","Eats Salmon",
  "Wears Polka Dots","Has a Funny Face","Mustache","Looks Like a Creep","Gamer","Bigender",
  "Eats Pringles","Weiner","Has No Genitalia","Has Extra Genitalia","Really Strong Muscles",
  "Hates Red Wine","Was on TV Once","Met JFK","Remembers the Alamo","Future Fish","Didn't Go to College",
  "Gets UTIs Easily","Thinks GoT Season 8 Wasn't That Bad","Christian","Atheist","Catholic","Buddhist",
  "Scientologist","Zoologist","Has Read All of BOTA","Primordial Sun","Wears Too Much Green","Demon?",
  "Ate the Moon","Apex Program","Nuclear Physicist","Hates Chemistry","Doesn't Believe in Giraffes",
  "Allergic to Gluten","Clown Nose","Fights Like a Bitch","Ex-Mafia","Draws Manga","Makes Soap",
  "EEEEEEEEEE","Smells Like Chips","Stays Up Late","Bad Credit Score","Amazing Credit Score","Drinks Espresso",
  "Hates Espresso Drinkers","Pirate","Pirate Hunter","Pirate Hunter Hunter","Pirate Hunter Hunter Hunter",
  "Eats Breakfast","Has Teeth","Doesn't Lick","Dad","Likes Chopsticks","Dances Sometimes","Smiles Weird",
  "Had Braces in 2nd Grade","Lobster Lover","Doesn't Like Indie","Super Rich","John Cena's Biggest Fan"
];

const SPECIES = [
  { key: "angler", defaultSprite: "angler-idle-1.png" },
  { key: "eel", defaultSprite: "eel-idle-1.png" },
  { key: "jelly", defaultSprite: "jelly-idle-1.png" },
  { key: "marlin", defaultSprite: "marlin-idle-1.png" },
  { key: "octi", defaultSprite: "octi-idle-1.png" },
  { key: "turtle", defaultSprite: "turtle-idle-1.png" },
];

const ANIM_FRAMES = {
  angler: {
    attack: ["angler-attack-1.png","angler-attack-2.png","angler-attack-3.png","angler-attack-4.png","angler-attack-5.png","angler-attack-6.png"],
    death:  ["angler-death-1.png","angler-death-2.png","angler-death-3.png","angler-death-4.png","angler-death-5.png","angler-death-6.png"],
    hurt:   ["angler-hurt-1.png","angler-hurt-2.png"],
    idle:   ["angler-idle-1.png","angler-idle-2.png","angler-idle-3.png","angler-idle-4.png"],
    walk:   ["angler-walk-1.png","angler-walk-2.png","angler-walk-3.png","angler-walk-4.png"],
  },

  eel: {
    attack: ["eel-attack-1.png","eel-attack-2.png","eel-attack-3.png","eel-attack-4.png","eel-attack-5.png","eel-attack-6.png"],
    death:  ["eel-death-1.png","eel-death-2.png","eel-death-3.png","eel-death-4.png","eel-death-5.png","eel-death-6.png"],
    hurt:   ["eel-hurt-1.png","eel-hurt-2.png"],
    idle:   ["eel-idle-1.png","eel-idle-2.png","eel-idle-3.png","eel-idle-4.png"],
    walk:   ["eel-walk-1.png","eel-walk-2.png","eel-walk-3.png","eel-walk-4.png","eel-walk-5.png","eel-walk-6.png"],
  },

  jelly: {
    attack: ["jelly-attack-1.png","jelly-attack-2.png","jelly-attack-3.png","jelly-attack-4.png"],
    death:  ["jelly-death-1.png","jelly-death-2.png","jelly-death-3.png","jelly-death-4.png","jelly-death-5.png","jelly-death-6.png"],
    hurt:   ["jelly-hurt-1.png","jelly-hurt-2.png"],
    idle:   ["jelly-idle-1.png","jelly-idle-2.png","jelly-idle-3.png","jelly-idle-4.png"],
    walk:   ["jelly-walk-1.png","jelly-walk-2.png","jelly-walk-3.png","jelly-walk-4.png"],
  },

  marlin: {
    attack: ["marlin-attack-1.png","marlin-attack-2.png","marlin-attack-3.png","marlin-attack-4.png","marlin-attack-5.png","marlin-attack-6.png"],
    death:  ["marlin-death-1.png","marlin-death-2.png","marlin-death-3.png","marlin-death-4.png","marlin-death-5.png","marlin-death-6.png"],
    hurt:   ["marlin-hurt-1.png","marlin-hurt-2.png"],
    idle:   ["marlin-idle-1.png","marlin-idle-2.png","marlin-idle-3.png","marlin-idle-4.png"],
    walk:   ["marlin-walk-1.png","marlin-walk-2.png","marlin-walk-3.png","marlin-walk-4.png"],
  },

  octi: {
    attack: ["octi-attack-1.png","octi-attack-2.png","octi-attack-3.png","octi-attack-4.png","octi-attack-5.png","octi-attack-6.png"],
    death:  ["octi-death-1.png","octi-death-2.png","octi-death-3.png","octi-death-4.png","octi-death-5.png","octi-death-6.png"],
    hurt:   ["octi-hurt-1.png","octi-hurt-2.png"],
    idle:   ["octi-idle-1.png","octi-idle-2.png","octi-idle-3.png","octi-idle-4.png","octi-idle-5.png","octi-idle-6.png"],
    walk:   ["octi-walk-1.png","octi-walk-2.png","octi-walk-3.png","octi-walk-4.png","octi-walk-5.png","octi-walk-6.png"],
  },

  turtle: {
    attack: ["turtle-attack-1.png","turtle-attack-2.png","turtle-attack-3.png","turtle-attack-4.png","turtle-attack-5.png","turtle-attack-6.png"],
    death:  ["turtle-death-1.png","turtle-death-2.png","turtle-death-3.png","turtle-death-4.png","turtle-death-5.png","turtle-death-6.png"],
    hurt:   ["turtle-hurt-1.png","turtle-hurt-2.png"],
    idle:   ["turtle-idle-1.png","turtle-idle-2.png","turtle-idle-3.png","turtle-idle-4.png"],
    walk:   ["turtle-walk-1.png","turtle-walk-2.png","turtle-walk-3.png","turtle-walk-4.png","turtle-walk-5.png","turtle-walk-6.png"],
  },
};

const ANIM_FRAMES = {
  octi:   ["octi-idle-1.png","octi-idle-2.png","octi-idle-3.png","octi-idle-4.png"],
  jelly:  ["jelly-attack-1.png","jelly-attack-2.png","jelly-attack-3.png","jelly-attack-4.png"],
  eel:    ["eel-idle-1.png","eel-idle-2.png","eel-idle-3.png","eel-idle-4.png"],
  marlin: ["marlin-idle-1.png","marlin-idle-2.png","marlin-idle-3.png","marlin-idle-4.png"],
};

const EVENT_ENCOUNTER_CHANCES = {
  passive: { fight: 0.10, breed: 0.10, nothing: 0.80 },
  instigated: { fight: 0.25, breed: 0.25, nothing: 0.50 },
};

const ENCOUNTER_COOLDOWN_MS = 30 * 60 * 1000; // a fish shouldn't trigger > ~2/hr
const INJURY_COOLDOWN_MS = 60 * 60 * 1000;

// ======= STATE =======
const DOM = {
  fishLayer: document.getElementById('fish-layer'),
  emoteLayer: document.getElementById('emote-layer'),
  events: document.getElementById('events'),
  toggleEvents: document.getElementById('toggle-events'),
  toggleInventory: document.getElementById('toggle-inventory'),
  eventsPanel: document.getElementById('events-panel'),
  inventoryPanel: document.getElementById('inventory-panel'),
  fishCount: document.getElementById('fish-count'),
};

let FISH = [];
let INVENTORY = []; // { id, key, name, mode, use: fn } later
let selection = []; // clicked fish ids
let lastTick = performance.now();

// ======= UTILS =======
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const now = () => Date.now();
const fmtTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function logEvent(text) {
  const line = document.createElement('div');
  line.className = 'log-line';
  line.innerHTML = `<span class="timestamp">[${fmtTime()}]</span>${text}`;
  DOM.events.appendChild(line);
  DOM.events.scrollTop = DOM.events.scrollHeight;
}

function emoteAt(x, y, key) {
  const node = document.createElement('div');
  node.className = 'emote';
  const path = `assets/emotes/${key}.gif`;
  // fallback to text if missing image
  node.style.backgroundImage = `url("${path}")`;
  node.dataset.alt = key;
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  DOM.emoteLayer.appendChild(node);
  requestAnimationFrame(() => {
    node.style.opacity = 1;
    node.style.transform = 'translate(-50%, -110%)';
  });
  setTimeout(() => {
    node.style.opacity = 0;
    node.style.transform = 'translate(-50%, -80%)';
    setTimeout(() => node.remove(), 200);
  }, 900);
}

function updateFishCount() {
  DOM.fishCount.textContent = `Fish: ${FISH.length}/${MAX_FISH}`;
}

// ======= FISH =======
let ID_SEQ = 1;

function createFish(opts = {}) {
  const species = opts.species || randChoice(SPECIES);
  const hue = randInt(0, 359);
  const size = opts.size ?? 1.0; // babies start at 0.75
  const x = randInt(32, ARENA.w - 128);
  const y = randInt(32, ARENA.h - 128);
  const name = opts.name || randChoice(NAME_POOL);
  const trait = randChoice(TRAITS);
  const power = opts.power ?? randInt(0, 100);
  const canFightAt = 0;
  const wins = 0;

  const el = document.createElement('div');
  el.className = 'fish';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.filter = `hue-rotate(${hue}deg) saturate(1.25)`;
  el.style.transform = `translate(0,0) scale(${size})`;
  el.style.backgroundImage = `url("assets/sprites/${species.defaultSprite}")`;
  el.addEventListener('click', () => onFishClick(fish.id));

  const fish = {
    id: ID_SEQ++,
    name, trait, power,
    species: species.key,
    sprite: species.defaultSprite,
    hue, size,
    x, y,
    vx: (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1),
    vy: (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1),
    pauseUntil: 0,
    lastEncounterAt: 0,
    canFightAt,
    wins,
    growthEndAt: opts.growthEndAt || null, // babies grow to 1.0 over time
    dead: false,
    el,
  };

  DOM.fishLayer.appendChild(el);
  FISH.push(fish);
  updateFishCount();
  logEvent(`${fish.name} spawned (${fish.species}, trait: ${fish.trait}).`);
  return fish;
}

function removeFish(fish) {
  fish.dead = true;
  fish.el.remove();
  FISH = FISH.filter(f => f.id !== fish.id);
  updateFishCount();
}

// ======= INPUT =======
function onFishClick(id) {
  const f = FISH.find(x => x.id === id);
  if (!f) return;
  selection.push(f);
  const rect = f.el.getBoundingClientRect();
  emoteAt(rect.left + rect.width/2, rect.top + rect.height/2, 'bubble');

  if (selection.length === 2) {
    const [a, b] = selection;
    selection = [];
    if (a.id !== b.id) {
      triggerEncounter(a, b, 'instigated');
    }
  }
}

// ======= ENCOUNTERS =======
function canPassiveEncounter(f) {
  // prevent spamming: at most ~every 30 minutes per fish
  return (now() - f.lastEncounterAt) > ENCOUNTER_COOLDOWN_MS;
}

function triggerEncounter(a, b, mode = 'passive') {
  if (a.dead || b.dead) return;

  if (mode === 'passive' && (!canPassiveEncounter(a) || !canPassiveEncounter(b))) return;

  const odds = EVENT_ENCOUNTER_CHANCES[mode];
  const roll = Math.random();
  let outcome = 'nothing';
  if (roll < odds.fight) outcome = 'fight';
  else if (roll < odds.fight + odds.breed) outcome = 'breed';

  const center = midpoint(a, b);
  if (outcome === 'fight') {
    emoteAt(center.x, center.y, 'fight');
    handleFight(a, b);
  } else if (outcome === 'breed') {
    emoteAt(center.x, center.y, 'love');
    handleBreed(a, b);
  } else {
    emoteAt(center.x, center.y, 'fail');
    logEvent(`${a.name} bumped into ${b.name}. Nothing happened.`);
  }

  a.lastEncounterAt = now();
  b.lastEncounterAt = now();
}

function midpoint(a, b) {
  const ra = a.el.getBoundingClientRect();
  const rb = b.el.getBoundingClientRect();
  return {
    x: (ra.left + ra.width/2 + rb.left + rb.width/2) / 2,
    y: (ra.top + ra.height/2 + rb.top + rb.height/2) / 2,
  };
}

function handleFight(a, b) {
  if (now() < a.canFightAt || now() < b.canFightAt) {
    logEvent(`Fight fizzled (cooldown).`);
    return;
  }
  const A = a.power;
  const B = b.power;
  let winner = a, loser = b;
  if (B > A) { winner = b; loser = a; }
  logEvent(`${winner.name} fought ${loser.name} — ${winner.name} wins!`);

  // winner item drop (Phase 2 adds real items; for now log only)
  winner.wins = (winner.wins || 0) + 1;
  if (winner.wins >= 10) {
    logEvent(`${winner.name} achieved 10 wins! Spawning 3 children… then perishes.`);
    for (let i = 0; i < 3; i++) spawnBaby(winner, randChoice([a, b]));
    killFish(winner, /*silent*/false);
    return;
  }

  // loser 50% death, else injured
  if (Math.random() < 0.5) {
    killFish(loser);
  } else {
    emoteAtCenterOf(loser, 'cry');
    loser.canFightAt = now() + INJURY_COOLDOWN_MS;
    logEvent(`${loser.name} survived but is injured (no fights for 1 hour).`);
  }
}

function killFish(fish, silent=false) {
  removeFish(fish);
  emoteAtLastPos(fish, 'death');
  if (!silent) logEvent(`${fish.name} has died.`);
}

function emoteAtCenterOf(fish, key) {
  const r = fish.el.getBoundingClientRect();
  emoteAt(r.left + r.width/2, r.top + r.height/2, key);
}
function emoteAtLastPos(fish, key) {
  // try using last known el rect, else use x/y
  try {
    const r = fish.el.getBoundingClientRect();
    emoteAt(r.left + r.width/2, r.top + r.height/2, key);
  } catch {
    emoteAt(fish.x, fish.y, key);
  }
}

function handleBreed(a, b) {
  // 25% chance to spawn a baby
  if (Math.random() < 0.25 && FISH.length < MAX_FISH) {
    const biasSpecies = Math.random() < 0.5 ? a.species : b.species;
    const parentSpecObj = SPECIES.find(s => s.key === biasSpecies) || randChoice(SPECIES);
    const baby = createFish({
      species: parentSpecObj,
      size: 0.75,
      power: randInt(0, 100),
      growthEndAt: now() + 24*60*60*1000,
      name: null, // random
    });
    emoteAtCenterOf(baby, 'newfish');
    logEvent(`A new ${baby.species} was born! (smol)`);
  } else {
    // unsuccessful
    const center = midpoint(a, b);
    emoteAt(center.x, center.y, 'cry');
    logEvent(`Breeding attempt between ${a.name} and ${b.name} failed.`);
  }
}

// ======= MOVEMENT / TICK =======
function tick(ts) {
  const dt = Math.min(32, ts - lastTick); // clamp
  lastTick = ts;

  for (const f of FISH) {
    if (f.dead) continue;

    // random pauses
    if (f.pauseUntil > ts) {
      // still paused
    } else if (Math.random() < 0.002) {
      f.pauseUntil = ts + randInt(600, 2000);
    } else {
      // move
      f.x += f.vx;
      f.y += f.vy;

      // bounce
      const w = 96 * f.size, h = 96 * f.size;
      if (f.x < 8 || f.x > ARENA.w - w - 8) f.vx *= -1;
      if (f.y < 8 || f.y > ARENA.h - h - 8) f.vy *= -1;

      // slight drift changes
      if (Math.random() < 0.01) f.vx += (Math.random() - 0.5) * 0.2;
      if (Math.random() < 0.01) f.vy += (Math.random() - 0.5) * 0.2;
      f.vx = Math.max(-1.3, Math.min(1.3, f.vx));
      f.vy = Math.max(-1.3, Math.min(1.3, f.vy));
    }

    // growth
    if (f.growthEndAt && now() < f.growthEndAt) {
      const p = 1 - (f.growthEndAt - now()) / (24*60*60*1000);
      f.size = 0.75 + Math.max(0, Math.min(1, p)) * 0.25; // to 1.0
    } else {
      f.growthEndAt = null;
      if (f.size < 1) f.size = 1;
    }

    // render
    f.el.style.left = `${f.x}px`;
    f.el.style.top = `${f.y}px`;
    const facing = f.vx >= 0 ? 1 : -1;
    f.el.style.transform = `scale(${f.size * facing}, ${f.size})`;
    
    // [START ANIMATION SNIPPET]
    if (!f.nextFrameAt || ts > f.nextFrameAt) {
      const anims = ANIM_FRAMES[f.species] || {};
      const frames = anims.walk || [f.sprite];
      if (!f.animIndex) f.animIndex = 0;

      const moving = Math.abs(f.vx) + Math.abs(f.vy) > 0.2;
      if (moving) {
        f.animIndex = (f.animIndex + 1) % frames.length;
        f.el.style.backgroundImage = `url("assets/sprites/${frames[f.animIndex]}")`;
    }
    f.nextFrameAt = ts + (moving ? 160 : 600);
  }
  // [END ANIMATION SNIPPET]

  }

  // passive collisions
  for (let i = 0; i < FISH.length; i++) {
    for (let j = i+1; j < FISH.length; j++) {
      const a = FISH[i], b = FISH[j];
      if (a.dead || b.dead) continue;
      if (rectsOverlap(a.el, b.el)) {
        if (Math.random() < 0.003) { // occasionally treat as encounterable bump
          triggerEncounter(a, b, 'passive');
        }
      }
    }
  }
  
  requestAnimationFrame(tick);
}

function rectsOverlap(aEl, bEl) {
  const ra = aEl.getBoundingClientRect();
  const rb = bEl.getBoundingClientRect();
  return !(ra.right < rb.left || ra.left > rb.right || ra.bottom < rb.top || ra.top > rb.bottom);
}

// ======= BABIES =======
function spawnBaby(parentA, parentB) {
  const pref = SPECIES.find(s => s.key === parentA.species) || randChoice(SPECIES);
  return createFish({
    species: pref,
    size: 0.75,
    growthEndAt: now() + 24*60*60*1000,
  });
}

// ======= BOOT =======
function boot() {
  const aq = document.getElementById('aquarium');
  ARENA.w = aq.clientWidth;
  ARENA.h = aq.clientHeight;

  DOM.toggleEvents.addEventListener('click', () => {
    DOM.eventsPanel.classList.toggle('hidden');
  });
  DOM.toggleInventory.addEventListener('click', () => {
    DOM.inventoryPanel.classList.toggle('hidden');
  });

  for (let i = 0; i < INITIAL_FISH; i++) createFish();

  requestAnimationFrame((t) => { lastTick = t; tick(t); });
}

window.addEventListener('load', boot);
window.addEventListener('resize', () => {
  const aq = document.getElementById('aquarium');
  ARENA.w = aq.clientWidth;
  ARENA.h = aq.clientHeight;
});
