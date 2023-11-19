import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import Lost from "../../pages/lost/lost";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import IngredientsDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal";
import { getIngredients } from '../../services/actions/ingredients/actions';
import ProfilePage from "../../pages/profile-page/profile-page";
import Profile from "../profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth } from "../../services/actions/user/actions";
import Feed from "../../pages/feed/feed";
import Orders from "../orders/orders";
import OrderInfo from "../modals/order-info/order-info";
import { getIngredientsSelector } from "../../utils/constants";
import { homeRoute, feedRoute, feedDynamicOrderRoute, lostRoute, profileRoute, profileOrdersRoute, loginRoute, registerRoute, forgotPasswordRoute, resetPasswordRoute, dynamicIngredientRoute, profileDynamicOrderRoute } from "../../utils/constants";


function App() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state?.background;
  const ingredients = useSelector(getIngredientsSelector);

  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

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
        <Route path={homeRoute} element={<Home />} />
        <Route path={feedRoute} element={<Feed />} />
        <Route path={feedDynamicOrderRoute} element={<OrderInfo />} />
        <Route path={lostRoute} element={<Lost />} />
        <Route path={profileRoute} element={<OnlyAuth component={<ProfilePage />} />} >
          <Route index element={<OnlyAuth component={<Profile />} />} />
          <Route path={profileOrdersRoute} element={<OnlyAuth component={<Orders />} />} />
        </Route>
        <Route path={profileDynamicOrderRoute} element={<OnlyAuth component={<OrderInfo />} />} />
        <Route path={loginRoute} element={<OnlyUnAuth component={<Login />} />} />
        <Route path={registerRoute} element={<OnlyUnAuth component={<Register />} />} />
        <Route path={forgotPasswordRoute} element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path={resetPasswordRoute} element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path={dynamicIngredientRoute}
          element={ingredients?.length && (
            <IngredientsDetails ingredients={ingredients} />
          )}
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={dynamicIngredientRoute}
            element={ingredients?.length && (
              <Modal onClose={handleModalClose} header="Детали ингредиента">
                <IngredientsDetails ingredients={ingredients} />
              </Modal>
            )}
          />
          <Route
            path={feedDynamicOrderRoute}
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={profileDynamicOrderRoute}
            element={
              <OnlyAuth component=
                {<Modal onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>} />} />
        </Routes>
      )
      }
    </div>
  );
}

export default App;
