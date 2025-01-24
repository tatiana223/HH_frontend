import "./responsePage.css";
import { FC } from 'react';
import { Col, Row, Image, Alert } from "react-bootstrap";
import { ROUTES } from '../../../Routes';
import { VacancyCard } from '../../components/VacancyCard/VacancyCard';
import Header from "../../components/Header/Header";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getResponse, } from '../../slices/responseDraftSlice';

const ResponsePage: FC = () => {
  const { id_response } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    vacancies,
    responseData,
    error,
  } = useSelector((state: RootState) => state.responseDraft);
  const isDraft = useSelector((state: RootState) => state.responseDraft.isDraft);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    if (id_response) {
      dispatch(getResponse(id_response));
    }
  }, [dispatch]);

  const handleCardClick = (vacancy_id: number | undefined) => {
    navigate(`${ROUTES.VACANCIES}/${vacancy_id}`);
  };

  if (!vacancies || vacancies.length === 0) {
    return <p>Нет вакансий для отображения</p>;
  }
  console.log('Vacancies:', vacancies);


  return (
    
    <div className="response-page-container">
        <Header />
        <div className="container-2">
            <div style={{ width: '100%', height: '100%', padding: '0', margin: '0' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', width: '100%' }}>
                <h1>Вакансия</h1>
            </div>
            </div>
            <div className="candidate-info">
            <h4>Фамилия кандидата: {responseData.name_human}</h4>
            <h4>Образование: {responseData.education}</h4>
            <h4>Опыт работы: {responseData.experience}</h4>
            <h4>Комментарий: {responseData.peculiarities_comm}</h4>
            </div>
            <h1>Выбранные вакансии</h1>
            <div className="cards-wrapper-2 d-flex flex-column">
            {vacancies.length ? (
                vacancies.map((item) => (
                <Col key={item.vacancy_id?.vacancy_id}>
                    <VacancyCard
                    vacancy_id={item.vacancy_id?.vacancy_id}
                    url={item.vacancy_id?.url}
                    vacancy_name={item.vacancy_id?.vacancy_name}
                    money_from={item.vacancy_id?.money_from}
                    money_to={item.vacancy_id?.money_to}
                    city={item.vacancy_id?.city}
                    name_company={item.vacancy_id?.name_company}
                    peculiarities={item.vacancy_id?.peculiarities}
                    imageClickHandler={() => handleCardClick(item.vacancy_id?.vacancy_id)}
                    count={item.count}
                    />
                </Col>
                ))
            ) : (
                <section className="cities-not-found">
                <h1>К сожалению, пока ничего не найдено :(</h1>
                </section>
            )}
            </div>
        </div>
    </div>

  );
};

export default ResponsePage;