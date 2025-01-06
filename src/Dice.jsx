import { useState, useEffect } from "react";

const Dice = () => {
  const [dice, setDice] = useState([1, 1]);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("diceHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [isRolling, setIsRolling] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Función para lanzar los dados
  const rollDice = () => {
    setIsRolling(true); // Activar la animación

    setTimeout(() => {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      const newRoll = [die1, die2];
      setDice(newRoll);

      // Actualizar historial en el localStorage
      const newHistory = [...history, newRoll];
      setHistory(newHistory);
      localStorage.setItem("diceHistory", JSON.stringify(newHistory));

      setIsRolling(false); // Desactivar la animación
    }, 1000); // Duración de la animación
  };

  // Detectar sacudida del móvil
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    const threshold = 15; // Sensibilidad de la sacudida

    const handleMotion = (event) => {
      const { accelerationIncludingGravity } = event;
      if (!accelerationIncludingGravity) return;

      const { x, y, z } = accelerationIncludingGravity;
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

    if (permissionGranted) {
      window.addEventListener("devicemotion", handleMotion);
    }

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [permissionGranted]);

  // Solicitar permisos para iOS
  const requestPermission = async () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === "granted") {
          setPermissionGranted(true);
        } else {
          alert("Permiso de movimiento denegado.");
        }
      } catch (error) {
        console.error("Error al solicitar permisos:", error);
      }
    } else {
      // Si no es necesario el permiso
      setPermissionGranted(true);
    }
  };

  return (
    <div>
      <h1>Lanzar Dados</h1>
      {!permissionGranted && (
        <button onClick={requestPermission}>Habilitar Sacudida</button>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div className={`die ${isRolling ? "rolling" : ""}`}>{dice[0]}</div>
        <div className={`die ${isRolling ? "rolling" : ""}`}>{dice[1]}</div>
      </div>
      <button onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Lanzando..." : "Lanzar"}
      </button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={() => localStorage.clear()}>Limpiar la tabla</button>

      <style>{`
        .die {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border: 2px solid black;
          border-radius: 8px;
          transition: transform 0.5s ease-in-out;
        }

        .rolling {
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
};

export default Dice;
