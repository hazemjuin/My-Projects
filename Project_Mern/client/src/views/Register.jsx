import React,{useState, useContext} from 'react'
import RegisterForm from '../components/RegisterForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'


const Register = ({baseUrl}) => {

  const {user, setUser} = useContext(userContext)
  const navigate = useNavigate()

  const [errors, setErrors] = useState({ firstName: "",lastName: "",num_telephone:"", email: "", password: "", confirmPassword: "" })
  


  const register = (e,newUser) => {
    
    e.preventDefault();
    // console.log(newUser);
    // console.log(e);
    
    axios
        .post(baseUrl+'/register', newUser , { withCredentials: true })
        .then(response => {
          console.log(response)
          setUser({...user, isVerified:true}) // Setting  isVerified 
          localStorage.setItem('isVerified', true); // Setting Local storage
          navigate('/')
        })
        .catch(error => {
          console.log(error)
          const errs = { firstName: "",lastName: "",num_telephone:"", email: "", password: "", confirmPassword: "" }
            // console.log(error.response.data.errors);
            for (let key of Object.keys(error.response.data.errors)) {
              errs[key] = error.response.data.errors[key].message
            }
            setErrors({ ...errors, ...errs })
        })

    setUser({
      firstName: "",
      lastName: "",
      num_telephone:"",
      email:"",
      password:"",
      confirmPassword:""
    })
  }


  return (
    <div>
        <RegisterForm user={user} setter={setUser} operation={register} errors={errors} />
    </div>
  )
}

export default Register