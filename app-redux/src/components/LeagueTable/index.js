import React from "react";
import PropTypes from 'prop-types';

const LeagueTable = ({ leagueHistory }) => {
    return (
        <table className="leagueTable">
            <thead>
                <tr>
                    <th>X Score</th>
                    <th>O Score</th>
                </tr>
            </thead>
            <tbody>
                {leagueHistory.map((item, index) => {
                    return (
                        <tr key={index.toString()}>
                            <td>{item.x}</td>
                            <td>{item.o}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

LeagueTable.propTypes = {
    leagueHistory: PropTypes.array,
};
export default LeagueTable;
