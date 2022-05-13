import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { auth } from "./utility/firebase";
import { useStateValue } from "./utility/StateProvider";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
//components
import Orders from "./components/Orders/Orders";
import Footer from "./components/Footer/Footer";
import Payment from "./components/Payment/Payment";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header.js";
import Home from "./components/Home/Home.js";
import NoMatch from "./components/NoMatch/NoMatch";
// const promise = loadStripe(
//   "pk_test_51J2CkpEyiy5eJg0JWnQ62NSdmKrhLlUS9SMT0cOdgBgClGL89oQYzGhLAdcPySjWFwcyy2kM1jXyfMWDoKaTsGDg00SUVqO2FX"
// );

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    // will only run one when the app components loads
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
              <Footer />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Payment />
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
