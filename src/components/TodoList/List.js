import { useState } from 'react';
import { useSelector } from 'react-redux';
import {useTodos} from '../../hooks/useTodos'
import SubmitButton from '../ui/SubmitButton';
import ListItem from './ListItem'
import "./TodoList.css";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

function List({setShow}) {
  let todos = useSelector(state=>state.todos)
  let inputSearch = useSelector(state => state.form.search)
  let selectSort = useSelector(state => state.form.sort)
  let [isLoading, setIsLoading] = useState (false)
  let sortingAndSearchingTodos = useTodos (todos, selectSort, inputSearch)
  let auth = getAuth()
  let firestore = getFirestore()

  // useEffect(()=> {  
  //   if (userId === '1') {
  //     setIsLoading(true)
  //     setTimeout (()=> {
  //       dispatch(loadTODOS(arrTodos1))
  //       setIsLoading(false)
  //     },3000)
      
  //   } else if (userId === '2') {
  //      dispatch(loadTODOS(arrTodos2))
  //   } else {
  //     return
  //   }
  // },[userId,dispatch])

  // useEffect(()=>{
  //   if (userId==='New user') {
  //    localStorage.setItem('todosList', JSON.stringify(todos))
  //   }
  // },[todos,userId])

  // useEffect(()=>{        //TODO
  //   if (!auth.currentUser) {
  //    localStorage.setItem('todosList', JSON.stringify(todos))
  //   }
  // },[todos,auth.currentUser])

  // async function loadingTodos() {   //TODO
  //   // setTimeout(()=>{      console.log(auth.currentUser)},3000)
  //     console.log(auth.currentUser)
  //   // if (auth.currentUser) {
  //   //   const loadedTodos = await getDocs(collection(firestore, auth.currentUser))
  //   //   dispatch(loadTODOS(loadedTodos))
  //   // } else {
  //     let localTodos = JSON.parse(localStorage.getItem('todosList'))
  //     localTodos? loadTODOS(localTodos): dispatch(removeTODOS())
  //   // }
  // }

  // useEffect(()=> {  //TODO
  //   loadingTodos()
  // })

  const saveTodos = async ()=> {
    try {
      const uploadedTodo = doc(firestore, 'Todos', `${auth.currentUser.email}`);
      await setDoc(uploadedTodo, {...todos})
      console.log('Upload success')
    } catch (e) {
      console.error('Error:', e)
    }
  }
  
  return (
    sortingAndSearchingTodos.length?
      <div className = 'listContainer'>
        <div className='List'>
          {sortingAndSearchingTodos.map((item)=>{
            return <ListItem 
            id = {item.id} 
            text = {item.text} 
            key = {item.id}
            completed = {item.completed}
            />
          })}
        {auth.currentUser && <SubmitButton title = 'SAVE' callback = {()=>{saveTodos()}}/>} {/*TODO*/}
        </div>
         {(sortingAndSearchingTodos.length>4) && 
          <SubmitButton title = 'DELETE ALL NOTES' callback = {()=>{setShow(true)}}/>}
      </div>
    : 
      <div className='messageContainer'>
        {(isLoading) && <div className = 'message'>Loading</div>}
        {(!inputSearch.length && !isLoading) && <div className = 'message'>Add our notes</div>}
        {(!!inputSearch.length && !isLoading) && <div className = 'message'>Not found</div>}
      </div>
  ) 
}

export default List;