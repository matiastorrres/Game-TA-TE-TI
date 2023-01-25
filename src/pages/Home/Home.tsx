import Card from "../../components/Card";

export default function Home() {
  return (
    <>
      <header className="header-container">
        <h1>Ta Te Ti</h1>
      </header>
      <article className="container-cards">
        <Card title="Player1 vs Player2" path="tateti" />
        <Card title="Player1 vs CPU" path="tateti2" />
      </article>
    </>
  );
}
