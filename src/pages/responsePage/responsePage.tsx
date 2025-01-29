import "./responsePage.css";
import { FC } from 'react';
import { Col, Button, Form} from "react-bootstrap";
import { ROUTES } from '../../../Routes';
import { VacancyCard } from '../../components/VacancyCard/VacancyCard';
import Header from "../../components/Header/Header";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteResponse, getResponse, submittedResponse, updateResponse} from '../../slices/responseDraftSlice';
import { setError, setResponseData} from '../../slices/responseDraftSlice';

const ResponsePage: FC = () => {
  const { id_response } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    vacancies,
    responseData,
    isDraft,
    isLoading,
    allowedForSubmitted,
  } = useSelector((state: RootState) => state.responseDraft);
  

  useEffect(() => {
    if (id_response) {
      dispatch(getResponse(id_response));
    }
  }, [id_response, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(
        setResponseData({
            ...responseData,
            [name]: value,
        })
    );
  };

  const handleSaveVacancy = () => {
    if (id_response) {
      const responseDataToSend = {
        name_human: responseData.name_human ?? '',
        education: responseData.education ?? '',
        experience: responseData.experience ?? '',
        peculiarities_comm: responseData.peculiarities_comm ?? '',
      };
      try {
        dispatch(updateResponse({ idResponse: id_response, responseData: responseDataToSend }));
      } catch (error) {
        dispatch(setError(error));
      }
    }
  }


  const handleCardClick = (vacancy_id: number | undefined) => {
    navigate(`${ROUTES.VACANCIES}/${vacancy_id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id_response) {
      try {
        await dispatch(submittedResponse(id_response));
        navigate(ROUTES.VACANCIES);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };

  
  const handleDelete = async (e: React.FormEvent) => {
      e.preventDefault();
      if (id_response) {
          try {
              await dispatch(deleteResponse(id_response)).unwrap();
              navigate(ROUTES.VACANCIES);
          } catch (error) {
              dispatch(setError(error));
          }
      }
  };


  if (!vacancies || vacancies.length === 0) {
    return <p>Нет вакансий для отображения</p>;
  }


  return (
    
    <div className="response-page-container">
        <Header />
        <div className="container-2">
            <div style={{ width: '100%', height: '100%', padding: '0', margin: '0' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', width: '100%' }}>
                <h1>Вакансия</h1>
            </div>
            </div>
            {(!isDraft) ? (
              <div>
                <h4>ФИО кандидата: {responseData.name_human}</h4>
                <h4>Образование: {responseData.education}</h4>
                <h4>Опыт работы: {responseData.experience}</h4>
                <h4>Комментарии: {responseData.peculiarities_comm}</h4>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name_human">
                  <h4>ФИО кандидата</h4>
                  <Form.Control
                    type="text"
                    name="name_human"
                    value={responseData.name_human ?? ''}
                    onChange={handleInputChange}
                    required
                    disabled={!isDraft}
                    />
                  </Form.Group>

                <Form.Group controlId="education">
                  <h4>Образование</h4>
                  <Form.Control
                    as="textarea"
                    name="education"
                    value={responseData.education ?? ''}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    disabled={!isDraft}
                    />
                </Form.Group>

                <Form.Group controlId="experience">
                  <h4>Комментарии</h4>
                  <Form.Control
                    as="textarea"
                    name="experience"
                    value={responseData.experience ?? ''} 
                    onChange={handleInputChange}
                    rows={4}
                    required
                    disabled={!isDraft}
                    />
                </Form.Group>

                <Form.Group controlId="peculiarities_comm">
                  <h4>Опыт работы</h4>
                  <Form.Control
                    as="textarea"
                    name="peculiarities_comm"
                    value={responseData.peculiarities_comm ?? ''} 
                    onChange={handleInputChange}
                    rows={4}
                    required
                    disabled={!isDraft}
                    />
                </Form.Group>

                <Button type="submit" disabled={isLoading || !isDraft} className="save-button" onClick={handleSaveVacancy}>
                  {isLoading ? 'Обновляется...' : 'Сохранить изменения'}
                </Button>
              </Form>
            )}
            <div style={{ height: '3vh'}}></div>
            <h1>Выбранные вакансии</h1>

            <div className="cards-wrapper-2 d-flex flex-column">
            {vacancies.length ? (
            vacancies.map((item) => (
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
                  quantity={item.quantity}
                  isDraft={isDraft}
                />
              </Col>
                
                ))
            ) : (
                <section className="cities-not-found">
                  <h1>К сожалению, пока ничего не найдено :(</h1>
                </section>
            )}
            </div>
            {(isDraft) && (
              <Button className="save-button" onClick={handleSubmit} disabled={!isDraft || !allowedForSubmitted}>
                Оформить
              </Button>
            )}
            {(isDraft) && (
              <Button className="save-button" onClick={handleDelete}>
                Очистить
              </Button>
            )}
        </div>
    </div>

  );
};

export default ResponsePage;