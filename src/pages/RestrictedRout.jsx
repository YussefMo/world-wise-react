import { useNavigate } from "react-router-dom"
import { useFakeAuthContext } from "../context/FakeAuthContext"
import { useEffect } from "react"

function RestrictedRout({ children }) {
    const {isLogedin} = useFakeAuthContext()
    const navigate = useNavigate()

    useEffect(function () {
        if (!isLogedin) {
            navigate("/world-wise-react/login")
        }
    }, [isLogedin, navigate])
    
    return isLogedin ? children : null
}

export default RestrictedRout
