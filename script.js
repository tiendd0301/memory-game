let level = 9;  // The level you're practicing
let lives = 3;  // Number of lives
let tiles = Array(6 * 6).fill(0);  // 0 = not part of the pattern, 1 = part of the pattern
let selectedTiles = [];  // To track user's selections
let patternTiles = [];  // To track the pattern
let gameBoard = document.getElementById('game-board');  // The game board element
let message = document.getElementById('message');  // The message element
let nextLevelButton = document.getElementById('next-level');  // The next level button
let retryLevelButton = document.getElementById('retry-level');  // The retry level button
function newGame() {
    // Reset variables
    lives = 3;
    tiles = Array(6 * 6).fill(0);
    selectedTiles = [];
    patternTiles = [];
    
    // Update message
    message.textContent = `Level: ${level - 8} | Lives: ${lives}`;
    
    // Hide buttons
    nextLevelButton.style.display = 'none';
    retryLevelButton.style.display = 'none';
    
    // Clear game board
    while (gameBoard.firstChild) {
        gameBoard.firstChild.remove();
    }
    
    // Generate pattern
    for (let i = 0; i < level; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tiles.length);
        } while (tiles[randomIndex] === 1);
        tiles[randomIndex] = 1;
        patternTiles.push(randomIndex);
    }
    
    // Generate game board
    tiles.forEach((tile, index) => {
        let newTile = document.createElement('div');
        newTile.classList.add('tile');
        newTile.addEventListener('click', () => {
           
// inside the newGame function, continuation of forEach loop
            // If this tile is part of the pattern and not already selected
            if (patternTiles.includes(index) && !selectedTiles.includes(index)) {
                newTile.classList.add('correct');
                selectedTiles.push(index);
                // Check if user has found all the pattern tiles
                if (selectedTiles.length === patternTiles.length) {
                    message.textContent = 'You found all the pattern tiles!';
                    nextLevelButton.style.display = 'block';
                    retryLevelButton.style.display = 'block';
                }
            } else if (!selectedTiles.includes(index)) {  // If tile is not part of the pattern and not already selected
                newTile.classList.add('wrong');
                lives--;
                message.textContent = `Level: ${level - 8} | Lives: ${lives}`;
                // Check if user has lost all lives
                if (lives === 0) {
                    message.textContent = 'You lost all your lives!';
                    retryLevelButton.style.display = 'block';
                }
            }
        });
        gameBoard.appendChild(newTile);
    });

    // Show the pattern for 1.5 seconds at the start
    patternTiles.forEach(index => {
        gameBoard.children[index].classList.add('correct');
    });
    setTimeout(() => {
        patternTiles.forEach(index => {
            gameBoard.children[index].classList.remove('correct');
        });
    }, 1500);
}

// Start a new game when page loads
newGame();

// Add click event to next level button
nextLevelButton.addEventListener('click', () => {
    level++;
    newGame();
});

// Add click event to retry level button
retryLevelButton.addEventListener('click', () => {
    newGame();
});
