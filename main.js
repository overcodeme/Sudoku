import { sudokuFilling } from './allFunctions.js';
import { sudokuGenerator } from './generator.js';


let board = sudokuGenerator();
let completed_board = board[0];
board = board[1];
let errors_counter = 0;
const new_game_button = document.querySelector('.button1');
const board_field = document.querySelector('.grid-field')
const input_buttons = document.querySelector('.grid-input-buttons');
const clear_item_button = document.querySelector('#eraser-img');
const levels = document.querySelectorAll('.lvl');

sudokuFilling(board, board_field);
console.log(completed_board);

// Обработчик нажатий на ячейки
board_field.addEventListener('click', (event) => {
    const elem = event.target;
    const activeElem = board_field.querySelector('.active');

    if (activeElem) {
        activeElem.classList.remove('active');
    }

    elem.classList.add('active');
})


// Обработчик создания новой игры
new_game_button.addEventListener('click', () => {
    board = sudokuGenerator();
    board = board[1];
    board_field.innerHTML = '';
    sudokuFilling(board, board_field);
})


// Обработчик нажатия на цифры для заполнения ячеек
input_buttons.addEventListener('click', (event) => {
    const num = event.target.textContent;
    
    const activeElem = board_field.querySelector('.active');
    if (activeElem) {
        activeElem.innerHTML = num;
        board[activeElem.getAttribute('data-row')][activeElem.getAttribute('data-col')] = num;
    }
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
board.forEach(num => {
    num.addEventListener('onchange', () => {

    })
})