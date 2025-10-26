window.revealPowerEffect = function ({ fish, item, logEvent }) {
  if (!fish) {
    logEvent(`${item.name} fizzles — you must click a fish next time.`);
    return;
  }
  if (fish.powerRevealed) {
    logEvent(`${fish.name}'s power is already known (${fish.power}).`);
    return;
  }
  fish.powerRevealed = true;
  updateFishTitle(fish);
  logEvent(`${fish.name}'s power is revealed: ${fish.power}.`);
};

// ======= CONFIG =======
const MAX_FISH = 10;
const INITIAL_FISH = 4;
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

// Species and default thumbnails
const SPECIES = [
  { key: "angler", defaultSprite: "angler-idle-1.png" },
  { key: "eel",    defaultSprite: "eel-idle-1.png" },
  { key: "jelly",  defaultSprite: "jelly-idle-1.png" },
  { key: "marlin", defaultSprite: "marlin-idle-1.png" },
  { key: "octi",   defaultSprite: "octi-idle-1.png" },
  { key: "turtle", defaultSprite: "turtle-idle-1.png" },
];

// Full animation maps (adjust file names to what’s in assets/sprites)
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

const EVENT_ENCOUNTER_CHANCES = {
  passive:    { fight: 0.10, breed: 0.10, nothing: 0.80 },
  instigated: { fight: 0.25, breed: 0.25, nothing: 0.50 },
};

const ENCOUNTER_COOLDOWN_MS = 30 * 60 * 1000; // per fish — prevents >2/hr-ish
const INJURY_COOLDOWN_MS    = 60 * 60 * 1000;

const EMOTE_SIZES = {
  bubble: 74,
  fail: 74,
  love: 74,
  death: 96,
  cry: 96,
  fight: 112,
};

// ======= STATE =======
const DOM = {
  fishLayer: document.getElementById('fish-layer'),
  emoteLayer: document.getElementById('emote-layer'),
  events: document.getElementById('events'),
  toggleEvents: document.getElementById('toggle-events'),
  toggleInventory: document.getElementById('toggle-inventory'),
  eventsPanel: document.getElementById('events-panel'),
  inventoryPanel: document.getElementById('inventory-panel'),
  inventoryList: document.getElementById('inventory'),
  fishCount: document.getElementById('fish-count'),
};

function togglePowerView() {
  SHOW_ALL_POWER = !SHOW_ALL_POWER;
  for (const f of FISH) updateFishTitle(f);
  logEvent(SHOW_ALL_POWER ? "Cheat: Power display ON" : "Cheat: Power display OFF");
}

let FISH = [];
let INVENTORY = [];
let selection = [];
let lastTick = performance.now();
let pendingSavedItem = null;
let inventoryPulseTimeout = null;
let SHOW_ALL_POWER = false;

// ======= ITEMS / INVENTORY CONFIG =======
const ITEM_ASSET_PATH = 'assets/items';

// Helper: format readable names from filenames ("foo_bar" → "Foo Bar").
const prettifyItemName = (fileName) => {
  const base = fileName.replace(/\.png$/i, '').replace(/[_-]+/g, ' ');
  return base.replace(/\b([a-z])/g, (m, ch) => ch.toUpperCase());
};

// Full catalog of available item asset files.
const ITEM_FILES = [
  'American_cheese.png',
  'angler.png',
  'bacon.png',
  'barbeque_sauce.png',
  'batteries.png',
  'bell_pepper.png',
  'body_lotion.png',
  'bubble_gum.png',
  'butter.png',
  'cabbage.png',
  'candy_bar.png',
  'cereal.png',
  'coffee_bag.png',
  'cookies.png',
  'credit_card.png',
  'detergent.png',
  'egg.png',
  'eraser.png',
  'frying pan.png',
  'glue.png',
  'hyena.png',
  'jam.png',
  'ketchup.png',
  'light_bulb.png',
  'marshmallows.png',
  'meat.png',
  'meerkat.png',
  'mustard.png',
  'orca.png',
  'potatochip.png',
  'rubber_duck.png',
  'salmon.png',
  'soap.png',
  'spatula.png',
  'water.png',
  'wet_wipe.png',
  'white_cheese.png',
  'wilddog.png',
];

const buildDefaultItemDefinition = ({ key, file, name }) => ({
  key,
  file,
  name,
  // Default use type: Known Use (message visible on activation). Individual
  // items can override this once their specific behavior is authored.
  useType: 'KU',
  messageGet: (ctx = {}) => {
    const victor = ctx.winnerName || 'your champion';
    return `You obtained ${name} after ${victor}'s victory!`;
  },
  messageUse: `${name} was used.`,
});

const buildBaseDefinitionFromFile = (fileName) => {
  const key = fileName
    .replace(/\.png$/i, '')
    .replace(/\s+/g, '_')
    .toLowerCase();
  const displayName = prettifyItemName(fileName);
  return buildDefaultItemDefinition({ key, file: fileName, name: displayName });
};

const BASE_ITEM_DEFINITIONS = ITEM_FILES.map(buildBaseDefinitionFromFile);

function readCustomItemData() {
  if (typeof window !== 'undefined' && window.CUSTOM_ITEM_DATA && Object.keys(window.CUSTOM_ITEM_DATA).length > 0) {
    return window.CUSTOM_ITEM_DATA;
  }
  if (typeof globalThis !== 'undefined' && globalThis.CUSTOM_ITEM_DATA && typeof globalThis.CUSTOM_ITEM_DATA === 'object') {
    return globalThis.CUSTOM_ITEM_DATA;
  }
  if (typeof CUSTOM_ITEM_DATA !== 'undefined') {
    return CUSTOM_ITEM_DATA;
  }
  return {};
}

function mergeDefinition(base, overrides) {
  if (!overrides) return { ...base };
  const merged = { ...base };

  for (const [prop, value] of Object.entries(overrides)) {
    if (value !== undefined) merged[prop] = value;
  }

  // Explicitly ensure descriptions and useInfo persist
  if (overrides.description && !merged.description) merged.description = overrides.description;
  if (overrides.useInfo && !merged.useInfo) merged.useInfo = overrides.useInfo;
  return merged;
}

function createDefaultDefinitionForKey(key, overrides = {}) {
  const file = overrides.file || `${key}.png`;
  const name = overrides.name || prettifyItemName(file);
  const base = buildDefaultItemDefinition({ key, file, name });
  return mergeDefinition(base, overrides);
}

function buildItemCatalog() {
  const customData = readCustomItemData() || {};
  const catalog = BASE_ITEM_DEFINITIONS.map((base) => mergeDefinition(base, customData[base.key]));

  for (const [key, overrides] of Object.entries(customData)) {
    if (catalog.some((entry) => entry.key === key)) continue;
    catalog.push(createDefaultDefinitionForKey(key, overrides));
  }

  return catalog;
}

let ITEM_ID_SEQ = 1;

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

// ======= INVENTORY HELPERS =======

/**
 * Generate a runtime item instance from a catalog entry. Future phases can add
 * richer data (effects, custom messaging) by extending the definition object.
 */
function createItemInstance(definition, context = {}) {
  const iconPath = `${ITEM_ASSET_PATH}/${encodeURIComponent(definition.file)}`;
  const item = {
    id: ITEM_ID_SEQ++,
    key: definition.key,
    name: definition.name,
    icon: iconPath,
    useType: definition.useType || 'KU',
    definition,
    state: 'idle',
    context,
    description: definition.description || '',
    messageGet: typeof definition.messageGet === 'function'
      ? definition.messageGet(context)
      : (definition.messageGet || `You obtained ${definition.name}.`),
    messageUse: typeof definition.messageUse === 'function'
      ? definition.messageUse(context)
      : (definition.messageUse || `${definition.name} was used.`),
  };
  return item;
}

function updateInventoryTooltip(item) {
  const el = item.itemEl || item.el;
  if (!el) return;

  let tooltipText = `${item.name}`;
  const description = item.description
    || (item.definition && item.definition.description)
    || '';

  if (description) tooltipText += `\n${description}`;
  if (item.useType === 'KU' && item.definition?.useInfo) {
    tooltipText += `\nEffect: ${item.definition.useInfo}`;
  }

  el.title = tooltipText.trim();
}

function applyDefinitionToItem(item, definition) {
  item.definition = definition;
  item.name = definition.name || item.name;
  item.useType = definition.useType || item.useType || 'KU';
  if (definition.description) item.description = definition.description;
  if (definition.useInfo) item.useInfo = definition.useInfo;


  if (definition.file) {
    item.icon = `${ITEM_ASSET_PATH}/${encodeURIComponent(definition.file)}`;
    if (item.iconEl) {
      item.iconEl.style.backgroundImage = `url("${item.icon}")`;
    }
  }

  const context = item.context || {};
  item.messageUse = typeof definition.messageUse === 'function'
    ? definition.messageUse(context)
    : (definition.messageUse || `${item.name} was used.`);

  if (item.labelEl && item.name) {
    item.labelEl.textContent = item.name;
  }

  updateInventoryTooltip(item);
}

function hydrateItemFromCatalog(item, catalog = null) {
  const sourceCatalog = catalog || buildItemCatalog();
  const definition = sourceCatalog.find((entry) => entry.key === item.key);
  if (!definition) return;
  applyDefinitionToItem(item, definition);
}

function refreshInventoryDefinitions(existingCatalog = null) {
  if (!INVENTORY.length) return;
  const catalog = existingCatalog || buildItemCatalog();
  for (const item of INVENTORY) {
    hydrateItemFromCatalog(item, catalog);
  }
}

function installCustomItemDataObserver() {
  if (typeof window === 'undefined') return;

  const installPollingFallback = () => {
    let lastRef = readCustomItemData();
    setInterval(() => {
      const latest = readCustomItemData();
      if (latest !== lastRef) {
        lastRef = latest;
        refreshInventoryDefinitions();
      }
    }, 1200);
  };

  const descriptor = Object.getOwnPropertyDescriptor(window, 'CUSTOM_ITEM_DATA');
  if (!descriptor || descriptor.configurable) {
    let current = readCustomItemData();
    try {
      Object.defineProperty(window, 'CUSTOM_ITEM_DATA', {
        configurable: true,
        enumerable: true,
        get() {
          return current;
        },
        set(value) {
          current = (value && typeof value === 'object') ? value : {};
          refreshInventoryDefinitions();
        },
      });
      if (descriptor && descriptor.set) {
        descriptor.set.call(window, current);
      }
      if (current && typeof current === 'object') {
        refreshInventoryDefinitions();
      }
    } catch (err) {
      console.warn('Falling back to polling for CUSTOM_ITEM_DATA updates.', err);
      installPollingFallback();
    }
  } else {
    installPollingFallback();
  }
}

installCustomItemDataObserver();
console.log("Loaded CUSTOM_ITEM_DATA:", readCustomItemData());

/**
 * Refresh the inventory button label/count and optionally pulse it when new
 * loot drops so players notice immediately.
 */
function updateInventoryUIState({ highlightNew = false } = {}) {
  if (!DOM.toggleInventory) return;

  const count = INVENTORY.length;
  DOM.toggleInventory.textContent = count > 0
    ? `Inventory (${count})`
    : 'Inventory';

  if (count > 0) {
    DOM.toggleInventory.classList.add('has-items');
  } else {
    DOM.toggleInventory.classList.remove('has-items');
  }

  if (highlightNew) {
    DOM.toggleInventory.classList.add('inventory-button--pulse');
    if (inventoryPulseTimeout) clearTimeout(inventoryPulseTimeout);
    inventoryPulseTimeout = setTimeout(() => {
      DOM.toggleInventory.classList.remove('inventory-button--pulse');
      inventoryPulseTimeout = null;
    }, 1600);
  }
}

/**
 * Add an item to the inventory state + DOM, wiring up the click handler that
 * funnels into useItem().
 */
function addToInventory(item) {
  INVENTORY.push(item);

  if (!DOM.inventoryList) {
    if (item.messageGet) logEvent(item.messageGet);
    updateInventoryUIState({ highlightNew: true });
    return;
  }

  const entry = document.createElement('button');
  entry.type = 'button';
  entry.className = 'inventory-item';
  entry.dataset.itemId = item.id;

  const icon = document.createElement('span');
  icon.className = 'inventory-item__icon';
  icon.style.backgroundImage = `url("${item.icon}")`;

  const label = document.createElement('span');
  label.className = 'inventory-item__name';
  label.textContent = item.name;

  entry.appendChild(icon);
  entry.appendChild(label);

 // Build tooltip text
let tooltipText = `${item.name}`;
if (item.description) tooltipText += `\n${item.description}`;
if (item.definition?.useInfo) tooltipText += `\nEffect: ${item.definition.useInfo}`;
entry.title = tooltipText.trim();
  
entry.addEventListener('click', () => useItem(item.id));

DOM.inventoryList.appendChild(entry);
item.el = entry;
item.itemEl = entry;
item.iconEl = icon;
item.labelEl = label;

hydrateItemFromCatalog(item);

if (item.messageGet) logEvent(item.messageGet);
updateInventoryUIState({ highlightNew: true });
}

/**
 * Remove an item from inventory arrays/DOM.
 */
function removeItemFromInventory(item) {
  INVENTORY = INVENTORY.filter((entry) => entry.id !== item.id);
  const el = item.itemEl || item.el;
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
  updateInventoryUIState();
}

/**
 * When a Save-For-Later item is primed but a different one is chosen, tidy up
 * the previous selection so the UI state stays accurate.
 */
function cancelPendingItem() {
  if (!pendingSavedItem) return;
  pendingSavedItem.state = 'idle';
  const el = pendingSavedItem.itemEl || pendingSavedItem.el;
  if (el) {
    el.classList.remove('inventory-item--pending');
  }
  pendingSavedItem = null;
}

/**
 * Core dispatcher: invoked when an inventory item is clicked. Handles each
 * supported item use type (IU/SFL/SU/HU/KU).
 */
function useItem(itemRef) {
  const item = typeof itemRef === 'object'
    ? itemRef
    : INVENTORY.find((entry) => entry.id === itemRef);
  if (!item) return;

  hydrateItemFromCatalog(item);

  // Ensure only one Save-For-Later item is staged at a time.
  if (pendingSavedItem && pendingSavedItem.id !== item.id) {
    cancelPendingItem();
  }

  switch ((item.useType || 'KU').toUpperCase()) {
    case 'SFL': {
      if (item.state === 'awaiting-target') {
        // Clicking again cancels the readied state.
        cancelPendingItem();
        logEvent(`${item.name} is no longer readied.`);
        return;
      }
      pendingSavedItem = item;
      item.state = 'awaiting-target';
      const el = item.itemEl || item.el;
      if (el) {
        el.classList.add('inventory-item--pending');
      }
      logEvent(`${item.name} will apply to the next fish you click.`);
      break;
    }
    case 'IU':
    case 'HU':
    case 'KU': {
      applyItemEffect(item, null);
      finalizeItemUse(item, { showMessage: true, targetFish: null });
      break;
    }
    case 'SU': {
      applyItemEffect(item, null);
      finalizeItemUse(item, { showMessage: false, targetFish: null });
      break;
    }
    default: {
      // Unknown types fall back to a known-use behavior so the item isn't
      // stranded. This can be tightened once all items have proper metadata.
      applyItemEffect(item, null);
      finalizeItemUse(item, { showMessage: true, targetFish: null });
    }
  }
}

/**
 * Wrap up item usage: clear DOM, optionally show its message, and forget any
 * staged Save-For-Later reference.
 */
function finalizeItemUse(item, { showMessage = true, targetFish = null } = {}) {
  if (pendingSavedItem && pendingSavedItem.id === item.id) {
    pendingSavedItem = null;
  }
  const el = item.itemEl || item.el;
  if (el) {
    el.classList.remove('inventory-item--pending');
  }
  removeItemFromInventory(item);

  if (showMessage && item.messageUse) {
    const message = typeof item.messageUse === 'function'
      ? item.messageUse({ item, fish: targetFish })
      : item.messageUse;
    logEvent(message);
  }
}

function revealPowerEffect({ fish, item, logEvent }) {
  if (!fish) {
    logEvent(`${item.name} fizzles — you must click a fish next time.`);
    return;
  }
  if (fish.powerRevealed) {
    logEvent(`${fish.name}'s power is already known (${fish.power}).`);
    return;
  }
  fish.powerRevealed = true;
  updateFishTitle(fish);
  logEvent(`${fish.name}'s power is revealed: ${fish.power}.`);
}

/**
 * Execute the item's gameplay effect. The actual stat adjustments will be
 * defined later; for now we call into an optional effect function so Phase 4
 * can slot in seamlessly when details arrive.
 */
function applyItemEffect(item, fish) {
  if (item.definition && typeof item.definition.effect === 'function') {
    try {
      item.definition.effect({ item, fish, FISH, logEvent });
    } catch (err) {
      console.error('Error applying item effect', err);
      logEvent(`Something went wrong while using ${item.name}.`);
    }
  }
}

/**
 * Roll a random item reward and drop it straight into the player's inventory.
 */
function awardRandomItemForVictory(winner) {
  const catalog = buildItemCatalog();
  if (!catalog.length) return;
  const definition = randChoice(catalog);
  const item = createItemInstance(definition, { winnerName: winner.name });
  addToInventory(item);
  refreshInventoryDefinitions(catalog);
}

function emoteAt(x, y, key) {
  const node = document.createElement('div');
  node.className = 'emote';
  node.classList.add(`emote--${key}`);
  node.style.backgroundImage = `url("assets/emotes/${key}.gif")`;
  const size = EMOTE_SIZES[key] ?? 96;
  node.style.width = `${size}px`;
  node.style.height = `${size}px`;
  node.style.left = `${x}px`;
  node.style.top  = `${y}px`;
  DOM.emoteLayer.appendChild(node);
  // rise + fade
  requestAnimationFrame(() => {
    node.style.opacity = 1;
    node.style.transform = 'translate(-50%, -70%)';
  });
  setTimeout(() => {
    node.style.opacity = 0;
    node.style.transform = 'translate(-50%, -40%)';
    setTimeout(() => node.remove(), 220);
  }, 1000);
}

function emoteAtCenterOf(fish, key) {
  const r = fish.el.getBoundingClientRect();
  emoteAt(r.left + r.width/2, r.top + r.height/2, key);
}

function updateFishCount() {
  DOM.fishCount.textContent = `Fish: ${FISH.length}/${MAX_FISH}`;
}

// ======= FISH =======
let ID_SEQ = 1;

function createFish(opts = {}) {
  const species = opts.species || randChoice(SPECIES);
  const hue     = randInt(0, 359);
  const size    = opts.size ?? 1.0;
  const x       = randInt(32, Math.max(40, ARENA.w - 128));
  const y       = randInt(32, Math.max(40, ARENA.h - 128));
  const name    = opts.name || randChoice(NAME_POOL);
  const trait   = randChoice(TRAITS);
  const power = opts.power ?? randInt(20, 99); // never 100

  const el = document.createElement('div');
  el.className = 'fish';
  el.style.left = `${x}px`;
  el.style.top  = `${y}px`;
  el.style.transform = `translate(0,0) scale(${size})`;
  el.style.filter = `hue-rotate(${hue}deg) saturate(1.25)`;
  el.style.backgroundImage = `url("assets/sprites/${species.defaultSprite}")`;
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
    canFightAt: 0,
    wins: 0,
    fightsWon: 0,
    fightsLost: 0,
    growthEndAt: opts.growthEndAt || null,
    mode: 'walk',        // animation mode: walk|idle|attack|hurt|death
    dead: false,
    powerRevealed: Boolean(opts.powerRevealed),
    el,
  };

  updateFishTitle(fish);

  el.addEventListener('click', () => onFishClick(fish.id));

  DOM.fishLayer.appendChild(el);
  FISH.push(fish);
  updateFishCount();
  logEvent(`${fish.name} spawned (${fish.species}, trait: ${fish.trait}).`);
  return fish;
}

function updateFishTitle(fish) {
  if (!fish || !fish.el) return;
  const lines = [`${fish.name} — ${fish.trait}`];
  const wins = fish.fightsWon || 0;
  const losses = fish.fightsLost || 0;

  if (wins > 0 || losses > 0) {
    lines.push(`Fights: ${wins} W / ${losses} L`);
  }

  // Show power if revealed OR cheat is active
  if (fish.powerRevealed || SHOW_ALL_POWER) {
    lines.push(`Power: ${fish.power}`);
  }

  fish.el.title = lines.join('\n');
}

function revealFishPower(fish) {
  if (!fish || fish.powerRevealed) return;
  fish.powerRevealed = true;
  updateFishTitle(fish);
  logEvent(`${fish.name}'s power is ${fish.power}.`);
}

function removeFish(fish) {
  FISH = FISH.filter(f => f.id !== fish.id);
  updateFishCount();
  fish.el.remove();
}

// ======= INPUT (instigated encounters) =======
function onFishClick(id) {
  const f = FISH.find(x => x.id === id);
  if (!f) return;

  // Consume staged Save-For-Later items instead of starting a selection.
  if (pendingSavedItem) {
    const item = pendingSavedItem;
    pendingSavedItem = null;
    item.state = 'consumed';
    applyItemEffect(item, f);
    finalizeItemUse(item, { showMessage: item.useType !== 'SU', targetFish: f });
    return;
  }

  selection.push(f);
  emoteAtCenterOf(f, 'bubble');

  if (selection.length === 2) {
    const [a, b] = selection;
    selection = [];
    if (a.id !== b.id) triggerEncounter(a, b, 'instigated');
  }
}

// ======= ENCOUNTERS =======
function canPassiveEncounter(f) {
  return (now() - f.lastEncounterAt) > ENCOUNTER_COOLDOWN_MS;
}

function triggerEncounter(a, b, mode = 'passive') {
  if (a.dead || b.dead) return;
  if (mode === 'passive' && (!canPassiveEncounter(a) || !canPassiveEncounter(b))) return;

  const odds = EVENT_ENCOUNTER_CHANCES[mode];
  const roll = Math.random();

  let outcome = 'nothing';
  if      (roll < odds.fight) outcome = 'fight';
  else if (roll < odds.fight + odds.breed) outcome = 'breed';

  const center = midpoint(a, b);
  if (outcome === 'fight') {
    emoteAt(center.x, center.y, 'fight');
    handleFight(a, b);
    flashText && flashText('FIGHT!', 'red');
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
    y: (ra.top  + ra.height/2 + rb.top  + rb.height/2) / 2,
  };
}

function handleFight(a, b) {
  if (now() < a.canFightAt || now() < b.canFightAt) {
    logEvent(`Fight fizzled (injury cooldown).`);
    return;
  }

  // Weighted chance: higher power gives advantage, but not guarantee.
  const total = a.power + b.power;
  const roll = Math.random() * total;
  const winner = (roll < a.power) ? a : b;
  const loser  = (winner === a) ? b : a;

  winner.fightsWon = (winner.fightsWon || 0) + 1;
  loser.fightsLost = (loser.fightsLost || 0) + 1;
  updateFishTitle(winner);
  updateFishTitle(loser);

  setMode(winner, 'attack', 400);
  setMode(loser,  'hurt',   400);

  logEvent(`${winner.name} (${winner.species}) defeated ${loser.name} (${loser.species})!`);

  // ✅ Only one reward
  awardRandomItemForVictory(winner);
  
  winner.wins = (winner.wins || 0) + 1;
  if (winner.wins >= 10) {
    logEvent(`${winner.name} achieved 10 wins! Spawning 3 children… then perishes.`);
    for (let i = 0; i < 3; i++) spawnBaby(winner, randChoice([a, b]));
    killFish(winner, false);
    return;
  }

  if (Math.random() < 0.5) {
    killFish(loser);
  } else {
    emoteAtCenterOf(loser, 'cry');
    loser.canFightAt = now() + INJURY_COOLDOWN_MS;
    logEvent(`${loser.name} survived but is injured (no fights for 1 hour).`);
  }
}

function killFish(fish, silent=false) {
  // dramatic flash + fade
  fish.mode = 'death';
  emoteAtCenterOf(fish, 'death');

  fish.el.style.transition = 'filter 300ms ease, opacity 320ms ease 220ms';
  fish.el.style.filter = 'brightness(2.2) saturate(0.2)';
  setTimeout(() => {
    fish.el.style.opacity = '0';
    setTimeout(() => {
      if (!silent) logEvent(`${fish.name} has died.`);
      fish.dead = true;
      removeFish(fish);
    }, 340);
  }, 200);
}

function handleBreed(a, b) {
  if (Math.random() < 0.25 && FISH.length < MAX_FISH) {
    const biasSpecies = Math.random() < 0.5 ? a.species : b.species;
    const parentSpecObj = SPECIES.find(s => s.key === biasSpecies) || randChoice(SPECIES);
    const baby = createFish({
      species: parentSpecObj,
      size: 0.75,
      power: randInt(0, 100),
      growthEndAt: now() + 24*60*60*1000,
      name: null,
    });
    emoteAtCenterOf(baby, 'newfish');
    logEvent(`A new ${baby.species} was born! (smol)`);
  } else {
    const center = midpoint(a, b);
    emoteAt(center.x, center.y, 'cry');
    logEvent(`Breeding attempt between ${a.name} and ${b.name} failed.`);
  }
}

// ======= ANIMATION MODE HELPERS =======
function setMode(fish, mode, revertAfterMs = null) {
  fish.mode = mode;
  fish.animIndex = 0;
  fish.nextFrameAt = 0;
  if (revertAfterMs) {
    setTimeout(() => {
      if (!fish.dead) { fish.mode = 'walk'; fish.animIndex = 0; }
    }, revertAfterMs);
  }
}

// ======= MOVEMENT / TICK =======
function tick(ts) {
  const dt = Math.min(32, ts - lastTick);
  lastTick = ts;

  for (const f of FISH) {
    if (f.dead) continue;

    // random pauses
    if (f.pauseUntil > ts) {
      f.mode = 'idle';
    } else if (Math.random() < 0.002) {
      f.pauseUntil = ts + randInt(600, 2000);
      f.mode = 'idle';
    } else {
      // move
      f.x += f.vx;
      f.y += f.vy;
      f.mode = 'walk';

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

    // render position + facing
    f.el.style.left = `${f.x}px`;
    f.el.style.top  = `${f.y}px`;
    const facing = f.vx >= 0 ? 1 : -1;
    f.el.style.transform = `scale(${f.size * facing}, ${f.size})`;

    // --- sprite animation (walk vs idle vs attack/hurt/death) ---
    if (!f.nextFrameAt || ts > f.nextFrameAt) {
      const anims = ANIM_FRAMES[f.species] || {};
      const frames = (anims[f.mode] || anims.walk || [f.sprite]);
      if (!f.animIndex) f.animIndex = 0;

      // only advance frames if there's >1 frame OR if moving
      const moving = Math.abs(f.vx) + Math.abs(f.vy) > 0.2;
      if (frames.length > 1 && (moving || f.mode !== 'walk')) {
        f.animIndex = (f.animIndex + 1) % frames.length;
      }
      f.el.style.backgroundImage = `url("assets/sprites/${frames[f.animIndex]}")`;
      f.nextFrameAt = ts + (f.mode === 'walk' ? 260 : 300);
    }
  }

  // passive collisions → occasional encounter
  for (let i = 0; i < FISH.length; i++) {
    for (let j = i+1; j < FISH.length; j++) {
      const a = FISH[i], b = FISH[j];
      if (a.dead || b.dead) continue;
      if (rectsOverlap(a.el, b.el)) {
        if (Math.random() < 0.003) triggerEncounter(a, b, 'passive');
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

// ======= OPTIONAL: periodic random encounter sampler (light spice) =======
function randomEncounter() {
  if (FISH.length < 2) return;
  const a = FISH[Math.floor(Math.random() * FISH.length)];
  let b;
  do { b = FISH[Math.floor(Math.random() * FISH.length)]; } while (b === a);
  if (Math.random() < 0.10) triggerEncounter(a, b, 'passive'); // 10% chance per minute
}
setInterval(randomEncounter, 60000);

// ======= FLASH TEXT (hook for “FIGHT!” / “FUCK!”) =======
function flashText(message, color="red") {
  const el = document.getElementById("flashText");
  if (!el) return;
  el.textContent = message;
  el.style.color = color;
  el.style.animation = "none";
  // reflow to restart animation
  void el.offsetWidth;
  el.style.animation = "popFlash 1.1s ease-out forwards";
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
    if (inventoryPulseTimeout) {
      clearTimeout(inventoryPulseTimeout);
      inventoryPulseTimeout = null;
    }
    DOM.toggleInventory.classList.remove('inventory-button--pulse');
  });

  updateInventoryUIState();

  for (let i = 0; i < INITIAL_FISH; i++) createFish();

  requestAnimationFrame((t) => { lastTick = t; tick(t); });
}

window.addEventListener('load', boot);
window.togglePowerView = togglePowerView; // <-- add it here instead!

window.addEventListener('resize', () => {
  const aq = document.getElementById('aquarium');
  ARENA.w = aq.clientWidth;
  ARENA.h = aq.clientHeight;
});

// expose cheat to console:
window.togglePowerView = togglePowerView;
