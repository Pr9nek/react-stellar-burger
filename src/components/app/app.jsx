import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";
import {getIngredients} from '../../services/actions/ingredients/actions';

function App() {

 const { isLoading, Error, ingredients } = useSelector(store => store.ingredients);
 const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getIngredients());
}, [])

  return (
    <div className={styles.app}>
      <AppHeader />
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
    </div>
  );
}

export default App;
