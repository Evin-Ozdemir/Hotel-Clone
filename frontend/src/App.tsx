import { type FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hearder from "./components/header";
import Home from "./pages/home";
import Create from "./pages/create";
import Detail from "./pages/detail";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Hearder />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/place/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
