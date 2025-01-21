import { FC } from 'react';
import { Button } from "react-bootstrap";
import searchImg from "../../static/images/search-image.png";
import { useDispatch, useSelector } from 'react-redux'; 
import { AppDispatch } from '../../store';
import { getVacanciesList, setSearchValue } from '../../slices/vacanciesSlice';
import './InputField.css';
import { RootState } from '../../store';

interface Props {
    value: string;
    loading?: boolean;
}

const InputField: FC<Props> = ({ value, loading }) => {
    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const response_id = useSelector((state: RootState) => state.responseDraft.response_id);
    const count = useSelector((state: RootState) => state.responseDraft.count);

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
            <div
                className={`responses-button ${isAuthenticated && response_id ? 'active' : 'inactive'}`}
            >
                Отклики
                {(!isAuthenticated || !response_id) ? null : (
                     <span className="badge rounded-pill position-absolute">{count}</span>
                )}
            </div>

        </div>
    );
};

export default InputField;
