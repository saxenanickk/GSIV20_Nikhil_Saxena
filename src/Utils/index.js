/**
 * To render a comma separated string of all genres
 */
export const renderGenres = genres => {
  let tempGenreList = [];
  genres.map(genre => tempGenreList.push(genre.name));

  return tempGenreList.join(', ');
};

/**
 * To render the name of Director
 */
export const renderDirector = crew => {
  let i = 0;
  while (i < crew.length) {
    if (crew[i].job === 'Director') {
      return crew[i].name;
    }
    i++;
  }
};

/**
 * To render the year of release
 */
export const renderYear = date => {
  return date.split('-')[0];
};

/**
 * To render a comma separated string of whole cast of movie
 */
export const renderCast = casts => {
  if (!casts.length) {
    return null;
  }
  let tempCastList = [];
  casts.map(cast => tempCastList.push(cast.name));

  return tempCastList.join(', ');
};

/**
 * To search everything in movies data
 */
export const searchInMovies = (arr, searchKey) => {
  return arr.filter(obj => {
    return Object.keys(obj).some(key => {
      if (obj[key] !== null) {
        return obj[key]
          .toString()
          .toLowerCase()
          .includes(searchKey.toLowerCase());
      }
    });
  });
};
