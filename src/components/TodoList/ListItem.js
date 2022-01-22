import CompleteButton from '../ui/CompleteButton';
import DeleteButton from './../ui/DeleteButton'
import EditButton from './../ui/EditButton'
import { useDispatch } from 'react-redux';
import { completeTODO, deleteTODO, editTODO } from '../../store/todoReducer';
import { useState,useRef, useEffect } from 'react';
import SubmitButton from '../ui/SubmitButton';

function ListItem({id, text, completed}) {
  const dispatch = useDispatch()
  const deleteTodo = ()=> dispatch(deleteTODO(id))
  const completeTodo = ()=> dispatch(completeTODO(id))
  let [editInput, setEditInput] = useState (text)
  let [isEdit, setIsEdit] = useState(false)
  const refEditInput = useRef(null)
  
  const editingNote = function (event) {
    setIsEdit(false)
    event.preventDefault()
    if (editInput === ''){
      deleteTodo()
    } else {
      dispatch(editTODO({id,text:editInput}))
    }
  }

  useEffect(()=>{
    if (isEdit) refEditInput.current.focus()
  },[isEdit])

  return (
    <div className={completed?'ListItem completed' : 'ListItem'}>
      <div className='textContainer'> 
        <div>{'•'}</div> 
        &nbsp;
        {isEdit?
          <form>
            <input 
              value={editInput} 
              onChange={event => setEditInput(event.target.value)}
              onBlur={editingNote}
              ref={refEditInput}
            />
            <div className='buttonsContainer'>
              <SubmitButton title='OK' callback={editingNote}/>
            </div>
          </form> 
        :
          <div>{`${editInput}`}</div>
        }
          
      </div>
      {!isEdit &&
        <div className='buttonsContainer'>
          <CompleteButton callback = {completeTodo} completed = {completed}></CompleteButton>
          <EditButton callback= {()=>setIsEdit(true)}/>
          <DeleteButton  callback = {deleteTodo}></DeleteButton>
        </div>
      }
    </div>
  );
}

export default ListItem;