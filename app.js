// (c) Supermike Adventures 2017

// VARIABLE DECLARATIONS -------------------------------------------------------------------------------------------------------- //

var scores, roundScore, activePlayer, gameOver, gameStarted;

scores = [0, 0];
roundScore = 0;
activePlayer = 0; // 0 - Player 1 ; 1 - Player 2
gameOver = true;
gameStarted = false;


// FUNCTIONS -------------------------------------------------------------------------------------------------------- //

// Initial Function Function
function initialSettings() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // 0 - Player 1 ; 1 - Player 2

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Reset dice images
    hideDice();

    // Reset Player Style
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    gameOver = true;

    // Reset Buttons
    document.getElementById('button-container').classList.add('gameover');

    // Hide Winner Text
    document.getElementById('winner-0').style.display = 'none';
    document.getElementById('winner-1').style.display = 'none';
}

// New Game Function
function newGame() {
    if (gameOver == true) {
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0; // 0 - Player 1 ; 1 - Player 2

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // Reset Player Style
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');

        // Reset Buttons
        document.getElementById('button-container').classList.remove('gameover');
        document.getElementById('button-container').classList.add('started');

        // Hide Winner Text
        document.getElementById('winner-0').style.display = 'none';
        document.getElementById('winner-1').style.display = 'none';

        // Hide dice images
        hideDice();

        gameOver = false;
        gameStarted = true;
    }
}

// Change Active Player and its styles; Reset dice images
function changeActivePlayer() {
    // Change Active Player
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Change active player style
    if (activePlayer === 0) {
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    } else {
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
    }

    // Hide dice images
    hideDice();
}

// Display Dice Function
function displayDice() {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
}

// Hide Dice Function
function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


// Call Initial Settings
initialSettings();


// EVENTS -------------------------------------------------------------------------------------------------------- //

// ROLL EVENT
document.querySelector('.btn-roll').addEventListener('click', function () { // Anonymous Function

    if (gameOver == false && gameStarted == true) {
        // Change active player style
        if (activePlayer === 0) {
            document.querySelector('.player-0-panel').classList.add('active');
            document.querySelector('.player-1-panel').classList.remove('active');
        } else {
            document.querySelector('.player-1-panel').classList.add('active');
            document.querySelector('.player-0-panel').classList.remove('active');
        }

        // 1. Generate random number
        var dice1 = Math.floor((Math.random() * 6) + 1);
        var dice2 = Math.floor((Math.random() * 6) + 1);

        // 2. Display dice images
        displayDice();

        // Setter - set the dice value result
        document.querySelector('#current-' + activePlayer).textContent = dice1;
        document.querySelector('#current-' + activePlayer).textContent = dice2;
        //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

        // Getter
        //var x = document.querySelector('#current-' + activePlayer).textContent;

        document.getElementById('dice-1').attributes.src.textContent = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').attributes.src.textContent = 'img/dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was not a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add Score
            roundScore += dice1 + dice2;
            // Display Score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Add Shake It
            document.querySelector('.wrapper').classList.add('shake-it');
            setTimeout(function () {
                document.querySelector('.wrapper').classList.remove('shake-it');
            }, 1000);
            // Change Active Player and its style; Reset dice image
            changeActivePlayer();
        }
    }
});

// HOLD EVENT
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gameOver == false && gameStarted == true) {
        // Add current score to the global score
        scores[activePlayer] += roundScore;
        // Display global score
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= finalScore) {
            // Hide dice images
            hideDice();
            // Change Player Style to Winning Theme
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // Reset Buttons
            document.getElementById('button-container').classList.add('gameover');
            document.getElementById('button-container').classList.remove('started');
            // Display Winner Text
            document.getElementById('winner-' + activePlayer).style.display = 'block';
            // Game Over
            gameOver = true;
        } else {
            // Change Active Player and its style; Reset dice image
            changeActivePlayer();
        }
    }
});


// NEW GAME EVENT
// Callback Function
document.querySelector('.btn-new').addEventListener('click', newGame);



// FORM VALIDATIONS -------------------------------------------------------------------------------------------------------- //

var finalScore;

// GET PLAYER'S NAMES AND FINAL SCORE EVENT
document.getElementById('btn-enter').addEventListener('click', function () {
    // Get player names from input
    var p1Name = document.getElementById('player-name-1').value;
    var p2Name = document.getElementById('player-name-2').value;

    // Get final score
    finalScore = document.getElementById('final-score').value;

    if(finalScore == '') {
        finalScore = 100;
    } else {
        finalScore = finalScore;
    }

    // Display final score
    document.getElementById('side-score').textContent = finalScore;


    if (p1Name != '' && p2Name != '') {
        document.getElementById('player-name-1').classList.remove('error');
        document.getElementById('player-name-2').classList.remove('error');

        // Hide form and blur
        document.querySelector('.player-names').style.display = 'none';
        document.querySelector('.blur').style.display = 'none';

        // Display player names values
        document.getElementById('name-0').textContent = p1Name;
        document.getElementById('name-1').textContent = p2Name;
    } else {
        if (p1Name == '') {
            document.getElementById('player-name-1').classList.add('error');
        }
        if (p2Name == '') {
            document.getElementById('player-name-2').classList.add('error');
        }

    }
});

// TRIGGER ON ENTER
document.getElementById('player-name-1').addEventListener('keyup', function (event) {
    // Get player names from input
    var p1Name = document.getElementById('player-name-1').value;
    var p2Name = document.getElementById('player-name-2').value;

    if (p1Name.value != '' && p2Name.value != '') {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("btn-enter").click();
        }
    }
});

document.getElementById('player-name-2').addEventListener('keyup', function (event) {
    // Get player names from input
    var p1Name = document.getElementById('player-name-1').value;
    var p2Name = document.getElementById('player-name-2').value;


    if (p1Name.value != '' && p2Name.value != '') {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("btn-enter").click();
        }
    }
});

document.getElementById('final-score').addEventListener('keyup', function (event) {
    // Get player names from input
    var p1Name = document.getElementById('player-name-1').value;
    var p2Name = document.getElementById('player-name-2').value;


    if (p1Name.value != '' && p2Name.value != '') {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("btn-enter").click();
        }
    }
});

function removeShake() {
    document.getElementById('player-name-1').classList.remove('error');
}

function checkInput() {
    var p1Name = document.getElementById('player-name-1').value;

    if(p1Name != '') {
        document.getElementById('player-name-1').classList.remove('error');
    } else {
        document.getElementById('player-name-1').classList.add('error');
    }
}

function checkInput2() {
    var p2Name = document.getElementById('player-name-2').value;

    if(p2Name != '') {
        document.getElementById('player-name-2').classList.remove('error');
    } else {
        document.getElementById('player-name-2').classList.add('error');
    }
}

