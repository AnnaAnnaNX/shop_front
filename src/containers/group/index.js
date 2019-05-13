import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

const GroupTitle = ({match}) => (
  match.params.id
)

const Group = ({match}) => {console.log('match ', match);
  return (
  <div>
    <h1>Group</h1>
    <Route path={`${match.path}/:id`}
           component={GroupTitle}
    />
  </div>
)}

const mapStateToProps = ({ counter }) => ({
  count: counter,
  isIncrementing: counter,
  isDecrementing: counter
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group)
