

//GLOBAL VARS
//======================================================
//arrays and variables
var wordOptions = ["red", "blue", "pink", "green", "yellow", "black", "white"];
var allowedCharacters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; 
var wrongLetters = [];
var wrongLettersInCaps =[];

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 0;

//FUNCTIONS
//======================================================
function startGame() {
  //randomly select a word from wordOptions
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersInWord = selectedWord.split("");
  numBlanks = lettersInWord.length;
  
  //reset
  guessesLeft = numBlanks * 3;  //numbers of guesses allowed increases with longer words
  wrongLetters = [];
  wrongLettersInCaps = [];
  blanksAndSuccesses = [];
  
  //populate blanksAndSuccesses
  for (var i=0; i<numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  //change HTML
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("winCounter").innerHTML = winCount;
  document.getElementById("lossCounter").innerHTML = lossCount;
  document.getElementById("wrongGuesses").innerHTML = wrongLetters; 
}

//check if letter exists in word
function checkLetters(letter) {
  
  //check to see if letter is alphabetical
  //if not don't allow
  if (allowedCharacters.includes(letter)==false) {
    alert('That key is not allowed.  Select a thru z only.');
    return 0;
  }
  
  
  //check to see if letter was already tried
  //if so, alert and don't penalize
  if(wrongLetters.includes(letter)){
    alert("You already guessed the letter "+ "'"+letter+"'.");
    return 0;
  }
 
 var isLetterInWord = false;
  for (var i=0; i<numBlanks; i++){
    if(selectedWord[i] == letter) {
      isLetterInWord = true;  
    }
  }
   
  //check where in word Letter exists, then poplulate out blanksAndSuccesses array.
  if(isLetterInWord) {
    for (var i=0; i<numBlanks; i++) {
    if(selectedWord[i] == letter) {
      blanksAndSuccesses[i] = letter;
      document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    }
   }
  }
  // letter wasn't found
    else {
      wrongLetters.push(letter);
      //I added uppercase because the instructions for this assignment asked for this
      wrongLettersInCaps.push(letter.toUpperCase());
      guessesLeft--;
    }
}


function roundComplete(){
  //update the HTML to reflect the most recent count stats
   document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("wrongGuesses").innerHTML = wrongLettersInCaps.join(" ");
  
  //check if user won
  if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert("You won!");
    
    
    //update the win counter in HTML
    document.getElementById("winCounter").innerHTML = winCount;
    startGame();
  }
  
   //check if user lost
  else if  (guessesLeft==0) {
      lossCount++;
      alert("You Lost!");
    //update the win counter in HTML
   document.getElementById("lossCounter").innerHTML = lossCount;
   startGame();
    }
    
  
}

//MAIN PROCESS
//======================================================

startGame();


document.onkeyup  = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete(); 
}