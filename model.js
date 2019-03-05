let carrier = {
    name: "carrier",
    numSquares: 5,
    position:
    [
        {row: "F", column: 2, hit: false},
        {row: "G", column: 2, hit: false},
        {row: "H", column: 2, hit: false},
        {row: "I", column: 2, hit: false},
        {row: "J", column: 2, hit: false},
    ],
    hits: function() { // Figure out a way to easily apply this function to all ships without repeating the function in each object. I will probably just create a constructor for these ships anyway
        let hits = 0;
        for (let i in this.position)
        {
            if (this.position[i].hit == true)
            {
                hits++;
            }
        }
        if (hits == this.position.length)
        {
            this.destroyed = true;
        }
        return hits;
    },
    destroyed: false,
}

let battleship = {
    name: "battleship",
    numSquares: 4,
    position:
    [
        {row: "A", column: 1, hit: true},
        {row: "B", column: 1, hit: true},
        {row: "C", column: 1, hit: true},
        {row: "D", column: 1, hit: false},
    ],
    hits: function() {
        let hits = 0;
        for (let i in this.position)
        {
            if (this.position[i].hit == true)
            {
                hits++;
            }
        }
        if (hits == this.position.length)
        {
            this.destroyed = true;
        }
        return hits;
    },
    destroyed: false
}

let cruiser = {
    name: "cruiser",
    numSquares: 3,
    position:
    [
        {row: "A", column: 5, hit: false},
        {row: "A", column: 6, hit: false},
        {row: "A", column: 7, hit: false},
    ],
    hits: function() {
        let hits = 0;
        for (let i in this.position)
        {
            if (this.position[i].hit == true)
            {
                hits++;
            }
        }
        if (hits == this.position.length)
        {
            this.destroyed = true;
        }
        return hits;
    },
    destroyed: false,
}

let submarine = {
    name: "submarine",
    numSquares: 3,
    position:
    [
        {row: "E", column: 5, hit: false},
        {row: "E", column: 6, hit: false},
        {row: "E", column: 7, hit: false},
    ],
    hits: function() {
        let hits = 0;
        for (let i in this.position)
        {
            if (this.position[i].hit == true)
            {
                hits++;
            }
        }
        if (hits == this.position.length)
        {
            this.destroyed = true;
        }
        return hits;
    },
    destroyed: false,
}

let destroyer = {
    name: "destroyer",
    numSquares: 2,
    position:
    [
        {row: "D", column: 7, hit: true},
        {row: "D", column: 8, hit: true},
    ],
    hits: function() {
        let hits = 0;
        for (let i in this.position)
        {
            if (this.position[i].hit == true)
            {
                hits++;
            }
        }
        if (hits == this.position.length)
        {
            this.destroyed = true;
        }
        return hits;
    },
    destroyed: false,
}

// To create enemy board, I will pick a random tile on the board as a starting point. I will
// also randomize a direction, and then from the starting point either increment the column number
// if right, and increment the row letter if direction is down.

let playerBoardMisses = [
    'A2',
    'A10',
    'F4',
    'F6',
    'H5',
    'I7',
];

let enemyBoardHits = [
    'eA3',
    'eA4',
    'eA5',
    'eC5',
    'eF3',
];

let enemyBoardMisses = [
    'eB10',
    'eB7',
    'eF2',
    'eG4',
    'eC10',
    'eJ8',
];


let gameState = {
    turn: 1,
    playerHitTotal: function() {
        return carrier.hits() + battleship.hits() + cruiser.hits() + submarine.hits() + destroyer.hits();
    },
    enemyHitTotal: enemyBoardHits.length,
    gameOver: false,
    playerPieces: {
        carrier: carrier,
        battleship: battleship,
        cruiser: cruiser,
        submarine: submarine,
        destroyer: destroyer,
    }
}

function boardClick(tableData) {
    if (!enemyBoardMisses.includes(tableData))
    {
        enemyBoardMisses.push(tableData);
        updateView();
    }
    else
    {
        return;
    }
}