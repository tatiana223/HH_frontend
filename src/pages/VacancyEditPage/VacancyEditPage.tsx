import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VacancyEditPage.css';
import { Vacancies } from '../../api/Api';
import { VACANCIES_MOCK } from "../../modules/mock";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Alert } from 'react-bootstrap';
import defaultImage from "../../static/images/DefaultImage.jpg";
import { createVacancy, editVacacy, getVacancy, updateVacancyImage } from '../../slices/vacanciesSlice';


const VacancyEditPage: React.FC = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    const [vacancyData, setVacancyData] = useState<Vacancies | null>();
    const [error, setError] = useState<string | null>(null);
    const [flag, setFlag] = useState<boolean>(true);
    const [newVacancy, setNewVacancy] = useState<Partial<Vacancies>>({});

    const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);
    const vacancy = useSelector((state: RootState) => state.vacancies.vacancy);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!id) {
            setFlag(false);
        }

        if (!isSuperUser) {
            navigate(`${ROUTES.FORBIDDEN}`);
            return
        }
        
        const vacancyReadAsync = async () => {
            if (id) {
                try {
                    await dispatch(getVacancy(id));
                } catch {
                    const vacancyData = VACANCIES_MOCK.vacancies.find(
                    (vacancy) => String(vacancy.vacancy_id) === id
                    );
                    setVacancyData(vacancyData);
                }
            }
        };

        if (flag == true) vacancyReadAsync();
    }, []);

    useEffect(() => {
        // Обновляем cityData, если city обновлено
        if (vacancy) {
            setVacancyData(vacancy);
        }
    }, [vacancy]);

    const handleFieldChange = (field: keyof Vacancies, value: any) => {
        // Преобразуем строку в число, если это необходимо
        if (field === 'money_from' || field === 'money_to') {
            value = value && !isNaN(value) ? parseFloat(value) : 0; // Проверка на NaN
        }
        setVacancyData((prev) => (prev ? { ...prev, [field]: value } : null));
    };
    

    const handleSaveChanges = async () => {
        if (vacancyData && id) {
            try {
                await dispatch(editVacacy({ id, vacancyData })).unwrap();
                navigate(`/vacancies/${id}`);
            } catch (error) {
                setError('Не удалось сохранить изменения.');
            }
        }
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            try {
                const response = await dispatch(updateVacancyImage({ id: id || '', file }))
                const newImageUrl = response.payload;

                setVacancyData((prevState) => (prevState ? { ...prevState, url: `${newImageUrl}?t=${Date.now()}` } : null));
            } catch (error) {
                setError('Не удалось обновить изображение.');
            }
        }
    };

    const handleAddCity = async () => {
        if (!newVacancy.vacancy_name || !newVacancy.description || !newVacancy.money_from || !newVacancy.money_to || !newVacancy.city || !newVacancy.name_company || !newVacancy.peculiarities) {
            alert('Введите все данные!');
            return;
        }
    
        const moneyFrom = newVacancy.money_from ? parseFloat(newVacancy.money_from.toString()) : 0;
        const moneyTo = newVacancy.money_to ? parseFloat(newVacancy.money_to.toString()) : 0;

        const vacancyData: Vacancies = {
            vacancy_name: newVacancy.vacancy_name,
            description: newVacancy.description,
            money_from: moneyFrom,
            money_to: moneyTo,
            city: newVacancy.city,
            name_company: newVacancy.name_company,
            peculiarities: newVacancy.peculiarities,
            url: newVacancy.url || null, // Если URL не указан, передаем null
        };
    
        try {
            const response = await dispatch(createVacancy(vacancyData));
    
            const createdVacancyId = response.payload;
    
            // Проверяем, выбрано ли изображение
            if (fileInputRef.current?.files?.[0]) {
                const file = fileInputRef.current.files[0];
    
                try {
                    await dispatch(updateVacancyImage({ id: createdVacancyId? createdVacancyId?.toString() : '', file }));
                } catch (error) {
                    console.error('Ошибка загрузки изображения:', error);
                    alert('Город добавлен, но изображение не удалось загрузить.');
                }
            }

            navigate(`/vacancies/${createdVacancyId}`);

        } catch (error) {
            console.error('Ошибка создания города:', error);
            alert('Не удалось добавить город.');
        }
    };    

    return (
        <div>
            <Header />
            <div className="container-2">
                {(flag == true) && (   
                    <div>
                        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCIESEDIT, path: ROUTES.VACANCIESEDIT }]} />
                        <div className='vacancies-title'>
                            <h1>Редактирование города: {vacancyData?.vacancy_name || ''}</h1>
                        </div>
                    </div>
                )}
                {(flag == false) && (  
                    <div> 
                        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCIESCREATE, path: ROUTES.VACANCIESCREATE }]} />
                        <div className='vacancies-title'>
                            <h1>Создание города</h1>
                        </div>
                    </div>
                )}
                {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>} 
                {(flag == true) && (   
                    <div className="vacancy-edit-form">
                        <div className='container-4'>
                            <img
                                src={vacancyData?.url || defaultImage}
                                alt="Изображение города"
                                className="vacancy-image"
                            />
                            <input type="file" onChange={handleImageChange} />
                            <label htmlFor="vacancy-name">Название города:</label>
                            <input
                                id="vacancy-vacancy_name"
                                type="text"
                                value={vacancyData?.vacancy_name || ''}
                                onChange={(e) => handleFieldChange('vacancy_name', e.target.value)}
                            />

                            <label htmlFor="vacancy-description">Население:</label>
                            <input
                                id="vacancy-description"
                                type="text"
                                value={vacancyData?.description || ''}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                            />

                            <label htmlFor="vacancy-money_from">Средняя зарплата:</label>
                            <input
                                id="vacancy-money_from"
                                type="text"
                                value={vacancyData?.money_from || ''}
                                onChange={(e) => handleFieldChange('money_from', e.target.value)}
                            />

                            <label htmlFor="vacancy-money_to">Уровень безработицы:</label>
                            <input
                                id="vacancy-money_to"
                                type="text"
                                value={vacancyData?.money_to || ''}
                                onChange={(e) => handleFieldChange('money_to', e.target.value)}
                            />

                            <label htmlFor="vacancy-city">Описание:</label>
                            <textarea
                                id="vacancy-city"
                                value={vacancyData?.city || ''}
                                onChange={(e) => handleFieldChange('city', e.target.value)}
                            />

                            <label htmlFor="vacancy-name_company">Описание:</label>
                            <textarea
                                id="vacancy-name_company"
                                value={vacancyData?.name_company || ''}
                                onChange={(e) => handleFieldChange('name_company', e.target.value)}
                            />

                            <label htmlFor="vacancy-peculiarities">Описание:</label>
                            <textarea
                                id="vacancy-peculiarities"
                                value={vacancyData?.peculiarities || ''}
                                onChange={(e) => handleFieldChange('peculiarities', e.target.value)}
                            />
                            <div style={{ height: '3vh'}}></div>
                            <button className="login-btn" onClick={handleSaveChanges}>Сохранить изменения</button>
                            <div style={{ height: '3vh'}}></div>
                        </div>
                    </div>
                )}
                {(flag == false) && (
                    <div className="vacancy-edit-form">
                        <div className='container-4'>
                            <input type="file" ref={fileInputRef}/>
                            <input
                                type="text"
                                placeholder="Название"
                                value={newVacancy.vacancy_name || ''}
                                onChange={(e) => setNewVacancy({ ...newVacancy, vacancy_name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Население"
                                value={newVacancy.description || ''}
                                onChange={(e) => setNewVacancy({ ...newVacancy, description: e.target.value })}
                            />
                            <textarea
                                placeholder="Описание"
                                value={newVacancy.city || ''}
                                onChange={(e) => setNewVacancy({ ...newVacancy, city: e.target.value })}
                            />
                            <div style={{ height: '3vh'}}></div>
                            <button className="login-btn" onClick={handleAddCity}>Сохранить</button>
                            <div style={{ height: '3vh'}}></div>
                        </div>
                    </div>
                )}
                <div style={{ height: '15vh'}}></div>
            </div>
        </div>
    );
};

export default VacancyEditPage;