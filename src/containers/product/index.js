import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  fetchProduct
} from '../../actions'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'
import Header from '../header'

class Product extends Component {

  componentDidMount() {console.log('this.props.match.params.id ', this.props.match.params.id)
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const { match, product } = this.props;
    console.log('match ', match);
    console.log('product ', product);
    console.log('product && product.product && product.product.groupId ', product && product.product && product.product.groupId);
    return (
      <div>
        <Header groupId={ product && product.product && product.product.groupId} />
        <h1>Product</h1>
        {
          product && product.product && (
            <div>
              <h3>{product.product.title}</h3>
              <div>{product.product.description}</div>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    count: state.counter,
    isIncrementing: state.counter,
    isDecrementing: state.counter,
    product: state.product
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us'),
      fetchProduct
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
