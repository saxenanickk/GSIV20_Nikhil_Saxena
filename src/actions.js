export const GET_ALL_UPCOMING_MOVIES = 'GET_ALL_UPCOMING_MOVIES';
export const SAVE_ALL_UPCOMING_MOVIES = 'SAVE_ALL_UPCOMING_MOVIES';
export const IS_REFRESHING = 'IS_REFRESHING';
export const IS_LOADING = 'IS_LOADING';
export const ON_ERROR = 'ON_ERROR';

export const getAllUpcomingMovies = payload => ({
  type: GET_ALL_UPCOMING_MOVIES,
  payload,
});

export const saveAllUpcomingMovies = payload => ({
  type: SAVE_ALL_UPCOMING_MOVIES,
  payload,
});

export const isLoading = payload => ({type: IS_LOADING, payload});

export const isRefreshing = payload => ({type: IS_REFRESHING, payload});

export const onError = payload => ({type: ON_ERROR, payload});
