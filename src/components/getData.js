import { getMoviesByQuery } from '../api/movies';
import { getRating } from '../api/rating';

export async function getData(value, page) {
  try {
    const result = await getMoviesByQuery(value, page);

    if (result.Error) {
      throw new Error(result.Error);
    } else {
      const resultWithRating = await Promise.all(
        result.Search.map(async (movie) => {
          const rating = await getRating(movie.imdbID);

          return {
            title: movie.Title,
            href: `https://www.imdb.com/title/${movie.imdbID}`,
            release: movie.Year,
            poster:
              movie.Poster !== 'N/A' ? movie.Poster : '../img/non-poster.png',
            rating: rating.Ratings[0].Value,
          };
        })
      );
      return resultWithRating;
    }
  } catch (error) {
    const results = document.querySelector('.results');
    results.style.visibility = 'visible';
    results.innerHTML = `Search results for "${value}" returned ${error}`;

    setTimeout(() => {
      results.innerHTML = '';
    }, 3000);

    return {}
  }
}
