import { useCitiesContext } from "../context/CitiesContext"
import style from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'

function CountryList() {
    const { cities, isLoading } = useCitiesContext()

    if (!cities.length) {
        return <Message message='add your first city by clicking on a city on the map' />
    }

    const countries = cities.reduce((acc, cur) => {
        if (!acc.some(el => el.country === cur.country)) {
            acc.push({ country: cur.country, emoji: cur.emoji });
        }
        return acc;
    }, []);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ul className={style.countryList}>
            {countries.map(country => <CountryItem country={country} key={country.country} />)}
        </ul>
    )
}

export default CountryList