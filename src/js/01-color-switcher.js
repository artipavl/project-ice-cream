const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;
let changeBogyColor = false;

btnStart.addEventListener('click', onBodyColorStart);
btnStop.addEventListener('click', onBodyColorStop);

offEl(btnStop);

function onBodyColorStart(e) {
  if (changeBogyColor) {
    return;
  }

  offEl(e.currentTarget);
  onEl(btnStop);
  changeBogyColor = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBodyColorStop() {
  clearInterval(timerId);
  changeBogyColor = false;
  onEl(btnStart);
  offEl(btnStop);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function offEl(btn) {
  btn.setAttribute('disabled', 'disabled');
}

function onEl(btn) {
  btn.removeAttribute('disabled');
}
