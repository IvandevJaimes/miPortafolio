import { BrowserRouter, Routes, Route } from "react-router";

import MainPage from "./pages/mainPage/MainPage";
import ProjectPage from "./pages/projectPage/ProjectPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/project" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
