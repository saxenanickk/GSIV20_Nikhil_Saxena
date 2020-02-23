import {combineReducers} from 'redux';
import {
  SAVE_ALL_UPCOMING_MOVIES,
  IS_REFRESHING,
  IS_LOADING,
  ON_ERROR,
  SAVE_GENRES,
} from './actions';

const initialState = {
  movies: [],
  page: 1,
  total_pages: null,
  error: null,
  isLoading: false,
  isRefreshing: false,
  genres: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_GENRES:
      return {...state, genres: action.payload};
    case SAVE_ALL_UPCOMING_MOVIES:
      return {
        ...state,
        movies: action.payload.results,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case IS_LOADING:
      return {...state, isLoading: action.payload};
    case IS_REFRESHING:
      return {...state, isRefreshing: action.payload};
    case ON_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};

function rootReducer() {
  return combineReducers({
    main: reducer,
  });
}

export default rootReducer;
