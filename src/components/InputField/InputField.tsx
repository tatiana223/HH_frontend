import { FC } from 'react';
import { Button } from "react-bootstrap";
import searchImg from "../../static/images/search-image.png";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { getVacanciesList, setSearchValue } from '../../slices/vacanciesSlice';
import './InputField.css';
import { RootState } from '../../store';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../../Routes';

interface Props {
    value: string;
    loading?: boolean;
}

const InputField: FC<Props> = ({ value, loading }) => {
    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticated: boolean = useSelector((state: RootState) => state.user.isAuthenticated);
    const id_response = useSelector((state: RootState) => state.responseDraft.id_response);
    const quantity = useSelector((state: RootState) => state.responseDraft.quantity);

    const navigate = useNavigate();

    // Событие нажатия на иконку "корзины"
    const handleClick = (id_response: number | null) => {
        navigate(`${ROUTES.RESPONSE}/${id_response}`);
    };

    return (  
        <div className="search-bar">
            <div className="search-input">
                <img src={searchImg} alt="Search Icon" className="search-icon" />
                <input
                    type="text"
                    placeholder="Поиск"
                    value={value}
                    onChange={(event) => dispatch(setSearchValue(event.target.value))}
                    className="inp-text"
                />
            </div>
            <Button 
                disabled={loading} 
                className="search-button" 
                onClick={() => dispatch(getVacanciesList())}>
                Найти
            </Button>
            
            {isAuthenticated && (
                <div
                    className={`responses-button ${id_response ? 'active' : 'inactive'}`}
                    onClick={() => handleClick(id_response ?? null)} // Добавляем обработчик события
                >
                    Отклики
                    <span className="badge badge-gray position-absolute top-0 start-100 translate-middle">
                        {quantity || 0}
                    </span>
                </div>
            )}
        </div>
    );
};

export default InputField;
