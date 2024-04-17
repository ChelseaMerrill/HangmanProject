import wordBank from "./word-bank.js";
import prompt from "readline-sync";
console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

const isLetterInWord = (letter, word) => word.includes(letter); //checks to see if the letter is in the word

const displayWord = (word, guessedLetters) => {
    return word.split('').map(char => guessedLetters.includes(char) ? char : '_').join(' ');
}; //displays the word to the user in the ofrm of underscrores do they can't see the letters that they haven't guessed yet

const playGame = (wordBank) => {
    const hangman = [
        "  +---+\n  |   |\n      |\n      |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n_________"
    ]; //building of the hangman

    const getRandomWord = (wordBank) => {
      const randomIndex = Math.floor(Math.random() * wordBank.length);
      return wordBank[randomIndex]
    }; //gets a random word from the wordBank
    const selectedWord = getRandomWord(wordBank); //takes the random word that was selected and assigns it to being the solution
    const wordLength = selectedWord.length;

    const guessedLetters = []; //stores all of the letters that have been guessed
    let incorrectGuesses = 0; //counts how many incorrect letters have been guessed
    let correctGuesses = 0; //counts how many correct letters have been guessed
    let isGameRunning = true; 

    while (isGameRunning) {
        console.log(hangman[incorrectGuesses]); // shows the currect status of the hangman build
        console.log('Solution: ' + displayWord(selectedWord, guessedLetters)); 

        const guess = prompt.question('Guess a letter: ').toLowerCase(); //prompts the user to enter in a letter

        if (!/^[a-zA-Z]$/.test(guess)) {
            console.log('Please enter a valid letter in either upper or lowercase.');
            continue; //validation check on what the user enters using Regex
        }

        if (guessedLetters.includes(guess)) {
            console.log('You have guessed that letter before. Try again!');
            continue; //makes sure duplicate entries do not count against the user
        }

        guessedLetters.push(guess); //adds the guessed letter to the array that is tracking the guessed letters

        if (isLetterInWord(guess, selectedWord)) {
            console.log('Correct!');
            correctGuesses++;
        } else {
            console.log('Incorrect!');
            incorrectGuesses++;
        } //adds the letter to the count of either correct or incorrect guesses

        if (incorrectGuesses >= 6) {
          console.log('Game over! The word was: ' + selectedWord + "\nWould you like to play agin? If so, run node . again!");
          isGameRunning = false;
        } if (correctGuesses === wordLength){
            console.log('Congratulations! You guessed the word: ' + selectedWord + "\nWould you like to play agin? If so, run node . again!");
            isGameRunning = false;
        } //tells the user if they won or lost the game and prompts them to play again
    }
};

playGame(wordBank);

