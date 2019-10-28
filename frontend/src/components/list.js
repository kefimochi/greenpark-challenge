import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPaginatedUsers } from '../actions/actions';
import PageButtons from './pagebuttons';
import '../styles/main.scss';

const List = props => {
  return (
    <div className="sections-main">
      {(window.onload = () => props.getPaginatedUsers(0))}
      <h2>Hi</h2>
      <button onClick={() => props.getPaginatedUsers(20)}></button>
      {console.log(props.users)}
      <PageButtons />
      {props.users && props.users.length > 0 ? (
        props.users.map(user => {
          return (
            <Link className="main-item" to={`/users`} key={user.id}>
              <img
                src={user.profile_pic}
                alt={`Profile picture of ${user.first} ${user.last}`}
              ></img>

              <h3>
                {user.first} {user.last}
              </h3>
            </Link>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
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
)(List);
