import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPaginatedUsers } from '../actions/actions';
import PageButtons from './pagebuttons';
import '../styles/main.scss';

const Profile = props => {
  return <div></div>;
};

const mapStateToProps = state => {
  return {
    users: state.users,
    pageNumber: state.pageNumber
  };
};

export default connect(
  mapStateToProps,
  { getPaginatedUsers }
)(Profile);
