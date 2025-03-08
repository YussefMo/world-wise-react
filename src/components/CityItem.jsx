import { useCitiesContext } from "../context/CitiesContext"
import { Link } from 'react-router-dom';
import style from './CityItem.module.css'

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { currentCity, deleteCityHandler } = useCitiesContext()

    function clickHandler (e){
        e.preventDefault()
        deleteCityHandler(city.id)
    }

    const { emoji, cityName, date, id, position } = city
    return (
        <li>
            <Link className={`${style.cityItem} ${id === currentCity.id ? style['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={style.emoji}>{emoji}</span>
                <h3 className={style.name}>{cityName}</h3>
                <time className={style.date}>{formatDate(date)}</time>
                <button onClick={clickHandler} className={style.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
