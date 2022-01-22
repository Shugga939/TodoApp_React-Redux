import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTODOS } from '../../store/todoReducer';
import {useTodos} from '../../hooks/useTodos'
import SubmitButton from '../ui/SubmitButton';
import ListItem from './ListItem'
import "./TodoList.css";

let arrTodos1 = 
[ 
  {text:'hello', id : 1, completed : true}, 
  {text:'its', id : 2, completed : false}, 
  {text: 'me', id : 3, completed : false},
  {text: 'blabla', id : 4, completed : false},
]
let arrTodos2 = 
[ 
  {text:'heasd', id :1, completed : true}, 
  {text:'its', id :2, completed : false}, 
  {text: 'm2', id : 3, completed : false},
  {text: 'blsdbla', id : 4, completed : false},
]

function List({setShow}) {
  let todos = useSelector(state=>state.todos)
  let userId = useSelector(state=>state.user)
  let inputSearch = useSelector(state => state.form.search)
  let selectSort = useSelector(state => state.form.sort)
  let [isLoading, setIsLoading] = useState (false)
  let dispatch = useDispatch()
  let sortingAndSearchingTodos = useTodos (todos, selectSort, inputSearch)

  useEffect(()=> {  
    if (userId === '1') {
      setIsLoading(true)
      setTimeout (()=> {
        dispatch(loadTODOS(arrTodos1))
        setIsLoading(false)
      },3000)
      
    } else if (userId === '2') {
       dispatch(loadTODOS(arrTodos2))
    } else {
      return
    }
  },[userId,dispatch])

  useEffect(()=>{
    if (userId==='New user') {
     localStorage.setItem('todosList', JSON.stringify(todos))
    }
  },[todos,userId])

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