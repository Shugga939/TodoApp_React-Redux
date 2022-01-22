import React, { useState } from "react";
import List from "./../components/TodoList/List";
import Form from "./../components/Form/Form";
import ModalMenu from "./../components/ModalMenu/ModalMenu";
import ModalMessage from '../components/ModalMessage/ModalMessage'


function Notes() {
  let [showModalMenu, setShowModalMenu] = useState(false)
  let [showModalMessage, setShowModalMessage] = useState(false)

  return (
      <div className = 'TODO'>
        <ModalMenu show={showModalMenu} setShow={setShowModalMenu}/>
        <ModalMessage message='Are you sure?'show={showModalMessage} setShow={setShowModalMessage}/>
        <Form/>
        <List setShow={setShowModalMessage}/>
      </div>
    
  );
}

export default Notes;
