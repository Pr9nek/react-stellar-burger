import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import Tabs from "../Burger-Ingredients/Tabs/Tabs";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";
/* import { getData } from "../../utils/api"; */
/* import { IngredientsContext } from "../../services/ingredientsContext"; */
/* import { ConstructorContext } from "../../services/constructorContext"; */
import {getIngredients} from '../../services/actions/ingredients/actions';

function App() {
  /* const [dataState, setDataState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: null
  }); */

  /*  useEffect(() => {
    const getIngredients = () => {
      setDataState({ ...dataState, isLoading: true });
      getData()
        .then(res => setDataState({ ...dataState, ingredients: res.data, isLoading: false }))
        .catch(e => {
          setDataState({ ...dataState, hasError: true, isLoading: false });
        });
    }
    getIngredients();
  }, []) */

  /* const { isLoading, hasError, ingredients } = dataState; */

 const { isLoading, Error, ingredients } = useSelector(store => store.ingredients);
 const dispatch = useDispatch();

 /*  const [burgerConstructor, setBurgerConstructor] = useState({
    bun: null,
    ingredients: []
  }); */

  useEffect(()=> {
    dispatch(getIngredients());
}, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <IngredientsContext.Provider value={ingredients}> */}
        {/* <ConstructorContext.Provider value={{burgerConstructor, setBurgerConstructor}}> */}
          <main className={`${styles.main} pl-5 pr-5`}>
          <DndProvider backend={HTML5Backend}>
            <section className={`${styles.section} pb-10`}>
              <h1 className="text text_type_main-large mb-5">
                Соберите бургер
              </h1>
              <div className="mb-10">
                <Tabs />
              </div>
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
        {/* </ConstructorContext.Provider> */}
      {/* </IngredientsContext.Provider> */}
    </div>
  );
}

export default App;
