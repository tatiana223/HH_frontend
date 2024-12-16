import React from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';
import homeBtn from "./home-btn.png";
import { ROUTES } from '../../../Routes';
import { Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/userSlice'; 
import { setAppId, setCount } from '../../slices/Responses';
import { api } from '../../api';
const Header: React.FC = () => {
    const location = useLocation();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    const handleExit = async ()  => {
        dispatch(logoutUser());
        dispatch(setAppId(null));
        dispatch(setCount(0));

        return await api.logout.logoutCreate();
    }

    return (
        <nav className="navbar">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo-container">
                    <div className="logo">hh</div>
                    <span className="logo-text">Работа найдется для каждого</span>
                </div>

                {(isAuthenticated == false ) && (
                    <Link to={ROUTES.LOGIN}>
                        <Button className="login_btn">Войти</Button>
                    </Link>
                )}

                {(isAuthenticated == true) && (
                    <Button variant="primary" type="submit" className="mt-3" onClick={ handleExit }>
                        Выйти
                    </Button>
                )}

                {(location.pathname.includes('/applications') || location.pathname.includes('/vacancies')) && (
                    <Link to={ROUTES.HOME}>
                        <Button className="home-btn">
                            <Image src={ homeBtn } alt="Домой" />
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
