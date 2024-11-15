const board_field = document.querySelector('.grid-field')
console.log(board_field);

let board = Array.from({ length: 9 }, () => 
    Array(9).fill(0)
);

for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
        const block = document.createElement('div');
        block.classList.add('block');

        for (let rowInBlock = 0; rowInBlock < 3; rowInBlock++) {
            for (let colInBlock = 0; colInBlock < 3; colInBlock++) {
                const elem = document.createElement('div');
                elem.classList.add("elem");
                block.appendChild(elem);
            }
        }
        board_field.appendChild(block);
    }
}