import React from 'react';
import { connect } from 'react-redux';
import { getPaginatedUsers } from '../actions/actions';

const PageButtons = props => {
  const incrementPageNum = number => {
    number > 10
      ? alert("Can't go further than last page!")
      : props.getPaginatedUsers(props.pageNumber * 20);
  };

  const decrementPagenum = number => {
    number === 1
      ? alert("Can't go back further than first page!")
      : props.getPaginatedUsers((props.pageNumber - 2) * 20);
  };
  return (
    <div className="pages-container">
      <p>Current page: {props.pageNumber}</p>
      <button onClick={() => decrementPagenum(props.pageNumber)}>
        Previous
      </button>
      <button onClick={() => incrementPageNum(props.pageNumber)}>Next</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pageNumber: state.pageNumber
  };
};

export default connect(
  mapStateToProps,
  { getPaginatedUsers }
)(PageButtons);
