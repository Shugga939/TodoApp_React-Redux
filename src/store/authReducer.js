let defaultState = {
    authError: false
}

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS' : {
        return {...state, authError: false}
      }
      case 'LOGIN_ERROR' : {
        return {...state, authError: true}
      }
      default : return state
    }
  }
  
  export const authSuccess = () => ({type:'LOGIN_SUCCESS'})
  export const authError = () => ({type:'LOGIN_ERROR'})

  