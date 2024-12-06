let board = Array.from({ length: 9 }, () => 
    Array(9).fill(0)
);


export function sudokuGenerator() {
    for (let i = 0; i < 10; i ++) {
        let randFunc = Math.floor(Math.random() * 5);

        // Выбор случайной функции для шафла матрицы
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
    let area = Math.floor(Math.random() * 3); 
    let row1 = area * 3 + Math.floor(Math.random() * 3);
    let row2 = area * 3 + Math.floor(Math.random() * 3);

    while (row1 === row2) {
        row2 = area * 3 + Math.floor(Math.random() * 3);
    }

    for (let j = 0; j < 9; j++) {
        let tmp = board[row1][j];
        board[row1][j] = board[row2][j];
        board[row2][j] = tmp;
    }
}


// Обмен двух столбцов в одном районе
function swapColSmall() {
    let area = Math.floor(Math.random() * 3);
    let col1 = area * 3 + Math.floor(Math.random() * 3);
    let col2 = area * 3 + Math.floor(Math.random() * 3);

    while (col1 === col2) {
        col2 = area * 3 + Math.floor(Math.random() * 3);
    }

    for (let i = 0; i < 9; i++) {
        let tmp = board[i][col1];
        board[i][col1] = board[i][col2];
        board[i][col2] = tmp;
    }
}


// Обмен двух блоков по горизонтали
function swapRowArea() {
    let area1 = Math.floor(Math.random() * 3); 
    let area2 = Math.floor(Math.random() * 3); 

    while (area1 === area2) {
        area2 = Math.floor(Math.random() * 3);
    }

    for (let i = 0; i < 3; i++) {
        let row1 = area1 * 3 + i;
        let row2 = area2 * 3 + i;

        for (let j = 0; j < 9; j++) {
            let tmp = board[row1][j];
            board[row1][j] = board[row2][j];
            board[row2][j] = tmp;
        }
    }
}


// Обмен двух блоков по вертикали
function swapColArea() {
    let area1 = Math.floor(Math.random() * 3); 
    let area2 = Math.floor(Math.random() * 3);

    while (area1 === area2) {
        area2 = Math.floor(Math.random() * 3);
    }

    for (let j = 0; j < 3; j++) {
        let col1 = area1 * 3 + j;
        let col2 = area2 * 3 + j;

        for (let i = 0; i < 9; i++) {
            let tmp = board[i][col1];
            board[i][col1] = board[i][col2];
            board[i][col2] = tmp;
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


// Удаление элементов с проверкой единственного решения
export function elemDeleter(n=40) {
    let currCount = 81;
    while (currCount > n) {
        let randI = Math.floor(Math.random() * 9);
        let randJ = Math.floor(Math.random() * 9);

        while (board[randI][randJ] == 0) {
            randI = Math.floor(Math.random() * 9);
            randJ = Math.floor(Math.random() * 9);
        }

        const tmp = board[randI][randJ];
        board[randI][randJ] = 0;
        currCount--;

        if (hasMultipleSolutions()) {
            board[randI][randJ] = tmp;
            currCount++;
        }
    }
}


// Выбор уровня сложности
function chooseLVL(lvl) {
    switch (lvl) {
        case 'easy':
            elemDeleter(40); // Легкий уровень
            break;
        case 'medium':
            elemDeleter(30); // Средний уровень
            break;
        case 'hard':
            elemDeleter(20); // Сложный уровень
            break;
    }
}


// Проверка решения для заданной ячейки
function isValid(num, numI, numJ) {
    // Проверка по строке
    for (let j = 0; j < 9; j++) {
        if (j != numJ && board[numI][j] == num) {
            return false; 
        }
    }

    // Проверка по столбцу
    for (let i = 0; i < 9; i++) {
        if (i != numI && board[i][numJ] == num) {
            return false; 
        }
    }


    startI = Math.floor(numI / 3) * 3;
    startJ = Math.floor(numJ / 3) * 3;

    // Проверка в блоке 
    for (let i = startI; i < startI + 3; i++) {
        for (let j = startJ; j < endJ + 3; j++) {
            if (i != numI && j != numJ) {
                if (board[i][j] == board[numI][numJ]) {
                    return false
                }
            }
        }
    }
}


// Проверка на множественное решение
function hasMultipleSolutions(board) {
    let solutionsCount = 0;


    // Решение судоку
    function solve() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] == 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(num, i, j)) {
                            board[i][j] = num;
                            if (solve()) {
                                solutionsCount++;
                                // Если найдено больше одного решения, прервать дальнейший поиск
                                if (solutionsCount > 1) {
                                    board[i][j] = 0;
                                    return true;
                                }
                            }
                            board[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve();
    return solutionsCount > 1;
}


