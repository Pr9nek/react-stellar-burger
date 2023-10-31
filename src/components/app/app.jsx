// import { useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
