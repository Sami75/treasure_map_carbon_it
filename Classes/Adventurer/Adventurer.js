import Box from "../Box/Box.js";

class Adventurer extends Box {
  sequence_index = 0;
  start_direction = "N";
  start_position = { x: 0, y: 0 };
  positions = [];
  treasures = 0;

  constructor(name, x, y, direction, sequences) {
    super(x, y);
    this.start_position = { x, y };

    this.name = name;

    this.direction = direction;
    this.start_direction = direction;

    this.sequences = sequences;
  }

  getMovement() {
    return this.sequences[this.sequence_index];
  }

  setTreasures(treasures) {
    this.treasures = treasures;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  setSequenceIndex(sequence_index) {
    this.sequence_index = sequence_index;
  }

  typeBox() {
    return "adventurer";
  }

  move(map) {
    let new_position = this.getNewPosition();

    this.positions.push({
      x: this.x,
      y: this.y,
      direction: this.direction,
    });

    if (map.isAdventurerThere(new_position.x, new_position.y))
      //TODO compare with unique id.
      if (map.map[new_position.x][new_position.y].adventurer.name === this.name)
        this.moving(map, new_position);
      else
        this.say(
          "Oh noooo! An Adventurer is already there, I hope there is no treasure there, let's keep moving\n"
        );
    else this.moving(map, new_position);

    this.setSequenceIndex(this.sequence_index + 1);
  }

  moving(map, new_position) {
    if (!map.map[new_position.x][new_position.y].ground.isMountain()) {
      this.setPosition(new_position);

      console.log(map.toString());

      let lastPos = this.positions[this.positions.length - 1];
      console.log("Adventurer has moved", lastPos, "to", new_position, "\n");

      if (lastPos)
        if (this.getMovement() === "A")
          map.updatePosition(this, lastPos.x, lastPos.y, this.x, this.y);

      console.log(map.toString());
    } else {
      this.say("Unfortonutely, I can't climb mountain, let's keep going\n");
    }
  }

  getNewPosition() {
    console.log(
      "movement",
      this.getMovement(),
      "direction",
      this.direction,
      "current position",
      { x: this.x, y: this.y }, "\n"
    );

    switch (this.getMovement()) {
      case "A":
        return this.forward();
      case "D":
        this.setDirection(this.turnRight());
        return { x: this.x, y: this.y };
      case "G":
        this.setDirection(this.turnLeft());
        return { x: this.x, y: this.y };
    }
  }

  turnRight() {
    switch (this.direction) {
      case "N":
        return "E";
      case "S":
        return "O";
      case "E":
        return "S";
      case "O":
        return "N";
    }
  }

  turnLeft() {
    switch (this.direction) {
      case "N":
        return "O";
      case "S":
        return "E";
      case "E":
        return "N";
      case "O":
        return "S";
    }
  }

  forward() {
    switch (this.direction) {
      case "N":
        return { x: this.x - 1, y: this.y };
      case "S":
        return { x: this.x + 1, y: this.y };
      case "E":
        return { x: this.x, y: this.y + 1 };
      case "O":
        return { x: this.x, y: this.y - 1 };
    }
  }

  collectTreasure() {
    this.setTreasures(this.treasures + 1);
  }

  say(message) {
    console.log(this.name, ": ", message);
  }

  toString() {
    return `   ${this.name[0].toUpperCase()}   `;
  }
}

export default Adventurer;
