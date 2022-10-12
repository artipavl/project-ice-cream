// Описаний в документації
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const picker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date().getTime() < selectedDates[0].getTime()) {
      onEl(btnStart);
    } else {
      offEl(btnStart);
      Notify.failure('Please choose a date in the future');
    }
  },
};

offEl(btnStart);

const dataSelected = flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', startTaimer);

function startTaimer(e) {
  offEl(e.currentTarget);
  offEl(picker);
  const defoltData = new Date().getTime();
  const selectedDates = dataSelected.selectedDates[0].getTime();
  let taimetSeconds = selectedDates - defoltData;
  const timerId = setInterval(() => {
    onPrintTime(convertMs(taimetSeconds));
    taimetSeconds -= 1000;
    if (taimetSeconds < 0) {
      clearInterval(timerId);
      Notify.success('That time has come');
      onEl(picker);
    }
  }, 1000);
}

function onPrintTime({ days, hours, minutes, seconds }) {
  daysEl.innerHTML = addLeadingZero(days);
  hoursEl.innerHTML = addLeadingZero(hours);
  minutesEl.innerHTML = addLeadingZero(minutes);
  secondsEl.innerHTML = addLeadingZero(seconds);
}

function offEl(btn) {
  btn.setAttribute('disabled', 'disabled');
}

function onEl(btn) {
  btn.removeAttribute('disabled');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
