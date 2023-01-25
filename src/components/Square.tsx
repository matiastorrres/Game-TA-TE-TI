import "./square.css";

type typePrposSquare = {
  children: string;
  index: number;
  updateBoard: (index: number) => void;
};

export default function Square({
  children,
  index,
  updateBoard,
}: typePrposSquare) {
  const className = children === "x" ? "square red" : "square blue";
  return (
    <section className={className} onClick={() => updateBoard(index)}>
      {children}
    </section>
  );
}
