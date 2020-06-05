import $ from 'jquery';
import { SearchForm } from './components/search';
import { initCaruselSettings } from './components/caruselSettings';
import { getData } from './components/getData';
import { createCardsList } from './components/createCardsList';
import { start as renderKeyboard } from './libs/Keyboard/main';

const OWL = $('.owl-carousel');

window.state = { page: 1 };

const form = new SearchForm({ id: 'search' });
form.render();
form.initEventListeners();

function renderCards(arrMovies) {
  arrMovies.forEach((item) => {
    OWL.owlCarousel('add', item.render());
  });

  OWL.trigger('refresh.owl.carousel');
}

async function initCarusel(page) {
  const data = await getData('life', page);
  const arrMovies = createCardsList(data);
  renderCards(arrMovies);
}

function renderCarusel() {
  initCaruselSettings();
  initCarusel(window.state.page);

  OWL.on('changed.owl.carousel', function (event) {
    const items = event.item.count;
    const item = event.item.index;

    if (items - item <= 4 && !document.getElementById('query').value) {
      initCarusel(++window.state.page);
    }
  });
}

renderCarusel();

const input = document.querySelector('.search-input');
renderKeyboard(input);
