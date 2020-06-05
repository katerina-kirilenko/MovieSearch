import { Card } from './movieCard';

export function createCardsList(data) {
  const arrMovies = [];

  data.forEach((card) => {
    arrMovies.push(
      new Card({
        title: card.title,
        href: card.href,
        release: card.release,
        poster: card.poster,
        rating: card.rating,
      })
    );
  });

  return arrMovies;
}
