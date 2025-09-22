// index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

let randomNumber = Math.floor(Math.random() * 100) + 1;
let message = "Guess a number between 1 and 100:";
let isGameOver = false;

// GET route for the game page
app.get('/', (req, res) => {
    res.render('game', { message: message, isGameOver: isGameOver });
});

// POST route for handling guesses
app.post('/guess', (req, res) => {
    const userGuess = parseInt(req.body.guess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message = "Please enter a valid number between 1 and 100.";
    } else if (userGuess > randomNumber) {
        message = "Too high! Try again.";
    } else if (userGuess < randomNumber) {
        message = "Too low! Try again.";
    } else {
        message = `Congratulations! You guessed the number ${randomNumber} correctly.`;
        isGameOver = true;
    }
    res.redirect('/');
});

// POST route to start a new game
app.post('/new-game', (req, res) => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    message = "Guess a number between 1 and 100:";
    isGameOver = false;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Game server listening at http://localhost:${port}`);
});