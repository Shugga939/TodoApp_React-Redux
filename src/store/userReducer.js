export const userReducer = (state = 'New user', action) => {
  switch (action.type) {
    case 'LOGIN' : {
      window.localStorage.setItem('userId',action.payload)
      return action.payload
    }
    case 'LOGOUT' : {
      window.localStorage.setItem('userId','New user')
      return 'New user'
    }
    default : return state
  }
}

export const userLogin = (payload) => ({type:'LOGIN', payload})
export const userLogout = () => ({type:'LOGOUT'})
