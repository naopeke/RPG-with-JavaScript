let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
      name: "kill monster",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, easterEgg],
      text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
},
{ 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉" 
},
{
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
}
];

//initialize buttons
button1.onclick= goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//You have repetition in the goTown and goStore functions. When you have repetition in your code, this is a sign that you need another function. Functions can take parameters, which are values that are given to the function each time it is run. Here is a function that takes a parameter called param
//function myFunction(param) {console.log(param);}

// function update(location) {
//   button1.innerText = "Go to store";
//   button2.innerText = "Go to cave";
//   button3.innerText = "Fight dragon";
//   button1.onclick = goStore;
//   button2.onclick = goCave;
//   button3.onclick = fightDragon;
//   text.innerText = "You are in the town square. You see a sign that says \"Store\".";
// }


function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown(){
  update(locations[0]);
}

// function goTown() {
//   button1.innerText = "Go to store";
//   button2.innerText = "Go to cave";
//   button3.innerText = "Fight dragon";
//   button1.onclick = goStore;
//   button2.onclick = goCave;
//   button3.onclick = fightDragon;
//   text.innerText = "You are in the town square. You see a sign that says \"Store\".";
// }

function goStore(){
  update(locations[1]);
}

// function goStore() {
//     button1.innerText = "Buy 10 health (10 gold)";
//     button1.onclick = buyHealth;
//     button2.innerText = "Buy weapon (30 gold)";
//     button2.onclick = buyWeapon;
//     button3.innerText = "Go to town square";
//     button3.onclick = goTown;
//     text.innerText = "You enter the store.";
//   }

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10){
    gold -= 10;
    health += 10;
    // gold:gold = gold - 10;
    // health = health + 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else{
    text.innerText = "You do not have enough gold to buy health.";
  }
  }
  
function buyWeapon() {
  if(currentWeapon < weapons.length -1){
    if(gold >= 30){
      gold -= 30;
      currentWeapon ++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory + ".";
    } else {
      text.innerText = "You do not have enough gold to buy a weapon."
    }
  } else {
    text.innerText = "You already have the most powerful weapon!"
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    //The shift() method on an array removes the first element in the array and returns it. 
    //Use this method to take the first element from the inventory array and assign it to your currentWeapon variable.
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime(){
  fighting = 0;
  goFight();
}

function fightBeast(){
  fighting = 1;
  goFight();
}

function fightDragon(){
  fighting = 2;
  goFight();
  }

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  }

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  
  //Your game could be complete now, but you can also make it more interesting.
  //Inside your attack function, change your health -= monsters[fighting].level; line to health -= getMonsterAttackValue(monsters[fighting].level);. This sets health equal to health minus the return value of the getMonsterAttackValue function, and passes the level of the monster as an argument.
  health -= getMonsterAttackValue(monsters[fighting].level);
  //health -= monsters[fighting].level;
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  // monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  // } else if (monsterHealth <= 0){
  //   if (fighting === 2){
  //     winGame();
  //   } else {
  //     defeatMonster();      
  //   }
  // }

  //Use the += operator to add Your [weapon] breaks., with a space in front of Your, to the end of text.innerText. Replace [weapon] with the last item in the inventory array using inventory.pop(), which will remove the last item in the array AND return it so it appears in your string.
  //We don't want a player's only weapon to break. The player's weapon should only break if inventory.length does not equal (!==) one.
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
  }
  
function getMonsterAttackValue(level) {
//The attack of the monster will be based on the monster's level and the player's xp. In the getMonsterAttackValue function, use const to create a variable called hit. Assign it the equation (level * 5) - (Math.floor(Math.random() * xp));.
//This will set the monster's attack to five times their level minus a random number between 0 and the player's xp.
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
  //if(hit > 0){
  //  return hit;
  //} else {
  //  return 0;
  //}
}

  //This will return a boolean value (true or false) to be used in your if statement. 
  //Return the result of the comparison Math.random() > .2.
function isMonsterHit(){
  return Math.random()> .2 || health < 20;
}
  
function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}  

function defeatMonster(){
  //In your defeatMonster function, set gold equal to gold plus the monster's level times 6.7. 
  //You can get the monster's level with the level property.
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose(){
  update(locations[5]);
}

function winGame(){
  update(locations[6]);
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ['stick'];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n"
  for (let i = 0; i< 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if(numbers.indexOf(guess) !== -1){
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0){
      lose();
    }
  }
}