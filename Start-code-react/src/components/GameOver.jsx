import React from "react";
function Gameover({title, restartGame}) {
    return (
        <div className="container">
            <h2>Game Over</h2>
            <h2>{title}</h2>
            <button onClick={restartGame}>Restart Game</button>
        </div>
    );
}
export default Gameover;