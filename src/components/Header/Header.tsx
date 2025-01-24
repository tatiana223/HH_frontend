import React from 'react';
//import { useLocation } from 'react-router-dom';
import './header.css';
import { Link } from "react-router-dom";
import { ROUTES } from '../../../Routes';
import { Button } from "react-bootstrap";
import homeBtn from "./home-btn.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../store';
import { logoutUserAsync } from '../../slices/userSlice'; 
import {  getVacanciesList } from '../../slices/vacanciesSlice'; 
//import { setResponseId, setCount } from '../../slices/responseDraftSlice';

const Header: React.FC = () => {
    //const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated); // получение из стора значения флага состояния приложения

    // Обработчик события нажатия на кнопку "Выйти"
    const handleExit = async ()  => {
        await dispatch(logoutUserAsync());

        dispatch(logoutUserAsync())
            .then(() => console.log('Запрос на logout отправлен'))
            .catch((err) => console.error('Ошибка при отправке logout запроса:', err));
        
        navigate('/vacancies'); // переход на страницу списка услуг

        await dispatch(getVacanciesList()); // для показа очищения поля поиска
    }

    return (
        <nav className="navbar">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo-container">
                    <div className="logo">hh</div>
                    <span className="logo-text">Работа найдется для каждого</span>
                </div>
                {(location.pathname.includes('/applications') || location.pathname.includes('/vacancies')) && (
                    <a href="/" className="home-btn">
                        <img src={homeBtn} alt="Домой" />
                    </a>
                )}
                {(isAuthenticated == false ) && (
                    <Link to={ROUTES.LOGIN}>
                        <Button className="login-btn">Войти</Button>
                    </Link>
                )}

                {(isAuthenticated == true) && (
                    <Button variant="primary" type="submit" className="login-btn" onClick={ handleExit }>
                        Выйти
                    </Button>
                )}

            </div>
        </nav>
    );
};

export default Header;
