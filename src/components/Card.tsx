import { useNavigate } from "react-router-dom";
type cardType = {
  title: string;
  path: string;
};
export default function Card({ title, path }: cardType) {
  const navigate = useNavigate();
  return (
    <article className="container-card" onClick={() => navigate(path)}>
      <h4>{title}</h4>
    </article>
  );
}
