let gamePieceClass = "gamePiece";
let missClass = "miss";
let hitClass = "hit";

function showGrids() {
  let playerBoardDiv = document.getElementsByClassName("playerGameBoard");
  let opponentBoardDiv = document.getElementsByClassName("opponentGameBoard");
  generateGrid(playerBoardDiv[0], 10, 10);
  generateGrid(opponentBoardDiv[0], 10, 10);
  renderShips();
  updateView(); // This function will also be called anytime a click is registered on the game board
}

function generateGrid(boardDiv, numRows, numColumns) {
  let table = document.createElement("table");
  table.style.width = "90%";
  table.style.height = "500px";
  let tableHead = document.createElement("thead");

  // Loop to create Table Header with Numbers
  for (let i = 0; i < numColumns; i++) {
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

  // Nested for-loops to create table rows with corresponding letter
  for (let i = 0; i < numRows; i++) {
    let tableRow = document.createElement("tr");
    rowLetterHead = tableRow.appendChild(document.createElement("th"));
    rowLetter = String.fromCharCode(i + 65);
    rowLetterHead.appendChild(document.createTextNode(rowLetter));
    tableRow.setAttribute("id", `${rowLetter}`);

    for (let j = 0; j < numColumns; j++) {
      let tableData = document.createElement("td");
      tableData.style.width = `${90 / numColumns}%`; // Table width is set to 90%, this makes sure that each data cell is an equal percentage of the total table width.
      if (boardDiv.className == 'opponentGameBoard')
      {
        tableData.setAttribute("id", `e${rowLetter}${j + 1}`);
        tableData.onclick = (function() {
          let id = tableData.id;
          return function() {
            boardClick(id);
          }
        })();
      }
      else
      {
        tableData.setAttribute("id", `${rowLetter}${j + 1}`);
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

function updateView()
{
  renderShips();
  updatePlayerBoard();
  updateEnemyBoard();
  console.log('Player Hit Total: ', gameState.playerHitTotal());
  console.log('Enemy Hit Total: ', gameState.enemyHitTotal);
  console.log('Player Destroyer destroyed? ', gameState.playerPieces.destroyer.destroyed);
}

function renderShips()
{
  let playerPieces = gameState.playerPieces;
  for (let i in playerPieces)
  {
    for (let j in playerPieces[i].position)
    {
      box = document.getElementById(`${playerPieces[i].position[j].row}${playerPieces[i].position[j].column}`);
      box.className = gamePieceClass;
    }

  }
}

function updatePlayerBoard() {
  for (let i in playerBoardMisses)
  {
    box = document.getElementById(`${playerBoardMisses[i]}`)
    box.className = missClass;
  }
  let playerPieces = gameState.playerPieces;
  for (let i in playerPieces)
  {
    for (let j in playerPieces[i].position)
    {
      if (playerPieces[i].position[j].hit == true)
      {
        box.className = hitClass;
      }
    }
  }
}

function updateEnemyBoard() {
  for (let i in enemyBoardHits)
  {
    box = document.getElementById(`${enemyBoardHits[i]}`)
    box.className = hitClass;
  }
  for (let i in enemyBoardMisses)
  {
    box = document.getElementById(`${enemyBoardMisses[i]}`)
    box.className = missClass;
  }
}