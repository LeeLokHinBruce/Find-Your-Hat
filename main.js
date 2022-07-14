const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

let currentPlaying = true;

class Field {
  constructor(field) {
    this._field = field;
    this.y = 0 // row
    this.x = 0 // col
  }

  get currentPos() {
    return this._field[this.y][this.x];
  }

  print() {
    return this._field.map((row) => row.join("")).join("\n");
  }

  direction(){
    let move = prompt("Choose direction to move to(wasd): ")
    switch(move){
      case 'w':
        // move up
        this.y--
        break
      case 's':
        // move down
        this.y++
        break
      case 'a':
        // move left
        this.x--
        break
      case 'd':
        // move right
        this.x++
        break
      default:
        break
    }
  }

  gameover(){
    // The game will crash while trying to read out of range array (row array)
    if(this._field[this.y] == undefined){
      console.log("You lose - Out of bounds")
      return currentPlaying = false
    }

    switch(this._field[this.y][this.x]){
      case hole:
        console.log("You lose - Fell in a hole!")
        currentPlaying = false
        break
      case undefined:
        console.log("You lose - Out of bounds!")
        currentPlaying = false
        break
      case hat:
        console.log("You win - Find the hat!")
        currentPlaying = false
        break
      case fieldCharacter:
        console.log("Keep looking for the hat...")
        this._field[this.y][this.x] = pathCharacter
        break
      case pathCharacter:
        console.log("You are step on *")
        break
    }
  }
}

const myField = new Field([
  ["*", "░", "░"],
  ["O", "O", "░"],
  ["░", "^", "░"],
]);

function game(){
  while(currentPlaying){
    console.log(myField.print())
    myField.direction()
    myField.gameover()
  }
  console.log('Game Over!')
}

game()