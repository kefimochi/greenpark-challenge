import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPaginatedUsers } from '../actions/actions';
import PageButtons from './pagebuttons';
import '../styles/main.scss';

const List = props => {
  useEffect(() => {
    props.getPaginatedUsers(0);
  }, []);
  return (
    <div>
      <PageButtons />
      <div className="sections-main">
        {console.log(props.users)}

        {props.users && props.users.length > 0 ? (
          props.users.map(user => {
            return (
              // I know that the example given had the routing done as  http://localhost:8080/user/1
              // where the :id would be the place of a user in the array + 1. Yet
              // after spending more than an hour trying to figure out how it would work w/ Redux
              // and only pulling 20 users at a time, I decided to simplify it here.

              // All approaches I could come up with would be inefficient in either space or time complexities.
              // If my solution is unacceptable, I'd be glad to have a conversation about it and hear
              // new ideas on how to implement it!
              <Link className="main-item" to={`/user/${user.id}`} key={user.id}>
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
