import Box from "../Box/Box.js";

class Mountain extends Box {
  typeBox() {
    return "mountain";
  }

  toString() {
    return "   M   ";
  }
}

export default Mountain;
