import React from 'react'
import './ModalMenu.css'
import BurgerButton from './../ui/BurgerButton'
import {Link,NavLink} from 'react-router-dom'
import SubmitButton from '../ui/SubmitButton'
import { useDispatch, useSelector } from 'react-redux';
import {userLogout} from '../../store/userReducer'
import {removeTODOS} from '../../store/todoReducer'
import { changeSearchValue } from '../../store/formReducer';


function ModalMenu({show,setShow}) {

  let userId = useSelector(state=>state.user)
  let dispatch = useDispatch()

  let logout = function (event) {
    event.preventDefault()
    dispatch(userLogout())
    dispatch(removeTODOS())
    dispatch(changeSearchValue(''))
    setShow(false)
  }

  let linksNotLoginned = [
    {name: 'Home', ref: '/home'},
    {name: 'Login', ref: '/login'},
    {name: 'About', ref: '/about'},
  ]

  let linksLoginned = [
    {name: 'Home', ref: '/home'},
    {name: 'About', ref: '/about'},
  ]

  return (
      <div>
        <BurgerButton show={show} setShow={setShow}/>
        <div className={show? 'modalMenu active': 'modalMenu'}>
          <div className='blur' onClick={()=>setShow(false)}/>
          <div className='menu'>
          {(userId==='New user')? 
            <div className = 'greetings'> Welcome
              <p> {'New user'} </p>
              <p> Do you want to </p>
              <p> <Link to={'/registration'} className = 'link_reg'> {'registration?'} </Link> </p>
            </div>
          :
            <div className = 'greetings'> Welcome
              <p> {`User ${userId}` } </p>
              <p> <SubmitButton callback={logout} title = 'Log Out'></SubmitButton> </p>
            </div>
          }
          <div className ='navLinks-container'>
            <nav className='navLinks'>
              {userId === 'New user'? 
                linksNotLoginned.map((item)=>{
                  return <NavLink to={item.ref} className = 'link' key={item.ref}> {item.name} </NavLink>
                })
              :
                linksLoginned.map((item)=>{
                  return <NavLink to={item.ref} className = 'link' key={item.ref}> {item.name} </NavLink>
                })
              }
            </nav>
          </div>
        </div>
      </div> 
    </div>
  ) 
}

export default ModalMenu;