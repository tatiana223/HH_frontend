import "./VacanciesSearchPage.css";
import { FC, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Vacancy, VacanciesList } from '../../modules/vacanciesApi';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import { VacancyCard } from '../../components/VacancyCard/VacancyCard';
import { useNavigate } from "react-router-dom";
import { VACANCIES_MOCK } from "../../modules/mock";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField"

const VacancyPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true); // Устанавливаем состояние загрузки
    VacanciesList(searchValue)
      .then((response) => {
        console.log("LALALALAL", response);
        // Фильтруем треки, оставляя только те, где `wrapperType` равен "track"
        const filteredVacancies = response.vacancies.filter((item) => item.vacancy_name 
          .toLocaleLowerCase()
          .startsWith(searchValue.toLocaleLowerCase())
        );
        setVacancies(filteredVacancies);
      })
      .catch(() => {
        console.log("LMOOO");
        // В случае ошибки используем mock данные, фильтруем по названию альбома
        const filteredMockData = VACANCIES_MOCK.vacancies.filter((item) =>
          item.vacancy_name
            .toLocaleLowerCase()
            .startsWith(searchValue.toLocaleLowerCase())
        );
        setVacancies(filteredMockData);
      })
      .finally(() => setLoading(false)); // Останавливаем состояние загрузки в любом случае*/
  };

  useEffect(() => {
    handleSearch(); // при монтировании
  }, []); 

  const handleCardClick = (vacancy_id: number) => {
    // клик на карточку, переход на страницу альбома
    navigate(`${ROUTES.VACANCIES}/${vacancy_id}`);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header/>
      <div className="container-2">
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCIES }]} />
        <section className="vacancies-and-search">
          <main className="container">
            <Row>
              <Col md={10}>
                <InputField
                  value={searchValue}
                  setValue={(value) => setSearchValue(value)}
                  loading={loading}
                  onSubmit={handleSearch}
                />
              </Col>
              <Col md={2}>
                <a className="btn btn-danger position-relative">
                  Отклики
                  <span className="badge rounded-pill position-absolute top-0 start-100 translate-middle">0</span>
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
                  vacancies.map((item) => (
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
            <div style={{ height: '250px' }}></div>
          </main>
        </section>
      </div>
    </div>
  );
};

export default VacancyPage;