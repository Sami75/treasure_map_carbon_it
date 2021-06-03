class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  typeBox() {
    return "plain";
  }

  isMountain() {
    return this.typeBox() === "mountain";
  }

  isPlain() {
    return this.typeBox() === "plain";
  }

  isTreasure() {
    return this.typeBox() === "treasure";
  }

  isAdventurer() {
    return this.typeBox() === "adventurer";
  }

  setPosition(newPosition) {
    this.setX(newPosition.x);
    this.setY(newPosition.y);
  }

  toString() {
    return "  .  ";
  }
}

export default Box;
