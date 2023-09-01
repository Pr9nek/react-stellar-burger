import styles from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import Tabs from "../Burger-Ingredients/Tabs/Tabs";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-10 pr-10`}>
        <section className={`${styles.section} pb-10`}>
          <h1 className="text text_type_main-large mb-5">
            Соберите бургер
          </h1>
          <Tabs />
          <BurgerIngredients />
        </section>

        <section className={`${styles.section} pt-15`}>
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;
