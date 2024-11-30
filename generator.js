let board = Array.from({ length: 9 }, () => 
    Array(9).fill(0)
);


export function sudokuGenerator() {
    for (let i = 0; i < 10; i ++) {
        let randFunc = Math.floor(Math.random() * 5);

        switch(randFunc) {
            case 1: 
                transposing();
                break;
            case 2:
                swapRowSmall();
                break;
            case 3:
                swapColSmall();
                break;
            case 4:
                swapRowArea();
                break;
            case 5:
                swapColArea();
                break;
        }
    }

    return board;
}


// Транспонирование матрицы
function transposing() {
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            let tmp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = tmp;
        }
    }
}


// Обмен двух строк в одном районе
function swapRowSmall() {
    let swapIndexes = [1, 2];
    let randI = swapIndexes[Math.floor(Math.random() * swapIndexes.length)];

    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j++) {
            let tmp = board[i][j];
            board[i][j] = board[randI][j];
            board[randI][j] = tmp;
        }
    }
}


// Обмен двух столбцов в одном районе
function swapColSmall() {
    let swapIndexes = [1, 2];
    let randJ = swapIndexes[Math.floor(Math.random() * swapIndexes.length)];

    for (let j = 0; j < 9; j += 3) {
        for (let i = 0; i < 9; i++) {
            let tmp = board[i][j];
            board[i][j] = board[i][randJ];
            board[i][randJ] = tmp;
        }
    }
}


// Обмен двух блоков по горизонтали
function swapRowArea() {
    let swapIndexes = [1, 2];
    let randI = swapIndexes[Math.floor(Math.random() * swapIndexes.length)];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 9; j++) {
            let tmp = board[i][j];
            board[i][j] = board[3*randI + 1][j] ;
            board[3*randI + 1][j] = tmp;
        }
    }
}


// Обмен двух блоков по вертикали
function swapColArea() {
    let swapIndexes = [1, 2];
    let randJ = swapIndexes[Math.floor(Math.random() * swapIndexes.length)];

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 9; i++) {
            let tmp = board[j][i];
            board[j][i] = board[3*randJ + 1][i];
            board[3*randJ + 1][i] = tmp;
        }
    }
}


export function createSudoku() {

    for (let j = 0; j < 9; j++) {
        board[0][j] = j + 1;
    }


    // Заполнение оставшейся части
    for (let i = 1; i < 9; i++) {
        let shift = i % 3 === 0 ? 1 : 3; // Сдвиг: 3 для блоков, 1 для строк внутри блока
        for (let j = 0; j < 9; j++) {
            board[i][j] = board[i - 1][(j + shift) % 9];
        }
    }

    return board
}










