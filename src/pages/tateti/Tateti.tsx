import { useState } from "react";
import Square from "../../components/Square";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { TURN } from "../../constants";
import { checkGameWinner } from "../../logic/board";
import "../../App.css";

export default function Tateti() {
  const navigate = useNavigate();

  //forma correcta de leer el localstorage e inicializar el estado dependiendo si tenemos localstorage o no
  //es pasando una funcion como argumento del useState
  const [board, setboard] = useState<string[]>(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    //operador "??" es conocido como el operador de "valor predeterminado"
    //Se utiliza para proporcionar un valor predeterminado para una
    //variable o expresión que puede ser nula o indefinida.
    //es distinto a || o &&, estos operarios miran si la variable es false o true
    return turnFromStorage ?? TURN.X;
  });
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const [winner, setWineer] = useState<string | null>(null);

  const updateBoard = (index: number) => {
    if (board[index] || matchResult === "winner") return;

    //actualizo el tablero para que se renderize
    const newBoard: string[] = [...board];
    newBoard[index] = turn;
    setboard(newBoard);

    //cambio el turno
    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);

    //guardo la partida en el localStorage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    //Verifico si hay ganador
    if (checkGameWinner(newBoard)) {
      confetti();
      setMatchResult("winner");
      return setWineer(checkGameWinner(newBoard));
    }

    //verifico si hay empate
    if (newBoard.every((el) => el !== null)) setMatchResult("empate");
  };

  //reseteo el juego
  const resetBoard = () => {
    setboard(Array(9).fill(null));
    setTurn(TURN.X);
    setMatchResult(null);
    setWineer(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <section className="container-tateti">
      <h2>TA TE TI</h2>
      <div className="container-game">
        <button onClick={resetBoard}>Reset de nuevo</button>
        <section className="container-square">
          {board.map((el, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {el}
            </Square>
          ))}
        </section>
        <Modal
          matchResult={matchResult}
          resetBoard={resetBoard}
          winner={winner}
        />
        <p>{"Es el turno de:  " + turn}</p>
      </div>
      <button onClick={() => navigate("/")}>Volver a menu</button>
    </section>
  );
}
