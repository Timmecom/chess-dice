const dieContainer = document.getElementById('die-container');
const dieNumber = document.getElementById('die-number');
const colorSelection = document.getElementById('color-selection');
const whiteBtn = document.getElementById('white-btn');
const blackBtn = document.getElementById('black-btn');
const result = document.getElementById('result');
const chessboardContainer = document.getElementById('chessboard-container');
const chessboard = document.getElementById('chessboard');
const themeSwitch = document.getElementById('theme-switch');

// Rules elements
const rulesBtn = document.getElementById('rules-btn');
const rulesModal = document.getElementById('rules-modal');
const closeRules = document.getElementById('close-rules');
const whiteRulesBody = document.getElementById('white-rules-body');
const blackRulesBody = document.getElementById('black-rules-body');

let dieValue = 0;
let selectedColor = '';

// Chess moves array for white
let whiteMovesInit = [
    { piece: 'P', from: 'a2', to: 'a3', desc: "Pawn a2 to a3 (one square)" },
    { piece: 'P', from: 'a2', to: 'a4', desc: "Pawn a2 to a4 (two squares)" },
    { piece: 'P', from: 'b2', to: 'b3', desc: "Pawn b2 to b3 (one square)" },
    { piece: 'P', from: 'b2', to: 'b4', desc: "Pawn b2 to b4 (two squares)" },
    { piece: 'P', from: 'c2', to: 'c3', desc: "Pawn c2 to c3 (one square)" },
    { piece: 'P', from: 'c2', to: 'c4', desc: "Pawn c2 to c4 (two squares)" },
    { piece: 'P', from: 'd2', to: 'd3', desc: "Pawn d2 to d3 (one square)" },
    { piece: 'P', from: 'd2', to: 'd4', desc: "Pawn d2 to d4 (two squares)" },
    { piece: 'P', from: 'e2', to: 'e3', desc: "Pawn e2 to e3 (one square)" },
    { piece: 'P', from: 'e2', to: 'e4', desc: "Pawn e2 to e4 (two squares)" },
    { piece: 'P', from: 'f2', to: 'f3', desc: "Pawn f2 to f3 (one square)" },
    { piece: 'P', from: 'f2', to: 'f4', desc: "Pawn f2 to f4 (two squares)" },
    { piece: 'P', from: 'g2', to: 'g3', desc: "Pawn g2 to g3 (one square)" },
    { piece: 'P', from: 'g2', to: 'g4', desc: "Pawn g2 to g4 (two squares)" },
    { piece: 'P', from: 'h2', to: 'h3', desc: "Pawn h2 to h3 (one square)" },
    { piece: 'P', from: 'h2', to: 'h4', desc: "Pawn h2 to h4 (two squares)" },
    { piece: 'N', from: 'b1', to: 'a3', desc: "Knight b1 to a3" },
    { piece: 'N', from: 'b1', to: 'c3', desc: "Knight b1 to c3" },
    { piece: 'N', from: 'g1', to: 'f3', desc: "Knight g1 to f3" },
    { piece: 'N', from: 'g1', to: 'h3', desc: "Knight g1 to h3" }
];

// Chess moves array for black
let blackMovesInit = [
    { piece: 'P', from: 'a7', to: 'a6', desc: "Pawn a7 to a6 (one square)" },
    { piece: 'P', from: 'a7', to: 'a5', desc: "Pawn a7 to a5 (two squares)" },
    { piece: 'P', from: 'b7', to: 'b6', desc: "Pawn b7 to b6 (one square)" },
    { piece: 'P', from: 'b7', to: 'b5', desc: "Pawn b7 to b5 (two squares)" },
    { piece: 'P', from: 'c7', to: 'c6', desc: "Pawn c7 to c6 (one square)" },
    { piece: 'P', from: 'c7', to: 'c5', desc: "Pawn c7 to c5 (two squares)" },
    { piece: 'P', from: 'd7', to: 'd6', desc: "Pawn d7 to d6 (one square)" },
    { piece: 'P', from: 'd7', to: 'd5', desc: "Pawn d7 to d5 (two squares)" },
    { piece: 'P', from: 'e7', to: 'e6', desc: "Pawn e7 to e6 (one square)" },
    { piece: 'P', from: 'e7', to: 'e5', desc: "Pawn e7 to e5 (two squares)" },
    { piece: 'P', from: 'f7', to: 'f6', desc: "Pawn f7 to f6 (one square)" },
    { piece: 'P', from: 'f7', to: 'f5', desc: "Pawn f7 to f5 (two squares)" },
    { piece: 'P', from: 'g7', to: 'g6', desc: "Pawn g7 to g6 (one square)" },
    { piece: 'P', from: 'g7', to: 'g5', desc: "Pawn g7 to g5 (two squares)" },
    { piece: 'P', from: 'h7', to: 'h6', desc: "Pawn h7 to h6 (one square)" },
    { piece: 'P', from: 'h7', to: 'h5', desc: "Pawn h7 to h5 (two squares)" },
    { piece: 'N', from: 'b8', to: 'a6', desc: "Knight b8 to a6" },
    { piece: 'N', from: 'b8', to: 'c6', desc: "Knight b8 to c6" },
    { piece: 'N', from: 'g8', to: 'f6', desc: "Knight g8 to f6" },
    { piece: 'N', from: 'g8', to: 'h6', desc: "Knight g8 to h6" }
];

// Store current moves based on color
let chessMoves = whiteMovesInit;

// Check for system theme preference
function getPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Apply theme based on preference
function applyTheme(theme) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(theme + '-mode');
    themeSwitch.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('chess-dice-theme', theme);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('chess-dice-theme');
    const preferredTheme = savedTheme || getPreferredTheme();
    applyTheme(preferredTheme);
}

// Theme toggle
themeSwitch.addEventListener('click', function() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Populate rules tables
function populateRulesTables() {
    // Clear existing rows
    whiteRulesBody.innerHTML = '';
    blackRulesBody.innerHTML = '';
    
    // Add white moves
    whiteMovesInit.forEach((move, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${move.piece}</td>
            <td>${move.from}</td>
            <td>${move.to}</td>
            <td>${move.desc}</td>
        `;
        whiteRulesBody.appendChild(row);
    });
    
    // Add black moves
    blackMovesInit.forEach((move, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${move.piece}</td>
            <td>${move.from}</td>
            <td>${move.to}</td>
            <td>${move.desc}</td>
        `;
        blackRulesBody.appendChild(row);
    });
}

// Initialize the chessboard
function initChessboard() {
    chessboard.innerHTML = '';
    const pieces = {
        'a1': '♖', 'b1': '♘', 'c1': '♗', 'd1': '♕', 'e1': '♔', 'f1': '♗', 'g1': '♘', 'h1': '♖',
        'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♙', 'e2': '♙', 'f2': '♙', 'g2': '♙', 'h2': '♙',
        'a7': '♟', 'b7': '♟', 'c7': '♟', 'd7': '♟', 'e7': '♟', 'f7': '♟', 'g7': '♟', 'h7': '♟',
        'a8': '♜', 'b8': '♞', 'c8': '♝', 'd8': '♛', 'e8': '♚', 'f8': '♝', 'g8': '♞', 'h8': '♜'
    };

    for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            const colLetter = String.fromCharCode(97 + col); // 'a' to 'h'
            const position = `${colLetter}${row}`;

            square.classList.add('square');
            square.classList.add((row + col) % 2 === 0 ? 'black' : 'white');
            square.dataset.position = position;

            if (pieces[position]) {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                piece.textContent = pieces[position];
                piece.dataset.piece = pieces[position];
                square.appendChild(piece);
            }

            chessboard.appendChild(square);
        }
    }
}

// Roll the die
dieContainer.addEventListener('click', function() {
    // Animation for rolling
    dieNumber.textContent = '...';
    
    // Simple animation
    dieContainer.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        dieValue = Math.floor(Math.random() * 20) + 1;
        dieNumber.textContent = dieValue;
        
        // Reset animation
        dieContainer.style.transform = 'scale(1)';

        // Show color selection
        colorSelection.style.display = 'block';
        result.textContent = `You rolled a ${dieValue}. Now select a color.`;
    }, 500);
});

// Color selection
whiteBtn.addEventListener('click', function() {
    selectedColor = 'white';
    chessMoves = whiteMovesInit;
    processSelection();
});

blackBtn.addEventListener('click', function() {
    selectedColor = 'black';
    chessMoves = blackMovesInit;
    processSelection();
});

// Process the selection and show the chessboard
function processSelection() {
    // Initialize the chessboard
    initChessboard();

    // Show the chessboard with CSS class instead of fixed positioning
    chessboardContainer.classList.add('chessboard-visible');

    // Rotate the board if black is selected
    if (selectedColor === 'black') {
        chessboard.classList.add('rotated');
    } else {
        chessboard.classList.remove('rotated');
    }

    // Get the move based on the die roll (1-20)
    const moveIndex = dieValue - 1;
    const move = chessMoves[moveIndex];

    // Update the result text - SIMPLIFIED as requested
    result.textContent = move.desc.split(' (')[0]; // Remove the part in parentheses

    // Highlight the move
    setTimeout(() => {
        const fromSquare = document.querySelector(`.square[data-position="${move.from}"]`);
        const toSquare = document.querySelector(`.square[data-position="${move.to}"]`);

        if (fromSquare && toSquare) {
            fromSquare.classList.add('highlight');

            // Animate the move
            setTimeout(() => {
                const piece = fromSquare.querySelector('.piece');
                if (piece) {
                    fromSquare.removeChild(piece);
                    toSquare.appendChild(piece);
                    toSquare.classList.add('highlight-move');
                }
            }, 1000);
        }
    }, 500);
}

// Rules modal functionality
rulesBtn.addEventListener('click', function() {
    populateRulesTables();
    rulesModal.style.display = 'block';
});

closeRules.addEventListener('click', function() {
    rulesModal.style.display = 'none';
});

// Close modal if clicked outside
window.addEventListener('click', function(event) {
    if (event.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    populateRulesTables();
});
