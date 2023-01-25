import "./modal.css";

type modalPropType = {
  matchResult: string | null;
  resetBoard: () => void;
  winner: string | null;
};

export default function Modal({
  matchResult,
  resetBoard,
  winner,
}: modalPropType) {
  const result =
    matchResult === "winner" ? "Ganador: " + winner : "Hay un empate";

  if (winner === null && matchResult === null) return null;

  return (
    <section className="modal">
      <div className="modal-container">
        <p> {result} </p>
        <button onClick={resetBoard}>Empezar de nuevo</button>
      </div>
    </section>
  );
}
