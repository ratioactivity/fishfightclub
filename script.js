const tank = document.getElementById("tank");
const logPanel = document.getElementById("eventLog");
const logEntries = document.getElementById("logEntries");
const toggleLog = document.getElementById("toggleLog");

toggleLog.onclick = () => logPanel.classList.toggle("hidden");

function logEvent(text) {
  const li = document.createElement("li");
  li.textContent = text;
  logEntries.prepend(li);
}

const fishNames = ["Blush","Drift","Bubbles","Marlin","Coral","Splash"];
const FISH_COUNT = 4;

class Fish {
  constructor() {
    this.name = fishNames[Math.floor(Math.random()*fishNames.length)];
    this.power = Math.floor(Math.random()*100);
    this.hue = Math.floor(Math.random()*360);
    this.element = document.createElement("div");
    this.element.classList.add("fish");

    const img = document.createElement("img");
    img.src = `assets/sprites/${Math.ceil(Math.random()*3)}.png`;
    img.style.filter = `hue-rotate(${this.hue}deg)`;
    this.element.appendChild(img);
    tank.appendChild(this.element);

    this.x = Math.random()*700;
    this.y = Math.random()*500;
    this.updatePosition(true);
    this.move();
  }

  updatePosition(initial=false) {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    if(initial) this.element.style.transition="none";
  }

  move() {
    const newX = Math.random()*700;
    const newY = Math.random()*500;
    const img = this.element.querySelector("img");
    img.style.transform = newX > this.x ? "scaleX(1)" : "scaleX(-1)";
    this.x = newX; this.y = newY;
    this.updatePosition();
    setTimeout(()=>this.move(), 3000 + Math.random()*2000);
  }
}

// show a small floating emote above a fish
function showEmote(fish, type) {
  const emote = document.createElement("img");
  emote.src = `assets/emotes/${type}.png`;
  emote.className = "emote";
  const rect = fish.element.getBoundingClientRect();
  const tankRect = tank.getBoundingClientRect();
  emote.style.left = rect.left - tankRect.left + rect.width/2 - 12 + "px";
  emote.style.top = rect.top - tankRect.top - 20 + "px";
  tank.appendChild(emote);
  emote.animate([{transform:"translateY(0)",opacity:1},{transform:"translateY(-20px)",opacity:0}],{duration:1000});
  setTimeout(()=>emote.remove(),1000);
}

// populate aquarium
const fishes = [];
for(let i=0;i<FISH_COUNT;i++){
  const f = new Fish();
  fishes.push(f);
  logEvent(`${f.name} entered the tank.`);
}

// demo bubbles to test emotes
setInterval(()=>{
  const f = fishes[Math.floor(Math.random()*fishes.length)];
  showEmote(f,"bubble");
},2000);
