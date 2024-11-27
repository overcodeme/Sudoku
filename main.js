import createSudoku from './generator.js';

let board = createSudoku();
const board_field = document.querySelector('.grid-field')
console.log(board);


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

let elems = document.querySelectorAll('.elem')
elems.forEach(() => {
    document.addEventListener('click', () => {
        
    })
})