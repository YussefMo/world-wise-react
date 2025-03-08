import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CitiesContext = createContext();


const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {}
};

function citiesReducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true
            };
        case "SET_CITIES":
            return {
                ...state,
                cities: action.payload,
                isLoading: false
            };
        case "SET_CITY":
            return {
                ...state,
                currentCity: action.payload,
                isLoading: false
            };
        case "ADD_CITY":
            return {
                ...state,
                cities: [...state.cities, action.payload],
                isLoading: false,
                currentCity: action.payload,
            };
        case "DELETE_CITY":
            return {
                ...state,
                cities: state.cities.filter((city) => city.id !== action.payload),
                isLoading: false,
                currentCity: {}
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(citiesReducer, initialState);
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const fetchCities = async () => {
            dispatch({ type: "LOADING" });
            try {
                const response = await axios.get(`${API_BASE_URL}/cities`);
                dispatch({ type: "SET_CITIES", payload: response.data });
            } catch (error) {
                console.error("Error fetching cities:", error);
                alert("There was an error while fetching cities data.");
            }
        };

        fetchCities();
    }, []);

    const getCity = useCallback(
        async function getCity(id) {
            if (id.toString() === currentCity.id) return

            dispatch({ type: "LOADING" });
            try {
                const response = await axios.get(`${API_BASE_URL}/cities/${id}`);
                dispatch({ type: "SET_CITY", payload: response.data });
            } catch (error) {
                console.error("Error fetching city:", error);
                alert("There was an error while fetching city data.");
            }
        }, [currentCity.id])

    async function addCity(city) {
        dispatch({ type: "LOADING" });
        try {
            const response = await axios.post(`${API_BASE_URL}/cities`, city, {
                headers: { "Content-Type": "application/json" }
            });
            dispatch({ type: "ADD_CITY", payload: response.data });
        } catch (error) {
            console.error("Error adding city:", error);
            alert("There was an error while adding the new city.");
        }
    }

    async function deleteCityHandler(id) {
        dispatch({ type: "LOADING" });
        try {
            await axios.delete(`${API_BASE_URL}/cities/${id}`);
            dispatch({ type: "DELETE_CITY", payload: id });
        } catch (error) {
            console.error("Error deleting city:", error);
            alert("There was an error while deleting the city.");
        }
    }



    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            deleteCityHandler,
            getCity,
            currentCity,
            addCity,
            isActive,
            setIsActive,
        }}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCitiesContext() {
    const context = useContext(CitiesContext);
    if (!context) throw new Error("useCitiesContext must be used within a CitiesProvider");
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCitiesContext };
