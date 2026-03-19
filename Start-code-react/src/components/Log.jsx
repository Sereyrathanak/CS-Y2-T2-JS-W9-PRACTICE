import React from "react";

function Log({logs}) {
    return(
        <section className="log-container">
            <h3>Battle Logs</h3>
            <ul>
                {logs.map(function(log, index) {
                    let actorClass = "log--monster";
                    if (log.isPlayer === true) {
                        actorClass = "log--player";
                    }

                    let actionClass = "log--heal";
                    if (log.isDamage === true) {
                        actionClass = "log--damage";
                    }
                    return (
                        <li key={index} >
                            <span className={actorClass}>
                                {log.isPlayer === true ? "Player" : "Monster"}
                            </span>
                            <span className={actionClass}>
                                {log.text}
                            </span>
                           

                        </li>
                    );
                })}
            </ul>
        </section>

    );
}

export default Log;