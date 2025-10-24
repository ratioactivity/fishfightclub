const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const clampVelocity = (value) => clamp(value, -1.6, 1.6);
const aliveFish = (FISH) => (Array.isArray(FISH) ? FISH.filter((f) => !f.dead) : []);

const chooseTargetFish = (ctx, { requireSelected = false, allowRandom = true } = {}) => {
  const { fish, FISH } = ctx;
  if (requireSelected) {
    if (fish && !fish.dead) return fish;
    if (!allowRandom) return null;
  }
  if (fish && !fish.dead) return fish;
  if (!allowRandom) return null;
  const candidates = aliveFish(FISH);
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
};

const setItemMessage = (ctx, text) => {
  if (ctx && ctx.item) {
    ctx.item.messageUse = text;
  }
};

const handleNoTarget = (ctx) => {
  if (!ctx || !ctx.item) return;
  setItemMessage(ctx, `${ctx.item.name} fizzles with no fish to affect.`);
};

const adjustPower = (target, amount) => {
  target.power = clamp((target.power || 0) + amount, 0, 200);
};

const adjustSize = (target, delta) => {
  target.size = clamp((target.size || 1) + delta, 0.5, 1.6);
};

const updateFishScale = (target) => {
  if (!target || !target.el) return;
  const facing = target.vx >= 0 ? 1 : -1;
  target.el.style.transform = `scale(${target.size * facing}, ${target.size})`;
};

const clearCooldown = (target) => {
  target.canFightAt = Date.now();
};

const reduceCooldown = (target, amountMs) => {
  const now = Date.now();
  const current = target.canFightAt || now;
  target.canFightAt = Math.max(now, current - amountMs);
};

const addWins = (target, amount) => {
  const next = (target.wins || 0) + amount;
  target.wins = next < 0 ? 0 : next;
};

const shiftHue = (target, amount) => {
  const current = target.hue || 0;
  let next = current + amount;
  while (next < 0) next += 360;
  next %= 360;
  target.hue = next;
  if (target.el) {
    target.el.style.filter = `hue-rotate(${next}deg) saturate(1.25)`;
  }
};

const setTrait = (target, trait) => {
  target.trait = trait;
  if (target.el) {
    target.el.title = `${target.name} — ${target.trait}`;
  }
};

const pauseFish = (target, ms) => {
  target.pauseUntil = Date.now() + ms;
};

const scaleVelocity = (target, factor) => {
  target.vx = clampVelocity(target.vx * factor);
  target.vy = clampVelocity(target.vy * factor);
};

const nudgeVelocity = (target, magnitude) => {
  target.vx = clampVelocity(target.vx + (Math.random() * 2 - 1) * magnitude);
  target.vy = clampVelocity(target.vy + (Math.random() * 2 - 1) * magnitude);
};

const makePowerEffect = (amount, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  adjustPower(target, amount);
  const verb = amount >= 0 ? 'gains' : 'loses';
  setItemMessage(ctx, `${target.name} ${verb} ${Math.abs(amount)} power from ${ctx.item.name}.`);
};

const makeSizeEffect = (delta, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  adjustSize(target, delta);
  updateFishScale(target);
  const verb = delta >= 0 ? 'grows by' : 'shrinks by';
  setItemMessage(ctx, `${target.name} ${verb} ${Math.abs(Math.round(delta * 100))}% thanks to ${ctx.item.name}.`);
};

const makeCooldownClearEffect = (options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  clearCooldown(target);
  setItemMessage(ctx, `${target.name} is ready to fight immediately thanks to ${ctx.item.name}.`);
};

const makeCooldownReduceEffect = (amountMs, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  reduceCooldown(target, amountMs);
  const minutes = Math.round(amountMs / 60000);
  setItemMessage(ctx, `${ctx.item.name} trims ${minutes} minutes off ${target.name}'s recovery.`);
};

const makeWinsEffect = (amount, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  addWins(target, amount);
  const verb = amount >= 0 ? 'earns' : 'loses';
  setItemMessage(ctx, `${target.name} ${verb} ${Math.abs(amount)} win${Math.abs(amount) === 1 ? '' : 's'} from ${ctx.item.name}.`);
};

const makeHueEffect = (degrees, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  shiftHue(target, degrees);
  setItemMessage(ctx, `${ctx.item.name} shifts ${target.name}'s colors by ${degrees}°.`);
};

const makePauseEffect = (ms, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  pauseFish(target, ms);
  setItemMessage(ctx, `${target.name} is held in place for a moment by ${ctx.item.name}.`);
};

const makeVelocityBoostEffect = ({ factor = 1, magnitude = 0 } = {}, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  scaleVelocity(target, factor);
  if (magnitude) nudgeVelocity(target, magnitude);
  setItemMessage(ctx, `${ctx.item.name} jolts ${target.name}'s swimming speed.`);
};

const makeAllFishPowerEffect = (amount) => (ctx) => {
  const targets = aliveFish(ctx.FISH);
  if (!targets.length) {
    handleNoTarget(ctx);
    return;
  }
  targets.forEach((fish) => adjustPower(fish, amount));
  const verb = amount >= 0 ? 'gain' : 'lose';
  setItemMessage(ctx, `Every fish ${verb}s ${Math.abs(amount)} power from ${ctx.item.name}.`);
};

const makeMassCooldownClearEffect = () => (ctx) => {
  const targets = aliveFish(ctx.FISH);
  if (!targets.length) {
    handleNoTarget(ctx);
    return;
  }
  const now = Date.now();
  targets.forEach((fish) => {
    fish.canFightAt = now;
  });
  setItemMessage(ctx, `${ctx.item.name} clears every injury timer in the tank.`);
};

const makeTraitEffect = (trait, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  setTrait(target, trait);
  setItemMessage(ctx, `${ctx.item.name} leaves ${target.name} with the trait “${trait}”.`);
};

const makeGrowthEffect = (durationMs, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  target.growthEndAt = Date.now() + durationMs;
  setItemMessage(ctx, `${ctx.item.name} sparks a growth spurt for ${target.name}.`);
};

const makePowerDrainEffect = (amount, options = {}) => (ctx) => {
  const target = chooseTargetFish(ctx, options);
  if (!target) {
    handleNoTarget(ctx);
    return;
  }
  adjustPower(target, -Math.abs(amount));
  setItemMessage(ctx, `${target.name} loses ${Math.abs(amount)} power to ${ctx.item.name}.`);
};

export const CUSTOM_ITEM_DATA = {
  american_cheese: {
    useType: 'KU',
    description: 'A melty slice that powers up a random fish.',
    messageUse: 'A random fish gains 8 power.',
    effect: makePowerEffect(8),
  },
  angler: {
    useType: 'HU',
    description: 'A fearsome trophy that quietly inspires a contender.',
    messageUse: 'A fish feels bolder after glimpsing the angler trophy.',
    effect: makeWinsEffect(1),
  },
  bacon: {
    useType: 'SFL',
    description: 'Rub this on a fish to bulk it up.',
    messageUse: 'The chosen fish bulks up.',
    effect: makeSizeEffect(0.12, { requireSelected: true, allowRandom: false }),
  },
  barbeque_sauce: {
    useType: 'KU',
    description: 'A spicy drizzle that fires up a fighter.',
    messageUse: 'A random fish gains 4 power.',
    effect: makePowerEffect(4),
  },
  batteries: {
    useType: 'KU',
    description: 'Jump-starts a fish back into fighting condition.',
    messageUse: 'A random fish shakes off 30 minutes of injury time.',
    effect: makeCooldownReduceEffect(30 * 60 * 1000),
  },
  bell_pepper: {
    useType: 'SFL',
    description: 'Trim a fish down to squeeze through tight spaces.',
    messageUse: 'The selected fish slims down.',
    effect: makeSizeEffect(-0.08, { requireSelected: true, allowRandom: false }),
  },
  body_lotion: {
    useType: 'SFL',
    description: 'Massage into scales to instantly heal injuries.',
    messageUse: 'The chosen fish is ready to fight again.',
    effect: makeCooldownClearEffect({ requireSelected: true, allowRandom: false }),
  },
  bubble_gum: {
    useType: 'KU',
    description: 'Locks a fish in a sticky bubble for a moment.',
    messageUse: 'A random fish gets stuck in place briefly.',
    effect: makePauseEffect(4500),
  },
  butter: {
    useType: 'KU',
    description: 'Adds a slick layer that helps a fish slip through fights.',
    messageUse: 'A random fish bulks up slightly.',
    effect: makeSizeEffect(0.08),
  },
  cabbage: {
    useType: 'KU',
    description: 'A crunchy snack that calms an overexcited brawler.',
    messageUse: 'A random fish loses 2 power and mellows out.',
    effect: makePowerDrainEffect(2),
  },
  candy_bar: {
    useType: 'KU',
    description: 'A sugar rush for the hungriest fighter.',
    messageUse: 'A random fish gains 10 power.',
    effect: makePowerEffect(10),
  },
  cereal: {
    useType: 'KU',
    description: 'Sprinkle flakes that energize the whole tank.',
    messageUse: 'Every fish gains 2 power.',
    effect: makeAllFishPowerEffect(2),
  },
  coffee_bag: {
    useType: 'KU',
    description: 'Perks up a fish’s swimming speed.',
    messageUse: 'One fish darts around with fresh energy.',
    effect: makeVelocityBoostEffect({ factor: 1.2, magnitude: 0.3 }),
  },
  cookies: {
    useType: 'KU',
    description: 'A celebratory snack that counts as a win.',
    messageUse: 'A random fish earns a bonus win.',
    effect: makeWinsEffect(1),
  },
  credit_card: {
    useType: 'KU',
    description: 'Pays off everyone’s medical bills instantly.',
    messageUse: 'All fish are cleared for combat.',
    effect: makeMassCooldownClearEffect(),
  },
  detergent: {
    useType: 'HU',
    description: 'Strips away grime—and a bit of strength.',
    messageUse: 'A fish is secretly scrubbed weaker.',
    effect: makePowerDrainEffect(5),
  },
  egg: {
    useType: 'SFL',
    description: 'Encourage a fish’s next growth spurt.',
    messageUse: 'The chosen fish will keep growing for a day.',
    effect: makeGrowthEffect(24 * 60 * 60 * 1000, { requireSelected: true, allowRandom: false }),
  },
  eraser: {
    useType: 'SFL',
    description: 'Wipe away a fish’s oddest trait.',
    messageUse: 'The selected fish becomes a blank slate.',
    effect: makeTraitEffect('Blank Slate', { requireSelected: true, allowRandom: false }),
  },
  frying_pan: {
    useType: 'KU',
    description: 'Forges a fish into a sizzling champion.',
    messageUse: 'A random fish gains 12 power.',
    effect: makePowerEffect(12),
  },
  glue: {
    useType: 'SFL',
    description: 'Stick a fish in place until it chills out.',
    messageUse: 'The selected fish is stuck briefly.',
    effect: makePauseEffect(6000, { requireSelected: true, allowRandom: false }),
  },
  hyena: {
    useType: 'SU',
    description: 'Something snarls in the shadows.',
    messageUse: 'The hyena skulks away without a word.',
    effect: makePowerDrainEffect(6),
  },
  jam: {
    useType: 'KU',
    description: 'Sweet goo that boosts confidence.',
    messageUse: 'A random fish gains 5 power.',
    effect: makePowerEffect(5),
  },
  ketchup: {
    useType: 'KU',
    description: 'Adds zesty bite to any upcoming fight.',
    messageUse: 'A random fish gains 4 power.',
    effect: makePowerEffect(4),
  },
  light_bulb: {
    useType: 'KU',
    description: 'Bright idea—change a fish’s colors.',
    messageUse: 'A random fish shifts hue by 45°.',
    effect: makeHueEffect(45),
  },
  marshmallows: {
    useType: 'KU',
    description: 'Squishy treats that make a fish puff up.',
    messageUse: 'A random fish grows larger.',
    effect: makeSizeEffect(0.1),
  },
  meat: {
    useType: 'KU',
    description: 'Prime protein for the fiercest fighter.',
    messageUse: 'A random fish gains 14 power.',
    effect: makePowerEffect(14),
  },
  meerkat: {
    useType: 'HU',
    description: 'A curious companion adjusts someone’s demeanor.',
    messageUse: 'A fish quietly adopts a meerkat mindset.',
    effect: makeTraitEffect('Meerkat Whisperer'),
  },
  mustard: {
    useType: 'KU',
    description: 'Spicy fuel for a quick power bump.',
    messageUse: 'A random fish gains 3 power.',
    effect: makePowerEffect(3),
  },
  orca: {
    useType: 'HU',
    description: 'A mighty cameo that emboldens a fish a ton.',
    messageUse: 'A fish secretly feels the power of an orca.',
    effect: makePowerEffect(16),
  },
  potatochip: {
    useType: 'KU',
    description: 'Shareable crunch that boosts everyone a bit.',
    messageUse: 'Each fish gains 1 power while one takes the big bite.',
    effect: (ctx) => {
      const targets = aliveFish(ctx.FISH);
      if (!targets.length) {
        handleNoTarget(ctx);
        return;
      }
      targets.forEach((fish) => adjustPower(fish, 1));
      const lucky = targets[Math.floor(Math.random() * targets.length)];
      adjustPower(lucky, 2);
      setItemMessage(ctx, `${lucky.name} devours the potato chip and everyone else nibbles for +1 power.`);
    },
  },
  rubber_duck: {
    useType: 'KU',
    description: 'A comforting bath toy that restores readiness.',
    messageUse: 'A random fish is ready to fight right now.',
    effect: makeCooldownClearEffect(),
  },
  salmon: {
    useType: 'KU',
    description: 'Fresh catch that powers up a fighter.',
    messageUse: 'A random fish gains 9 power.',
    effect: makePowerEffect(9),
  },
  soap: {
    useType: 'SFL',
    description: 'Scrub a fish clean to reset injuries and mood.',
    messageUse: 'The selected fish is spotless and ready.',
    effect: (ctx) => {
      const target = chooseTargetFish(ctx, { requireSelected: true, allowRandom: false });
      if (!target) {
        handleNoTarget(ctx);
        return;
      }
      clearCooldown(target);
      pauseFish(target, 1200);
      setTrait(target, 'Sparkling Clean');
      setItemMessage(ctx, `${target.name} is sparkling clean and ready to brawl.`);
    },
  },
  spatula: {
    useType: 'KU',
    description: 'Flip a fish to keep opponents guessing.',
    messageUse: 'A random fish flips course dramatically.',
    effect: (ctx) => {
      const target = chooseTargetFish(ctx);
      if (!target) {
        handleNoTarget(ctx);
        return;
      }
      target.vx = clampVelocity(-target.vx);
      target.vy = clampVelocity(-target.vy);
      setItemMessage(ctx, `${target.name} flips direction thanks to the spatula.`);
    },
  },
  water: {
    useType: 'KU',
    description: 'A refreshing splash that helps a fish grow.',
    messageUse: 'A random fish freshens up and grows a little.',
    effect: (ctx) => {
      const target = chooseTargetFish(ctx);
      if (!target) {
        handleNoTarget(ctx);
        return;
      }
      adjustSize(target, 0.05);
      updateFishScale(target);
      clearCooldown(target);
      setItemMessage(ctx, `${target.name} feels refreshed and grows slightly.`);
    },
  },
  wet_wipe: {
    useType: 'SFL',
    description: 'Polish a fish into showroom condition.',
    messageUse: 'The selected fish gleams.',
    effect: (ctx) => {
      const target = chooseTargetFish(ctx, { requireSelected: true, allowRandom: false });
      if (!target) {
        handleNoTarget(ctx);
        return;
      }
      setTrait(target, 'Pristine');
      clearCooldown(target);
      setItemMessage(ctx, `${target.name} gleams with the trait “Pristine”.`);
    },
  },
  white_cheese: {
    useType: 'KU',
    description: 'An artisanal wedge for a fancy fighter.',
    messageUse: 'A random fish gains 5 power.',
    effect: makePowerEffect(5),
  },
  wilddog: {
    useType: 'HU',
    description: 'A feral encounter that rattles someone.',
    messageUse: 'A fish is shaken by a wild dog in secret.',
    effect: (ctx) => {
      const target = chooseTargetFish(ctx);
      if (!target) {
        handleNoTarget(ctx);
        return;
      }
      adjustPower(target, -4);
      pauseFish(target, 3000);
      setItemMessage(ctx, `${target.name} is rattled by a wild dog encounter and loses 4 power.`);
    },
  },
};

if (typeof window !== 'undefined') {
  window.CUSTOM_ITEM_DATA = CUSTOM_ITEM_DATA;
}

if (typeof globalThis !== 'undefined') {
  globalThis.CUSTOM_ITEM_DATA = CUSTOM_ITEM_DATA;
}
