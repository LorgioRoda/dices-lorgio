// Table.js
import React, { useEffect, useState } from "react";

const calculateProbabilities = (history) => {
  const counts = {};
  history.forEach(([die1, die2]) => {
    const sum = die1 + die2;
    counts[sum] = (counts[sum] || 0) + 1;
  });
  const total = history.length;
  return Object.keys(counts).map((sum) => ({
    sum: parseInt(sum),
    probability: ((counts[sum] / total) * 100).toFixed(2) + "%",
  }));
};

const Table = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("diceHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const probabilities = calculateProbabilities(history);

  return (
    <div>
      <h1>Historial de Dados</h1>
      <table>
        <thead>
          <tr>
            <th>Dado 1</th>
            <th>Dado 2</th>
            <th>Suma</th>
          </tr>
        </thead>
        <tbody>
          {history.map(([die1, die2], index) => (
            <tr key={index}>
              <td>{die1}</td>
              <td>{die2}</td>
              <td>{die1 + die2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Probabilidades</h2>
      <table>
        <thead>
          <tr>
            <th>Suma</th>
            <th>Probabilidad</th>
          </tr>
        </thead>
        <tbody>
          {probabilities.map(({ sum, probability }) => (
            <tr key={sum}>
              <td>{sum}</td>
              <td>{probability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
