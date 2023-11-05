import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import IngredientsDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal";
// import {clearCurrent} from '../../services/actions/details/actions';
import { getIngredients } from '../../services/actions/ingredients/actions';
import ProfilePage from "../../pages/profile-page/profile-page";
import Profile from "../profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth } from "../../services/actions/user/actions";
import { refreshToken } from "../../utils/api";


function App() {

  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state?.background;
  const { ingredients } = useSelector(store => store.ingredients);

  console.log(token);
  console.log(refreshToken);
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
      dispatch(checkUserAuth());
  }, [dispatch, token, refreshToken]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>  
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} >
          <Route index element={<OnlyAuth component={<Profile />} />} />
          {/* <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/orders/:id" element={<Order />} /> */}
        </Route>
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
