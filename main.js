const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

let currentPlaying = true;

class Field {
  constructor(field = [[]]) {
    this._field = field;
    this.y = 0
    this.x = 0
  }

  get field() {
    return this._field;
  }

  // get currentPos() {
  //   return this.field[this.y][this.x];
  // }

  print() {
    return this.field.map((row) => row.join("")).join("\n");
  }

  direction() {
    let move = prompt("Choose direction to move to(wasd): ");
    switch (move) {
      case "w":
        // move up
        this.y--;
        break;
      case "s":
        // move down
        this.y++;
        break;
      case "a":
        // move left
        this.x--;
        break;
      case "d":
        // move right
        this.x++;
        break;
      default:
        break;
    }
  }

  gameover() {
    // The game will crash while trying to read out of range array (row array)
    if (this.field[this.y] == undefined) {
      console.log("You lose - Out of bounds");
      return (currentPlaying = false);
    }

    switch (this.field[this.y][this.x]) {
      case hole:
        console.log("You lose - Fell in a hole!");
        currentPlaying = false;
        break;
      case undefined:
        console.log("You lose - Out of bounds!");
        currentPlaying = false;
        break;
      case hat:
        console.log("You win - Find the hat!");
        currentPlaying = false;
        break;
      case fieldCharacter:
        console.log("Keep looking for the hat...");
        this.field[this.y][this.x] = pathCharacter;
        break;
      case pathCharacter:
        console.log("You are step on *");
        break;
    }
  }

  static generateField(height, width, percentage) {
    // create an field or hole
    const fieldOrHole = (percentage) => {
      const ranNum = Math.random() * 100;
      let generateResult = ranNum < percentage ? hole : fieldCharacter;
      return generateResult;
    };

    // place these fields or holes into the map
    const placeField = () => {
      function placeWidthArray() {
        let widthArr = [];
        for (let col = 0; col < width; col++) {
          widthArr.push(fieldOrHole(percentage));
        }
        return widthArr;
      }

      let heightArr = [];
      for (let row = 0; row < height; row++) {
        heightArr.push(placeWidthArray());
      }
      return heightArr;
    };

    const startField = placeField();

// method 1
    do{
      const hatRow = Math.floor(Math.random() * height)
      const hatCol = Math.floor(Math.random() * width)
      startField[hatRow][hatCol] = hat      
    }while(hat == startField[0][0])

    startField[0][0] = pathCharacter

// method 2
    // let hatRow, hatCol, startRow, startCol;
    // do {
    //   hatRow = Math.floor(Math.random() * height);
    //   hatCol = Math.floor(Math.random() * width);
    //   startField[hatRow][hatCol] = hat;

    //   startRow = Math.floor(Math.random() * height);
    //   startCol = Math.floor(Math.random() * width);
    //   startField[startRow][startCol] = pathCharacter;
    //   // update the path x, y property
    //   this.y = startRow
    //   this.x = startCol
    // } while (startField[hatRow][hatCol] == startField[startRow][startCol]);

    return startField
  }
}

const myField = new Field(Field.generateField(10, 10, 20));

function game() {
  while (currentPlaying) {
    console.log(myField.print());
    // console.log(myField.currentPos);
    myField.direction();
    myField.gameover();
  }
  console.log("Game Over!");
}

game();
