import "./App.css";
import "./input.css";
import { Route, Routes } from "react-router-dom";
import UserContext from "./components/provider/UserContext";
import Register from "./views/Register";
import Login from "./views/Login";
import Navbar from "./components/NavBar";
import HeadHome from "./components/headHome";
import Cards from "./components/cards";
import Services from "./components/services";
import Footer from "./components/footer";


import AllServices from "./components/AllServices";
import OneService from "./components/OneService";


import UserProfile from "./components/UserProfile";
import DashboardUser from "./components/DashboardUser";

import AdminDash from "./components/adminHandler/AdminDash"

function App() {
  const baseUrl = "http://localhost:8000/api";
  const isVerified = localStorage.getItem('isVerified') === 'true';

  console.log(isVerified);

  
  return (
    <>
      <UserContext>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeadHome />
                <Cards />
                <Services />
              </>
            }
          />
          <Route path="/register" element={<Register baseUrl={baseUrl} />} />
          <Route path="/login" element={<Login baseUrl={baseUrl} />} />
          <Route
            path="/userProfile"
            element={<UserProfile baseUrl={baseUrl} />}
          />
          <Route
            path="/allServices"
            element={<AllServices baseUrl={baseUrl} />}
          />
          <Route
            path="/services/:id"
            element={<OneService baseUrl={baseUrl} />}
          />
          <Route
            path="/userDashboard"
            element={<DashboardUser baseUrl={baseUrl} />}
          />
          <Route
            path="/adminDashboard"
            element={<AdminDash baseUrl={baseUrl} />}
          />
        </Routes>
        {/* <RegistrationForm/>  */}

        {/* <LoginForm/> */}
        {/* <AllServices/> */}
        {/* <OneService/> */}

        <Footer />
      </UserContext>
    </>
  );
}
export default App;
