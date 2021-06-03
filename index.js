import Map from "./Classes/Map/Map.js";

let m = new Map(5, 5);
let numberOfMountain = Math.floor(Math.random() * 3);
let numberOfTreasure = Math.floor(Math.random() * 3);

//Instantiate two Adventurers
m.addAdventurer("Sami", 1, 1, "N", "ADDADD");
m.addAdventurer("Test", 2, 2, "S", "AADADA");

//Set random mountain in map
for (var i = 0; i <= numberOfMountain; i++) {
  m.addMountain(
    Math.floor(Math.random() * m.width),
    Math.floor(Math.random() * m.height)
  );
}

//Set random treasures in map
for (var i = 0; i <= numberOfTreasure; i++) {
  m.addTreasure(
    Math.floor(Math.random() * m.width),
    Math.floor(Math.random() * m.height),
    Math.floor(Math.random() * (3 - 1) + 1)
  );
}

game(m);

function game(map) {
  let adventurers = map.getAdventurers();
  let turnByTurn = new Array(6 * adventurers.length);

  for (var i = 0; i < adventurers.length; i++) {
    for (var j = i; j < turnByTurn.length; j = j + adventurers.length) {
      turnByTurn[j] = adventurers[i];
    }
  }

  turnByTurn.forEach((adventurer) => {
    console.log("Turn to : ", adventurer.name);
    adventurer.move(map);
  });

  adventurers.forEach((adventurer) => {
    console.log(
      "Adventurer : ",
      adventurer.name,
      "got ",
      adventurer.treasures,
      `${adventurer.treasures > 1 ? 'treasures' : 'treasure'}\n`
    );
  });
}