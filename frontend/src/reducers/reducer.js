import {
  USERS_FETCH_START,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAIL,
  LENGTH_FETCH_FAIL,
  LENGTH_FETCH_START,
  LENGTH_FETCH_SUCCESS
} from '../actions/actions';

const initialState = {
  users: [],
  pageNumber: 0,
  totalLength: 0,
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
    case LENGTH_FETCH_START:
      return {
        ...state,
        isFetching: true,
        error: ''
      };
    case LENGTH_FETCH_SUCCESS:
      return {
        ...state,
        totalLength: action.totalNumber,
        isFetching: false,
        error: ''
      };
    case LENGTH_FETCH_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
