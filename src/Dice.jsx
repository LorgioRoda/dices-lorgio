// Dice.js
import { useState, useEffect } from "react";

const Dice = () => {
  const [dice, setDice] = useState([1, 1]);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("diceHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Función para lanzar los dados
  const rollDice = () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const newRoll = [die1, die2];
    setDice(newRoll);

    // Actualizar historial en el localStorage
    const newHistory = [...history, newRoll];
    setHistory(newHistory);
    localStorage.setItem("diceHistory", JSON.stringify(newHistory));
  };

  // Detectar sacudida del móvil
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let threshold = 15; // Sensibilidad de la sacudida

    const handleMotion = (event) => {
      const { acceleration } = event;
      if (!acceleration) return;

      const { x, y, z } = acceleration;
      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);

      // Detectar si la sacudida supera el umbral
      if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
        rollDice(); // Lanza los dados
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    // Agregar evento de movimiento
    window.addEventListener("devicemotion", handleMotion);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  return (
    <div>
      <h1>Lanzar Dados</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div className={`die die-${dice[0]}`}>{dice[0]}</div>
        <div className={`die die-${dice[1]}`}>{dice[1]}</div>
      </div>
      <button onClick={rollDice}>Lanzar</button>
      <p>Sacude el móvil para lanzar los dados.</p>
    </div>
  );
};

export default Dice;
