import React, { useState } from "react";
import ModalMenu from "../components/ModalMenu/ModalMenu";
import SubmitButton from '../components/ui/SubmitButton'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from "../store/userReducer";


function Login() {
  let [show, setShow] = useState(false)
  let [selectValue, setselectValue] = useState('New user')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let userId = useSelector(state=>state.user)
  
  let login = (event)=> {
    event.preventDefault()
    dispatch(userLogin(selectValue))
    if (userId !== selectValue) navigate('/home')
  }

  return (
    <div className = 'TODO'> 
        <ModalMenu show={show} setShow={setShow}></ModalMenu>
        <form className = 'login-wrapper'>
          <h2>Sign In</h2>
          {/* <CustomInput title = 'E-mail' /> */}
          {/* <CustomInput title = 'Password' /> */}
          <span style = {{'marginBottom' : '5px'}}>{'Select id user '} 
            <select value={selectValue} onChange={event=>setselectValue(event.target.value)}>
              <option>New user</option> 
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </span>
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