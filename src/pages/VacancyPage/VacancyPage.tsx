import "./VacancyPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../../Routes";
import { useParams } from "react-router-dom";
import { Vacancy, GetVacancyById } from "../../modules/vacanciesApi";
import { Spinner, Image } from "react-bootstrap";
import { VACANCIES_MOCK } from "../../modules/mock";
import Header from "../../components/Header/Header";
import defaultImage from "../../static/images/DefaultImage.jpg";

export const VacancyPage: FC = () => {
  const [vacancyData, setVacancyData] = useState<Vacancy>();

  const { vacancy_id } = useParams();
  useEffect(() => {
    if (!vacancy_id) return;

    GetVacancyById(vacancy_id)
      .then((response) => {
          console.log("Server Responseeee:", response);
          const vacancyData = response;
          console.log("Found Vacancy Data:", vacancyData);
          setVacancyData(vacancyData);
      })
      .catch(() => {
          console.log("Using Mock Data");
          const vacancyData = VACANCIES_MOCK.vacancies.find(
              (vacancy) => String(vacancy.vacancy_id) === vacancy_id
          );
          console.log("Found Mock Data:", vacancyData);
          setVacancyData(vacancyData);
      });
  }, [vacancy_id]);

  if (!vacancyData) {
    return (
      <div className="container-1">
        <div className="vacancy_page_loader_block">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  return (
    <div className="container-1">
      <Header />
      <section className="vacancy-page-container">
        <BreadCrumbs
          crumbs={[{ label: ROUTE_LABELS.VACANCIES, path: ROUTES.VACANCIES }, { label: vacancyData?.vacancy_name || "Название вакансии" }]}
        />
      </section>
      <main className="container">
        <div className="vacancy-details">
          {/* Контейнер с информацией о вакансии */}
          <div className="info">
            <div className="info-text">
              <p>
                <span className="statistics">{vacancyData.vacancy_name}</span>
                <br />
              </p>
              <ul>
                <li><span className="statistics">Описание: {vacancyData.description}</span></li>
                <li><span className="statistics">от {vacancyData.money_from}₽ до {vacancyData.money_to}₽</span></li>
                <li><span className="statistics">{vacancyData.city}</span></li>
                <li><span className="statistics">{vacancyData.name_company}</span></li>
                <li>Особенности: <span className="statistics">{vacancyData.peculiarities}</span></li>
              </ul>
            </div>
          </div>
          {/* Контейнер с картинкой */}
          <div className="vacancy-image">
            <Image src={vacancyData.url || defaultImage} alt={vacancyData.vacancy_name} fluid />
          </div>
        </div>
      </main>
    </div>
  );
};
