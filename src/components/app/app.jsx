import styles from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import Tabs from "../Burger-Ingredients/Tabs/Tabs";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <section className={`${styles.section} pb-10`}>
          <h1 className="text text_type_main-large mb-5">
            Соберите бургер
          </h1>
          <div className="mb-10">
            <Tabs />
          </div>
          <BurgerIngredients />
        </section>

        <section className={`${styles.section} pt-15 pl-4 pb-10`}>
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;
