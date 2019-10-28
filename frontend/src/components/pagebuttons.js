import React from 'react';
import { connect } from 'react-redux';
import { getPaginatedUsers, getTotalPagesNumber } from '../actions/actions';

const PageButtons = props => {
  // Increments the page the user is on when "Next" button is clicked
  const incrementPageNum = number => {
    number > 10
      ? alert("Can't go further than last page!")
      : props.getPaginatedUsers(props.pageNumber * 20);
  };

  // Decrements the page the user is on when "Next" button is clicked
  const decrementPageNum = number => {
    number === 1
      ? alert("Can't go back further than first page!")
      : props.getPaginatedUsers((props.pageNumber - 2) * 20);
  };

  // Dynamically calculates all the needed page numbers for buttons
  const getPagenumberButtons = () => {
    let arrayButtons = [];
    for (let i = 0; i < props.totalLength / 10; i++) {
      arrayButtons.push(i + 1);
    }
    return arrayButtons;
  };

  return (
    <div className="pages-container">
      <p>Current page: {props.pageNumber}</p>
      <button onClick={() => decrementPageNum(props.pageNumber)}>
        Previous
      </button>

      {props.getTotalPagesNumber()}
      {props.totalLength && props.totalLength > 0 ? (
        getPagenumberButtons().map(el => (
          <button onClick={() => props.getPaginatedUsers((el - 1) * 20)}>
            {el}
          </button>
        ))
      ) : (
        <h1>LOADING</h1>
      )}

      <button onClick={() => incrementPageNum(props.pageNumber)}>Next</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pageNumber: state.pageNumber,
    totalLength: state.totalLength
  };
};

export default connect(
  mapStateToProps,
  { getPaginatedUsers, getTotalPagesNumber }
)(PageButtons);
