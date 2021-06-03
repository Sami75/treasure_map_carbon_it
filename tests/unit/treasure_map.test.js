import Adventurer from "../../Classes/Adventurer/Adventurer.js";
import Map from "../../Classes/Map/Map.js";
import Mountain from "../../Classes/Mountain/Mountain.js";
import Plain from "../../Classes/Plain/Plain.js";
import Treasure from "../../Classes/Treasure/Treasure.js";

describe("Treasure map test", () => {
  const width = 2;
  const height = 2;
  const map = new Map(width, height);

  jest.spyOn(map, "mapMaker");
  jest.spyOn(map, "addMountain");

  it("should return out the map", () => {
    let result = [
      [
        {
          adventurer: {},
          treasure: {},
          ground: new Plain(0, 0),
        },
        {
          adventurer: {},
          treasure: {},
          ground: new Plain(0, 1),
        },
      ],
      [
        {
          adventurer: {},
          treasure: {},
          ground: new Plain(1, 0),
        },
        {
          adventurer: {},
          treasure: {},
          ground: new Plain(1, 1),
        },
      ],
    ];

    expect(map.mapMaker()).toMatchObject(result);
    expect(map.mapMaker).toHaveBeenCalledTimes(1);
  });
  it("should add a mountain to a specific position", () => {
    map.addMountain(1, 1);
    expect(map.map[1][1]).toMatchObject({ ground: new Mountain(1, 1) });
  });
  it("should add a plain to a specific position", () => {
    map.addPlain(1, 1);
    expect(map.map[1][1]).toMatchObject({ ground: new Plain(1, 1) });
  });
  it("should add a treasure to a specific position", () => {
    map.addTreasure(1, 1, 2);
    expect(map.map[1][1]).toMatchObject({ treasure: new Treasure(1, 1, 2) });
  });
  it("should add an adventurer to a specific position", () => {
    map.addAdventurer("test", 1, 1, "N", "ADADADA");
    expect(map.map[1][1]).toMatchObject({
      adventurer: new Adventurer("test", 1, 1, "N", "ADADADA"),
    });
  });
  it("shoud check if there is a treasure in a specific position", () => {
    expect(map.isTreasureThere(1, 1)).toBe(true);
    expect(map.isTreasureThere(0, 1)).toBe(false);
  });
  it("shoud move and update position of an adventurer", () => {
    map.addAdventurer("test", 1, 1, "N", "ADADADA");

    let adventurer = new Adventurer("test", 1, 1, "N", "ADADADA");
    adventurer.move(map);
    //TODO other test to check like, treasure number, positions history, sequence index...
    expect(map.map[0][1].adventurer).toMatchObject(adventurer);
  });
  it("should check if there is an adventurer in a specific position", () => {
    expect(map.isAdventurerThere(0, 1)).toBe(true);
    expect(map.isAdventurerThere(0, 0)).toBe(false);
  });
  it("should return type of box", () => {
    const mountain = new Mountain(1, 1);
    const plain = new Plain(0, 0);
    const adventurer = new Adventurer("test", 1, 1, "N", "ADADADA");
    const treasure = new Treasure(1, 2, 3);

    expect(mountain.typeBox()).toBe("mountain");
    expect(plain.typeBox()).toBe("plain");
    expect(adventurer.typeBox()).toBe("adventurer");
    expect(treasure.typeBox()).toBe("treasure");
  });
  it("should return check type of box", () => {
    const mountain = new Mountain(1, 1);
    const plain = new Plain(0, 0);
    const adventurer = new Adventurer("test", 1, 1, "N", "ADADADA");
    const treasure = new Treasure(1, 2, 3);

    expect(mountain.isMountain()).toBe(true);
    expect(plain.isPlain()).toBe(true);
    expect(adventurer.isAdventurer()).toBe(true);
    expect(treasure.isTreasure()).toBe(true);
  });
  it("should the next movement of adventurer", () => {
    const adventurer = new Adventurer("test", 1, 1, "N", "ADADADA");

    expect(adventurer.getMovement()).toBe("A");
    expect(adventurer.getMovement()).not.toBe("D");
  });
  it("should return the following position of the adventurer according to his movement, direction and position", () => {
    //Forward - North - 1, 1
    let adventurer = new Adventurer("test", 1, 1, "N", "ADADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 0, y: 1 });
    //Forward - South  - 1, 1
    adventurer = new Adventurer("test", 1, 1, "S", "ADADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 2, y: 1 });

    //Forward - East - 1, 1
    adventurer = new Adventurer("test", 1, 1, "E", "ADADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 2 });

    //Forward - West - 1, 1
    adventurer = new Adventurer("test", 1, 1, "O", "ADADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 0 });

    //Turn right - North - 1, 1
    adventurer = new Adventurer("test", 1, 1, "N", "DDADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 1 });
    expect(adventurer.direction).toBe("E");

    //Turn left - North - 1, 1
    adventurer = new Adventurer("test", 1, 1, "N", "GDADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 1 });
    expect(adventurer.direction).toBe("O");

    //Turn right - South - 1, 1
    adventurer = new Adventurer("test", 1, 1, "S", "DDADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 1 });
    expect(adventurer.direction).toBe("O");

    //Turn left - South - 1, 1
    adventurer = new Adventurer("test", 1, 1, "S", "GDADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 1 });
    expect(adventurer.direction).toBe("E");

    //Turn right - East - 1, 1
    adventurer = new Adventurer("test", 1, 1, "E", "DDADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 1 });
    expect(adventurer.direction).toBe("S");

    //Turn left - East - 1, 1
    adventurer = new Adventurer("test", 1, 1, "E", "GDADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 1 });
    expect(adventurer.direction).toBe("N");

    //Turn right - West - 1, 1
    adventurer = new Adventurer("test", 1, 1, "O", "DDADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 1 });
    expect(adventurer.direction).toBe("N");

    //Turn left - West - 1, 1
    adventurer = new Adventurer("test", 1, 1, "O", "GDADADA");
    expect(adventurer.getNewPosition()).toMatchObject({ x: 1, y: 1 });
    expect(adventurer.direction).toBe("S");
  });
});
