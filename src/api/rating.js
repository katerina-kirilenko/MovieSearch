const API_KEY = 'ce573b2';

export async function getRating(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
