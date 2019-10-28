import React from 'react';
import { connect } from 'react-redux';

const PageButtons = props => {
  return (
    <div className="pages-container">
      <p>Current page: {props.pageNumber}</p>
      <button>Previous</button>
      <button>Next</button>
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
  {}
)(PageButtons);
