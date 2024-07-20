import "./App.css";
import { Route, Routes } from "react-router";
import { Feeds } from "@/pages/Feeds";
import { Landing } from "@/pages/Landing";
import { Home } from "@/pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Landing />} />
        <Route path="/feeds" element={<Feeds />} />
      </Route>
    </Routes>
  );
};

export default App;
