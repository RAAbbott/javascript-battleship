var gamePieceClass = "gamePiece";
var missClass = "miss";
var hitClass = "hit";

function createHeading() {
  var message = document.createElement('p');
  message.id = 'message';
  document.getElementById('heading').appendChild(message);

  // Create Select Dropdown
  var ships = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
  var optionsDiv = document.getElementById('options');
  var selectElement = document.createElement('select');
  for (var i = 0; i < ships.length; i++) {
    var option = document.createElement('option');
    var shipText = ships[i].toString();
    var ship = document.createTextNode(shipText);
    option.appendChild(ship);
    option.setAttribute('value', shipText.toLowerCase());
    selectElement.appendChild(option);
  }
  optionsDiv.appendChild(selectElement);

  // Create Text Input for ship positions
  var textElement = document.createElement('input');
  textElement.setAttribute('placeholder', 'Cell for ship head (e.g. A5)');
  textElement.style.margin = '10px';
  optionsDiv.appendChild(textElement);


  // Create button to initiate game
  var button = document.createElement('button');
  var buttonText = document.createTextNode('Click to save ship settings');
  button.appendChild(buttonText);
  button.onclick = initiateGame;
  optionsDiv.appendChild(button);

}

function initiateGame() {
  console.log('initiateGame called');
  renderShips();
  updateView(); // This function will also be called anytime a click is registered on the game board
}


function showGrids() {
  var playerBoardDiv = document.getElementsByClassName("playerGameBoard");
  var opponentBoardDiv = document.getElementsByClassName("opponentGameBoard");
  createHeading();
  generateGrid(playerBoardDiv[0], 10, 10);
  generateGrid(opponentBoardDiv[0], 10, 10);
  initState(10);
  animateElement();
}

function generateGrid(boardDiv, numRows, numColumns) {
  var table = document.createElement("table");
  table.style.width = "90%";
  table.style.height = "500px";
  var tableHead = document.createElement("thead");

  // Loop to create Table Header with Numbers
  for (var i = 0; i < numColumns; i++) {
    if (i == 0) {
      tableHeaderCell = document.createElement("th");
      tableHeaderNumber = document.createTextNode(" ");
      tableHeaderCell.appendChild(tableHeaderNumber);
      tableHead.appendChild(tableHeaderCell);
    }
    tableHeaderCell = document.createElement("th");
    tableHeaderNumber = document.createTextNode(i + 1);
    tableHeaderCell.appendChild(tableHeaderNumber);
    tableHead.appendChild(tableHeaderCell);
  }

  table.appendChild(tableHead);

  // Nested for-loops to create table rows with corresponding varter
  for (var i = 0; i < numRows; i++) {
    var tableRow = document.createElement("tr");
    rowvarterHead = tableRow.appendChild(document.createElement("th"));
    rowvarter = String.fromCharCode(i + 65);
    rowvarterHead.appendChild(document.createTextNode(rowvarter));
    tableRow.setAttribute("id", `${rowvarter}`);

    for (var j = 0; j < numColumns; j++) {
      var tableData = document.createElement("td");
      tableData.style.width = (90 / numColumns).toString() + '%'; // Table width is set to 90%, this makes sure that each data cell is an equal percentage of the total table width.
      if (boardDiv.className == 'opponentGameBoard') {
        tableData.setAttribute("id", 'e' + rowvarter.toString() + (j + 1).toString());
        tableData.onclick = boardClick; // I am setting the onclick event to equal the function, and NOT the function return value
      } else {
        tableData.setAttribute("id", `${rowvarter}${j + 1}`);
      }
      if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)) {
        tableData.className = "checked";
      } else {
        tableData.className = "unchecked";
      }
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }
  boardDiv.appendChild(table);
}

function updateView() {
  renderShips();
  updatePlayerBoard();
  updateEnemyBoard();
  console.log('Player Hit Total: ', gameState.playerHitTotal());
  console.log('Enemy Hit Total: ', gameState.enemyHitTotal);
  console.log('Player Destroyer destroyed? ', gameState.playerPieces.destroyer.destroyed);
}

function renderShips() {
  // Create Ships
  createShipObjects();
  var playerPieces = gameState.playerPieces;
  console.log(playerPieces);
  for (var i in playerPieces) {
    for (var j in playerPieces[i].position) {
      box = document.getElementById(`${playerPieces[i].position[j].row}${playerPieces[i].position[j].column}`);
      box.className = gamePieceClass;
    }

  }
}

// Add a dropdown to select which ship to add to the player board. I will create a constructor that will be used to create each ship. A text input will specify the Head of the ship
// As well as the direction the ship will go. Button will be used to call the function with the ship;

function updatePlayerBoard() {
  for (var i in playerBoardMisses) {
    box = document.getElementById(playerBoardMisses[i].toString())
    box.className = missClass;
  }
  var playerPieces = gameState.playerPieces;
  for (var i in playerPieces) {
    for (var j in playerPieces[i].position) {
      if (playerPieces[i].position[j].hit == true) {
        box.className = hitClass;
      }
    }
  }
}

function updateEnemyBoard() {
  for (var i in enemyBoardHits) {
    box = document.getElementById(enemyBoardHits[i].toString())
    box.className = hitClass;
  }
  for (var j in enemyBoardMisses) {
    box = document.getElementById(enemyBoardMisses[j].toString())
    box.className = missClass;
  }
}

// Animation Code
  element = document.createElement('h3');
  text = document.createTextNode('Click on me for a prize!');
  element.appendChild(text);
  element.onclick = alertUser;
  document.getElementById('animate').appendChild(element);
  colors = ['red','yellow','blue','green','orange','black','white','gray','cyan','black'];
  color = 0;
  top = 0;
  setTimeout(animateElement, 1000);
function animateElement() {
  // Animation
  console.log(color);
    element.style.color = colors[color];
    color += 1;
    if (color < 10)
    {
      setTimeout(animateElement, 2000);
    }
    else {
      element.remove();
    }
}

function alertUser() {
  alert('Sorry, no prize for you! Continue to play the game...');
}