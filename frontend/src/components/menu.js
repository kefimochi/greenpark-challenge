import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMenu, getSections, getItems } from '../actions/actions';
import { getMenuList } from '../helpers/deriving';
import '../styles/main.scss';

const Menu = props => {
  return (
    <div className="sections-main">
      {
        (window.onload = () => {
          props.getMenu();
          props.getItems();
          return props.getSections();
        })
      }
      {Object.entries(props.menu).length > 0 &&
      Object.entries(props.sections).length ? (
        getMenuList(props.sections, props.menu.options, 'main-item')
      ) : (
        <p>No Props</p>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    menu: state.menu,
    sections: state.sections
  };
};

export default connect(
  mapStateToProps,
  { getMenu, getSections, getItems }
)(Menu);
