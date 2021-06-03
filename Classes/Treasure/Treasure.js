import Box from "../Box/Box.js";

class Treasure extends Box {
  collectedByWho = [];

  constructor(x, y, times) {
    super(x, y);
    this.times = times;
  }

  setTimes(times) {
    this.times = times;
  }

  typeBox() {
    return "treasure";
  }

  collectedBy(adventurer) {
    this.setTimes(this.times - 1);
    this.collectedByWho.push({ adventurer, times: this.times });
  }

  toString() {
    return ` T(${this.times})  `;
  }
}

export default Treasure;
