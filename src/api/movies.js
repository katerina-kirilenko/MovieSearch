const API_KEY = 'ce573b2';

export async function getMoviesByQuery(query, page = 1) {
  const url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
