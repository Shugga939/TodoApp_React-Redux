import React, { useState } from "react";
import ModalMenu from "../components/ModalMenu/ModalMenu";
import SubmitButton from '../components/ui/SubmitButton'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from "../components/ui/CustomInput";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import { authError, authSuccess } from "../store/authReducer";

function Login() {
  let [show, setShow] = useState(false)
  let [loginForm, setLoginForm] = useState ({Email: '', password: ''})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let authState = useSelector(state=>state.auth.authError)

  let login = (event)=> {
    event.preventDefault()
    signInWithEmailAndPassword(getAuth(), loginForm.Email, loginForm.password)
    .then((userCredential) => {
        console.log('Login Success')
        dispatch(authSuccess())
        setLoginForm({...loginForm, Email: '', password: ''})
        navigate('/home')
        const user = userCredential.user;
        console.log(user)
    })
    .catch((error) => {
      console.log('Auth ERROR:', error)
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
          {authState && 
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