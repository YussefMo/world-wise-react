import { useNavigate } from "react-router-dom";
import { useFakeAuthContext } from "../context/FakeAuthContext";
import { useWidthContext } from "../context/WidthDetectContext";
import { useCitiesContext } from "../context/CitiesContext";
import styles from "./User.module.css";


function User() {
  const { isActive } = useCitiesContext()
  const { user, logout } = useFakeAuthContext()
  const navigate = useNavigate();
  const {width, breakpoint} = useWidthContext()

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate("/world-wise-react/login");
  }
  if (width > breakpoint) {
    return (
      <div className={styles.user}>
        <img src={user.avatar} alt={user.name} />
        <span>Welcome, {user.name}</span>
        <button onClick={handleClick}>Logout</button>
      </div>
    )
  } else if (!isActive) {
    return (
      <div className={styles.user}>
        <img src={user.avatar} alt={user.name} />
        <span>Welcome, {user.name}</span>
        <button onClick={handleClick}>Logout</button>
      </div>
    );
  }
}

export default User;