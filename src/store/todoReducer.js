export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO' : {
      return [...state, action.payload]
    }
    case 'DELETE_TODO' : {
      return state.filter((item) => item.id !== action.payload)
    }
    case 'COMPLETE_TODO' : {
      return state.map((item) => {
        if (item.id === action.payload) item.completed = !item.completed
        return item
        })
    }
    case 'EDIT_TODO' : {
      return state.map((item) => {
        if (item.id === action.payload.id) item.text = action.payload.text
        return item
        })
    }
    case 'LOAD_TODOS' : {
      return action.payload
    }
    case 'REMOVE_TODOS' : {
      return []
    }
    
    default : return state
  }
}

export const addTODO = (payload)=> ({ type:'ADD_TODO', payload})
export const deleteTODO = (payload)=> ({ type:'DELETE_TODO', payload})
export const completeTODO = (payload)=> ({ type:'COMPLETE_TODO', payload})
export const editTODO = (payload)=> ({ type:'EDIT_TODO', payload})
export const loadTODOS = (payload)=> ({ type:'LOAD_TODOS', payload})
export const removeTODOS = ()=> ({ type:'REMOVE_TODOS'})



