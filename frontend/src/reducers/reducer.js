import {
  USERS_FETCH_START,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAIL,
  USERS_LONG_FETCH_FAIL,
  USERS_LONG_FETCH_START,
  USERS_LONG_FETCH_SUCCESS,
  USERS_POST_FAIL,
  USERS_POST_START,
  USERS_POST_SUCCESS
} from '../actions/actions';

const initialState = {
  allUsers: [],
  users: [],
  pageNumber: 1,
  totalLength: 0,
  error: '',
  isFetching: false
};

function reducer(state = initialState, action) {
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
    case USERS_LONG_FETCH_START:
      return {
        ...state,
        isFetching: true,
        error: ''
      };
    case USERS_LONG_FETCH_SUCCESS:
      return {
        ...state,
        allUsers: [...action.payload],
        totalLength: action.totalNumberUsers,
        isFetching: false,
        error: ''
      };
    case USERS_LONG_FETCH_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case USERS_POST_START:
      return {
        ...state,
        isFetching: true,
        error: ''
      };
    case USERS_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: ''
      };
    case USERS_POST_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
