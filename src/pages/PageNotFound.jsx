import styles from "./PageNotFound.module.css";
import PageNav from "../components/PageNav";

export default function PageNotFound() {
  return (
    <div className={styles.pagenotfound}>
      <PageNav />
      <span>
        <h1>Page not found 😢</h1>
      </span>
    </div>
  );
}
