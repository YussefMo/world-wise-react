import { useCitiesContext } from "../context/CitiesContext"
import style from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'

function CityList() {
    const { cities, isLoading } = useCitiesContext()

    if (!cities.length) {
        return <Message message='add your first city by clicking on a city on the map' />
    }



    if (isLoading) {
        return <Spinner />
    }

    return (
        <ul className={style.cityList}>
            {cities.map(city => <CityItem city={city} key={city.id} />)}
        </ul>
    )
}

export default CityList