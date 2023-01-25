import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Tateti from "./pages/tateti/Tateti";
import Tateti2 from "./pages/tateti2/Tateti2";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tateti" element={<Tateti />} />
      <Route path="/tateti2" element={<Tateti2 />} />
    </Routes>
  );
}

export default App;
