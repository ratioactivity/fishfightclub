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

  // keep adding items here in same format...
};
