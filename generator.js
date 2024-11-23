board = window.board;

for (let j = 0; j < 9; j++) {
    board[0][j] = j + 1;
}

for (let i = 1; i < 9; i++) {
    let currentNum = board[i-1][0] + 3;
    if (currentNum > 9) {
        currentNum = board[i-3][0] + 1;
    }   
    for (let j = 0; j < 9; j++) {
        board[i][j] = currentNum;

        if (currentNum > 9) {
            board[i][j] -= 9;
            currentNum -= 9;
        }
        else {
            currentNum++;
        }
    }
}


