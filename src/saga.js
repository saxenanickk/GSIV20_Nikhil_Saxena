import {takeLatest, call, put, select} from 'redux-saga/effects';
import {
  GET_ALL_UPCOMING_MOVIES,
  saveAllUpcomingMovies,
  isRefreshing,
  isLoading,
  onError,
  GET_GENRES,
  saveGenres,
  GET_MOVIE_DETAILS,
  saveMovieDetails,
} from './actions';
import Api from './Api';

export const getMovies = state => state.main.movies;

export default function* rootSaga(dispatch) {
  yield takeLatest(GET_GENRES, handleGetGenres);
  yield takeLatest(GET_ALL_UPCOMING_MOVIES, handleGetAllUpcomingMovies);
  yield takeLatest(GET_MOVIE_DETAILS, handleGetMovieDetails);
}

/**
 * Handlers
 */

function* handleGetGenres(action) {
  try {
    const response = yield call(Api.getGenres);

    let genres = {};
    response.genres.map(item => {
      genres = {
        ...genres,
        [item.id]: item.name,
      };
    });
    yield put(saveGenres(genres));
  } catch (error) {
    // Todo
  } finally {
    // Todo
  }
}

function* handleGetAllUpcomingMovies(action) {
  try {
    // Change the isLoading State
    if (action.payload.isLoading) {
      yield put(isLoading(true));
    }

    // Change the isRefreshing State
    if (action.payload.isRefreshing) {
      yield put(isRefreshing(true));
    }

    // Call the getUpcomingMovies API
    const response = yield call(Api.getUpcomingMovies, action.payload);

    // Get all the movies from store
    let movies = yield select(getMovies);
    let data =
      action.payload.page === 1
        ? response.results
        : [...movies, ...response.results];

    // Save all the movies to store
    yield put(saveAllUpcomingMovies({...response, results: data}));
  } catch (error) {
    // Check whether error code and error message is present or not
    if (error && error.status_code && error.status_message) {
      // If present
      yield put(onError({message: error.status_message}));
    } else {
      // If not present
      yield put(onError({message: 'Something went wrong.'}));
    }
  } finally {
    // Change the isLoading State
    if (action.payload.isLoading) {
      yield put(isLoading(false));
    }

    // Change the isRefreshing State
    if (action.payload.isRefreshing) {
      yield put(isRefreshing(false));
    }
  }
}

function* handleGetMovieDetails(action) {
  try {
    // Call the getMovieDetails API
    const response = yield call(Api.getMovieDetails, action.payload);
    // Save the movie details to store
    yield put(saveMovieDetails(response));
  } catch (error) {
    // Check whether error code and error message is present or not
    if (error && error.status_code && error.status_message) {
      // If present
      yield put(onError({message: error.status_message}));
    } else {
      // If not present
      yield put(onError({message: 'Something went wrong.'}));
    }
  }
}
