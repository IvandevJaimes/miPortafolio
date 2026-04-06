import { BrowserRouter, Routes, Route } from "react-router";

import MainPage from "./pages/mainPage/MainPage";
import ProjectPage from "./pages/projectPage/ProjectPage";
import { ModalProvider } from "./context/ModalContext";

const App = () => {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
};
export default App;