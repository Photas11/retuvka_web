const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  primaryNav.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  primaryNav.classList.toggle('is-open', !isExpanded);
});

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const monthNames = [
  'leden', 'únor', 'březen', 'duben', 'květen', 'červen',
  'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec',
];
const weekdayNames = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];
const monthTitle = document.querySelector('#month-title');
const calendarDays = document.querySelector('#calendar-days');
const calendarNote = document.querySelector('#calendar-note');
const upcomingEvents = document.querySelector('#upcoming-events');
const sampleEvents = [
  { offset: 4, title: 'Ukázková událost v obci', type: 'Společenské' },
  { offset: 12, title: 'Setkání — ukázkový obsah', type: 'Obec' },
  { offset: 21, title: 'Akce pro občany — ukázka', type: 'Kultura' },
];
let visibleMonth = new Date();
visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);

function formatShortDate(date) {
  return `${date.getDate()}. ${monthNames[date.getMonth()].slice(0, 3)}`;
}

function renderUpcomingEvents() {
  const today = new Date();
  const dates = sampleEvents.map((event) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + event.offset);
    return { ...event, date };
  });

  upcomingEvents.replaceChildren(...dates.map((event) => {
    const item = document.createElement('article');
    item.className = 'event-item';

    const date = document.createElement('div');
    date.className = 'event-date';
    const day = document.createElement('strong');
    day.textContent = String(event.date.getDate());
    const month = document.createElement('span');
    month.textContent = monthNames[event.date.getMonth()].slice(0, 3);
    date.append(day, month);

    const details = document.createElement('div');
    const title = document.createElement('h4');
    title.textContent = event.title;
    const dateText = document.createElement('p');
    dateText.textContent = `${formatShortDate(event.date)} · čas a místo doplníme`;
    const type = document.createElement('span');
    type.className = 'event-type';
    type.textContent = event.type;
    details.append(title, dateText, type);
    item.append(date, details);
    return item;
  }));
}

function renderCalendar() {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const today = new Date();
  const eventDates = new Map();

  sampleEvents.forEach((event) => {
    const eventDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + event.offset);
    if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
      eventDates.set(eventDate.getDate(), event.title);
    }
  });

  monthTitle.textContent = `${monthNames[month]} ${year}`;
  const cells = [];
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  for (let index = 0; index < totalCells; index += 1) {
    const dayNumber = index - startOffset + 1;
    const date = new Date(year, month, dayNumber);
    const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const isToday = isCurrentMonth
      && date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear();
    const eventTitle = isCurrentMonth ? eventDates.get(dayNumber) : undefined;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'calendar-day';
    button.textContent = String(date.getDate());
    button.setAttribute('aria-label', `${date.getDate()}. ${monthNames[date.getMonth()]} ${date.getFullYear()}${eventTitle ? ` — ${eventTitle}` : ''}`);

    if (!isCurrentMonth) button.classList.add('is-outside');
    if (isToday) {
      button.classList.add('is-today');
      button.setAttribute('aria-current', 'date');
    }
    if (eventTitle) {
      button.classList.add('has-event');
      button.addEventListener('click', () => {
        calendarNote.textContent = `${date.getDate()}. ${monthNames[month]}: ${eventTitle}. Termín je pouze ukázkový.`;
      });
    } else {
      button.addEventListener('click', () => {
        calendarNote.textContent = `Na ${date.getDate()}. ${monthNames[date.getMonth()]} zatím není ukázkový program.`;
      });
    }
    cells.push(button);
  }

  calendarDays.replaceChildren(...cells);
  calendarNote.textContent = 'Vyberte den označený tečkou. Události jsou ukázkové.';
}

document.querySelector('#prev-month').addEventListener('click', () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
  renderCalendar();
});

document.querySelector('#next-month').addEventListener('click', () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
  renderCalendar();
});

document.querySelector('#current-year').textContent = String(new Date().getFullYear());
renderCalendar();
renderUpcomingEvents();
