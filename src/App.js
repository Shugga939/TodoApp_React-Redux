import Notes from "./pages/Notes";
import About from "./pages/About"
import {BrowserRouter,Route, Routes, Navigate} from 'react-router-dom'
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { createContext } from "react";

export const Context = createContext(null)
function App() {

  // let arrOfTodos = JSON.parse(localStorage.getItem('todosList'))

  // useEffect (()=>{
  //   if (localStorage.getItem('userId') === 'null') {
  //     localStorage.setItem('userId', 'New user')
  //     dispatch(removeTODOS())
  //   }
  //   if (localStorage.getItem('userId') === 'New user' && arrOfTodos.length) {
  //      dispatch(loadTODOS(arrOfTodos))
  //   }
  //   dispatch(userLogin(localStorage.getItem('userId')))
  // })
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Notes/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/' element={<Navigate replace to='/home'/>}/>
        </Routes> 
    </BrowserRouter>
  );
}

export default App;
