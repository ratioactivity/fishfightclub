// === CUSTOM ITEM DEFINITIONS ===
// Each key should match the image filename (without .png, lowercase, underscores).

export const CUSTOM_ITEM_DATA = {
  american_cheese: {
    useType: 'IU/KU',
    messageGet: () => '100% American. Processed to Perfection.',
    messageUse: 'Reveals hidden power of first fish clicked.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  angler_fish: {
    useType: 'SFL/KU',
    messageGet: () => "Yikes! Shouldn't have released that...",
    messageUse: 'Kills the first fish you click.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      fish.dead = true;
      fish.el.remove();
      logEvent(`${fish.name} was eaten by an Angler Fish!`);
    },
  },

  bacon: {
    useType: 'SFL/HU',
    messageGet: () => 'A nutritious way to start your morning.',
    messageUse: 'Adds +10 to the power score of clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      fish.power = (fish.power || 0) + 10;
      logEvent(`${fish.name} gained +10 Power!`);
    },
  },

  bell_pepper: {
    useType: 'IU/HU',
    messageGet: () => 'Spiciest Pepper for the Biggest Pussies.',
    messageUse: 'Subtracts 10 from the weakest fish\'s power.',
    effect: ({ FISH, logEvent }) => {
      if (!FISH.length) return;
      const weakest = FISH.reduce((a, b) => (a.power || 0) < (b.power || 0) ? a : b);
      weakest.power = Math.max(0, (weakest.power || 0) - 10);
      logEvent(`${weakest.name} winced from the Bell Pepper! Power -10.`);
    },
  },

  body_lotion: {
    useType: 'IU/HU',
    messageGet: () => 'Oh, oh yeah. That\'s nice.',
    messageUse: 'A random fish has a child asexually.',
    effect: ({ FISH, addFish, logEvent }) => {
      if (!FISH.length) return;
      const parent = FISH[Math.floor(Math.random() * FISH.length)];
      if (typeof addFish === 'function') {
        addFish({
          species: parent.species,
          size: 0.25,
          trait: 'Born from Lotion',
        });
        logEvent(`${parent.name} mysteriously spawned a baby... thanks to Body Lotion?`);
      }
    },
  },

  bubble_gum: {
    useType: 'SFL/KU',
    messageGet: () => 'Gum?',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  butter: {
    useType: 'IU/KU',
    messageGet: () => 'Extra Creamy.',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  cabbage: {
    useType: 'IU/KU',
    messageGet: () => 'Get the Cabbage on 3...',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  candy_bar: {
    useType: 'SFL/HU',
    messageGet: () => 'If it\'s not Crunch, you\'re doing it wrong.',
    messageUse: 'Asks “Is it Crunch?”; if no, one fish dies.',
    effect: ({ FISH, logEvent }) => {
      if (!FISH.length) return;
      const choice = confirm('Is it Crunch?');
      if (!choice) {
        const unlucky = FISH[Math.floor(Math.random() * FISH.length)];
        unlucky.dead = true;
        unlucky.el.remove();
        logEvent(`${unlucky.name} perished for disrespecting Crunch.`);
      } else {
        logEvent('Crunch approved. Everyone lives—for now.');
      }
    },
  },

  cereal: {
    useType: 'SFL/KU',
    messageGet: () => 'Mmammfmmmm luckmy chrsm',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  coffee_bag: {
    useType: 'SFL/HU',
    messageGet: () => '10 shots of espresso please.',
    messageUse: 'Adds +10 power to all fish.',
    effect: ({ FISH, logEvent }) => {
      FISH.forEach(f => f.power = (f.power || 0) + 10);
      logEvent('All fish are vibrating with caffeine! +10 Power each.');
    },
  },

  cookies: {
    useType: 'SFL/HU',
    messageGet: () => 'Hope you\'re not allergic to peanut butter.',
    messageUse: 'Asks if player is allergic; if yes, all fish die.',
    effect: ({ FISH, logEvent }) => {
      const allergic = confirm('Are you allergic to peanut butter?');
      if (allergic) {
        FISH.forEach(f => { f.dead = true; f.el.remove(); });
        logEvent('All fish died in a tragic allergic reaction.');
      } else {
        logEvent('Good news—no allergic reaction this time.');
      }
    },
  },

  credit_card: {
    useType: 'SFL/HU',
    messageGet: () => 'AYOOOOOOOOOOO',
    messageUse: 'Adds a fake +1M dollars and “Super Rich” trait to a random fish.',
    effect: ({ FISH, logEvent }) => {
      if (!FISH.length) return;
      const lucky = FISH[Math.floor(Math.random() * FISH.length)];
      lucky.trait = 'Super Rich';
      logEvent(`${lucky.name} flexes a brand new Black Card. They’re SUPER RICH!`);
    },
  },
};

detergent: {
    useType: 'SFL/KU',
    messageGet: () => 'Washy washy, happy happy!',
    messageUse: 'Adds a fake message that says all fish are clean. Nothing actually happens.',
    effect: ({ logEvent }) => {
      logEvent('All fish are now squeaky clean! (Probably.)');
    },
  },

  egg: {
    useType: 'IU/HU',
    messageGet: () => 'YOU FUCKING BROKE THE YOLK YOU PIECE OF SHIT',
    messageUse: 'All fish perform the death animation but none of them actually die.',
    effect: ({ FISH, logEvent }) => {
      FISH.forEach(f => {
        f.mode = 'death';
        setTimeout(() => (f.mode = 'idle'), 1500);
      });
      logEvent('Every fish dramatically pretended to die.');
    },
  },

  eraser: {
    useType: 'SFL/KU',
    messageGet: () => 'Start the slate clean.',
    messageUse: 'Replaces all fish with a fresh randomized batch.',
    effect: ({ FISH, resetFishTank, logEvent }) => {
      const count = FISH.length;
      if (typeof resetFishTank === 'function') resetFishTank(count);
      logEvent('The tank has been completely reset.');
    },
  },

  frying_pan: {
    useType: 'IU/KU',
    messageGet: () => 'BONK.',
    messageUse: 'A random pair of fish fight.',
    effect: ({ FISH, triggerFight, logEvent }) => {
      if (FISH.length < 2) return;
      const [a, b] = FISH.sort(() => 0.5 - Math.random()).slice(0, 2);
      if (typeof triggerFight === 'function') triggerFight(a, b);
      else logEvent(`${a.name} and ${b.name} bonked heads!`);
    },
  },

  glue: {
    useType: 'IU/SU',
    messageGet: () => 'Huff?',
    messageUse: 'Popup asks yes or no. Yes subtracts 10 power from all fish.',
    effect: ({ FISH, logEvent }) => {
      const sniff = confirm('Did you huff it?');
      if (sniff) {
        FISH.forEach(f => (f.power = (f.power || 0) - 10));
        logEvent('You huffed glue. Every fish is dumber now. -10 Power each.');
      } else {
        logEvent('You resisted the glue. Proud of you.');
      }
    },
  },

  hyena: {
    useType: 'IU/HU',
    messageGet: () => 'A hyena? FUCK.',
    messageUse: 'Random pair of fish fight; loser always dies.',
    effect: ({ FISH, logEvent }) => {
      if (FISH.length < 2) return;
      const [a, b] = FISH.sort(() => 0.5 - Math.random()).slice(0, 2);
      const winner = (a.power || 0) >= (b.power || 0) ? a : b;
      const loser = winner === a ? b : a;
      loser.dead = true;
      loser.el.remove();
      logEvent(`${winner.name} tore ${loser.name} apart in a hyena frenzy!`);
    },
  },

  jam: {
    useType: 'SFL/KU',
    messageGet: () => 'Oh. How lovely.',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  ketchup: {
    useType: 'SFL/KU',
    messageGet: () => 'Tomato sugar juice. Yum.',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  light_bulb: {
    useType: 'SFL/HU',
    messageGet: () => 'Put it in your mouth?',
    messageUse: 'Popup asks yes/no. Yes kills one random fish but supercharges another.',
    effect: ({ FISH, logEvent }) => {
      const yes = confirm('Put it in your mouth?');
      if (yes && FISH.length >= 2) {
        const killed = FISH[Math.floor(Math.random() * FISH.length)];
        let powered = FISH.find(f => f !== killed);
        if (!powered) powered = killed;
        killed.dead = true;
        killed.el.remove();
        powered.power = (powered.power || 0) + 50;
        logEvent(`${killed.name} exploded. ${powered.name} absorbed their essence (+50 Power).`);
      } else {
        logEvent('You didn’t put it in your mouth. Probably for the best.');
      }
    },
  },

  marshmallows: {
    useType: 'SFL/HU',
    messageGet: () => 'A soft landing. Just in case.',
    messageUse: 'Auto-activates next time a fish dies and revives it.',
    effect: ({ gameState, logEvent }) => {
      if (!gameState) gameState = {};
      gameState.reviveNextDeath = true;
      logEvent('Marshmallows equipped — the next dead fish will be revived.');
    },
  },
});

meat: {
    useType: 'IU/SU',
    messageGet: () => 'Oooh carnivorous.',
    messageUse: 'All fish gain +10 power.',
    effect: ({ FISH, logEvent }) => {
      FISH.forEach(f => (f.power = (f.power || 0) + 10));
      logEvent('The water smells like steak. All fish gain +10 Power.');
    },
  },

  meerkat: {
    useType: 'SFL/KU',
    messageGet: () => "A meerkat? How'd that get in there?",
    messageUse: 'Renames the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      const newName = prompt('Rename this fish to:');
      if (newName) {
        fish.name = newName;
        logEvent(`That’s not a fish anymore. It’s ${fish.name} now.`);
      } else {
        logEvent('The meerkat ran away before renaming anything.');
      }
    },
  },

  mustard: {
    useType: 'SFL/KU',
    messageGet: () => 'Ewwwwwwwww.',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  orca: {
    useType: 'IU/KU',
    messageGet: () => 'NONONONONONO EVERYBODY RUN NONONON---',
    messageUse: 'All fish die but one is reborn with 10× their previous power.',
    effect: ({ FISH, logEvent }) => {
      if (!FISH.length) return;
      const survivor = FISH[Math.floor(Math.random() * FISH.length)];
      const oldPower = survivor.power || 0;
      FISH.forEach(f => {
        if (f !== survivor) {
          f.dead = true;
          f.el.remove();
        }
      });
      survivor.power = oldPower * 10;
      logEvent(`${survivor.name} alone survived the Orca’s rampage (+${oldPower * 9} Power).`);
    },
  },

  potato_chip: {
    useType: 'SFL/HU',
    messageGet: () => "I'll take a potato chip...",
    messageUse: 'Pick a new trait for the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      const newTrait = prompt('Enter a new trait for this fish:');
      if (newTrait) {
        fish.trait = newTrait;
        logEvent(`${fish.name} now identifies as: ${newTrait}.`);
      } else {
        logEvent('You dropped the chip before anything happened.');
      }
    },
  },

  rubber_duck: {
    useType: 'SFL/HU',
    messageGet: () => 'Honk honk.',
    messageUse: 'Adds a Rubber Duck decoration to the tank.',
    effect: ({ logEvent }) => {
      const tank = document.getElementById('fish-layer');
      const duck = document.createElement('img');
      duck.src = 'assets/items/rubber_duck.png';
      duck.className = 'duck-deco';
      duck.style.position = 'absolute';
      duck.style.left = `${Math.random() * 400 + 100}px`;
      duck.style.top = `${Math.random() * 300 + 100}px`;
      duck.style.width = '96px';
      tank.appendChild(duck);
      logEvent('A Rubber Duck now drifts peacefully among the chaos.');
    },
  },

  salmon: {
    useType: 'IU/KU',
    messageGet: () => 'Mmmm fresh.',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  soap: {
    useType: 'SFL/HU',
    messageGet: () => 'The goat.',
    messageUse: 'Renames all fish to Soap1, Soap2, Soap3...',
    effect: ({ FISH, logEvent }) => {
      FISH.forEach((f, i) => (f.name = `Soap${i + 1}`));
      logEvent('The entire tank is now just Soap.');
    },
  },

  spatula: {
    useType: 'SFL/HU',
    messageGet: () => "Flip 'em.",
    messageUse: 'Flips a fish upside down for 30 minutes.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      fish.el.style.transform += ' rotate(180deg)';
      logEvent(`${fish.name} is flipped upside down.`);
      setTimeout(() => {
        fish.el.style.transform = fish.el.style.transform.replace(' rotate(180deg)', '');
        logEvent(`${fish.name} returned to normal orientation.`);
      }, 30 * 60 * 1000);
    },
  },

  water: {
    useType: 'SFL/HU',
    messageGet: () => 'Never hurts to have a little more.',
    messageUse: 'Nothing happens.',
    effect: ({ logEvent }) => {
      logEvent('You added water. It’s still just water.');
    },
  },

      wet_wipe: {
    useType: 'SFL/HU',
    messageGet: () => 'Lick?',
    messageUse: 'Popup yes/no. Yes → random fish +50 power, No → nothing happens.',
    effect: ({ FISH, logEvent }) => {
      const lick = confirm('Lick the Wet Wipe?');
      if (lick && FISH.length) {
        const lucky = FISH[Math.floor(Math.random() * FISH.length)];
        lucky.power = (lucky.power || 0) + 50;
        logEvent(`${lucky.name} just got chemically enhanced. +50 Power!`);
      } else {
        logEvent('You refused to lick it. Probably a wise decision.');
      }
    },
  },

  white_cheese: {
    useType: 'IU/KU',
    messageGet: () => 'Holy fuck that\'s delicious.',
    messageUse: 'Reveals hidden power of the clicked fish.',
    effect: ({ fish, logEvent }) => {
      if (!fish) return;
      logEvent(`${fish.name}'s hidden power is ${fish.power}.`);
    },
  },

  wild_dog: {
    useType: 'IU/HU',
    messageGet: () => 'Awwww a pupp--',
    messageUse: 'Broadcasts a message saying the player has died, but nothing really happens.',
    effect: ({ logEvent, broadcastMessage }) => {
      if (typeof broadcastMessage === 'function') {
        broadcastMessage('The player has died. 💀');
      } else {
        alert('The player has died. 💀');
      }
      logEvent('Wild Dog appeared. Everyone panicked. Nothing actually happened.');
    },
  },
});
