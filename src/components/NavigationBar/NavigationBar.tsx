import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
        <Navbar.Brand href={ROUTES.HOME} className="navbar-brand">HH</Navbar.Brand>
        <div className="navbar-underline"></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav flex-column">
            <Nav.Link href={ROUTES.HOME} className="nav-link">Главная</Nav.Link>
            <Nav.Link href={ROUTES.VACANCIES} className="nav-link">Доступные вакансии</Nav.Link>
            {isAuthenticated && (
              <Nav.Link href={ROUTES.PROFILE} className="nav-profile">
                {username || "Профиль"}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
