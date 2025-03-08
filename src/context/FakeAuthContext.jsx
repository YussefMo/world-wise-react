import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext()

const initialState = {
    user: null,
    isLogedin: false,
    errMessage: null,
}

function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isLogedin: true
            }
        case "FAILED_LOGIN":
            return {
                ...state,
                user: null,
                isLogedin: false,
                errMessage: action.payload
            }
        case "LOGOUT":
            return initialState
        default:
            throw new Error("Invalid action")
    }
}

const FAKE_USER = {
    name: "Youssef",
    email: "Youssef@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function FakeAuthContextProvider({ children }) {
    const [{ user, isLogedin, errMessage }, dispatch] = useReducer(reducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "LOGIN", payload: FAKE_USER })
        } else {
            dispatch({ type: "FAILED_LOGIN", payload: "invalid email or password" });
        }
    }

    function logout() {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLogedin,
            errMessage,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useFakeAuthContext() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useFakeContext must be used within a FakeAuthContextProvider")
    }
    return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { FakeAuthContextProvider, useFakeAuthContext }
