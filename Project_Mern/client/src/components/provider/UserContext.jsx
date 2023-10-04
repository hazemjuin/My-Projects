import React, {useState} from "react";
import {userContext } from "../../context/userContext";

const UserContext = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    num_telephone: "",
    // image: "",
    // role: "",
    availability: true,
    isVerified:false
  });
  const login =  (user) => {
    setUser({...user, isVerified:true})
  }

  // const register =  (user) => {
  //   setUser({...user, isVerified:true})
  // }

  const logout  = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      num_telephone: "",
      // image: "",
      // role: "",
      availability: true,
      isVerified:false
    })
  }
  // const getLoggedUser = (user) =>{
  // }
  return <userContext.Provider
  value={
    {user, login, logout,setUser}
  }
  >
    {props.children}
    </userContext.Provider>;
};

export default UserContext
