import { useState, useEffect } from "react";

const Dice = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);

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

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [permissionGranted]);

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
      setPermissionGranted(true);
    }
  };

  return (
    <div>
      <h1>Lanzar Dados</h1>
      {!permissionGranted && (
        <button onClick={requestPermission}>Habilitar Sacudida</button>
      )}
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
