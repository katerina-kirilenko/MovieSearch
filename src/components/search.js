import $ from 'jquery';
import '../libs/OwlCarousel2-2.3.4/dist/owl.carousel';
import { getData } from './getData';
import { createCardsList } from './createCardsList';

const owl = $('.owl-carousel');

window.stateSearh = { page: 1 };

function updateCards(arrMovies) {
  const arr = [];
  let str = '';

  arrMovies.forEach((item, i) => {
    arr.push(item.render());
    str += arr[i].outerHTML;
  });

  owl.trigger('replace.owl.carousel', str).trigger('refresh.owl.carousel');
}

async function addCards(value, page) {
  const data = await getData(value, page);
  const arrMovies = createCardsList(data);

  arrMovies.forEach((item) => {
    owl.owlCarousel('add', item.render());
  });

  owl.trigger('refresh.owl.carousel');
}

async function searchHandler(value, page) {
  document.getElementById('loader').classList.toggle('show');
  const data = await getData(value, page);
  document.getElementById('loader').classList.toggle('show');

  if (data) {
    const arrMovies = createCardsList(data);
    updateCards(arrMovies);
  }

  owl.on('changed.owl.carousel', function (event) {
    const items = event.item.count;
    const item = event.item.index;

    if (items - item <= 4) {
      addCards(value, ++window.stateSearh.page);
    }
  });
}
export class SearchForm {
  constructor({ id }) {
    this.id = id;
  }

  static handleSubmit(e) {
    e.preventDefault();

    const value = document.getElementById('query').value.trim();

    switch (e.target.id) {
      case 'submit':
        searchHandler(value, window.stateSearh.page);
        break;
      case 'clear':
        document.getElementById('query').value = '';
        break;
      case 'keyboard-ico':
        document.getElementById('keyboard').classList.toggle('show');
        break;
      default:
    }
  }

  render() {
    const searchWrap = document.querySelector('.search-wrap');

    searchWrap.innerHTML = `
    <form id=${this.id} class="search">
      <input
        type="text"
        id="query"
        class="search-input"
        name="query"
        placeholder="Введите запрос"
        value=""
        autocomplete="off"
        autofocus>
      <button id="submit" class="search-btn">Искать</button>
      <span id="loader" class="search-loader"></span>
      <span id="clear" class="search-clear"></span>
      <span id="keyboard-ico" class="search-keyboard"></span>
    </form>
  `;

    return searchWrap;
  }

  initEventListeners() {
    const form = document.getElementById(this.id);
    form.addEventListener('click', SearchForm.handleSubmit);
  }
}
