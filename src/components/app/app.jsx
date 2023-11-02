import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import IngredientsDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal";
// import {clearCurrent} from '../../services/actions/details/actions';
import { getIngredients } from '../../services/actions/ingredients/actions';


function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const { ingredients } = useSelector(store => store.ingredients);


  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ingredients/:id"
          element={ingredients?.length && (
            <IngredientsDetails ingredients={ingredients} />
          )} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={ingredients?.length && (
              <Modal onClose={handleModalClose}>
                <IngredientsDetails ingredients={ingredients} />
              </Modal>
            )}
          />
        </Routes>
      )
      }
    </div>
  );
}

export default App;
