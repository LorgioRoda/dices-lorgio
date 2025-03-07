export const rollDice = (): Promise<number[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const die1 = Math.floor(Math.random() * 6) + 1;
            const die2 = Math.floor(Math.random() * 6) + 1;
            const newRoll = [die1, die2];
            resolve(newRoll)
          }, 1000)})
        }
