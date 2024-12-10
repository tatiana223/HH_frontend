import { Route, Routes } from "react-router-dom";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import VacanciesPage from "./pages/VacanciesSearchPage/VacanciesSearchPage";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { useEffect } from "react";

if (window && (window as any).__TAURI__) {
  console.log("Tauri API доступен");
} else {
  console.error("Tauri API недоступен");
}

function App() {
  useEffect(() => {
    if ((window as any).__TAURI__) {
      const { invoke } = (window as any).__TAURI__.tauri;

      invoke("tauri", { cmd: "create" })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));

      return () => {
        invoke("tauri", { cmd: "close" })
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      };
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.VACANCIES} element={<VacanciesPage />} />
        <Route path={`${ROUTES.VACANCIES}/:vacancy_id`} element={<VacancyPage />} />
      </Routes>
    </>
  );
}

export default App;
