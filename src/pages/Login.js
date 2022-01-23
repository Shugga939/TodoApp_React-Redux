import React, { useState } from "react";
import ModalMenu from "../components/ModalMenu/ModalMenu";
import SubmitButton from '../components/ui/SubmitButton'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from "../components/ui/CustomInput";
import { signInWithEmailAndPassword } from "firebase/auth";


import { authError, authSuccess } from "../store/authReducer";

function Login() {
  let [show, setShow] = useState(false)
  let [selectValue, setselectValue] = useState('New user')
  let [loginForm, setLoginForm] = useState ({Email: '', password: ''})
  
  // const navigate = useNavigate()
  // let userId = useSelector(state=>state.user)
  // let login = (event)=> {
  //   event.preventDefault()
  //   dispatch(userLogin(selectValue))
  //   if (userId !== selectValue) navigate('/home')
  // }

  const dispatch = useDispatch()
  let auth = useSelector(state=>state.auth)

  let login = (event)=> {
    event.preventDefault()
    signInWithEmailAndPassword(auth.auth, loginForm.Email, loginForm.password)
    .then((userCredential) => {
        console.log('Login Success')
        dispatch(authSuccess())
        setLoginForm({...loginForm, Email: '', password: ''})
        const user = userCredential.user;
        console.log(user)
    })
    .catch((error) => {
      console.log('Auth ERROR')
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(authError())
        setLoginForm({...loginForm, password: ''})
    });
  }

  return (
    <div className = 'TODO'> 
        <ModalMenu show={show} setShow={setShow}></ModalMenu>
        <form className = 'login-wrapper'>
          <h2>Sign In</h2>
          <CustomInput title = 'E-mail' value={loginForm.Email} changeValue={(val)=>setLoginForm({...loginForm,Email:val})} />
          <CustomInput title = 'Password' value={loginForm.password} changeValue={(val)=>setLoginForm({...loginForm,password:val})}/>
          {auth.authError && 
            <div className="error-message"> Invalid Email or password 
              <hr style={{marginBottom: '5px'}}></hr>
            </div>}
          <SubmitButton callback = {login} title = {'Log in'}/> 
          <div className = 'note-registration'>
            {'Don\'t have an account?'} 
            <Link to={'/registration'} className = 'link_reg'> Registration </Link>
          </div>
        </form>
    </div>
  );
}

export default Login;