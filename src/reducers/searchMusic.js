import { VisibilityFilters } from '../actions'

const searchMusic = (state = {searchTest: '', listLinks: null}, action) => {
  switch (action.type) {
    case 'SET_LIST_LINKS':console.log('action SET_LIST_LINKS');
      return {
      	...state,
      	listLinks: action.payload
      }
    default:
      return state
  }
}

export default searchMusic
