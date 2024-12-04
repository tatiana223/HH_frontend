import { Route, Routes } from "react-router-dom";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import VacanciesPage from "./pages/VacanciesSearchPage/VacanciesSearchPage";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";

function App() {
    return (
      <>
        <NavigationBar />
        <Routes>
          <Route path={ROUTES.HOME} index element={<HomePage />} />
          <Route path={ROUTES.VACANCIES} element={<VacanciesPage />} />
          <Route path="/vacancies/:vacancy_id" element={<VacancyPage />} />
        </Routes>
      </>
    );
}

export default App;
