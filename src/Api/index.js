import {SERVER_BASE_URL} from './SERVER_BASE_URL';
import {THE_MOVIE_DB_API_KEY} from '../Config';

const Api = {
  getUpcomingMovies: ({page}) => {
    let url = `${SERVER_BASE_URL}movie/upcoming?api_key=${THE_MOVIE_DB_API_KEY}`;

    if (page) {
      url = `${SERVER_BASE_URL}movie/upcoming?api_key=${THE_MOVIE_DB_API_KEY}&page=${page}`;
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
};

export default Api;
