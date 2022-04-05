import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
