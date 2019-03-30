/**
 *  This is the reducer for the tic-tac-toe game
 */

//## Constants
export const SELECT_SQUARE = 'SELECT_SQUARE';
export const SELECT_MOVE = 'SELECT_MOVE';

//## Actions
export const selectSquare = (squareNumber) => ({type: SELECT_SQUARE, payload: {squareNumber}});
export const selectMove = (moveNumber) => ({type: SELECT_MOVE, payload: {moveNumber}});

const initialState = {
    history: [
        {
            squares: Array(9).fill(null)
        }
    ],
    stepNumber: 0,
    xIsNext: true,
    highlighted: []
};

//## Reducer
const GameReducer = (state = initialState, action) => {

    switch (action.type) {

        case SELECT_SQUARE:
            return updateSelectedSquare(state, action.payload);

        case SELECT_MOVE:
            return updateSelectedMove(state, action.payload);

        default:
            return state;
    }
};


function updateSelectedMove(state, {moveNumber}) {
    const history = state.history.slice(0, moveNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    return Object.assign({}, state, {
        stepNumber: moveNumber,
        xIsNext: (moveNumber % 2) === 0,
        highlighted: calculateWinner(squares, true)
    })

}


function updateSelectedSquare(state, {squareNumber}) {

    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // if there is a winner, or the requested square already has a value then no change
    if (calculateWinner(squares) || squares[squareNumber]) {
        return state;
    }
    squares[squareNumber] = state.xIsNext ? "X" : "O";

    return {
        history: history.concat([
            {
                squares: squares
            }
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        winner: calculateWinner(squares),
        highlighted: calculateWinner(squares, true)
    };
}

/**
 * A game of tic-tac-toe.
 */
function calculateWinner(squares, returnLines = false) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return  returnLines ? lines[i] : squares[a];
        }
    }
    return returnLines ? [] : null;
}


export default GameReducer;