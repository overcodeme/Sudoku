import { transposing, swapRowSmall, swapColSmall, swapRowArea, swapColArea, isValid, elemDeleter, hasMultipleSolutions  } from './allFunctions.js'


let board = Array.from({ length: 9 }, () => 
    Array(9).fill(0)
);


export function sudokuGenerator(n=40) {
    createSudoku();

    for (let i = 0; i < 10; i ++) {
        let randFunc = Math.floor(Math.random() * 5);

        // Выбор случайной функции для шафла матрицы
        switch(randFunc) {
            case 1: 
                transposing(board);
                break;
            case 2:
                swapRowSmall(board);
                break;
            case 3:
                swapColSmall(board);
                break;
            case 4:
                swapRowArea(board);
                break;
            case 5:
                swapColArea(board);
                break;
        }
    }

    // Удаление элементов
    elemDeleter(board, n);

    return board;
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
}

