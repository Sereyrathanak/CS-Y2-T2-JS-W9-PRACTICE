import React from "react";
import Entity from "./Entity";
import GameOver from "./GameOver";
import Log from "./Log";


// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = React.useState(100);
  const [monsterHealth, setMonsterHealth] = React.useState(100);
  const [turncount, setTurnCount] = React.useState(0);
  const [logs, setLogs] = React.useState([]);

  let isGameover = false; 
  if (playerHealth <= 0 || monsterHealth <= 0) {
    isGameover = true;
  }
  
  let isSpecialAttackAvailable = false;
  if (turncount > 0 && turncount % 3 === 0) {
    isSpecialAttackAvailable = true;
  }

  let isHealAvailable = false;
  if (turncount > 0 && turncount % 2 === 0) {
    isHealAvailable = true;
  }

  let gameOverTitle = "You won!";
  if (isGameover) {
    if (playerHealth <= 0 && monsterHealth <= 0) {
      gameOverTitle = "It's a draw!";
    } else if (playerHealth <= 0) {
      gameOverTitle = "Monster wins!";
    } else {
      gameOverTitle = "Player wins!";
    }
  }



  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function handleAttack() {
    const playerDamage = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(8, 15);

    let newPlayerHealth = playerHealth - monsterDamage;
    if (newPlayerHealth < 0) newPlayerHealth = 0;
    let newMonsterHealth = monsterHealth - playerDamage;
    if (newMonsterHealth < 0) newMonsterHealth = 0;
    setPlayerHealth(newPlayerHealth);
    setMonsterHealth(newMonsterHealth);
    setTurnCount((prevCount) => prevCount + 1);

    const newLogs = [createLogAttack(true, playerDamage), createLogAttack(false, monsterDamage)];
    setLogs(newLogs.concat(logs));
  }

  function handleSpecialAttack() {
    if (isSpecialAttackAvailable === false) return;
 
    const playerDmg  = getRandomValue(10, 25);
    const monsterDmg = getRandomValue(5,  12);
 
    let newMonsterHealth = monsterHealth - playerDmg;
    if (newMonsterHealth < 0) newMonsterHealth = 0;
 
    let newPlayerHealth = playerHealth - monsterDmg;
    if (newPlayerHealth < 0) newPlayerHealth = 0;
 
    setMonsterHealth(newMonsterHealth);
    setPlayerHealth(newPlayerHealth);
    setTurnCount((prevCount) => prevCount + 1);
 
    const newLogs = [createLogAttack(true, playerDmg), createLogAttack(false, monsterDmg)];
    setLogs(newLogs.concat(logs));
  }
 
  // HEAL: player heals 8-20 HP (max 100), monster still attacks back
  function handleHeal() {
    const healing    = getRandomValue(8, 20);
    const monsterDmg = getRandomValue(5, 12);
 
    let newPlayerHealth = playerHealth + healing - monsterDmg;
    if (newPlayerHealth > 100) newPlayerHealth = 100;
    if (newPlayerHealth < 0)   newPlayerHealth = 0;
 
    setPlayerHealth(newPlayerHealth);
    setTurnCount(turncount + 1);
 
    const newLogs = [createLogHeal(healing), createLogAttack(false, monsterDmg)];
    setLogs(newLogs.concat(logs));
  }
 
  // SURRENDER: player instantly loses
  function handleSurrender() {
    setPlayerHealth(0);
    const newLog = { isPlayer: true, isDamage: true, text: " surrenders!" };
    setLogs([newLog].concat(logs));
  }
 
  // RESTART: reset everything back to the start
  function handleRestart() {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setTurnCount(0);
    setLogs([]);
  }

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
  <>
    
      <Entity health={monsterHealth} name="Monster" />
      <Entity health={playerHealth}  name="Your"    />
 
      {isGameover === true && (
        <GameOver title={gameOverTitle} restartGame={handleRestart} />
      )}

      {isGameover === false && (
        <section id="controls">
          <button onClick={handleAttack}>ATTACK</button>
          <button onClick={handleSpecialAttack} disabled={isSpecialAttackAvailable === false}>SPECIAL !</button>
          <button onClick={handleHeal} disabled={isHealAvailable === false}>HEAL</button>
          <button onClick={handleSurrender}>KILL YOURSELF</button>
        </section>
      )}
 
      {logs.length > 0 && <Log logs={logs} />}
  </>
  );
}

export default Game;