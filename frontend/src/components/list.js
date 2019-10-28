import React from 'react';
import { connect } from 'react-redux';
import { getPaginatedUsers } from '../actions/actions';
import Items from './items';

const List = props => {
  return (
    <>
      {(window.onload = () => props.getPaginatedUsers(0))}
      <h2>Hi</h2>
      <button onClick={() => props.getPaginatedUsers(20)}></button>
      {console.log(props.users)}
    </>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { getPaginatedUsers }
)(List);
