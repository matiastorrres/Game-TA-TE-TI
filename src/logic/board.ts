import { WINNER_COMBOS } from "../constants";

//verificar si hay ganador
export const checkGameWinner = (newBoard: string[]) => {
  for (const patron of WINNER_COMBOS) {
    const [a, b, c] = patron;
    if (
      newBoard[a] &&
      newBoard[a] === newBoard[b] &&
      newBoard &&
      newBoard[a] === newBoard[c]
    )
      return newBoard[a];
  }
  //si no hay ganador
  return null;
};
