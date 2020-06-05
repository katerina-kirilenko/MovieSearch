import {
  keyDownEn,
  keyUpEn,
  keyCapsEn,
  keyShiftCapsEn,
  keyDownRu,
  keyUpRu,
  keyCapsRu,
  keyShiftCapsRu,
  keyId,
} from './constants.js';
import './css/style.css';

let searchInput = '';

export function start(input) {
  createStructure();
  restoreState();
  isCapsAndLang();
  pressKeyHandler();
  pressMouseHandler();
  clickMouseHandler();

  searchInput = input;
}

const createStructure = () => {
  let searchWrap = document.querySelector('.search-wrap');
  let keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  keyboard.id = 'keyboard';
  searchWrap.append(keyboard);
};

// сохранение языка
let lang = 'en';
let checkCaps = false;

const saveState = () => {
  localStorage.setItem('keyboard-lang', lang);
};

const restoreState = () => {
  lang = localStorage.getItem('keyboard-lang')
    ? localStorage.getItem('keyboard-lang')
    : 'en';
};

// создание кнопок
const createKey = (array) => {
  for (let i = 0; i < array.length; i++) {
    let row = document.createElement('div');
    row.className = 'row';
    keyboard.append(row);

    for (let j = 0; j < array[i].length; j++) {
      let key = document.createElement('div');
      key.className = `key ${keyId[i][j]}`;
      key.textContent = array[i][j];
      key.setAttribute('id', keyId[i][j]);
      row.append(key);
    }
  }
};

// обработка Caps
const keyboardCaps = () => {
  checkCaps = document.getElementById('CapsLock').classList.contains('press')
    ? true
    : false;
  return checkCaps;
};

// обработка shift
const checkShift = () => {
  let shiftActive = document
    .getElementById('ShiftLeft')
    .classList.contains('press');
  let rShiftActive = document
    .getElementById('ShiftRight')
    .classList.contains('press');
  if (shiftActive || rShiftActive) {
    return true;
  }
  return false;
};

// вызов смены раскладки по клику мышкой
const toggleCasesClick = (event) => {
  //вызов смены раскладки на шифт+альт
  if (event.target.id === 'en') {
    changeLanguage();
    saveState();

    // вызов смены раскладки на капс+шифт
  } else if (checkShift() && keyboardCaps()) {
    if (checkCaps && lang == 'ru') {
      deleteKeys();
      createKey(keyShiftCapsRu);
      document.getElementById('CapsLock').classList.toggle('press');
      if (event.code === 'ShiftLeft') {
        document.getElementById('ShiftLeft').classList.toggle('press');
      } else if (event.code === 'ShiftRight') {
        document.getElementById('ShiftRight').classList.toggle('press');
      }
    }
  } // вызов смены раскладки на капс
  else if (event.target.id === 'CapsLock' && !checkShift()) {
    keyboardCaps();
    if (!checkCaps && lang == 'ru') {
      deleteKeys();
      createKey(keyDownRu);
    } else if (checkCaps && lang == 'ru') {
      deleteKeys();
      createKey(keyCapsRu);
      document.getElementById('CapsLock').classList.toggle('press');
    } else if (checkCaps && lang == 'en') {
      deleteKeys();
      createKey(keyCapsEn);
      document.getElementById('CapsLock').classList.toggle('press');
    } else if (!checkCaps && lang == 'en') {
      deleteKeys();
      createKey(keyDownEn);
    }
    // вызов смены раскладки на шифт
  } else if (
    event.target.id === 'ShiftLeft' ||
    event.target.id === 'ShiftRight'
  ) {
    if (checkShift() && lang == 'ru') {
      deleteKeys();
      createKey(keyUpRu);
      if (event.target.id === 'ShiftLeft') {
        document.getElementById('ShiftLeft').classList.toggle('press');
      } else if (event.target.id === 'ShiftRight') {
        document.getElementById('ShiftRight').classList.toggle('press');
      }
    } else if (!checkShift() && lang == 'ru') {
      deleteKeys();
      createKey(keyDownRu);
    } else if (checkShift() && lang == 'en') {
      deleteKeys();
      createKey(keyUpEn);
      if (event.target.id === 'ShiftLeft') {
        document.getElementById('ShiftLeft').classList.toggle('press');
      } else if (event.target.id === 'ShiftRight') {
        document.getElementById('ShiftRight').classList.toggle('press');
      }
    } else if (!checkShift() && lang == 'en') {
      deleteKeys();
      createKey(keyDownEn);
    }
  }
};

// вызов смены раскладки по key
const toggleCasesPress = (event) => {
  //вызов смены раскладки на шифт+альт
  if (checkShift() && (event.code === 'AltLeft' || event.code === 'AltRight')) {
    changeLanguage();

    // вызов смены раскладки на капс+шифт
  } else if (checkShift() && keyboardCaps()) {
    if (checkCaps && lang == 'ru') {
      deleteKeys();
      createKey(keyShiftCapsRu);
      document.getElementById('CapsLock').classList.toggle('press');
      if (event.code === 'ShiftLeft') {
        document.getElementById('ShiftLeft').classList.toggle('press');
      } else if (event.code === 'ShiftRight') {
        document.getElementById('ShiftRight').classList.toggle('press');
      }
    }

    // вызов смены раскладки на капс
  } else if (event.code === 'CapsLock' && !checkShift()) {
    keyboardCaps();
    if (!checkCaps && lang == 'ru') {
      deleteKeys();
      createKey(keyDownRu);
    } else if (checkCaps && lang == 'ru') {
      deleteKeys();
      createKey(keyCapsRu);
      document.getElementById('CapsLock').classList.toggle('press');
    } else if (checkCaps && lang == 'en') {
      deleteKeys();
      createKey(keyCapsEn);
      document.getElementById('CapsLock').classList.toggle('press');
    } else if (!checkCaps && lang == 'en') {
      deleteKeys();
      createKey(keyDownEn);
    }

    // вызов смены раскладки на шифт
  } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (checkShift() && lang == 'ru') {
      deleteKeys();
      createKey(keyUpRu);
      if (event.code === 'ShiftLeft') {
        document.getElementById('ShiftLeft').classList.toggle('press');
      } else if (event.code === 'ShiftRight') {
        document.getElementById('ShiftRight').classList.toggle('press');
      }
    } else if (!checkShift() && lang == 'ru') {
      deleteKeys();
      createKey(keyDownRu);
    } else if (checkShift() && lang == 'en') {
      deleteKeys();
      createKey(keyUpEn);
      if (event.code === 'ShiftLeft') {
        document.getElementById('ShiftLeft').classList.toggle('press');
      } else if (event.code === 'ShiftRight') {
        document.getElementById('ShiftRight').classList.toggle('press');
      }
    } else if (!checkShift() && lang == 'en') {
      deleteKeys();
      createKey(keyDownEn);
    }
  }
};

// смена языка
const changeLanguage = () => {
  if (lang === 'en') {
    lang = 'ru';
    saveState();
    changeKeyboard(lang);
  } else if (lang === 'ru') {
    lang = 'en';
    saveState();
    changeKeyboard(lang);
  }
};

// смена раскладки
const changeKeyboard = (lang) => {
  deleteKeys();
  isCapsAndLang(lang);
};

// удаление раскладки
const deleteKeys = () => {
  while (keyboard.hasChildNodes()) {
    keyboard.removeChild(keyboard.firstChild);
  }
};

// первый рендер раскладки
const isCapsAndLang = () => {
  if (checkCaps && lang == 'ru') {
    createKey(keyCapsRu);
  } else if (!checkCaps && lang == 'ru') {
    createKey(keyDownRu);
  } else if (checkCaps && lang == 'en') {
    createKey(keyCapsEn);
  } else if (!checkCaps && lang == 'en') {
    createKey(keyDownEn);
  }
};

// подсветка по нажатию на клавишу
const pressedKey = (event) => {
  document.querySelectorAll('.key').forEach((key) => {
    if (event.code == key.id) {
      key.classList.add('active');
    }
  });

  if (event.code == 'CapsLock') {
    document.getElementById('CapsLock').classList.toggle('press');
  }
  if (event.code == 'ShiftLeft') {
    document.getElementById('ShiftLeft').classList.toggle('press');
  }
  if (event.code == 'ShiftRight') {
    document.getElementById('ShiftRight').classList.toggle('press');
  }
};

// снятие подсветки по нажатию на клавишу
const dePressedKey = (event) => {
  document.querySelectorAll('.key').forEach((key) => {
    if (event.code == key.id) {
      key.classList.remove('active');
    }
  });
};

// подсветка по нажатию мышкой
const pressedKeyClickMouse = (event) => {
  document.querySelectorAll('.key').forEach((key) => {
    if (event.target.id == key.id) {
      key.classList.add('active');
    }
  });

  if (event.target.id == 'CapsLock') {
    document.getElementById('CapsLock').classList.toggle('press');
  }
  if (event.target.id == 'ShiftLeft') {
    document.getElementById('ShiftLeft').classList.toggle('press');
  }
  if (event.target.id == 'ShiftRight') {
    document.getElementById('ShiftRight').classList.toggle('press');
  }
};

// снятие подсветки по нажатию мышкой
const dePressedKeyClickMouse = (event) => {
  document.querySelectorAll('.key').forEach((key) => {
    if (event.target.id == key.id) {
      key.classList.remove('active');
    }
  });
};

// обработчик нажатия клавишей
const pressKeyHandler = () => {
  document.addEventListener('keydown', (event) => {
    pressedKey(event);
    toggleCasesPress(event);
    searchInput.focus();
  });

  document.addEventListener('keyup', (event) => {
    dePressedKey(event);
  });
};

// обработчик нажатия мышкой
const pressMouseHandler = () => {
  let keyboardDiv = document.getElementById('keyboard');
  keyboardDiv.addEventListener('mousedown', (event) => {
    pressedKeyClickMouse(event);
  });

  keyboardDiv.addEventListener('mouseup', (event) => {
    dePressedKeyClickMouse(event);
  });
};

// обработчик клика мышкой
const clickMouseHandler = () => {
  document.getElementById('keyboard').addEventListener('click', (event) => {
    toggleCasesClick(event);
    pressInput(event);
  });
};

const keyBackspace = () => {
  if (searchInput.value.length === 0) {
    return;
  }
  searchInput.setRangeText(
    '',
    searchInput.selectionStart,
    searchInput.selectionEnd,
    'end'
  );
  if (searchInput.selectionStart === searchInput.selectionEnd) {
    searchInput.setRangeText(
      '',
      searchInput.selectionStart - 1,
      searchInput.selectionEnd,
      'end'
    );
  }
};

const keyDelete = () => {
  if (searchInput.selectionStart === searchInput.selectionEnd) {
    searchInput.setRangeText(
      '',
      searchInput.selectionStart,
      searchInput.selectionEnd + 1,
      'end'
    );
  } else if (searchInput.selectionStart !== searchInput.selectionEnd) {
    searchInput.setRangeText(
      '',
      searchInput.selectionStart,
      searchInput.selectionEnd,
      'end'
    );
  }
};

const pressInput = (event) => {
  searchInput.focus();

  if (
    event.target.id !== 'keyboard' &&
    !event.target.classList.contains('row')
  ) {
    switch (event.target.id) {
      case 'Space':
        searchInput.value += ' ';
        break;
      case 'Enter':
        searchInput.value += '\n';
        break;
      case 'Tab':
        searchInput.value += '    ';
        break;
      case 'Backspace':
        keyBackspace();
      case 'Delete':
        keyDelete();
      case 'CapsLock':
      case 'ShiftLeft':
      case 'ShiftRight':
      case 'AltLeft':
      case 'AltRight':
      case 'ControlLeft':
      case 'ControlRight':
      case 'en':
        searchInput.value += '';
        break;
      default:
        searchInput.value += event.target.innerText;
        break;
    }
  }
};
