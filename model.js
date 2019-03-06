var carrier, battleship, cruiser, submarine, destroyer;

var Ship = function (name, numSquares, position) {
    this.name = name;
    this.numSquares = numSquares;
    this.position = position;
    this.destroyed = false;
    gameState.playerPieces[name] = this;
}

Ship.prototype.hits = function () {
    var hits = 0;
    for (var i in this.position) {
        if (this.position[i].hit == true) {
            hits++;
        }
    }
    if (hits == this.position.length) {
        this.destroyed = true;
    }
    return hits;
};

function createShipObjects() {
    var carrierPosition = [
        {row: 'F', column: 2, hit: false},
        {row: 'G', column: 2, hit: false},
        {row: 'H', column: 2, hit: false},
        {row: 'I', column: 2, hit: false},
        {row: 'J', column: 2, hit: false},

    ]
    carrier = new Ship('carrier', 5, carrierPosition);

    var battleshipPosition = [
        {row: 'A', column: 1, hit: false},
        {row: 'B', column: 1, hit: false},
        {row: 'C', column: 1, hit: false},
        {row: 'D', column: 1, hit: false},
    ]
    battleship = new Ship('battleship', 4, battleshipPosition);

    var cruiserPosition = [
        {row: 'A', column: 5, hit: false},
        {row: 'A', column: 6, hit: false},
        {row: 'A', column: 7, hit: false},
    ]
    cruiser = new Ship('cruser', 3, cruiserPosition);

    var submarinePosition = [
        {row: 'E', column: 5, hit: false},
        {row: 'E', column: 6, hit: false},
        {row: 'E', column: 7, hit: false},
    ]
    submarine = new Ship('submarine', 3, submarinePosition);

    var destroyerPosition = [
        {row: 'D', column: 7, hit: false},
        {row: 'D', column: 8, hit: false},
    ];
    destroyer = new Ship('destroyer', 2, destroyerPosition);
}

// var carrier = {
//     name: "carrier",
//     numSquares: 5,
//     position: [{
//             row: "F",
//             column: 2,
//             hit: false
//         },
//         {
//             row: "G",
//             column: 2,
//             hit: false
//         },
//         {
//             row: "H",
//             column: 2,
//             hit: false
//         },
//         {
//             row: "I",
//             column: 2,
//             hit: false
//         },
//         {
//             row: "J",
//             column: 2,
//             hit: false
//         },
//     ],
//     hits: function () { // Figure out a way to easily apply this function to all ships without repeating the function in each object. I will probably just create a constructor for these ships anyway
//         var hits = 0;
//         for (var i in this.position) {
//             if (this.position[i].hit == true) {
//                 hits++;
//             }
//         }
//         if (hits == this.position.length) {
//             this.destroyed = true;
//         }
//         return hits;
//     },
//     destroyed: false,
// }

// var battleship = {
//     name: "battleship",
//     numSquares: 4,
//     position: [{
//             row: "A",
//             column: 1,
//             hit: true
//         },
//         {
//             row: "B",
//             column: 1,
//             hit: true
//         },
//         {
//             row: "C",
//             column: 1,
//             hit: true
//         },
//         {
//             row: "D",
//             column: 1,
//             hit: false
//         },
//     ],
//     hits: function () {
//         var hits = 0;
//         for (var i in this.position) {
//             if (this.position[i].hit == true) {
//                 hits++;
//             }
//         }
//         if (hits == this.position.length) {
//             this.destroyed = true;
//         }
//         return hits;
//     },
//     destroyed: false
// }

// var cruiser = {
//     name: "cruiser",
//     numSquares: 3,
//     position: [{
//             row: "A",
//             column: 5,
//             hit: false
//         },
//         {
//             row: "A",
//             column: 6,
//             hit: false
//         },
//         {
//             row: "A",
//             column: 7,
//             hit: false
//         },
//     ],
//     hits: function () {
//         var hits = 0;
//         for (var i in this.position) {
//             if (this.position[i].hit == true) {
//                 hits++;
//             }
//         }
//         if (hits == this.position.length) {
//             this.destroyed = true;
//         }
//         return hits;
//     },
//     destroyed: false,
// }

// var submarine = {
//     name: "submarine",
//     numSquares: 3,
//     position: [{
//             row: "E",
//             column: 5,
//             hit: false
//         },
//         {
//             row: "E",
//             column: 6,
//             hit: false
//         },
//         {
//             row: "E",
//             column: 7,
//             hit: false
//         },
//     ],
//     hits: function () {
//         var hits = 0;
//         for (var i in this.position) {
//             if (this.position[i].hit == true) {
//                 hits++;
//             }
//         }
//         if (hits == this.position.length) {
//             this.destroyed = true;
//         }
//         return hits;
//     },
//     destroyed: false,
// }

// var destroyer = {
//     name: "destroyer",
//     numSquares: 2,
//     position: [{
//             row: "D",
//             column: 7,
//             hit: true
//         },
//         {
//             row: "D",
//             column: 8,
//             hit: true
//         },
//     ],
//     hits: function () {
//         var hits = 0;
//         for (var i in this.position) {
//             if (this.position[i].hit == true) {
//                 hits++;
//             }
//         }
//         if (hits == this.position.length) {
//             this.destroyed = true;
//         }
//         return hits;
//     },
//     destroyed: false,
// }

// To create enemy board, I will pick a random tile on the board as a starting point. I will
// also randomize a direction, and then from the starting point either increment the column number
// if right, and increment the row varter if direction is down.

var playerBoardMisses = [
    'A2',
    'A10',
    'F4',
    'F6',
    'H5',
    'I7',
];

var enemyBoardHits = [
    'eA3',
    'eA4',
    'eA5',
    'eC5',
    'eF3',
];

var enemyBoardMisses = [
    'eB10',
    'eB7',
    'eF2',
    'eG4',
    'eC10',
    'eJ8',
];


var gameState = {
    turn: 1,
    playerHitTotal: function () {
        return carrier.hits() + battleship.hits() + cruiser.hits() + submarine.hits() + destroyer.hits();
    },
    enemyHitTotal: enemyBoardHits.length,
    gameOver: false,
    playerPieces: {},
    enemyPieces: {},
}

function boardClick() {
    tableData = this.id;
    if (!enemyBoardMisses.includes(tableData) && !enemyBoardHits.includes(tableData)) {
        enemyBoardMisses.push(tableData);
        updateView();
    } else {
        return;
    }
    document.getElementById('message').innerHTML = 'Coordinates: ' + tableData.split('').slice(1).join('');
}

function initState(numRows) {
    gameBoardArray = [];
    for (var i = 0; i < numRows; i++) {
        row = [];
        for (var j = 0; j < numRows; j++) {
            row.push(0);
        }
        gameBoardArray.push(row);
    }

    console.log(gameBoardArray);
}