import { sudokuFilling } from './allFunctions.js';
import { sudokuGenerator } from './generator.js';


let board = sudokuGenerator();
let completed_board = board[0];
board = board[1];
let errors_counter = 0;
let hints_counter = 3;
const errors = document.querySelector('#errors');
const new_game_buttons = document.querySelectorAll('.button1');
const board_field = document.querySelector('.grid-field')
const input_buttons = document.querySelector('.grid-input-buttons');
const clear_item_button = document.querySelector('#eraser-img');
const levels = document.querySelectorAll('.lvl');
const game_over_modal = document.querySelector('.game-over-modal');
const game_win_modal = document.querySelector('.game-win-modal');
const hints_left = document.querySelector('#hints-left');
const hint = document.querySelector('#hint');

sudokuFilling(board, board_field);

// Отображение всплывающего окна о поражении
function showGameOverModal() {
    game_over_modal.style.display = 'block';
    errors_counter = 0;
}


function showGameWinModal() {
    game_win_modal.style.display = 'block';
    errors_counter = 0;
}


// Обработчик нажатий на ячейки
board_field.addEventListener('click', (event) => {
    const all_elems = document.querySelectorAll('.elem');
    const last_active_elem = document.querySelector('.active');
    const activeElem = event.target;

    if (last_active_elem) {
        all_elems.forEach((e) => {
            e.classList.remove('selected1');
            e.classList.remove('selected2');
        })
        last_active_elem.classList.remove('active');
    }

    activeElem.classList.add('active');

    // Выделение всех схожих по цифре ячеек
    if (activeElem.innerHTML != 0) {
        for (let e of all_elems) {
            if (e.innerHTML == activeElem.innerHTML) {
                e.classList.add('selected1');
            }
        }
    }

    const row = activeElem.getAttribute('data-row');
    const col = activeElem.getAttribute('data-col');
    // Выделение элементов на одной строке
    for (let e of all_elems) {
        if (e.getAttribute('data-row') == row) {
            e.classList.add('selected2');
        }
    }

    // Выделение элементов в одном столбце
    for (let e of all_elems) {
        if (e.getAttribute('data-col') == col) {
            e.classList.add('selected2');
        }
    }

    // Выделение всех элементов текущего блока
    for (let e of all_elems) {
        if (e.getAttribute('block-num') == activeElem.getAttribute('block-num')) {
            e.classList.add('selected2');
        }
    }
})


// Обработчик создания новой игры
new_game_buttons.forEach((button) => {
    button.addEventListener('click', () => {
        board = sudokuGenerator();
        board = board[1];
        board_field.innerHTML = '';
        sudokuFilling(board, board_field);
        game_over_modal.style.display = 'none';
        game_win_modal.style.display = 'none';
        errors_counter = 0;
        errors.innerHTML = '0/3';
        hints_counter = 3;
        hints_left.innerHTML = 3;
    })
})


// Обработчик очистки ячейки
clear_item_button.addEventListener('click', () => {
    const activeElem = board_field.querySelector('.active');
    const undeletable = activeElem.classList.contains('undeletable');
    if (activeElem && !undeletable) {
        activeElem.innerHTML = '';
        board[activeElem.getAttribute('data-row')][activeElem.getAttribute('data-col')] = 0;
    }
}) 


// Выбор уровня сложности
levels.forEach((lvl) => {
    lvl.addEventListener('click', () => {
        let lvl_value = parseInt(lvl.getAttribute('id'));
        switch (lvl_value) {
            case 1:
                board = sudokuGenerator(40);
                completed_board = board[0];
                board = board[1];
                board_field.innerHTML = '';
                sudokuFilling(board, board_field);
                break;
            case 2:
                board = sudokuGenerator(32);
                completed_board = board[0];
                board = board[1];
                board_field.innerHTML = '';
                sudokuFilling(board, board_field);
                break;
            case 3:
                board = sudokuGenerator(24);
                completed_board = board[0];
                board = board[1];
                board_field.innerHTML = '';
                sudokuFilling(board, board_field);
                break;
        }
    })
})


// Проверка вставленной цифры на правильность
input_buttons.addEventListener('click', (event) => {
    const num = event.target.textContent;

    const activeElem = document.querySelector('.active');
    if (activeElem) {
        const row = activeElem.getAttribute('data-row');
        const col = activeElem.getAttribute('data-col');   
        
        if (parseInt(num) == completed_board[row][col]) {
            activeElem.innerHTML = num;
            activeElem.classList.remove('error');
            board[row][col] = parseInt(num);
        }
        else {
            activeElem.innerHTML = num;
            activeElem.classList.add('error');
            errors_counter++;
            errors.innerHTML = `${errors_counter}/3`;
            if (errors_counter == 3) {
                showGameOverModal();
                errors.innerHTML = '0/3';
            }
        }
        if (completed_board.toString() === board.toString()) {
            showGameWinModal();
            errors.innerHTML = '0/3';
        }
    }
})


// Обработчик событий для подсказки
hint.addEventListener('click', () => {
    const activeElem = document.querySelector('.active');

    if (activeElem && hints_counter > 0) {
        let row = activeElem.getAttribute('data-row');
        let col = activeElem.getAttribute('data-col');

        board[row][col] = completed_board[row][col];
        activeElem.innerHTML = completed_board[row][col];
        hints_counter--;
        hints_left.innerHTML = hints_counter;
    }
})