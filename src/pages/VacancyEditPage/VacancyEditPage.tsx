import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Vacancies } from '../../api/Api';
import { VACANCIES_MOCK } from "../../modules/mock";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Alert } from 'react-bootstrap';
import { createVacancy, editVacacy, getVacancy, updateVacancyImage } from '../../slices/vacanciesSlice';
import "./VacancyEditPage.css";

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
            return;
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

        if (flag === true) vacancyReadAsync();
    }, []);

    useEffect(() => {
        if (vacancy) {
            setVacancyData(vacancy);
        }
    }, [vacancy]);

    const handleFieldChange = (field: keyof Vacancies, value: any) => {
        if (field === 'money_from' || field === 'money_to') {
            value = value && !isNaN(value) ? parseFloat(value) : 0;
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
                const response = await dispatch(updateVacancyImage({ id: id || '', file }));
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
            url: newVacancy.url || null,
        };

        try {
            const response = await dispatch(createVacancy(vacancyData));
            const createdVacancyId = response.payload;

            if (fileInputRef.current?.files?.[0]) {
                const file = fileInputRef.current.files[0];

                try {
                    await dispatch(updateVacancyImage({ id: createdVacancyId ? createdVacancyId?.toString() : '', file }));
                } catch (error) {
                    console.error('Ошибка загрузки изображения:', error);
                    alert('Вакансия добавлена, но изображение не удалось загрузить.');
                }
            }

            navigate(`/vacancies/${createdVacancyId}`);
        } catch (error) {
            console.error('Ошибка создания вакансии:', error);
            alert('Не удалось добавить вакансию.');
        }
    };

    return (
        <div>
            <div className="vacancy-edit-page">
                {flag === true ? (
                    <div>
                        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCIESEDIT, path: ROUTES.VACANCIESEDIT }]} />
                        <h1>Редактирование вакансии: {vacancyData?.vacancy_name || ''}</h1>
                    </div>
                ) : (
                    <div>
                        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCIESCREATE, path: ROUTES.VACANCIESCREATE }]} />
                        <h1>Создание вакансии</h1>
                    </div>
                )}
                {error && <Alert variant="danger" className="alert">{error}</Alert>}

                <div className="vacancy-edit-form">
                    {flag === true && (
                        <>
                            <div className="vacancy-edit-image">
                                <img src={vacancyData?.url || ''} alt="Изображение вакансии" />
                                <input type="file" onChange={handleImageChange} />
                            </div>
                            <input
                                type="text"
                                value={vacancyData?.vacancy_name || ''}
                                onChange={(e) => handleFieldChange('vacancy_name', e.target.value)}
                                placeholder="Название вакансии"
                            />
                            <textarea
                                value={vacancyData?.description || ''}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                                placeholder="Описание"
                            />
                            <input
                                type="text"
                                value={vacancyData?.money_from || ''}
                                onChange={(e) => handleFieldChange('money_from', e.target.value)}
                                placeholder="Минимальная зарплата"
                            />
                            <input
                                type="text"
                                value={vacancyData?.money_to || ''}
                                onChange={(e) => handleFieldChange('money_to', e.target.value)}
                                placeholder="Максимальная зарплата"
                            />
                            <textarea
                                value={vacancyData?.city || ''}
                                onChange={(e) => handleFieldChange('city', e.target.value)}
                                placeholder="Город"
                            />
                            <textarea
                                value={vacancyData?.name_company || ''}
                                onChange={(e) => handleFieldChange('name_company', e.target.value)}
                                placeholder="Название компании"
                            />
                            <textarea
                                value={vacancyData?.peculiarities || ''}
                                onChange={(e) => handleFieldChange('peculiarities', e.target.value)}
                                placeholder="Особенности"
                            />
                            <button onClick={handleSaveChanges}>Сохранить изменения</button>
                        </>
                    )}
                    {flag === false && (
                        <>
                            <input type="file" ref={fileInputRef} />
                            <input
                                type="text"
                                placeholder="Название"
                                value={newVacancy.vacancy_name || ''}
                                onChange={(e) => setNewVacancy({ ...newVacancy, vacancy_name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Описание"
                                value={newVacancy.description || ''}
                                onChange={(e) => setNewVacancy({ ...newVacancy, description: e.target.value })}
                            />
                            <textarea
                                placeholder="Город"
                                value={newVacancy.city || ''}
                                onChange={(e) => setNewVacancy({ ...newVacancy, city: e.target.value })}
                            />
                            <button onClick={handleAddCity}>Создать вакансию</button>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default VacancyEditPage;
