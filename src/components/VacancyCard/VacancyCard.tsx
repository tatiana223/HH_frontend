import { FC } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import "./VacancyCard.css";
import defaultImage from "../../static/images/DefaultImage.jpg";
import { useLocation } from 'react-router-dom';
import { addVacancyToResponse, } from '../../slices/responseDraftSlice';
import { getVacanciesList } from '../../slices/vacanciesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

interface Props {
    vacancy_id: number | undefined;
    vacancy_name: string | undefined;
    money_from: number | undefined;
    money_to: number | undefined;
    city: string | undefined;
    name_company: string | undefined;
    peculiarities: string | undefined;
    url: string | null | undefined;
    imageClickHandler: () => void;
    request: number;
    quantity?: number;
    isDraft?: boolean;
}

export const VacancyCard: FC<Props> = ({
    vacancy_id,
    vacancy_name,
    money_from,
    money_to,
    city,
    name_company,
    peculiarities,
    url,
    imageClickHandler,
    request,
    quantity,
    isDraft
}) => {
    console.log('Image URL:', url); // Логируем URL изображения

    const { pathname } = useLocation();
    const id_response = useSelector((state: RootState) => state.responseDraft.id_response);
    const dispatch = useDispatch<AppDispatch>();
    const vacancies = useSelector((state: RootState) => state.responseDraft.vacancies);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    
    // Обработчик события нажатия на кнопку "Добавить"
    const handleAdd = async () => {
        if (vacancy_id) {
            await dispatch(addVacancyToResponse(vacancy_id));
            await dispatch(getVacanciesList()); // Для обновления отображения состояния иконки "корзины" 
        }
    }


    
    if (pathname === "/vacancies") {
        return (
            <div className="vacancy-card">
                <Card className="card">
                    <div className="vacancy-card-body">
                        <div className="vacancy-card-img">
                            <Card.Img
                                variant="top"
                                src={url || defaultImage}
                                alt={vacancy_name}
                                onClick={imageClickHandler} // обработчик клика по изображению
                            />
                        </div>
                        <h5 className="vacancy-name">{vacancy_name}</h5>
                        <p className="vacancy-info">
                            <span className="statistics">от {money_from}₽ до {money_to}₽</span><br />
                            <span className="statistics">{city}</span><br />
                            <span className="statistics">{name_company}</span><br />
                            Особенности: <span className="statistics">{peculiarities} </span>
                        </p>
                        <Button 
                            className="vacancy-btn" 
                            onClick={() => imageClickHandler() }
                        >
                            Подробнее
                        </Button>
                        {(isAuthenticated == true ) && (
                            <Button className="add-btn" onClick={() => handleAdd() }>
                                Добавить
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        );
    }

    if (pathname.includes("/responses")) {
        console.log({
            vacancy_id,
            vacancy_name,
            money_from,
            money_to,
            city,
            name_company,
            peculiarities,
            url
        });
        
        return (
            <div className="fav-card">
                <Row>
                    <Col xs={2} sm={2} md={2}>
                        <div className="d-flex justify-center">
                            <img src={url || defaultImage} alt={vacancy_name} />
                        </div>
                    </Col>
                    <Col xs={10} sm={10} md={10}>
                        <div className="fav-card-body">
                        {vacancy_name ? (
                            <h5 className="vacancy-name">{vacancy_name}</h5>
                        ) : (
                            <p className="vacancy-name not-available">Название вакансии не указано</p>
                        )}


                            <div className="form-group">
                                <Row>
                                    <Col xs={3} sm={3} md={3}>
                                        <label className="form-label">Количество вакансий: </label>
                                    </Col>
                                    <Col xs={9} sm={9} md={9}>
                                        <input
                                            type="number"
                                            className="localcount"
                                            value={quantity}
                                            disabled
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col md={3} xs={3}>
                                    <a onClick={() => imageClickHandler()} className="fav-btn-open">
                                        Подробнее
                                    </a>
                                </Col>
                                <Col md={3} xs={3}>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                    
                </Row>
            </div>
        );
    }
    
};



