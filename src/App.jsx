import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";
import Login from "./components/Login";
import PostCard from "./components/PostCard";
import Singup from "./components/Singup";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(false);
  // const dispatcher = useDispatch();
  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((data) => {
  //     if (data) {
  //       dispatcher(login({data}))
  //     }
  //     else {
  //       dispatcher(logout());
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }, [])
  return (
    loading ? <h1>Loading Please wait...</h1> :
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default App
