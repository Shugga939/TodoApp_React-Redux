import React,{ useState } from  'react';
import CustomInput from '../ui/CustomInput'
import InputThisButton from '../ui/InputThisButton'
import { useDispatch, useSelector } from 'react-redux';
import { addTODO } from '../../store/todoReducer';
import { changeSearchValue,changeSortSelect } from '../../store/formReducer';
import "./Form.css";


function Form() {
  let [inputNotes, setInputNotes] = useState ('');

  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos)
  const inputSearch = useSelector(state => state.form.search)
  const selectSort = useSelector(state => state.form.sort)

  
  let addTodo = (event)=> {
    let idCount = 0
    todos.forEach(element => {
      if (element.id > idCount) idCount = element.id
    });
    return function () {
      event.preventDefault()
      if (inputNotes.trim()) {
        let obj = {id:++idCount, text:inputNotes, completed:false}
        dispatch(addTODO(obj))
        setInputNotes('')
      }
    }()
  }

  let setInputSearch = (val) => dispatch(changeSearchValue(val));
  let setSelectSort = (event) => {
    dispatch(changeSortSelect(event.target.value));
  }

  return (
    <form className='Form'>
      <h1 style = {{textAlign : 'center' , userSelect : 'none'}}>TODO APP</h1>
      <div className = 'wrapper_inputs'>
        <InputThisButton title = 'Add note' value = {inputNotes} changeValue={setInputNotes} callback = {addTodo} />
        <CustomInput title = 'Search' className = 'search-input' value = {inputSearch} changeValue={setInputSearch}/>
        <div className='selectContainer'> Sorting
          <select onChange={setSelectSort} value={selectSort}> 
            <option value='id'>Default</option>
            <option value='text'>By name</option>
            <option value='completed'>Not fulfilled</option>
          </select>
        </div>  
      </div>
    </form>
  );
}

export default Form;