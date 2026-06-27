const board = document.getElementById("board");
let puzzle;
let solution;
async function getPuzzle(difficulty) {
    try {
        // Sorry Nikhil Bhai for using API 😭
        const response = await fetch(
            `https://api.api-ninjas.com/v1/sudokugenerate?difficulty=${difficulty}&width=3&height=3`,
            { 
                headers: {
                    "X-Api-Key": "lpC5wzTYRzjDq6k6Wylq8KA65GPxO61bO4o5sP27"
                }
            }
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        console.log(data);

        puzzle = data.puzzle;
        solution = data.solution;

        loadBoard();

    } catch (error) {
        console.error(error);
    }
}
    
document.getElementById("newGame").onclick = async function() {
    const difficulty = document.getElementById("difficulty").value;
    await getPuzzle(difficulty);

}
function createBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.classList.add("cell");
            if ((row + 1) % 3 === 0) {
                input.classList.add("row3");
            }
            input.dataset.row = row;
            input.dataset.col = col;
            input.addEventListener("input", () => {
                if (!/^[1-9]?$/.test(input.value)) {
                    input.value = "";
                }
            });
            board.appendChild(input);
        }
    }
}
function loadBoard() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        let r = cell.dataset.row;
        let c = cell.dataset.col;
        if (puzzle[r][c] != null) {
            cell.value = puzzle[r][c];
            cell.disabled = true;
            cell.classList.add("fixed");
        } else {
            cell.value = "";
            cell.disabled = false;
            cell.classList.remove("fixed");
        }
        cell.classList.remove("correct");
        cell.classList.remove("wrong");
    });

}
document.getElementById("check").onclick = function () {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        let r = cell.dataset.row;
        let c = cell.dataset.col;
        if (cell.disabled) return;
        if (Number(cell.value) === solution[r][c]) {
            cell.classList.remove("wrong");
            cell.classList.add("correct");
        } 
        else {
            cell.classList.remove("correct");
            cell.classList.add("wrong");
        }
    });
};
document.getElementById("solve").onclick = function () {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        let r = cell.dataset.row;
        let c = cell.dataset.col;
        cell.value = solution[r][c];
    });
};
document.getElementById("reset").onclick = loadBoard;
createBoard();
getPuzzle("easy");