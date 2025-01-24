import { Route, Routes } from "react-router-dom";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import VacanciesPage from "./pages/VacanciesSearchPage/VacanciesSearchPage";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage"
import ResponsePage from "./pages/responsePage/responsePage"

if (window && (window as any).__TAURI__) {

} else {
  console.error("Tauri API не доступен");
}

function App() {
  useEffect(() => {
    if ((window as any).__TAURI__) {
      const { invoke } = (window as any).__TAURI__.tauri;
      
      invoke('tauri', { cmd: 'create' })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));

      return () => {
        invoke('tauri', { cmd: 'close' })
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      };
    } else {
      console.error("Tauri API не доступен");
    }
  }, []);
  

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.VACANCIES} element={<VacanciesPage />} />
        <Route path={`${ROUTES.VACANCIES}/:vacancy_id`} element={<VacancyPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={`${ROUTES.RESPONSE}/:id_response`} element={<ResponsePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
