import { sudokuFilling } from './allFunctions.js';
import { sudokuGenerator } from './generator.js';


let board = sudokuGenerator();
const new_game_button = document.querySelector('.button1');
const board_field = document.querySelector('.grid-field')
const input_buttons = document.querySelector('.grid-input-buttons');
const clear_item_button = document.querySelector('#eraser-img');

sudokuFilling(board, board_field);


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
clear_item_button.addEventListener('click', (event) => {
    const activeElem = board_field.querySelector('.active');
    if (activeElem) {
        activeElem.innerHTML = '';
        board[activeElem.getAttribute('data-row')][activeElem.getAttribute('data-col')] = 0;
    }
}) 