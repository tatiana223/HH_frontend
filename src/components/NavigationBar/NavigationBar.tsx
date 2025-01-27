import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Routes';
import "./NavigationBar.css";
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store';

export function NavigationBar() {
  const username = useSelector((state: RootState) => state.user.username);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated); 

  return (
    <Navbar bg="light" expand="lg" className="navbar-container">
      <Container className="flex-column">
        <Navbar.Brand as={Link} to={ROUTES.HOME} className="navbar-brand">HH</Navbar.Brand>
        <div className="navbar-underline"></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav flex-column">
            <Nav.Link as={Link} to={ROUTES.HOME} className="nav-link">Главная</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.VACANCIES} className="nav-link">Доступные вакансии</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to={ROUTES.PROFILE} className="nav-profile">
                {username || "Профиль"}
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link as={Link} to={ROUTES.RESPONSE} className="nav__link">Заявки на создание вакансий</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
