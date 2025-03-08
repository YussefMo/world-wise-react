import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFakeAuthContext } from "../context/FakeAuthContext";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Message from "../components/Message";

export default function Login() {
  const [email, setEmail] = useState("Youssef@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  const { login, isLogedin, errMessage } = useFakeAuthContext();

  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };


  useEffect(function () {
    if (isLogedin) {
      navigate("/world-wise-react/app", {replace : true});
      return;
    }
  }, [isLogedin, navigate])


  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          {errMessage && <Message message={errMessage} />}
          <button className="cta">Login</button>
        </div>
      </form>
    </main>
  );
}
