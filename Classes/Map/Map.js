import { isEmpty } from "../../Helpers/isEmpty.js";
import Adventurer from "../Adventurer/Adventurer.js";
import Mountain from "../Mountain/Mountain.js";
import Plain from "../Plain/Plain.js";
import Treasure from "../Treasure/Treasure.js";

class Map {
  adventurers = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = this.mapMaker();
  }

  mapMaker() {
    return new Array(this.width).fill().map((x, i) => {
      return new Array(this.height).fill(null).map((y, j) => {
        return {
          adventurer: {},
          treasure: {},
          ground: new Plain(i, j),
        };
      });
    });
  }

  addPlain(x, y) {
    this.map[x][y].ground = new Plain(x, y);
  }

  addMountain(x, y) {
    if (this.map[x][y].ground.isPlain() && isEmpty(this.map[x][y].adventurer))
      this.map[x][y].ground = new Mountain(x, y);
  }

  addTreasure(x, y, times) {
    if (this.map[x][y].ground.isPlain())
      this.map[x][y].treasure = new Treasure(x, y, times);
  }

  addAdventurer(name, x, y, direction, sequences) {
    if (this.map[x][y].ground.isPlain()) {
      let adventurer = new Adventurer(name, x, y, direction, sequences);
      this.map[x][y].adventurer = adventurer;

      this.adventurers.push(adventurer);
    }
  }

  getAdventurers() {
    return this.adventurers;
  }

  updatePosition(element, old_x, old_y, new_x, new_y) {
    this.map[new_x][new_y].adventurer = element;
    this.map[old_x][old_y].adventurer = {};

    if (this.isTreasureThere(new_x, new_y)) {
      this.map[new_x][new_y].adventurer.collectTreasure();
      this.map[new_x][new_y].treasure.collectedBy(
        this.map[new_x][new_y].adventurer
      );
    }
  }

  isTreasureThere(x, y) {
    if (!isEmpty(this.map[x][y].treasure))
      if (this.map[x][y].treasure.times > 0) return true;
      else return false;
    else return false;
  }

  isAdventurerThere(x, y) {
    return !isEmpty(this.map[x][y].adventurer);
  }

  toString() {
    let map_log = "\n=====================\n";

    this.map.forEach((x, i) => {
      x.forEach((y, j) => {
        if (!isEmpty(y.adventurer)) map_log = map_log + y.adventurer.toString();
        else if (!isEmpty(y.treasure))
          if (y.treasure.times > 0) map_log = map_log + y.treasure.toString();
          else map_log = map_log + y.ground.toString();
        else {
          map_log = map_log + y.ground.toString();
        }
      });
      map_log = map_log + "\n";
    });

    map_log = map_log + "\n=====================\n";

    return map_log;
  }
}

export default Map;
