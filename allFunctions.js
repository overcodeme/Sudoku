// Транспонирование матрицы
export function transposing(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            let tmp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = tmp;
        }
    }
}


// Обмен двух строк в одном районе
export function swapRowSmall(board) {
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
export function swapColSmall(board) {
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
export function swapRowArea(board) {
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
export function swapColArea(board) {
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


// Проверка решения для заданной ячейки
export function isValid(board, num, numI, numJ) {
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


    let startI = Math.floor(numI / 3) * 3;
    let startJ = Math.floor(numJ / 3) * 3;

    // Проверка в блоке 
    for (let i = startI; i < startI + 3; i++) {
        for (let j = startJ; j < startJ + 3; j++) {
            if (i != numI && j != numJ) {
                if (board[i][j] == board[numI][numJ]) {
                    return false
                }
            }
        }
    }
}


// Удаление элементов с проверкой единственного решения
export function elemDeleter(board, n=40) {
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

        if (hasMultipleSolutions(board)) {
            board[randI][randJ] = tmp;
            currCount++;
        }
    }
}

// Проверка на множественное решение
export function hasMultipleSolutions(board) {
    let solutionsCount = 0;

    // Решение судоку
    function solve(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] == 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, num, i, j)) {
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

    solve(board);
    return solutionsCount > 1; 
}


export function sudokuFilling(board, board_field) {
    
    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            const block = document.createElement('div');
            block.classList.add('block');
    
            for (let rowInBlock = 0; rowInBlock < 3; rowInBlock++) {
                for (let colInBlock = 0; colInBlock < 3; colInBlock++) {
                    const elem = document.createElement('div');
                    elem.classList.add("elem");
    
                    if (board[blockRow * 3 + rowInBlock][blockCol * 3 + colInBlock] != 0) {
                        elem.textContent = board[blockRow * 3 + rowInBlock][blockCol * 3 + colInBlock];
                    }
    
                    block.appendChild(elem);
                }
            }
            board_field.appendChild(block);
        }
    }
}