import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Routes';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from '../../../Routes';
import { Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchResponsesList, fetchResponse, setFilteredResponses} from '../../slices/responseSlice';

const POLLING_INTERVAL = 2000;

const VacancyApplicationHistoryPage = () => {
    const [statusFilter, setStatusFilter] = useState<number>(NaN); 
    const [startDate, setStartDate] = useState<string>(''); 
    const [endDate, setEndDate] = useState<string>(''); 
    const [creatorFilter, setCreatorFilter] = useState<string>(''); 
    const [loading] = useState<boolean>(false); // Добавлено состояние loading

    
    //const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);


    const dispatch = useDispatch<AppDispatch>();

    const { responses, error } = useSelector((state: RootState) => state.response);

    const fetchResponses = async () => {
        /*if (!isAuthenticated) {
            navigate(`${ROUTES.FORBIDDEN}`);
            return
        }*/
        dispatch(fetchResponsesList({
            status: statusFilter || undefined,
            date_submitted_start: startDate || undefined,
            date_submitted_end: endDate || undefined
        }));
    };

    // Смена статуса
    const handleStatusChange = async (idResponse: number, newStatus: number) => {
        try {
            await dispatch(fetchResponse({ idResponse: idResponse.toString(), status: newStatus }));
            fetchResponses(); 
        } catch (error) {
            alert('Ошибка при обновлении статуса заявки');
        }
    };

    // Фильтрация по создателю на фронтенде
    const filterResponses = () => {
        let filtered = responses;
        if (creatorFilter) {
            filtered = filtered.filter((response) =>
                response.creator.toLowerCase().includes(creatorFilter.toLowerCase())
            );
        }
        dispatch(setFilteredResponses(filtered));
    };

    useEffect(() => {
        fetchResponses();
        const intervalId = setInterval(() => {
            fetchResponses(); 
        }, POLLING_INTERVAL);

        return () => clearInterval(intervalId); 
    }, [statusFilter, startDate, endDate]);

    useEffect(() => {
        filterResponses();
    }, [creatorFilter]);

    return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.RESPONSE, path: ROUTES.RESPONSE }]} />
                <div className="cities-title">
                    <h1>Заявки на создание вакансий</h1>
                </div>
                <div className='page-container'>
                    {/* Filters */}
                    <div className="filters mb-4">
                        <label>
                            Статус:
                            <select
                                value={isNaN(statusFilter) ? "" : statusFilter}
                                onChange={(e) => setStatusFilter(Number(e.target.value) || NaN)}
                            >
                                <option value="">Все</option>
                                <option value="1">Черновик</option>
                                <option value="2">Удалена</option>
                                <option value="3">Сформирована</option>
                                <option value="4">Завершена</option>
                                <option value="5">Отклонена</option>
                            </select>

                        </label>

                        <label>
                            Дата начала:
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                            />
                        </label>

                        <label>
                            Дата окончания:
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                            />
                        </label>

                        <label>
                            Создатель:
                            <input 
                                type="text" 
                                value={creatorFilter} 
                                onChange={(e) => setCreatorFilter(e.target.value)} 
                            />
                        </label>
                    </div>

                    {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : error ? (
                        <div>
                            {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>}
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Номер заявки</th>
                                        <th>Статус</th>
                                        <th>Создатель</th>
                                        <th>Дата формирования</th>
                                        <th>Название вакансии</th>
                                        <th>Требования</th>
                                        <th>Обязанности</th>
                                        <th>Длительность</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {responses.map((response) => (
                                        <tr key={response.id_response}>
                                            <td>{response.id_response}</td>
                                            <td className={(response.status === 3 || response.status === 4) ? "status-completed" : "status-pending"}>
                                                {response.status === 3 ? 'Сформирован' : response.status === 4 ? 'Завершен' : 'Отклонен'}
                                            </td>
                                            <td>{response.creator}</td>
                                            <td>{response.interview_date ? new Date(response.interview_date).toLocaleString() : '—'}</td>
                                            <td>{response.name_human}</td>
                                            <td>{response.education}</td>
                                            <td>{response.experience}</td>
                                            <td>{response.peculiarities_comm}</td>
                                            <td>
                                                <Link to={`${ROUTES.RESPONSE}/${response.id_response}`}>Просмотр</Link>
                                                {/* Change Status buttons */}
                                                {response.status !== 4 && response.status !== 5 && (
                                                    <div className="mt-2">
                                                        <button
                                                            onClick={() => handleStatusChange(response.id_response!, 4)} 
                                                            className="edit-button"
                                                        >
                                                            Завершить
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(response.id_response!, 5)}
                                                            className="edit-button"
                                                        >
                                                            Отклонить
                                                        </button>
                                                    </div>
                                                )}
                                             </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VacancyApplicationHistoryPage;