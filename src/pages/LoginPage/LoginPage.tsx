import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loginUserAsync } from '../../slices/userSlice';
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { ROUTES } from '../../../Routes';
import "./LoginPage.css";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const error = useSelector((state: RootState) => state.user.error);

    // Обработчик события изменения полей ввода (username и password)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обработчки события нажатия на кнопку "Войти"
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.username && formData.password) {
            await dispatch(loginUserAsync(formData)); // Отправляем 'thunk'
            navigate(`${ROUTES.VACANCIES}`); // переход на страницу услуг
        }
    };

    return (
        <Container className="login-page"> 
            <Header/>
            <Container className="login-container">
                <h2 className="login-title">Рады снова Вас видеть!</h2>
                {error && <Alert variant="danger" className="login-error">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Введите имя пользователя"
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login-button">
                        Войти
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default LoginPage;
