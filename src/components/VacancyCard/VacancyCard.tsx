import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import "./VacancyCard.css";
import defaultImage from "../../static/images/DefaultImage.jpg";

interface Props {
    vacancy_name: string;
    description: string;
    money_from: string;
    money_to: string;
    city: string;
    name_company: string;
    peculiarities: string;
    url: string;
    imageClickHandler: () => void;
}

export const VacancyCard: FC<Props> = ({
    vacancy_name,
    money_from,
    money_to,
    city,
    name_company,
    peculiarities,
    url,
    imageClickHandler
}) => {
    console.log('Image URL:', url); // Логируем URL изображения

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
                </div>
            </Card>
        </div>
    );
};



