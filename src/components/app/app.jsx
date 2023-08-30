import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../App-Header/App-Header";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.global}>
        <div className={styles.container}>
          <p className="text text_type_main-large pb-5">
          Соберите бургер
          </p>
        </div>

        <div className={styles.container}>
          
        </div>
      </div>
    </div>
  );
}

export default App;
