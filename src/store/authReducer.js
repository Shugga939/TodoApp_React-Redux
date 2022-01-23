let defaultState = {
    auth: null,
    authError: false
}

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'SET_AUTH' : {
        console.log(action.payload)
        return {...state, auth:action.payload}
      }
      case 'LOGIN_SUCCESS' : {
        return {...state, authError: false}
      }
      case 'LOGIN_ERROR' : {
        return {...state, authError: true}
      }
      default : return state
    }
  }
  
  export const setAuth = (payload) => ({type:'SET_AUTH', payload})
  export const authSuccess = () => ({type:'LOGIN_SUCCESS'})
  export const authError = () => ({type:'LOGIN_ERROR'})

  