import React, { useEffect, useState } from "react";
import ModalMenu from "../components/ModalMenu/ModalMenu";
import SubmitButton from '../components/ui/SubmitButton'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import CustomInputRegForm from "../components/ui/CustomInputRegForm";
import { userLogin } from "../store/userReducer";
import { removeTODOS } from "../store/todoReducer";

let defaultValues = {Email: '', pass: '', repPass: ''}

function Registration() {
  let [show, setShow] = useState(false)
  let [regForm, setRegForm] = useState (defaultValues)
  let [wrongValue, setWrongValue] = useState ({Email:false, pass: false, repPass: false})
  let [errorMasage, setErrorMessage] = useState ({
    Email:'The field must be not empty', 
    pass: 'The field must be not empty',
    repPass: 'Passwords mismatch'
  })
  let [validForm, setValidForm] = useState (true)

  useEffect(()=> {
    if (!errorMasage.Email && !errorMasage.pass && !errorMasage.repPass) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  },[errorMasage])

  let dispatch = useDispatch()
  const navigate = useNavigate()

  let createUser = (event)=> {
    event.preventDefault()
    if (!regForm.Email) {
      blurInput('email')
    } else if (!regForm.pass) {
      blurInput('password')
    } else if (!regForm.repPass) {
      blurInput('repPassowrd')
    }
    if (regForm.Email && regForm.pass && regForm.repPass && validForm) {
      dispatch(userLogin(11))
      dispatch(removeTODOS())
      setRegForm(defaultValues)
      navigate('/home')
    }
  }

  let editEmail = (val)=> {
    setRegForm({...regForm, Email: val})
    if (!val.includes('@')) {
      setErrorMessage({...errorMasage, Email:'Wrong Email'})
    } else {
      setErrorMessage({...errorMasage, Email:''})
    }
  }

  let editPass = (val)=>  {
    setRegForm({...regForm, pass: val})
    const validPassLength = (val.length>=6 && val.length<15) 
    const validPassCompare  = (regForm.repPass && (regForm.repPass === val))

    if (!validPassLength && validPassCompare) {
      setErrorMessage({...errorMasage, pass:'The password must be between 6 and 15 symbols', repPass:''})
    } else if (!validPassLength && !validPassCompare) {
      setErrorMessage({...errorMasage, pass:'The password must be between 6 and 15 symbols', repPass:'Passwords mismatch'})
    } else if (validPassLength && !validPassCompare) {
      setErrorMessage({...errorMasage, pass:'', repPass:'Passwords mismatch'}) 
    } else if (validPassLength && validPassCompare) {
      setErrorMessage({...errorMasage, pass:'', repPass:''})
    } 
  }

  let editRepPass = (val)=> {
    setRegForm({...regForm, repPass: val})
    if (regForm.pass === val) {
      setErrorMessage({...errorMasage, repPass:''})
      setValidForm(false)
    } else {
      setErrorMessage({...errorMasage, repPass:'Passwords mismatch'})
    }
  }

  let blurInput = (name)=> {
    switch (name) {
      case 'email' : {
        setWrongValue({...wrongValue, Email: true})
        break;
      }
      case 'password' : {
        setWrongValue({...wrongValue, pass: true})
        break;
      }
      case 'repPassowrd' : {
        setWrongValue({...wrongValue, repPass: true})
        break;
      }
      default : break;
    }
  }

  return (
    <div className = 'TODO'>
      <ModalMenu show={show} setShow={setShow}/>
      <form className = 'registration-wrapper'>
        <h2>Registration</h2>
        {(wrongValue.Email && errorMasage.Email) && <div className = 'error-message'>{errorMasage.Email}</div>}
        <CustomInputRegForm className = 'email-input' name = {'email'} blur = {blurInput} value={regForm.Email} changeValue = {editEmail} title = 'E-mail'/>
        {(wrongValue.pass && errorMasage.pass) && <div className = 'error-message'> {errorMasage.pass}</div>}
        <CustomInputRegForm className = 'password-input' name = {'password'} type = {'password'} blur = {blurInput} changeValue = {editPass} value={regForm.pass} title = 'Password'/>
        {(wrongValue.repPass && errorMasage.repPass) && <div className = 'error-message'> {errorMasage.repPass}</div>}
        <CustomInputRegForm className = 'repPassword-input' name = {'repPassowrd'} type = {'password'} blur = {blurInput} changeValue = {editRepPass} value={regForm.repPass} title = 'Repeat pass'/>
        <SubmitButton callback={createUser} title = {'Registration'}/>
        <div className = 'note-registration'>
          {'Have an account?'} 
          <Link to={'/login'} className = 'link_reg'> {'Sign In'} </Link>
        </div>
      </form>
    </div>
  );
}

export default Registration;