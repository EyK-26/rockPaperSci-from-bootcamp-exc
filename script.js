const ROCK = "rock"; //declare global variables to avoid typos
const PAPER = "paper";
const SCISSORS = "scissors";
const DRAW = "draw";
const WIN = "win";
const LOSE = "lose";
//initialize game
class Game {
  constructor() {
    this.array = ["rock", "paper", "scissors"];
  }
  init() {
    new Control(); //initiate player controls
    new ResetGame(); //instantiate restart the game class
  }
}
//declare controls
class Control {
  constructor() {
    this.rock = document.querySelector(".btn.rock");
    this.paper = document.querySelector(".btn.paper");
    this.scissors = document.querySelector(".btn.scissors");
    this.rock.addEventListener("click", this.playerTrun.bind(this)); //add event listeners
    this.paper.addEventListener("click", this.playerTrun.bind(this));
    this.scissors.addEventListener("click", this.playerTrun.bind(this));
  }

  playerTrun(e) {
    const bot = new Bot(e.target.textContent.toLowerCase()); //pass textContent of the picked button and instantiate the Bot class for bot's turn
    bot.botTurn();
  }
}
//Bot class extends from Game to access rock,paper,scissors array (could have been declared here as well)
class Bot extends Game {
  constructor(playerChoice) {
    super();
    this.playerChoice = playerChoice;
  }

  botTurn() {
    let botChoice = this.array[Math.floor(Math.random() * this.array.length)]; //pick random element from array
    const evaluate = new Evaluate(this.playerChoice, botChoice); //instantiate evaluate class
    const result = evaluate.evaluate(); //store the result
    const updateScores = new UpdateScores(result); //instantiate the updateScores class and pass result
    updateScores.updateScores();
  }
}
//evaluate class passed by above class player choice and bot choice
class Evaluate {
  constructor(playerChoice, botChoice) {
    this.playerChoice = playerChoice;
    this.botChoice = botChoice;
  }
  //return outcome of choices
  compareChoices() {
    return this.playerChoice === this.botChoice
      ? DRAW
      : this.playerChoice === ROCK && this.botChoice === SCISSORS
      ? WIN
      : this.playerChoice === PAPER && this.botChoice === ROCK
      ? WIN
      : this.playerChoice === SCISSORS && this.botChoice === PAPER
      ? WIN
      : LOSE;
  }

  evaluate() {
    const outCome = this.compareChoices();
    const updateDom = new UpdateDom(this.playerChoice, this.botChoice, outCome); //instanciate updateDom class with outcome and both players' choices
    updateDom.updateDom();
    return this.compareChoices(); //return outcome to store in const result above
  }
}
//update scores
class UpdateScores {
  constructor(result) {
    this.scorePlayer = document.querySelector(".score-human");
    this.scoreBot = document.querySelector(".score-bot");
    this.result = result;
  }
  //access text content of DOM elements
  updateScores() {
    if (this.result === WIN) {
      this.scorePlayer.textContent = Number(this.scorePlayer.textContent) + 1;
    } else if (this.result === LOSE) {
      this.scoreBot.textContent = Number(this.scoreBot.textContent) + 1;
    } else {
      return;
    }
  }
}
//Update DOM and process the passed parameters from Evaluate class and evaluate method
//extend from update scores bc passing it below for ResetGame class to reset scores
class UpdateDom extends UpdateScores {
  constructor(playerChoice, botChoice, outcome) {
    super();
    this.playerChoice = playerChoice;
    this.botChoice = botChoice;
    this.outCome = outcome;
    this.choicePlayer = document.querySelector(".choice-human");
    this.choiceBot = document.querySelector(".choice-bot");
    this.result = document.querySelector(".result-current");
  }
  //capitalize first letters for better UI
  capitalize(text) {
    return text.replace(text.charAt(0), text.charAt(0).toUpperCase());
  }
  //update DOM
  updateDom() {
    this.choicePlayer.textContent = this.capitalize(this.playerChoice);
    this.choiceBot.textContent = this.capitalize(this.botChoice);
    this.result.textContent = this.capitalize(this.outCome);
  }
}
//reset the game, extend from UpdateScore and UpdateDom the query selectors
class ResetGame extends UpdateDom {
  constructor() {
    super();
    this.resetBtn = document.querySelector(".btn.reset");
    this.resetBtn.addEventListener("click", this.resetGame.bind(this));
  }

  resetGame() {
    this.choicePlayer.textContent = "";
    this.choiceBot.textContent = "";
    this.result.textContent = "";
    this.scorePlayer.textContent = "0";
    this.scoreBot.textContent = "0";
  }
}
//instantiate/start the Game
const game = new Game();
game.init();
