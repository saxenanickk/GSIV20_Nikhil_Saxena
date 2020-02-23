import {SERVER_BASE_URL} from './SERVER_BASE_URL';
import {THE_MOVIE_DB_API_KEY} from '../Config';

const Api = {
  getUpcomingMovies: ({page}) => {
    let url = `${SERVER_BASE_URL}discover/movie?api_key=${THE_MOVIE_DB_API_KEY}&sort_by=release_date.asc&primary_release_date.gte=2020-02-20&release_date.gte=2020-02-20`;

    if (page) {
      url = `${url}&page=${page}`;
    }

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.status === 200) {
            response.json().then(res => resolve(res));
          } else {
            response.json().then(res => reject(res));
          }
        })
        .catch(error => reject(error));
    });
  },
  getGenres: () => {
    let url = `${SERVER_BASE_URL}genre/movie/list?api_key=${THE_MOVIE_DB_API_KEY}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.status === 200) {
            response.json().then(res => resolve(res));
          } else {
            response.json().then(res => reject(res));
          }
        })
        .catch(error => reject(error));
    });
  },
};

export default Api;
