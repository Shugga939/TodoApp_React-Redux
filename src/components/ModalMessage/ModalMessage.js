import React from 'react'
import './ModalMessage.css'
import SubmitButton from '../ui/SubmitButton'


function ModalMenu({show, setShow, message, callback}) {

  let showModal = function(event) {
    if (event.target.classList.contains('modalMessage')) {
      setShow(false)
    }
  }

  const fulfillCallback = async ()=> {
    callback()
    setShow(false)
  }

  return (
      <div>
          <div className={show? 'modalMessage active': 'modalMessage'} onClick={showModal}>
            <div className='modalMessageContainer'>
              <div className='message'>{message}</div>
              <div className='buttonsContainer'>
                <SubmitButton title='No' callback={()=>{setShow(false)}}/>
                <SubmitButton title='Yes' callback={()=>{fulfillCallback()}}/>
              </div>
            </div>
          </div>
        </div> 


  ) 
}

export default ModalMenu;