import "./VacanciesSearchPage.css";
import { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Vacancy, VacanciesList } from "../../modules/vacanciesApi";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../../Routes";
import { VacancyCard } from "../../components/VacancyCard/VacancyCard";
import { useNavigate } from "react-router-dom";
import { VACANCIES_MOCK } from "../../modules/mock";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../slices/vacanciesSlice";
import { RootState } from '../../store';

const VacancyPage: FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.vacancies.searchValue);

  const [loading, setLoading] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    VacanciesList(searchValue)
      .then((response) => {
        const filteredVacancies = response.vacancies.filter((item) => 
          item.vacancy_name.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
        );
        setVacancies(filteredVacancies);
      })
      .catch(() => {
        const filteredMockData = VACANCIES_MOCK.vacancies.filter((item) =>
          item.vacancy_name.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
        );
        setVacancies(filteredMockData);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleCardClick = (vacancy_id: number) => {
    navigate(`${ROUTES.VACANCIES}/${vacancy_id}`);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <div className="container-2">
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCIES }]} />
        <section className="vacancies-and-search">
          <main className="container">
            <Row>
              <Col md={10}>
                <InputField
                  value={searchValue}
                  setValue={(value) => dispatch(setSearchValue(value))}
                  loading={loading}
                  onSubmit={handleSearch}
                />
              </Col>
              <Col md={2}>
                <a
                  className="btn btn-blue"
                  style={{
                    opacity: 0.5, // Прозрачность
                    pointerEvents: "none", // Делаем кнопку некликабельной
                  }}
                >
                  Отклики
                  <span className="badge badge-gray position-absolute top-0 start-100 translate-middle">
                    0
                  </span>
                </a>
              </Col>
            </Row>

            {loading ? (
              <div className="containerLoading">
                <Spinner animation="border" />
              </div>
            ) : (
              <Row xs={4} md={4} className="g-4 cards-wrapper">
                {vacancies.length ? (
                  vacancies.map((item: Vacancy) => (
                    <Col key={item.vacancy_id}>
                      <VacancyCard
                        url={item.url}
                        vacancy_name={item.vacancy_name}
                        description={item.description}
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
