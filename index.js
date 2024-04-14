import wordBank from "./word-bank.js";
import prompt from "readline-sync";
console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

// Function to check if a letter is present in the word
const isLetterInWord = (letter, word) => word.includes(letter);

// Function to display the word with guessed letters
const displayWord = (word, guessedLetters) => {
    return word.split('').map(char => guessedLetters.includes(char) ? char : '_').join(' ');
};

// Main game function
const playGame = (wordBank) => {
    const hangman = [
        "  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========="
    ];

    // Select a random word from the word bank
    const getRandomWord = (wordBank) => {
      const randomIndex = Math.floor(Math.random() * wordBank.length);
      return wordBank[randomIndex]
    };
    const selectedWord = getRandomWord(wordBank);
    const wordLength = selectedWord.length;
  

    // Array to store guessed letters
    const guessedLetters = [];
    let incorrectGuesses = 0;
    let correctGuesses = 0;
    let isGameRunning = true;

    while (isGameRunning) {
        // Display hangman and the word with guessed letters
        console.log(hangman[incorrectGuesses]);
        console.log('Word: ' + displayWord(selectedWord, guessedLetters));

        // Prompt user for input
        const guess = prompt.question('Guess a letter: ').toLowerCase();

        // Check if the guess is valid (a single letter)
        if (!/^[a-zA-Z]$/.test(guess)) {
            console.log('Please enter a single letter.');
            continue;
        }

        // Check if the letter has already been guessed
        if (guessedLetters.includes(guess)) {
            console.log('You already guessed that letter.');
            continue;
        }

        // Add the guessed letter to the list
        guessedLetters.push(guess);

        // Check if the guessed letter is in the word
        if (isLetterInWord(guess, selectedWord)) {
            console.log('Correct!');
            correctGuesses++;
        } else {
            console.log('Incorrect!');
            incorrectGuesses++;
        }
      
        // Check if the game is over
        if (incorrectGuesses >= 6) {
          console.log('Game over! The word was: ' + selectedWord + "\nWould you like to play agin? If so, run node . again!");
          isGameRunning = false;
        } if(correctGuesses === wordLength){
            console.log('Congratulations! You guessed the word: ' + selectedWord + "\nWould you like to play agin? If so, run node . again!");
            isGameRunning = false;
        }
    }
};

playGame(wordBank);

