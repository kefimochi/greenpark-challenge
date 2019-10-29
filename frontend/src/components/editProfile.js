import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, editUser } from '../actions/actions';
import '../styles/main.scss';

const EditProfile = props => {
  const [currentEditProfile, setCurrentEditProfile] = useState({});
  useEffect(() => {
    props.getAllUsers();
  }, []);

  // Gets the value of an input field based on the input's name
  const getByName = name => document.getElementsByName(name)[0].value;

  // Checks if the value of a field was altered, if not than derives the value of a property
  // directly from the global state w/ a use of currentEditProfile hook.
  // This code felt pretty repeatable, still tried making it as simplified and
  // easy to read as possible. Let me know if there's a better way, though!
  const handleSubmit = () => {
    let editedUser = {
      id: currentEditProfile.id,
      profile_pic: currentEditProfile.profile_pic,
      first:
        getByName('first').length > 0
          ? getByName('first')
          : currentEditProfile.first,
      last:
        getByName('last').length > 0
          ? getByName('last')
          : currentEditProfile.last,
      age:
        getByName('age').length > 0 ? getByName('age') : currentEditProfile.age,
      email:
        getByName('email').length > 0
          ? getByName('email')
          : currentEditProfile.email,
      address:
        getByName('address').length > 0
          ? getByName('address')
          : currentEditProfile.address,
      city:
        getByName('city').length > 0
          ? getByName('city')
          : currentEditProfile.city,
      state:
        getByName('state').length > 0
          ? getByName('state')
          : currentEditProfile.state,
      zip:
        getByName('zip').length > 0 ? getByName('zip') : currentEditProfile.zip
    };
    return editedUser;
  };

  return (
    <div>
      <div className="sections-profile">
        {/* Happening just in case someone will try to go directly
        to an editing link, otherwise I'd use an existing state
        passed from profile.js to save some time */}
        {props.allUsers &&
        props.allUsers.length > 0 &&
        !currentEditProfile.hasOwnProperty('id') ? (
          setCurrentEditProfile(
            props.allUsers.find(
              num => num.id === parseInt(props.match.params.id)
            )
          )
        ) : (
          <></>
        )}

        <form
          className="profile"
          onSubmit={e => {
            // I kept everything as is here in order for you to recieve the same results
            // in case you'll be cloning the repo
            // props.history.push('/');
            e.preventDefault(); // would be removed in the actual implementation
            console.log('Handle submit output', handleSubmit());
            return props.editUser(handleSubmit(), currentEditProfile.id);
          }}
        >
          <h3>
            {currentEditProfile.first} {currentEditProfile.last}
          </h3>
          <p>Please change the fields you want edited.</p>
          <input type="text" name="first" placeholder="First Name" />
          <input type="text" name="last" placeholder="Last Name" />
          <input type="text" name="age" placeholder="Age" />
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="address" placeholder="Address" />
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="state" placeholder="State" />
          <input type="text" name="zip" placeholder="Zip code" />
          <button type="submit">Submit Form</button>
        </form>
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
  { getAllUsers, editUser }
)(EditProfile);
