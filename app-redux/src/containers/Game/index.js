import React from "react";
import Board from "../../components/Board";
import LeagueTable from '../../components/LeagueTable';

import {selectSquare, selectMove} from '../../redux/game/index';
import {connect} from 'react-redux'


/**
 * A game of tic-tac-toe.
 */
class Game extends React.Component {


    render() {

        const { history, stepNumber, jumpToMove, winner, xIsNext, handleClick, highlighted, winnerHistory } = this.props;

        const current = history[stepNumber];

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => jumpToMove(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => handleClick(i)}
                        highlighted={ highlighted }
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div className="game-league-table">
                    {winnerHistory.length && <LeagueTable leagueHistory={winnerHistory} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        highlighted: state.game.highlighted,
        winner: state.game.winner,
        xIsNext: state.game.xIsNext,
        history: state.game.history,
        stepNumber: state.game.stepNumber,
        winnerHistory: state.game.winnerHistory
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleClick: squareNumber => dispatch(selectSquare(squareNumber)),
        jumpToMove: moveNumber => dispatch(selectMove(moveNumber)),


    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);