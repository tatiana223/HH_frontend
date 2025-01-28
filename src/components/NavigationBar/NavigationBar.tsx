import {NavLink} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Routes";
import { useSelector } from 'react-redux'; 
import './NavigationBar.css'
import { RootState } from '../../store';

export const NavigationBar = () => {

  const username = useSelector((state: RootState) => state.user.username);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);

  return (
      <nav className='nav'>
        <div className='nav__wrapper'>
          <Navbar.Brand as={Link} to={ROUTES.HOME} className="navbar-brand">
            HH
          </Navbar.Brand>
          <div className='nav__links'>
            <NavLink to={ROUTES.PROFILE} className='nav__link'>{ username }</NavLink>
            <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
            <NavLink to={ROUTES.VACANCIES} className='nav__link'>Доступные города</NavLink>
            {(isAuthenticated == true ) && (
              <NavLink to={ROUTES.RESPONSE} className='nav__link'>Заявки на создание вакансий</NavLink>
            )}
            {((isSuperUser == true)) && (
              <NavLink to={ROUTES.VACANCIESEDIT} className='nav__link'>Управление городами</NavLink>
            )}
          </div>
          <div className='nav__mobile-wrapper' onClick={(event) => event.currentTarget.classList.toggle('active')}>
            <div className='nav__mobile-target' />
            <div className='nav__mobile-menu'>
              <NavLink to={ROUTES.PROFILE} className='nav__link'>{ username }</NavLink>
              <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
              <NavLink to={ROUTES.VACANCIES} className='nav__link'>Доступные города</NavLink>
              {(isAuthenticated == true ) && (
                <NavLink to={ROUTES.RESPONSE} className='nav__link'>Заявки на создание вакансий</NavLink>
              ) }
            </div>
          </div>
        </div>
      </nav>
  )
}