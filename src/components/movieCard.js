export class Card {
  constructor({ title, href, release, poster, rating }) {
    this.title = title;
    this.href = href;
    this.release = release;
    this.poster = poster;
    this.rating = rating;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'wrap-card';

    card.innerHTML = `
      <div class="card">
        <div class="title-card">
          <span class="mark"></span>
          <a href="${this.href}" class="name-film">
            ${this.title}
            <span class="release-year">(${this.release})</span>
          </a>
        </div>
        <div class="poster">
          <img src="${this.poster}" alt="${this.title}">
        </div>
        <div class="rating">Рейтинг<span>${this.rating}</span></div>
    `;

    return card;
  }
}
