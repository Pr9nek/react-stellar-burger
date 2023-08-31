import styles from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import Tabs from "../Burger-Ingredients/Tabs/Tabs";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients"

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-10 pr-10`}>
        <div className={styles.container}>
          <h1 className="text text_type_main-large pb-5">
          Соберите бургер
          </h1>
          <Tabs />
          <BurgerIngredients />
        </div>

        <div className={styles.container}>
          
        </div>
      </main>
    </div>
  );
}

export default App;
