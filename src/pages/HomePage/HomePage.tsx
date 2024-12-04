import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from '../../../Routes';
import { Button, Col, Row, Image } from "react-bootstrap";
import IntroImg from "../../static/images/intro.png"
import Header from "../../components/Header/Header";
import './HomePage.css'

export const HomePage: FC = () => {
  return (
    <main className="container-1">
      <Header />
      <div className="container">
        <div className="intro">
          <Row>
            <Col md={7}>
                <h1>Сервис трудоустройства для инвалидов</h1>
                <p>
                  <strong style={{ display: "block", fontWeight: "bold" }}>Создаем равные возможности для всех!</strong>
                  Наш сервис помогает людям с инвалидностью находить работу, а работодателям — находить мотивированных и ценных сотрудников. Размещайте вакансии и привлекайте тех, кто готов расти и развиваться вместе с вашей компанией. Мы заботимся о том, чтобы каждый кандидат имел шанс быть замеченным!
                </p>
                <Link to={ROUTES.VACANCIES}>
                  <Button variant="primary" className="to-vacancies-button">Доступные вакансии</Button>
                </Link>
            </Col>
            <Col md={5}>
              <Image src={IntroImg} className="intro-img" />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
};
