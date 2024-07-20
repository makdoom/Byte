import "./App.css";
import { Route, Routes } from "react-router";
import { Feeds } from "@/pages/Feeds";
import { Landing } from "@/pages/Landing";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/feeds" element={<Feeds />} />
    </Routes>
  );
};

export default App;
