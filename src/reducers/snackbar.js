import { VisibilityFilters } from '../actions'

const snackbar = (state = {VisibilitySnackbar: false, message: ''}, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_SNACKBAR':
      return action.payload
    default:
      return state
  }
}

export default snackbar
