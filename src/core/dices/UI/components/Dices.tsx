import React from 'react'
import { useState } from 'react';
import { rollDice } from '../../services/rollDice';

export const Dices = () => {
    const [dice, setDice] = useState([1, 1]);
    const [isRolling, setIsRolling] = useState(false);
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem("diceHistory");
        return saved ? JSON.parse(saved) : [];
        });

  const rolldice = async () => {
    setIsRolling(true);
    const newRoll = await rollDice()
    setDice(newRoll);
    setIsRolling(false);
    const newHistory = [...history, newRoll];
    setHistory(newHistory);
    localStorage.setItem("diceHistory", JSON.stringify(newHistory));
  };
  return (
    <div>      
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div className={`die ${isRolling ? "rolling" : ""}`}>{dice[0]}</div>
        <div className={`die ${isRolling ? "rolling" : ""}`}>{dice[1]}</div>
  </div>
  <button onClick={rolldice} disabled={isRolling}>
    {isRolling ? "Lanzando..." : "Lanzar"}
  </button></div>
  )
}
