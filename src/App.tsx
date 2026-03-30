import { BrowserRouter, Routes, Route } from "react-router";

import MainPage from "./pages/mainPage/MainPage";
import ProjectPage from "./pages/projectPage/ProjectPage";
import { getProfile } from "./services/profileApi.ts";
import { getProjects, getProjectById } from "./services/projectsApi.ts";

const App = () => {
  const getData = async () => {
    const response = await getProfile();
    console.log(response);
  };

  getData();

  const getDataProjects = async () => {
    const response = await getProjects();
    console.log(response);
  };

  getDataProjects();

  const getDataProject = async () => {
    const response = await getProjectById(2);
    console.log(response);
  };

  getDataProject();

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
