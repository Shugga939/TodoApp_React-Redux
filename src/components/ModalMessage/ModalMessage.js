import React from 'react'
import './ModalMessage.css'
import SubmitButton from '../ui/SubmitButton'
import { useDispatch } from 'react-redux';
import {removeTODOS} from '../../store/todoReducer'


function ModalMenu({show, setShow, message}) {

  let dispatch = useDispatch()

  let showModal = function(event) {
    if (event.target.classList.contains('modalMessage')) {
      setShow(false)
    }
  }

  return (
      <div>
          <div className={show? 'modalMessage active': 'modalMessage'} onClick={showModal}>
            <div className='modalMessageContainer'>
              <div className='message'>{message}</div>
              <div className='buttonsContainer'>
                <SubmitButton title='No' callback={()=>{setShow(false)}}/>
                <SubmitButton title='Yes' callback={()=>{dispatch(removeTODOS(), setShow(false))}}/>
              </div>
            </div>
          </div>
        </div> 


  ) 
}

export default ModalMenu;