import "./App.css";
import { Route, Routes } from "react-router";
import { Home } from "@/pages/Home";
import { DraftBlog } from "@/pages/DraftBlog";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/draft" element={<DraftBlog />} />
    </Routes>
  );
};

export default App;
