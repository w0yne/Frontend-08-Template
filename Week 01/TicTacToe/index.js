"use strict";

let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let color = 1;

function showBoard(ptn) {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      let cellColor = ptn[i][j];
      cell.classList.add("cell");
      cell.innerText = cellColor === 2 ? "❌" : cellColor === 1 ? "⭕️" : "";
      cell.addEventListener("click", () => {
        console.log(`Cell[${i}][${j}] is clicked!`);
        if (cellColor === 0) {
          userMove(i, j);
        }
      });
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
}

function userMove(x, y) {
  pattern[x][y] = color;

  if (checkWin(pattern, color)) {
    showBoard(pattern);
    setTimeout(() => {
      alert(color === 2 ? "❌ is winner!" : "⭕️ is winner!");
      resetBoard();
    }, 16);
  } else {
    color = 3 - color;
    if (willWin(pattern, color)) {
      console.log(color === 2 ? "❌ will win!" : "⭕️ will win!");
    }
    console.log(bestChoice(pattern, color));

    showBoard(pattern);
    computerMove();
  }
}

function computerMove() {
  const choice = bestChoice(pattern, color);
  if (choice.point) {
    pattern[choice.point[0]][choice.point[1]] = color;
  }
  if (checkWin(pattern, color)) {
    setTimeout(() => {
      alert(color === 2 ? "❌ is winner!" : "⭕️ is winner!");
      resetBoard();
    }, 16);
  } else {
    color = 3 - color;
    if (willWin(pattern, color)) {
      console.log(color === 2 ? "❌ will win!" : "⭕️ will win!");
    }
  }
  showBoard(pattern);
}

function resetBoard() {
  pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  showBoard(pattern);
}

function checkWin(ptn, clr) {
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (ptn[i][j] !== clr) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (ptn[j][i] !== clr) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (ptn[i][2 - i] !== clr) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (ptn[i][i] !== clr) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function clonePattern(ptn) {
  return JSON.parse(JSON.stringify(ptn));
}

function willWin(ptn, clr) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (ptn[i][j]) {
        continue;
      }
      let tempPattern = clonePattern(ptn);
      tempPattern[i][j] = clr;
      if (checkWin(tempPattern, clr)) {
        return [i, j];
      }
    }
  }
  return null;
}

function bestChoice(ptn, clr) {
  let point;
  if ((point = willWin(ptn, clr))) {
    return {
      point,
      result: 1,
    };
  }
  let result = -2;
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (ptn[i][j]) {
        continue;
      }
      let tempPattern = clonePattern(ptn);
      tempPattern[i][j] = clr;
      let r = bestChoice(tempPattern, 3 - clr).result;

      if (-r > result) {
        result = -r;
        point = [i, j];
      }
      if (result === 1) {
        break outer;
      }
    }
  }

  return {
    point,
    result: point ? result : 0,
  };
}

showBoard(pattern);
