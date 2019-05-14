import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getPathes
} from '../../actions'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'
import { Link } from 'react-router-dom'

class Header extends Component {
  componentDidMount() {
    this.props.getPathes();
  }

  render() {
    const { match, group, groupId } = this.props;
    console.log('group ', group);
    console.log('groupId ', groupId);
    console.log('group.pathes[groupId] ', group.pathes[groupId] && group.pathes[groupId][groupId]);
    return (
      <div>
        <h1>HEADER</h1>
        {
          group.pathes && groupId &&
          group.pathes[groupId] &&
          group.pathes[groupId ]&&
          group.pathes[groupId][groupId]
          .map(group => (
            <Link key={group.id} to={`/group/${group.id}`}>{group.title}</Link>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
      group: state.group
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPathes
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
