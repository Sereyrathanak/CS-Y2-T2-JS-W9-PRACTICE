import React from "react";

function Entity({ health, name }) {
  let safeHealth = health;
  if (safeHealth > 100) safeHealth = 100;
  if (safeHealth < 0)   safeHealth = 0;

  return (
    <section className="container">
      <h2>{name} Health</h2>
      <div className="healthbar">
        <div className="healthbar__value" style={{ width: safeHealth + "%" }}></div>
      </div>
    </section>
  );
}

export default Entity;