export const formReducer = (state = {search: '', sort: 'id'}, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_VALUE' : {
      return {...state, search: action.payload}
    }
    case 'CHANGE_SORT_SELECT' : {
      return {...state, sort: action.payload}
    }
    default : return state
  }
}

export const changeSearchValue = (payload) => ({type:'CHANGE_SEARCH_VALUE', payload})
export const changeSortSelect = (payload) => ({type:'CHANGE_SORT_SELECT', payload})
