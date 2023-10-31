import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { getIngredients } from '../../services/actions/ingredients/actions';

function Home() {

  const { isLoading, Error, ingredients } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [])

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