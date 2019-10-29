import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageButtons from './pagebuttons';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../actions/actions';
import '../styles/main.scss';

const Profile = props => {
  const [currentProfile, setCurrentProfile] = useState({});
  useEffect(() => {
    props.getAllUsers();
  }, []);

  return (
    <div>
      <PageButtons />
      <div className="sections-profile">
        {/* Traverses all users and sets the currentUser to the very first instance 
        of matching ids */}
        {props.allUsers &&
        props.allUsers.length > 0 &&
        !currentProfile.hasOwnProperty('id') ? (
          setCurrentProfile(
            props.allUsers.find(
              num => num.id === parseInt(props.match.params.id)
            )
          )
        ) : (
          <></>
        )}

        {/* If above code executed correctly and there's a current profile then perform a check 
        on currentProfile not being an empty object & generate the corresponding JSX */}
        {currentProfile.hasOwnProperty('id') ? (
          <div className="profile">
            <Link>Edit User</Link>
            <img
              src={currentProfile.profile_pic}
              alt={`Profile picture of ${currentProfile.first} ${currentProfile.last}`}
            ></img>
            <h3>
              {currentProfile.first} {currentProfile.last}, {currentProfile.age}
            </h3>
            <h4>Email: {currentProfile.email}</h4>
            <p>
              Address: {currentProfile.address}, {currentProfile.city},{' '}
              {currentProfile.state}, {currentProfile.zip}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers
  };
};

export default connect(
  mapStateToProps,
  { getAllUsers }
)(Profile);
