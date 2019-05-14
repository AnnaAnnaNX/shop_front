import { VisibilityFilters } from '../actions'

const product = (state = {product: {}}, action) => {
  switch (action.type) {
    case 'SET_PRODUCT':console.log('action SET_PRODUCT');
      return {
      	...state,
      	product: action.payload
      }
    default:
      return state
  }
}

export default product
