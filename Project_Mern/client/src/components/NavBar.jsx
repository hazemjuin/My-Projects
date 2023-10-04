import React, { useState, useContext, useEffect } from "react";
import Postrequest from "./PostRequest";
import ProposeServices from "./proposeService";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../context/userContext";

function Navbar() {
  const { user, logout: logoutUser } = useContext(userContext);
console.log("USER FROM CON",user)
  // Manage isVerified as a state variable
  const [isVerified, setIsVerified] = useState(
    localStorage.getItem("isVerified") === "true"
  );

  // console.log(user, "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");

  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  const logout = () => {
    console.log("Logout");
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((response) => {
        logoutUser();
        setIsVerified(false); // Update isVerified immediately
        localStorage.setItem("isVerified", false);
        console.log(response);
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  // Use an effect to keep isVerified in sync with localStorage
  useEffect(() => {
    const isVerifiedFromLocalStorage =
      localStorage.getItem("isVerified") === "true";
    setIsVerified(isVerifiedFromLocalStorage);
  }, [user]);

  return (
    <>
      <header
        className="flex w-full items-center bg-light "
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#f3f4f6",
          zIndex: 1000,
        }}
      >
        <div className="container mx-auto ">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <a href="javascript:void(0)" className="block w-full py-5">
                <img src="LOGO.png" alt="logo" style={{ width: "7rem" }} />
              </a>
            </div>
            <div className="flex w-full items-center justify-between px-4 ">
              <div>
                <button
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  className={`absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden ${
                    navbarOpen ? "navbarTogglerActive" : ""
                  }`}
                  id="navbarToggler"
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                </button>
                <nav
                  className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg py-5 px-6 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${
                    navbarOpen ? "" : "hidden"
                  }`}
                  id="navbarCollapse"
                >
                  {isVerified && (
                    <>
                      <ul className="block lg:flex">
                        <li>
                          <Postrequest />
                        </li>
                        <li>
                          <ProposeServices />
                        </li>
                      </ul>
                    </>
                  )}
                </nav>
              </div>

              <div className="hidden pr-10 sm:flex ">
                {/*  Back to HOME '/' */}
                <Link
                  to="/"
                  className="py- px-7 text-base font-medium text-dark hover:text-primary"
                >
                  Home
                </Link>

                {/*  Profile */}
                <div className="relative ">
                  {isVerified ? (
                    <>
                      <button
                        className="py-3 px-7 text-base font-medium text-dark hover:text-primary"
                        onClick={toggleDropdown}
                        style={{ marginTop: "-10px" }}
                      >
                        Profile
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-10 right-0 w-36 bg-white border border-gray-300 shadow-md rounded-lg z-50 lg:z-100">
                          <ul className="py-2">
                            <li>
                              <Link
                                to="/userProfile"
                                onClick={scrollToTop}
                                className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-100"
                              >
                                My Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/userDashboard"
                                onClick={scrollToTop}
                                className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-100 whitespace-nowrap"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                My Dashboard
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={logout}
                                className="block px-4 py-2 text-dark hover:text-primary hover:bg-gray-100"
                              >
                                Logout
                              </button>
                            </li>
                            <li>
                              <Link></Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/*  Login */}
                      <Link
                        to={"/login"}
                        className="py-3 px-7 text-base font-medium text-dark hover:text-primary "
                      >
                        Login
                      </Link>
                      {/* REGISTER */}
                      <Link
                        to={"/register"}
                        className="py-3 px-7 text-base font-medium text-dark hover:text-primary"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
