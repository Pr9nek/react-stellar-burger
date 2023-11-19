import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

function Home() {

  const getIngredientsStore = store => store.ingredients;
  const { isLoading, Error, ingredients } = useSelector(getIngredientsStore);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <DndProvider backend={HTML5Backend}>
        <section className={`${styles.section} pb-10`}>
          {isLoading && 'Загрузка...'}
          {Error && 'Произошла ошибка'}
          {!isLoading &&
            !Error &&
            ingredients !== null && <BurgerIngredients />}
        </section>

        <section className={`${styles.section} pt-15 pl-4 pb-10`}>
          {isLoading && 'Загрузка...'}
          {Error && 'Произошла ошибка'}
          {!isLoading &&
            !Error &&
            ingredients !== null && <BurgerConstructor />}
        </section>
      </DndProvider>
    </main>
  );
}

export default Home;