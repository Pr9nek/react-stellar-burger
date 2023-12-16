import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from '../../hooks/hooks';
import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { getIngredientsStore } from "../../utils/constants";

function Home() {
  const { isLoading, error, ingredients } = useSelector(getIngredientsStore);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <DndProvider backend={HTML5Backend}>
        <section className={`${styles.section} pb-10`}>
          {isLoading && 'Загрузка...'}
          {error && 'Произошла ошибка'}
          {!isLoading &&
            !error &&
            ingredients !== null && <BurgerIngredients />}
        </section>

        <section className={`${styles.section} pt-15 pl-4 pb-10`}>
          {isLoading && 'Загрузка...'}
          {error && 'Произошла ошибка'}
          {!isLoading &&
            !error &&
            ingredients !== null && <BurgerConstructor />}
        </section>
      </DndProvider>
    </main>
  );
}

export default Home;