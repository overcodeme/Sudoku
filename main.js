import { sudokuFilling } from './allFunctions.js';
import { sudokuGenerator } from './generator.js';


let board = sudokuGenerator();
const board_field = document.querySelector('.grid-field')

sudokuFilling(board, board_field);

let elems = document.querySelectorAll('.elem')
elems.forEach(() => {
    document.addEventListener('click', () => {
        
    })
})


const new_game_button = document.querySelector('.button1');
new_game_button.addEventListener('click', () => {
    board = sudokuGenerator();
    board_field.innerHTML = '';
    sudokuFilling(board, board_field);
})