import { sudokuFilling } from './allFunctions.js';
import { sudokuGenerator } from './generator.js';


let board = sudokuGenerator();
const board_field = document.querySelector('.grid-field')

sudokuFilling(board, board_field);

board_field.addEventListener('click', (event) => {
    const cell = event.target;
    const activeCell = board_field.querySelector('.active');

    if (activeCell) {
        activeCell.classList.remove('active');
    }

    cell.classList.add('active');
})


const new_game_button = document.querySelector('.button1');
new_game_button.addEventListener('click', () => {
    board = sudokuGenerator();
    board_field.innerHTML = '';
    sudokuFilling(board, board_field);
})