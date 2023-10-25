const board = document.getElementById("board");
        const cells = Array.from({ length: 9 });
        let currentPlayer = "X";
        let gameOver = false;

        function checkWinner() {
            const winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                    return cells[a];
                }
            }

            if (cells.every(cell => cell)) {
                return "Tie";
            }

            return null;
        }

        function handleClick(event, index) {
            if (!gameOver && !cells[index]) {
                cells[index] = currentPlayer;
                event.target.innerText = currentPlayer;
                const winner = checkWinner();
                if (winner) {
                    if (winner === "Tie") {
                        alert("It's a tie!");
                    } else {
                        alert(`${winner} wins!`);
                    }
                    gameOver = true;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }

        cells.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.addEventListener("click", (event) => handleClick(event, index));
            board.appendChild(cellElement);
        });
