let nextTodoId = 0
export const addTodo = text => {
  console.log('addTodo ', text);
  return ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})}

export const setVisibilitySnackbar = value => ({
  type: 'SET_VISIBILITY_SNACKBAR',
  payload: value
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const setListLinks = (value) => ({
  type: 'SET_LIST_LINKS',
  payload: value
})

export const setProduct = (value) => ({
  type: 'SET_PRODUCT',
  payload: value
})


// sagas

export const fetchCoubs = (text) => ({
  type: 'FETCH_COUBS',
  text: text
})

export const fetchProduct = (id) => ({
  type: 'FETCH_PRODUCT',
  id: id
})