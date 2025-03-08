import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosition } from "../hooks/usePosition";
import { useCitiesContext } from "../context/CitiesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [formError, setFormError] = useState('')
  const [lat, lng] = usePosition()
  const navigate = useNavigate()
  const { addCity, isLoading } = useCitiesContext()


  useEffect(() => {
    if (!lat || !lng) {
      return
    }
    setIsLoadingForm(true)
    setFormError('')
    axios(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
      .then(response => {
        if (!response.data.countryCode) {
          throw new Error("that doesn't seem to be a city. Please click somewhere else")
        }
        setCityName(response.data.city || response.data.locality || '')
        setCountry(response.data.countryName || '')
        setEmoji(convertToEmoji(response.data.countryCode))
      })
      .catch(error => {
        setFormError(error.message)
      })
      .finally(() => {
        setIsLoadingForm(false)
      })
  },
    [lat, lng])

  async function submitHandler(e) {
    e.preventDefault();
    if (!cityName || !date) {
      alert("Please enter a city name or a date")
      return
    }
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng
      }
    }
    await addCity(newCity)
    navigate('/app/cities')
  }

  if (isLoadingForm) {
    return (
      <Spinner />
    )
  }

  if (!lat && !lng) {
    return (
      <Message message="please start by clicking somewhere in the map" />
    )
  }

  if (formError) {
    return (
      <Message message={formError} />
    )
  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={submitHandler}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy' placeholderText="DD/MM/YYYY" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
