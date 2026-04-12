import { BrowserRouter, Routes, Route } from "react-router";

import MainPage from "./pages/mainPage/MainPage";
import ProjectPage from "./pages/projectPage/ProjectPage";
import { ModalProvider } from "./context/ModalContext";
import ErrorScreen from "./components/ui/errorComponents/ErrorScreen";

const App = () => {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route
            path="*"
            element={
              <ErrorScreen
                error="404 - Página no encontrada"
                onClick={() => window.location.href = "/"}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
};
export default App;