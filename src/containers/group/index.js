import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  fetchProductsByGroupId
} from '../../actions'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

class Group extends Component {

  componentDidMount() {console.log('this.props.match.params.id ', this.props.match.params.id)
    this.props.fetchProductsByGroupId(this.props.match.params.id);
  }

  render() {
    const { match, group } = this.props;
    console.log('match ', match);
    console.log('group ', group);
    return (
      <div>
        <h1>Group</h1>
        {
          group && group.listProducts &&
          group.listProducts.map(product => (
            <div key = {product.id}>
              <h3>{product.title}</h3>
              <div>{product.description}</div>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  count: state.counter,
  isIncrementing: state.counter,
  isDecrementing: state.counter,
  group: state.group
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us'),
      fetchProductsByGroupId
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group)
