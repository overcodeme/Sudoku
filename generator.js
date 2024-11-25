let board = window.board;


// Заполнение первой строки
for (let j = 0; j < 9; j++) {
    board[0][j] = j + 1;
}

// Заполнение оставшейся части
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

console.log(board)


// Транспонирование матрицы
for (let i = 0; i < 9; i++) {
    for (let j = i + 1; j < 9; j++) {
        let tmp = board[i][j];
        board[i][j] = board[j][i];
        board[j][i] = tmp;
    }
}



