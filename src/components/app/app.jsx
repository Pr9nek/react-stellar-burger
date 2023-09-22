import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import Tabs from "../Burger-Ingredients/Tabs/Tabs";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";
import { getData } from "../../utils/api";
import { IngredientsContext } from "../../services/ingredientsContext";
import { ConstructorContext } from "../../services/constructorContext";

function App() {
  const [dataState, setDataState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: null
  });

  const [burgerConstructor, setBurgerConstructor] = useState({
    bun: null,
    ingredients: []
  });

  useEffect(() => {
    const getIngredients = () => {
      setDataState({ ...dataState, isLoading: true });
      getData()
        .then(res => setDataState({ ...dataState, ingredients: res.data, isLoading: false }))
        .catch(e => {
          setDataState({ ...dataState, hasError: true, isLoading: false });
        });
    }
    getIngredients();
  }, [])

  const { isLoading, hasError, ingredients } = dataState;

  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientsContext.Provider value={ingredients}>
        <ConstructorContext.Provider value={{burgerConstructor, setBurgerConstructor}}>
          <main className={`${styles.main} pl-5 pr-5`}>
            <section className={`${styles.section} pb-10`}>
              <h1 className="text text_type_main-large mb-5">
                Соберите бургер
              </h1>
              <div className="mb-10">
                <Tabs />
              </div>
              {isLoading && 'Загрузка...'}
              {hasError && 'Произошла ошибка'}
              {!isLoading &&
                !hasError &&
                ingredients !== null && <BurgerIngredients />}
            </section>

            <section className={`${styles.section} pt-15 pl-4 pb-10`}>
              {isLoading && 'Загрузка...'}
              {hasError && 'Произошла ошибка'}
              {!isLoading &&
                !hasError &&
                ingredients !== null && <BurgerConstructor />}
            </section>
          </main>
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
