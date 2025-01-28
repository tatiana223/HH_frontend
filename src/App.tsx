import { Route, Routes } from "react-router-dom";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import VacanciesPage from "./pages/VacanciesSearchPage/VacanciesSearchPage";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { BrowserRouter } from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage"
import ResponsePage from "./pages/responsePage/responsePage"
import ResponseHistoryPage from "./pages/ResponseHistoryPage/ResponseHistoryPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import VacanciesEditPage from "./pages/VacanciesEditPages/VacanciesEditPages";
import VacancyEditPage from "./pages/VacancyEditPage/VacancyEditPage";
import ForbiddenPage from "./pages/403/403";
import NotFoundPage from "./pages/404/404";

function App() {

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.VACANCIES} element={<VacanciesPage />} />
        <Route path={`${ROUTES.VACANCIES}/:vacancy_id`} element={<VacancyPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={`${ROUTES.RESPONSE}/:id_response`} element={<ResponsePage />} />
        <Route path={`${ROUTES.RESPONSE}`} element={<ResponseHistoryPage />} />
        <Route path={`${ROUTES.PROFILE}`} element={< UserProfilePage/>} />
        <Route path={`${ROUTES.VACANCIESEDIT}`} element={<VacanciesEditPage/>} />
        <Route path={`${ROUTES.VACANCIESEDIT}/:id`} element={<VacancyEditPage/>} />
        <Route path={`${ROUTES.VACANCIESCREATE}`} element={<VacancyEditPage/>} />
        <Route path={`${ROUTES.FORBIDDEN}`} element={<ForbiddenPage/>} />
        <Route path={`${ROUTES.NOTFOUND}`} element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
