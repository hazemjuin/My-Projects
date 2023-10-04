import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'


const Login = ({baseUrl}) => {

 // Manage isVerified as a state variable
  const [isVerified, setIsVerified] = useState(localStorage.getItem('isVerified') === 'true');


  
  const {user, setUser} = useContext(userContext)
  const navigate = useNavigate()

  const [errors, setErrors] = useState({ email: "", password: "" })


  // const [user, setUser] = useState({
  //   email:"",
  //   password:""
  // })

  const login = (e, loginUser) => {
    e.preventDefault();
    console.log("Login User", loginUser);
    axios
      .post(baseUrl + "/login", loginUser, { withCredentials: true })
      .then((response) => {
        setUser({...user, isVerified:true}) // Setting  isVerified 


        localStorage.setItem('isVerified', true); // Setting Local storage
        setIsVerified(false); // Update isVerified immediately
        
        console.log(response);
        navigate(`/`);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        
        const errs = { email: "", password: "" };
        console.log(error.response.data);
        for (let key of Object.keys(error.response.data)) {
          errs[key] = error.response.data[key].message;
        }
        
        setErrors({ ...errors, ...errs })
      });
  };
  
  // Use an effect to keep isVerified in sync with localStorage
  useEffect(() => {
    const isVerifiedFromLocalStorage = localStorage.getItem('isVerified') === 'true';
    setIsVerified(isVerifiedFromLocalStorage);
  }, []);

  return (
    <div>
      <LoginForm user={user} setter={setUser} operation={login} errors={errors} />
    </div>
  )
}

export default Login