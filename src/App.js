import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import List from "./components/List/List";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/get_form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
