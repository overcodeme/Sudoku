let board = Array.from({ length: 9 }, () => 
    Array(9).fill(0)
);


function createSudoku() {

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


    // Транспонирование матрицы
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            let tmp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = tmp;
        }
    }


    // Обмен двух строк в одном районе
    for (let i = 0; i < 9; i += 3) {
        let swapIndexes = [i + 1, i + 2];
        let randI = swapIndexes[Math.floor(Math.random() * swapIndexes.length)];

        for (let j = 0; j < 9; j++) {
            let tmp = board[i][j];
            board[i][j] = board[randI][j];
            board[randI][j] = tmp;
        }
    }


    
    // Обмен двух столбцов в одном районе
    for (let j = 0; j < 9; j += 3) {
        let swapIndexes = [j + 1, j + 2];
        let randJ = swapIndexes[Math.floor(Math.random() * swapIndexes.length)];
        
        for (let i = 0; i < 9; i++) {
            let tmp = board[i][j];
            board[i][j] = board[i][randJ];
            board[i][randJ] = tmp;
        }
    }

    return board
}


export default createSudoku;









