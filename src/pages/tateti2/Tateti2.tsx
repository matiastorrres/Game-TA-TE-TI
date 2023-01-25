import { useEffect, useState } from "react";
import "../../App.css";
import Square from "../../components/Square";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const TURN = {
  X: "x",
  O: "o",
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Tateti2() {
  const navigate = useNavigate();
  const [board, setboard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const [winner, setWineer] = useState<string | null>(null);

  //funcion para elegir una posicion randon
  function fillRandomNullPosition(arr: (number | string)[]) {
    if (arr.every((el) => el !== null)) return arr;

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * arr.length);
      console.log("soy el random", randomIndex);
    } while (arr[randomIndex] === "x" || arr[randomIndex] === "o");

    arr[randomIndex] = TURN.O;
    return arr;
  }

  //funcion para hacer una jugada ganadora

  const updateBoard = (index: number) => {
    if (board[index] || matchResult === "winner") return;
    //actualizo el tablero para que se renderize
    //juego del player
    let newBoard = [...board];
    newBoard[index] = turn;
    setboard(newBoard);

    //Verifico el estado de la partida
    for (const patron of WINNER_COMBOS) {
      const [a, b, c] = patron;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard &&
        newBoard[a] === newBoard[c]
      ) {
        setMatchResult("winner");
        return setWineer(newBoard[a]);
      }
    }
    if (newBoard.every((el) => el !== null)) setMatchResult("empate");

    //turno de la maquina
    newBoard = fillRandomNullPosition(newBoard);
    setboard(newBoard);

    //Verifico otra vez
    for (const patron of WINNER_COMBOS) {
      const [a, b, c] = patron;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard &&
        newBoard[a] === newBoard[c]
      ) {
        setMatchResult("winner");
        setWineer(newBoard[a]);
      }
    }
    if (newBoard.every((el) => el !== null)) setMatchResult("empate");
  };

  //reseteo el tablero
  const resetBoard = () => {
    setboard(Array(9).fill(null));
    setTurn(TURN.X);
    setMatchResult(null);
    setWineer(null);
  };

  return (
    <section className="container-tateti">
      <h2>TA TE TI</h2>
      <div className="container-game">
        <button onClick={resetBoard}>Reset de nuevo</button>
        <section className="container-square">
          {board.map((el, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {el}
              </Square>
            );
          })}
        </section>
        {matchResult !== null && (
          <Modal
            matchResult={matchResult}
            resetBoard={resetBoard}
            winner={winner}
          />
        )}
        <div className="container-btns-difficulty">
          <button>easy</button>
          <button>hard</button>
        </div>
        <p>{"Es el turno: " + turn}</p>
      </div>
      <button onClick={() => navigate("/")}>Volver a menu</button>
    </section>
  );
}
