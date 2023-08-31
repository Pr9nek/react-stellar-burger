import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../App-Header/App-Header";
import Tabs from "../Burger-Ingredients/Tabs/Tabs";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-10 pr-10`}>
        <div className={styles.container}>
          <p className="text text_type_main-large pb-5">
          Соберите бургер
          </p>
          <Tabs />
        </div>

        <div className={styles.container}>
          
        </div>
      </main>
    </div>
  );
}

export default App;
