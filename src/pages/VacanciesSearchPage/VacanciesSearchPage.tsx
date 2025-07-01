import "./VacanciesSearchPage.css";
import { FC, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../../Routes";
import { VacancyCard } from "../../components/VacancyCard/VacancyCard";

import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../store';
import { getVacanciesList } from '../../slices/vacanciesSlice';
import { Vacancies } from '../../api/Api';


const VacancyPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { searchValue, vacancies, loading } = useSelector((state: RootState) => state.vacancies); // получение данных из стора

  useEffect(() => {
    dispatch(getVacanciesList()); // отправляем `thunk`
  }, [dispatch]);

  const handleCardClick = (vacancy_id: number | undefined) => {
    navigate(`${ROUTES.VACANCIES}/${vacancy_id}`);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <div className="container-2">
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCIES, path: ROUTES.VACANCIES }]} />
        <section className="vacancies-and-search">
          <main className="container">
            <Row>
              <Col md={10}>
                <InputField
                  value={searchValue}
                  loading={loading}
                />
              </Col>
              
            </Row>

            {loading ? (
              <div className="containerLoading">
                <Spinner animation="border" />
              </div>
            ) : (
              <Row xs={4} md={4} className="g-4 cards-wrapper">
                {vacancies.length ? (
                  vacancies.map((item: Vacancies) => (
                    <Col key={item.vacancy_id}>
                      <VacancyCard
                        vacancy_id={item.vacancy_id}
                        url={item.url}
                        vacancy_name={item.vacancy_name}
                        money_from={item.money_from}
                        money_to={item.money_to}
                        city={item.city}
                        name_company={item.name_company}
                        peculiarities={item.peculiarities}
                        imageClickHandler={() => handleCardClick(item.vacancy_id)}
                      />
                    </Col>
                  ))
                ) : (
                  <section className="vacancies-not-found">
                    <h1>К сожалению, пока ничего не найдено :(</h1>
                  </section>
                )}
              </Row>
            )}
            <div style={{ height: "250px" }}></div>
          </main>
        </section>
      </div>
    </div>
  );
};

export default VacancyPage;