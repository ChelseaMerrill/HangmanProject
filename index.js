import wordBank from "./word-bank.js";
import prompt from "readline-sync";
console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

const isLetterInWord = (letter, word) => word.includes(letter);

const displayWord = (word, guessedLetters) => {
    return word.split('').map(char => guessedLetters.includes(char) ? char : '_').join(' ');
};

const playGame = (wordBank) => {
    const hangman = [
        "  +---+\n  |   |\n      |\n      |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n_________",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n_________"
    ];

    const getRandomWord = (wordBank) => {
      const randomIndex = Math.floor(Math.random() * wordBank.length);
      return wordBank[randomIndex]
    };
    const selectedWord = getRandomWord(wordBank);
    const wordLength = selectedWord.length;

    const guessedLetters = [];
    let incorrectGuesses = 0;
    let correctGuesses = 0;
    let isGameRunning = true;

    while (isGameRunning) {
        console.log(hangman[incorrectGuesses]);
        console.log('Solution: ' + displayWord(selectedWord, guessedLetters));

        const guess = prompt.question('Guess a letter: ').toLowerCase();

        if (!/^[a-zA-Z]$/.test(guess)) {
            console.log('Please enter a valid letter in either upper or lowercase.');
            continue;
        }

        if (guessedLetters.includes(guess)) {
            console.log('You have guessed that letter before. Try again!');
            continue;
        }

        guessedLetters.push(guess);

        if (isLetterInWord(guess, selectedWord)) {
            console.log('Correct!');
            correctGuesses++;
        } else {
            console.log('Incorrect!');
            incorrectGuesses++;
        }

        if (incorrectGuesses >= 6) {
          console.log('Game over! The word was: ' + selectedWord + "\nWould you like to play agin? If so, run node . again!");
          isGameRunning = false;
        } if (correctGuesses === wordLength){
            console.log('Congratulations! You guessed the word: ' + selectedWord + "\nWould you like to play agin? If so, run node . again!");
            isGameRunning = false;
        }
    }
};

playGame(wordBank);

