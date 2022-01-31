import React, { useEffect, useState } from "react";
import List from "./../components/TodoList/List";
import Form from "./../components/Form/Form";
import ModalMenu from "./../components/ModalMenu/ModalMenu";
import ModalMessage from '../components/ModalMessage/ModalMessage'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import {removeTODOS} from '../store/todoReducer'
import { useDispatch } from 'react-redux';
import { loadTODOS } from '../store/todoReducer';
import { useAuthState } from 'react-firebase-hooks/auth';


function Notes() {
  let [showModalMenu, setShowModalMenu] = useState(false)
  let [showModalMessage, setShowModalMessage] = useState(false)
  let auth = getAuth()
  let firestore = getFirestore()
  let dispatch = useDispatch()
  const [user, loadingUser] = useAuthState(auth);

  useEffect(()=> {  
    loadingTodos()
  },[user])
  
  async function loadingTodos() {   
    if (!loadingUser) {
      if (user) {
        const loadedTodos = await getDoc(doc(firestore, 'Todos', `${user.email}`))
        let arrTodos = []
        for (const key in loadedTodos.data()) {
          arrTodos.push(loadedTodos.data()[key])
          }
        dispatch(loadTODOS(arrTodos))
      } else {
        dispatch(removeTODOS())
      }
    } 
  }
    // if (!loadingDB && !loading && user) {
      // const loadedTodos =  getDocs(collection(firestore, auth.currentUser))
      // dispatch(loadTODOS(loadedTodos))
      // massages.forEach(element => {
      //   if (element,)
      // });
      // console.log(massages)
    // } 
    // else {
    //   let localTodos = JSON.parse(localStorage.getItem('todosList'))
    //   localTodos? loadTODOS(localTodos): dispatch(removeTODOS())
    // }


  const deleteTodos = async ()=> {
    try {
      const uploadedTodo = doc(firestore, 'Todos', `${auth.currentUser.email}`);
      await setDoc(uploadedTodo, {})
      dispatch(removeTODOS())
      console.log('Delete success')
    } catch (e) {
      console.error('Error:', e)
    }
  }

  return (
    <div className = 'TODO'>
      <ModalMenu show={showModalMenu} setShow={setShowModalMenu}/>
      <ModalMessage message='Are you sure?'show={showModalMessage} setShow={setShowModalMessage} callback={deleteTodos}/>
      <Form/>
      <List setShow={setShowModalMessage}/>
    </div>
  );
}

export default Notes;
