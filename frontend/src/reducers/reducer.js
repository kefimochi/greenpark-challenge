import {
  USERS_FETCH_START,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAIL
} from '../actions/actions';

const initialState = {
  users: [],
  pageNumber: 0,
  error: '',
  isFetching: false
};

function reducer(state = initialState, action) {
  console.log('State', state);
  switch (action.type) {
    case USERS_FETCH_START:
      return {
        ...state,
        isFetching: true,
        error: ''
      };
    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
        pageNumber: action.pageNumber,
        isFetching: false,
        error: ''
      };
    case USERS_FETCH_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
