import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './VacanciesEditPages.css';
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import { AppDispatch, RootState } from '../../store';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Alert } from 'react-bootstrap';
import { getVacanciesList, deleteVacancy, setVacancies } from '../../slices/vacanciesSlice';
import { Image } from "react-bootstrap";
import defaultImage from "../../static/images/DefaultImage.jpg";

const VacanciesEditPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { vacancies, error } = useSelector((state: RootState) => state.vacancies);
    
    const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);

    const handleFetchVacancies = async () => {
        if (!isSuperUser) {
            navigate(`${ROUTES.FORBIDDEN}`);
            return
        }
        dispatch(getVacanciesList());
      };
    
    useEffect(() => {
        handleFetchVacancies();
    }, [dispatch]);

    const handleAddVacancy = async () => {
        navigate(`${ROUTES.VACANCIESCREATE}`);
    };

    const handleDeleteVacancy = async (vacancyId: number) => {
        try {
            await dispatch(deleteVacancy(vacancyId.toString()));
            dispatch(setVacancies(vacancies.filter(vacancy => vacancy.vacancy_id !== vacancyId)));
        } catch (error) {
            alert('Не удалось удалить город.');
            console.log(error);
        }
    };

    const handleNavigateToEdit = (id: number) => {
        navigate(`${ROUTES.VACANCIESEDIT}/${id}`);
    };

    return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCIESEDIT, path: ROUTES.VACANCIESEDIT }]} />
                <div className="cities-title">
                    <h1>Управление городами</h1>
                </div>
                <div className="page-container">
                    {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>}
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Изображение</th>
                                    <th>Описание</th>
                                    <th>Зарплата от</th>
                                    <th>Зарплата до</th>
                                    <th>Город</th>
                                    <th>Название компании</th>
                                    <th>Комментарии</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vacancies.map((vacancy) => (
                                    <tr key={vacancy.vacancy_id}>
                                        <td>{vacancy.vacancy_name}</td>
                                        <td>
                                            <div className="vacanciesTable">
                                                <img src={vacancy.url || defaultImage} alt={vacancy.vacancy_name} />
                                            </div>
                                        </td>

                                        <td>{vacancy.description}</td>
                                        <td>{vacancy.money_from}</td>
                                        <td>{vacancy.money_to}</td>
                                        <td>{vacancy.city}</td>
                                        <td>{vacancy.name_company}</td>
                                        <td>{vacancy.peculiarities}</td>
                                        <td>
                                            <button className="edit-button" onClick={() => handleNavigateToEdit(vacancy.vacancy_id!)}>Редактировать</button>
                                            <button className="delete-button" onClick={() => handleDeleteVacancy(vacancy.vacancy_id!)}>
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleAddVacancy} className='login-btn'>Добавить вакансию</button>
                        <div style={{ height: '15vh'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VacanciesEditPage;