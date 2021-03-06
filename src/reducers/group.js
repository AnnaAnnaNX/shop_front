import { VisibilityFilters } from '../actions'

const group = (state = {listProducts: [], pathes: {}}, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':console.log('action SET_PRODUCTS ', action.payload);
      return {
        ...state,
        listProducts: action.payload
      }
    case 'SET_PATHES':console.log('action SET_PATHES ', action.payload);
      return {
        ...state,
        pathes: action.payload
      }
    default:
      return state
  }
}

export default group
