const statusLabels = {
  draft: 'Rozepsáno',
  scheduled: 'Naplánováno',
  published: 'Zveřejněno',
  archived: 'Archivováno',
};

const viewLabels = {
  dashboard: 'Přehled',
  news: 'Aktuality',
  events: 'Události',
  board: 'Úřední deska',
  gallery: 'Fotogalerie',
  pages: 'Stránky',
  settings: 'Kontakty a nastavení',
};

const roleLabels = {
  editor: 'Redaktor',
  board: 'Správce úřední desky',
  admin: 'Správce webu',
};

const typeLabels = {
  news: 'Aktualita',
  events: 'Událost',
  board: 'Dokument',
  gallery: 'Galerie',
  pages: 'Stránka',
};

const permissions = {
  admin: ['news', 'events', 'board', 'gallery', 'pages', 'settings'],
  editor: ['news', 'events', 'gallery', 'pages'],
  board: ['board'],
};

const settings = {
  name: 'Obecní úřad Řetůvka',
  address: '',
  phone: '',
  email: '',
  hours: '',
};

function localDateOffset(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function formatDate(value) {
  if (!value) return 'Datum doplníme';
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('cs-CZ', { day: 'numeric', month: 'short', year: 'numeric' })
    .format(new Date(year, month - 1, day));
}

function daysUntil(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  const target = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
}

function relativeDate(value) {
  const days = daysUntil(value);
  if (days === 0) return 'dnes';
  if (days === 1) return 'zítra';
  if (days > 1 && days < 5) return `za ${days} dny`;
  if (days >= 5) return `za ${days} dní`;
  if (days === -1) return 'včera';
  return `před ${Math.abs(days)} dny`;
}

const content = {
  news: [
    { id: 'news-1', title: 'Název aktuality — ukázkový obsah', category: 'Informace z obce', summary: 'Krátký úvod aktuality doplníme při přípravě skutečného obsahu.', date: localDateOffset(-1), status: 'published', body: 'Toto je ukázkový text aktuality. Skutečný obsah doplní obecní úřad.' },
    { id: 'news-2', title: 'Pozvánka na obecní akci — ukázka', category: 'Pozvánka', summary: 'Prostor pro stručné shrnutí události.', date: localDateOffset(3), status: 'scheduled', body: 'Ukázkový text pozvánky.' },
    { id: 'news-3', title: 'Rozpracovaná aktualita', category: 'Obec', summary: 'Rozepsaný příspěvek čekající na dokončení.', date: localDateOffset(-2), status: 'draft', body: 'Ukázkový rozepsaný text.' },
    { id: 'news-4', title: 'Starší zpráva z obce', category: 'Informace z obce', summary: 'Archivovaný ukázkový příspěvek.', date: localDateOffset(-25), status: 'archived', body: 'Ukázkový archivovaný text.' },
  ],
  events: [
    { id: 'event-1', title: 'Ukázková událost v obci', category: 'Společenské', date: localDateOffset(4), time: '16:00', place: 'Místo konání doplníme', status: 'published', body: 'Podrobnosti události budou doplněny.' },
    { id: 'event-2', title: 'Setkání — ukázkový obsah', category: 'Obec', date: localDateOffset(12), time: '18:00', place: 'Místo konání doplníme', status: 'scheduled', body: 'Ukázkový popis události.' },
    { id: 'event-3', title: 'Příprava nové události', category: 'Kultura', date: localDateOffset(21), time: '—', place: 'Místo doplníme', status: 'draft', body: 'Ukázkový záznam události.' },
    { id: 'event-4', title: 'Proběhlá akce — ukázka archivu', category: 'Společenské', date: localDateOffset(-15), time: '14:00', place: 'Místo doplníme', status: 'archived', body: 'Ukázková minulá událost.' },
  ],
  board: [
    { id: 'doc-1', title: 'Dokument k ukázkovému záměru obce', documentType: 'Záměr obce', publishedOn: localDateOffset(-10), removeOn: localDateOffset(2), status: 'published', fileName: 'ukazkovy-dokument.pdf' },
    { id: 'doc-2', title: 'Ukázkové oznámení obce', documentType: 'Oznámení', publishedOn: localDateOffset(1), removeOn: localDateOffset(15), status: 'scheduled', fileName: 'oznameni-ukazka.pdf' },
    { id: 'doc-3', title: 'Návrh dokumentu — ukázka', documentType: 'Návrh dokumentu', publishedOn: localDateOffset(0), removeOn: localDateOffset(14), status: 'draft', fileName: '' },
    { id: 'doc-4', title: 'Archivovaný ukázkový dokument', documentType: 'Oznámení', publishedOn: localDateOffset(-30), removeOn: localDateOffset(-16), status: 'archived', fileName: 'archiv-ukazka.pdf' },
  ],
  gallery: [
    { id: 'gallery-1', title: 'Obec a okolí — ukázková galerie', date: localDateOffset(-20), photos: 8, status: 'published', summary: 'Zástupné fotografie krajiny obce.' },
    { id: 'gallery-2', title: 'Život v obci — ukázková galerie', date: localDateOffset(-4), photos: 12, status: 'draft', summary: 'Ukázkový popis galerie.' },
    { id: 'gallery-3', title: 'Obecní akce — archiv', date: localDateOffset(-60), photos: 16, status: 'archived', summary: 'Ukázkový archivní album.' },
  ],
  pages: [
    { id: 'page-1', title: 'Informace o obci', slug: 'obec', date: localDateOffset(-7), status: 'published', summary: 'Úvodní informace o obci.' },
    { id: 'page-2', title: 'Obecní úřad a kontakty', slug: 'urad', date: localDateOffset(-5), status: 'published', summary: 'Kontakty a úřední hodiny — ukázka.' },
    { id: 'page-3', title: 'Historie obce — návrh', slug: 'historie', date: localDateOffset(-2), status: 'draft', summary: 'Ukázková stránka v přípravě.' },
  ],
};

const viewRoot = document.querySelector('#view-root');
const sidebar = document.querySelector('#admin-sidebar');
const sidebarScrim = document.querySelector('#sidebar-scrim');
const mobileMenu = document.querySelector('#mobile-menu');
const modalBackdrop = document.querySelector('#modal-backdrop');
const modalTitle = document.querySelector('#modal-title');
const modalEyebrow = document.querySelector('#modal-eyebrow');
const modalBody = document.querySelector('#modal-body');
const modalFooter = document.querySelector('#modal-footer');
const toast = document.querySelector('#toast');
const roleSwitch = document.querySelector('#role-switch');

let currentView = 'dashboard';
let currentRole = 'editor';
let editing = null;
let previewTarget = null;
let draftValues = {};
let returnFocus = null;
let toastTimer;

function canManage(type) {
  return permissions[currentRole].includes(type);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function setView(view) {
  currentView = view;
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('is-active', item.dataset.view === view);
  });
  document.querySelector('#breadcrumb-current').textContent = viewLabels[view];
  sidebar.classList.remove('is-open');
  sidebarScrim.classList.remove('is-open');
  mobileMenu.setAttribute('aria-expanded', 'false');
  renderView();
}

function pageHeading(eyebrow, title, description, button = '') {
  return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div>${button}</div>`;
}

function actionButton(label, type, disabled = false, secondary = false) {
  return `<button type="button" class="button${secondary ? ' button-secondary' : ''}" data-new="${type}"${disabled ? ' disabled title="Tato role nemá oprávnění k úpravě"' : ''}><span class="plus" aria-hidden="true">+</span>${label}</button>`;
}

function statusPill(status) {
  return `<span class="status status-${status}">${statusLabels[status] || statusLabels.draft}</span>`;
}

function dashboardView() {
  const activeNews = content.news.filter((item) => item.status === 'published').length;
  const upcoming = content.events.filter((item) => item.status === 'published' || item.status === 'scheduled').length;
  const activeDocs = content.board.filter((item) => item.status === 'published').length;
  const albums = content.gallery.length;
  const expiring = content.board
    .filter((item) => item.status === 'published' && daysUntil(item.removeOn) >= 0 && daysUntil(item.removeOn) <= 10)
    .sort((a, b) => daysUntil(a.removeOn) - daysUntil(b.removeOn));
  const recent = [
    ...content.news.map((item) => ({ ...item, type: 'news', date: item.date })),
    ...content.events.map((item) => ({ ...item, type: 'events', date: item.date })),
    ...content.board.map((item) => ({ ...item, type: 'board', date: item.publishedOn })),
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return `
    ${pageHeading('PŘEHLED WEBU', 'Dobrý den', 'Zde najdete rychlý přehled obsahu a úkolů pro správu webu.')}
    <div class="stats-grid">
      <article class="stat-card"><span class="stat-icon">▤</span><div class="stat-copy"><span>Aktivní aktuality</span><strong>${activeNews}</strong><small>Ukázkové příspěvky</small></div></article>
      <article class="stat-card"><span class="stat-icon gold">▦</span><div class="stat-copy"><span>Události</span><strong>${upcoming}</strong><small>Aktuální a naplánované</small></div></article>
      <article class="stat-card"><span class="stat-icon blue">▧</span><div class="stat-copy"><span>Na úřední desce</span><strong>${activeDocs}</strong><small>Ukázkové dokumenty</small></div></article>
      <article class="stat-card"><span class="stat-icon rose">▧</span><div class="stat-copy"><span>Fotogalerie</span><strong>${albums}</strong><small>Alba v prototypu</small></div></article>
    </div>
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-header"><div><h2>Rychlé akce</h2><p>Začněte nejčastějším úkolem</p></div></div>
        <div class="panel-body"><div class="quick-actions">
          <button type="button" class="quick-action" data-new="news"${canManage('news') ? '' : ' disabled'}><span class="quick-action-icon">＋</span><span><strong>Přidat aktualitu</strong><small>Novinka pro občany</small></span></button>
          <button type="button" class="quick-action" data-new="events"${canManage('events') ? '' : ' disabled'}><span class="quick-action-icon">▦</span><span><strong>Přidat událost</strong><small>Termín do kalendáře</small></span></button>
          <button type="button" class="quick-action" data-new="board"${canManage('board') ? '' : ' disabled'}><span class="quick-action-icon">▧</span><span><strong>Vložit dokument</strong><small>Úřední deska</small></span></button>
          <button type="button" class="quick-action" data-new="gallery"${canManage('gallery') ? '' : ' disabled'}><span class="quick-action-icon">▣</span><span><strong>Vytvořit galerii</strong><small>Album fotografií</small></span></button>
        </div></div>
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2>Dokumenty ke kontrole</h2><p>Blížící se termín sejmutí</p></div><button type="button" class="text-button" data-go="board">Zobrazit desku →</button></div>
        <div class="panel-body"><div class="expiry-list">${expiring.length ? expiring.map((item) => `<div class="expiry-item"><span class="expiry-icon">!</span><div><strong>${escapeHtml(item.title)}</strong><small>Sejmout ${relativeDate(item.removeOn)} · ${formatDate(item.removeOn)}</small></div><button type="button" data-action="edit" data-type="board" data-id="${item.id}"${canManage('board') ? '' : ' disabled'}>Upravit</button></div>`).join('') : '<p class="help-text">Žádný ukázkový dokument se blíží ke sejmutí.</p>'}</div></div>
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2>Poslední obsah</h2><p>Aktuální změny v prototypu</p></div><button type="button" class="text-button" data-go="news">Přejít na obsah →</button></div>
        <div class="panel-body"><div class="recent-list">${recent.map((item) => `<div class="recent-row"><span class="recent-title">${escapeHtml(item.title)}</span><span class="recent-meta">${formatDate(item.date)}</span>${statusPill(item.status)}</div>`).join('')}</div></div>
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2>Aktuální role</h2><p>Oprávnění ukázkového účtu</p></div></div>
        <div class="panel-body"><div class="role-summary"><span class="status status-published">${roleLabels[currentRole]}</span></div><p class="help-text">Role lze přepnout v horní liště. V prototypu jde pouze o ukázku; skutečná oprávnění musí kontrolovat server.</p></div>
      </section>
    </div>`;
}

function tableHeader(type) {
  if (type === 'board') return '<thead><tr><th>Dokument</th><th>Typ</th><th>Vyvěšeno</th><th>Sejmout</th><th>Stav</th><th>Akce</th></tr></thead>';
  if (type === 'pages') return '<thead><tr><th>Stránka</th><th>Adresa</th><th>Upraveno</th><th>Stav</th><th>Akce</th></tr></thead>';
  if (type === 'gallery') return '<thead><tr><th>Album</th><th>Počet fotografií</th><th>Datum</th><th>Stav</th><th>Akce</th></tr></thead>';
  return '<thead><tr><th>Název a popis</th><th>Kategorie</th><th>Datum</th><th>Stav</th><th>Akce</th></tr></thead>';
}

function itemActionButtons(type, item) {
  const allowed = canManage(type);
  const stateAction = item.status === 'published'
    ? `<button type="button" class="small-action" data-action="status" data-type="${type}" data-id="${item.id}"${allowed ? '' : ' disabled'}>Archivovat</button>`
    : item.status === 'archived'
      ? `<button type="button" class="small-action" data-action="status" data-type="${type}" data-id="${item.id}"${allowed ? '' : ' disabled'}>Obnovit</button>`
      : `<button type="button" class="small-action" data-action="status" data-type="${type}" data-id="${item.id}"${allowed ? '' : ' disabled'}>Zveřejnit</button>`;
  return `<div class="table-actions"><button type="button" class="small-action" data-action="preview" data-type="${type}" data-id="${item.id}">Náhled</button><button type="button" class="small-action" data-action="edit" data-type="${type}" data-id="${item.id}"${allowed ? '' : ' disabled'}>Upravit</button>${stateAction}</div>`;
}

function renderTableRows(type, items) {
  if (!items.length) return '<div class="empty-state">Nic jsme nenašli. Zkuste upravit hledání nebo filtr.</div>';
  const rows = items.map((item) => {
    if (type === 'board') {
      return `<tr><td><span class="table-title">${escapeHtml(item.title)}</span><span class="table-subtitle">${escapeHtml(item.fileName || 'Soubor zatím není přiložen')}</span></td><td>${escapeHtml(item.documentType)}</td><td>${formatDate(item.publishedOn)}</td><td>${formatDate(item.removeOn)}${item.status === 'published' && daysUntil(item.removeOn) <= 3 && daysUntil(item.removeOn) >= 0 ? `<span class="table-subtitle" style="color:#a47742">Sejmout ${relativeDate(item.removeOn)}</span>` : ''}</td><td>${statusPill(item.status)}</td><td>${itemActionButtons(type, item)}</td></tr>`;
    }
    if (type === 'pages') {
      return `<tr><td><span class="table-title">${escapeHtml(item.title)}</span><span class="table-subtitle">${escapeHtml(item.summary)}</span></td><td>/${escapeHtml(item.slug)}</td><td>${formatDate(item.date)}</td><td>${statusPill(item.status)}</td><td>${itemActionButtons(type, item)}</td></tr>`;
    }
    if (type === 'gallery') {
      return `<tr><td><span class="table-title">${escapeHtml(item.title)}</span><span class="table-subtitle">${escapeHtml(item.summary)}</span></td><td>${item.photos} fotografií</td><td>${formatDate(item.date)}</td><td>${statusPill(item.status)}</td><td>${itemActionButtons(type, item)}</td></tr>`;
    }
    const date = type === 'events' ? `${formatDate(item.date)} · ${escapeHtml(item.time)}` : formatDate(item.date);
    const detail = type === 'events' ? item.place : item.summary;
    return `<tr><td><span class="table-title">${escapeHtml(item.title)}</span><span class="table-subtitle">${escapeHtml(detail)}</span></td><td>${escapeHtml(item.category)}</td><td>${date}</td><td>${statusPill(item.status)}</td><td>${itemActionButtons(type, item)}</td></tr>`;
  }).join('');
  return `<div class="table-wrap"><table class="content-table">${tableHeader(type)}<tbody>${rows}</tbody></table></div>`;
}

function renderEventRows(items) {
  if (!items.length) return '<div class="empty-state">Žádnou událost jsme nenašli.</div>';
  return `<div class="event-list">${items.map((item) => {
    const [year, month, day] = item.date.split('-').map(Number);
    const monthName = new Intl.DateTimeFormat('cs-CZ', { month: 'short' }).format(new Date(year, month - 1, day));
    return `<article class="event-row"><div class="event-date-box"><strong>${day}</strong><small>${monthName}</small></div><div class="event-info"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.time)} · ${escapeHtml(item.place)}</small></div><span class="event-category">${escapeHtml(item.category)}</span>${statusPill(item.status)}${itemActionButtons('events', item)}</article>`;
  }).join('')}</div>`;
}

function listingView(type) {
  const descriptions = {
    news: 'Přidávejte a upravujte zprávy pro občany.',
    events: 'Spravujte termíny a události v obecním kalendáři.',
    board: 'Dokumenty, termíny vyvěšení a archiv úřední desky.',
    gallery: 'Alba a fotografie z dění v obci.',
    pages: 'Základní informační stránky veřejného webu.',
  };
  const actionLabels = { news: 'Přidat aktualitu', events: 'Přidat událost', board: 'Vložit dokument', gallery: 'Přidat galerii', pages: 'Přidat stránku' };
  const filterPlaceholder = type === 'board' ? 'Hledat dokument…' : type === 'events' ? 'Hledat událost…' : type === 'gallery' ? 'Hledat galerii…' : type === 'pages' ? 'Hledat stránku…' : 'Hledat aktualitu…';
  return `
    ${pageHeading(type === 'board' ? 'DOKUMENTY OBCE' : 'SPRÁVA OBSAHU', viewLabels[type], descriptions[type], actionButton(actionLabels[type], type, !canManage(type)))}
    <div class="filter-bar">
      <label class="search-field"><span aria-hidden="true">⌕</span><input id="list-search" type="search" placeholder="${filterPlaceholder}" aria-label="${filterPlaceholder}"></label>
      <select id="status-filter" aria-label="Filtrovat podle stavu"><option value="">Všechny stavy</option><option value="draft">Rozepsáno</option><option value="scheduled">Naplánováno</option><option value="published">Zveřejněno</option><option value="archived">Archivováno</option></select>
      ${type === 'events' ? '<select id="category-filter" aria-label="Filtrovat podle kategorie"><option value="">Všechny kategorie</option><option>Společenské</option><option>Obec</option><option>Kultura</option><option>Sport</option></select>' : ''}
    </div>
    <div id="list-output"></div>
    <div class="list-caption"><span>Ukázková data — v produkčním CMS budou uložena bezpečně na serveru.</span><span id="list-count"></span></div>`;
}

function settingsView() {
  return `
    ${pageHeading('NASTAVENÍ', 'Kontakty a nastavení', 'Spravujte údaje na veřejném webu a přehled přístupových rolí.', '<button type="button" class="button button-secondary" data-action="settings-save">Uložit ukázkové změny</button>')}
    <section class="panel" style="margin-bottom:15px">
      <div class="panel-header"><div><h2>Kontakty obecního úřadu</h2><p>Hodnoty jsou záměrně ponechány jako zástupné údaje.</p></div></div>
      <div class="panel-body">
        <form class="settings-form" id="settings-form">
          <div class="field"><label for="contact-name">Název úřadu</label><input id="contact-name" name="name" value="${escapeHtml(settings.name)}"></div>
          <div class="field"><label for="contact-address">Adresa</label><input id="contact-address" name="address" value="${escapeHtml(settings.address)}" placeholder="Doplní obecní úřad"></div>
          <div class="field"><label for="contact-phone">Telefon</label><input id="contact-phone" name="phone" value="${escapeHtml(settings.phone)}" placeholder="Doplní obecní úřad"></div>
          <div class="field"><label for="contact-email">E-mail</label><input id="contact-email" name="email" value="${escapeHtml(settings.email)}" placeholder="Doplní obecní úřad"></div>
          <div class="field field-full"><label for="contact-hours">Úřední hodiny</label><textarea id="contact-hours" name="hours" placeholder="Doplní obecní úřad">${escapeHtml(settings.hours)}</textarea></div>
          <div class="form-actions"><span class="help-text">Změny jsou pouze ukázkové a po obnovení stránky se smažou.</span></div>
        </form>
      </div>
    </section>
    <section class="panel">
      <div class="panel-header"><div><h2>Přístupové role</h2><p>Ukázka rozdělení odpovědnosti pro redakční tým obce.</p></div></div>
      <div class="panel-body"><div class="role-summary">
        <article class="role-card"><h3>Správce webu</h3><p>Správa systému a všech sekcí.</p><ul><li>Uživatelé a nastavení</li><li>Aktuality, události a stránky</li><li>Úřední deska a fotogalerie</li></ul></article>
        <article class="role-card"><h3>Redaktor</h3><p>Příprava běžného obsahu webu.</p><ul><li>Aktuality a události</li><li>Fotogalerie a stránky</li><li class="restricted">Bez zveřejňování úředních dokumentů</li></ul></article>
        <article class="role-card"><h3>Správce úřední desky</h3><p>Odpovědnost za dokumenty a archiv.</p><ul><li>Vyvěšení a sejmutí dokumentů</li><li>Archivace a termíny</li><li class="restricted">Bez úprav ostatního obsahu</li></ul></article>
      </div><p class="help-text">Skutečná aplikace musí oprávnění vynucovat na serveru. Přepínač role zde slouží pouze k ukázce rozhraní.</p></div>
    </section>`;
}

function refreshList() {
  const type = currentView;
  const search = (document.querySelector('#list-search')?.value || '').trim().toLocaleLowerCase('cs');
  const status = document.querySelector('#status-filter')?.value || '';
  const category = document.querySelector('#category-filter')?.value || '';
  const source = content[type] || [];
  const filtered = source.filter((item) => {
    const haystack = [item.title, item.summary, item.category, item.documentType, item.place, item.slug, item.fileName].join(' ').toLocaleLowerCase('cs');
    return (!search || haystack.includes(search))
      && (!status || item.status === status)
      && (!category || item.category === category);
  });

  const output = document.querySelector('#list-output');
  if (output) output.innerHTML = type === 'events' ? renderEventRows(filtered) : renderTableRows(type, filtered);
  const count = document.querySelector('#list-count');
  if (count) count.textContent = `${filtered.length} z ${source.length} záznamů`;
}

function renderView() {
  document.querySelector('#news-count').textContent = String(content.news.filter((item) => item.status !== 'archived').length);
  document.querySelector('#board-count').textContent = String(content.board.filter((item) => item.status === 'published').length);
  if (currentView === 'dashboard') {
    viewRoot.innerHTML = dashboardView();
  } else if (currentView === 'settings') {
    viewRoot.innerHTML = settingsView();
    if (!canManage('settings')) {
      viewRoot.querySelectorAll('#settings-form input, #settings-form textarea').forEach((input) => {
        input.disabled = true;
      });
      viewRoot.querySelector('[data-action="settings-save"]').disabled = true;
    }
  } else {
    viewRoot.innerHTML = listingView(currentView);
    refreshList();
  }
}

function field(name, label, value = '', options = {}) {
  const id = `field-${name}`;
  const required = options.required !== false;
  const full = options.full ? ' field-full' : '';
  const labelText = `${escapeHtml(label)}${options.optional ? ' <span class="optional">(nepovinné)</span>' : ''}`;
  if (options.select) {
    const optionHtml = options.select.map((option) => {
      const optionValue = typeof option === 'string' ? option : option.value;
      const optionLabel = typeof option === 'string' ? option : option.label;
      return `<option value="${escapeHtml(optionValue)}"${String(value) === String(optionValue) ? ' selected' : ''}>${escapeHtml(optionLabel)}</option>`;
    }).join('');
    return `<div class="field${full}"><label for="${id}">${labelText}</label><select id="${id}" name="${name}"${required ? ' required' : ''}>${optionHtml}</select></div>`;
  }
  if (options.textarea) {
    return `<div class="field${full}"><label for="${id}">${labelText}</label><textarea id="${id}" name="${name}" placeholder="${escapeHtml(options.placeholder || '')}"${required ? ' required' : ''}>${escapeHtml(value)}</textarea></div>`;
  }
  if (options.file) {
    return `<div class="field${full}"><label for="${id}">${labelText}</label><label class="file-drop" for="${id}"><input id="${id}" name="${name}Upload" type="file" accept="${escapeHtml(options.accept || '*/*')}"${options.multiple ? ' multiple' : ''}><input type="hidden" name="${name}" value="${escapeHtml(value)}"><strong id="file-name">${escapeHtml(value || 'Vyberte soubor nebo fotografie')}</strong><small>${escapeHtml(options.help || 'Ukázka — soubor se neodesílá ani neukládá')}</small></label></div>`;
  }
  return `<div class="field${full}"><label for="${id}">${labelText}</label><input id="${id}" name="${name}" type="${options.type || 'text'}" value="${escapeHtml(value)}" placeholder="${escapeHtml(options.placeholder || '')}"${required ? ' required' : ''}></div>`;
}

function editorFields(type, item = {}, values = {}) {
  const data = { ...item, ...values };
  if (type === 'news') {
    return `<div class="form-grid">
      ${field('title', 'Titulek', data.title || '')}
      ${field('category', 'Rubrika', data.category || 'Informace z obce', { select: ['Informace z obce', 'Pozvánka', 'Obec', 'Život v obci'] })}
      ${field('summary', 'Krátký úvod', data.summary || '', { full: true, textarea: true, placeholder: 'Stručně představte obsah aktuality…' })}
      ${field('body', 'Text aktuality', data.body || '', { full: true, textarea: true, placeholder: 'Napište obsah aktuality…' })}
      ${field('date', 'Datum zveřejnění', data.date || localDateOffset(0), { type: 'date' })}
      ${field('status', 'Stav', data.status || 'draft', { select: statusOptions() })}
      ${field('fileName', 'Titulní fotografie', data.fileName || '', { file: true, accept: 'image/*', optional: true, help: 'Obrázek je pouze ukázkový — soubor se neukládá' })}
    </div>`;
  }
  if (type === 'events') {
    return `<div class="form-grid">
      ${field('title', 'Název události', data.title || '')}
      ${field('category', 'Kategorie', data.category || 'Obec', { select: ['Obec', 'Společenské', 'Kultura', 'Sport', 'Děti'] })}
      ${field('date', 'Datum', data.date || localDateOffset(7), { type: 'date' })}
      ${field('time', 'Čas', data.time || '17:00', { type: 'time' })}
      ${field('place', 'Místo konání', data.place || '', { full: true, placeholder: 'Například místo v obci' })}
      ${field('body', 'Popis události', data.body || '', { full: true, textarea: true, placeholder: 'Doplňte podrobnosti události…' })}
      ${field('status', 'Stav', data.status || 'draft', { select: statusOptions() })}
    </div>`;
  }
  if (type === 'board') {
    return `<div class="form-grid">
      ${field('title', 'Název dokumentu', data.title || '', { full: true })}
      ${field('documentType', 'Typ dokumentu', data.documentType || 'Oznámení', { select: ['Oznámení', 'Veřejná vyhláška', 'Záměr obce', 'Rozpočet', 'Ostatní dokument'] })}
      ${field('status', 'Stav', data.status || 'draft', { select: statusOptions() })}
      ${field('publishedOn', 'Datum vyvěšení', data.publishedOn || localDateOffset(0), { type: 'date' })}
      ${field('removeOn', 'Datum sejmutí', data.removeOn || localDateOffset(15), { type: 'date' })}
      ${field('fileName', 'Dokument (PDF)', data.fileName || '', { file: true, accept: '.pdf,application/pdf', full: true, help: 'PDF je pouze ukázkové — soubor se neukládá' })}
      <p class="help-text field-full">Před zveřejněním skutečné úřední desky je nutné ověřit správné lhůty, archivaci a odpovědnosti.</p>
    </div>`;
  }
  if (type === 'gallery') {
    return `<div class="form-grid">
      ${field('title', 'Název galerie', data.title || '')}
      ${field('date', 'Datum galerie', data.date || localDateOffset(0), { type: 'date' })}
      ${field('summary', 'Popis', data.summary || '', { full: true, textarea: true, required: false, placeholder: 'Krátký popis alba…' })}
      ${field('fileName', 'Fotografie', data.fileName || '', { file: true, accept: 'image/*', multiple: true, full: true })}
      ${field('status', 'Stav', data.status || 'draft', { select: statusOptions() })}
    </div>`;
  }
  return `<div class="form-grid">
    ${field('title', 'Název stránky', data.title || '')}
    ${field('slug', 'Adresa stránky', data.slug || '', { placeholder: 'např. informace-o-obci' })}
    ${field('summary', 'Krátký úvod', data.summary || '', { full: true, textarea: true, required: false })}
    ${field('body', 'Obsah stránky', data.body || '', { full: true, textarea: true })}
    ${field('status', 'Stav', data.status || 'draft', { select: statusOptions() })}
  </div>`;
}

function statusOptions() {
  return [
    { value: 'draft', label: 'Rozepsáno' },
    { value: 'scheduled', label: 'Naplánováno' },
    { value: 'published', label: 'Zveřejněno' },
    { value: 'archived', label: 'Archivováno' },
  ];
}

function openEditor(type, id = null, values = null) {
  if (!canManage(type)) {
    showToast(`Role „${roleLabels[currentRole]}“ nemá oprávnění upravovat: ${typeLabels[type]}.`);
    return;
  }
  const item = id ? content[type].find((entry) => entry.id === id) : null;
  if (id && !item) return;
  editing = { type, id };
  previewTarget = { type, id };
  draftValues = values || {};
  returnFocus = document.activeElement;
  modalEyebrow.textContent = `${typeLabels[type].toLocaleUpperCase('cs-CZ')} · ${id ? 'ÚPRAVA' : 'NOVÝ ZÁZNAM'}`;
  modalTitle.textContent = `${id ? 'Upravit' : 'Přidat'} ${typeLabels[type].toLocaleLowerCase('cs-CZ')}`;
  modalBody.innerHTML = `<form id="content-form">${editorFields(type, item || {}, values || {})}</form>`;
  modalFooter.innerHTML = `<button type="button" class="button button-quiet" data-modal-action="preview">Náhled</button><div><button type="button" class="button button-secondary" data-modal-action="cancel">Zrušit</button><button type="submit" form="content-form" class="button">Uložit změny</button></div>`;
  modalBackdrop.hidden = false;
  document.body.classList.add('modal-open');
  modalBody.querySelector('input, select, textarea')?.focus();
}

function openChooser() {
  returnFocus = document.activeElement;
  editing = null;
  previewTarget = null;
  draftValues = {};
  modalEyebrow.textContent = 'SPRÁVA OBSAHU';
  modalTitle.textContent = 'Co chcete vytvořit?';
  const types = ['news', 'events', 'board', 'gallery', 'pages'];
  modalBody.innerHTML = `<div class="quick-actions">${types.map((type) => `<button type="button" class="quick-action" data-choose-type="${type}"${canManage(type) ? '' : ' disabled'}><span class="quick-action-icon">${type === 'news' ? '▤' : type === 'events' ? '▦' : type === 'board' ? '▧' : type === 'gallery' ? '▣' : '▥'}</span><span><strong>${typeLabels[type]}</strong><small>${viewLabels[type]}</small></span></button>`).join('')}</div>`;
  modalFooter.innerHTML = '<div></div><button type="button" class="button button-secondary" data-modal-action="cancel">Zavřít</button>';
  modalBackdrop.hidden = false;
  document.body.classList.add('modal-open');
  modalBody.querySelector('button:not(:disabled)')?.focus();
}

function openPreview(type, item, values = null) {
  if (!item && !values) return;
  const data = { ...item, ...values };
  const isEditorPreview = values !== null && editing !== null;
  previewTarget = { type, id: item?.id || editing?.id || null };
  draftValues = values || {};
  const summary = data.summary || data.body || data.place || 'Ukázkový obsah bez dalšího popisu.';
  const meta = type === 'board'
    ? `${escapeHtml(data.documentType || 'Dokument')} · vyvěšeno ${formatDate(data.publishedOn)}`
    : type === 'events'
      ? `${formatDate(data.date)}${data.time ? ` · ${escapeHtml(data.time)}` : ''}${data.place ? ` · ${escapeHtml(data.place)}` : ''}`
      : `${escapeHtml(data.category || typeLabels[type])} · ${formatDate(data.date)}`;
  modalEyebrow.textContent = 'NÁHLED OBSAHU';
  modalTitle.textContent = data.title || typeLabels[type];
  modalBody.innerHTML = `<article class="preview-card"><p class="preview-meta">${meta}</p><h3>${escapeHtml(data.title || 'Název doplníme')}</h3><p>${escapeHtml(summary)}</p>${type === 'board' ? `<p class="preview-meta">Sejmout: ${formatDate(data.removeOn)} · ${escapeHtml(data.fileName || 'Soubor zatím není přiložen')}</p>` : ''}<p class="preview-meta">Ukázkový náhled — nezobrazuje skutečný obsah webu.</p></article>`;
  if (isEditorPreview) {
    modalFooter.innerHTML = `<button type="button" class="button button-quiet" data-modal-action="back-edit">← Zpět k úpravám</button><div><button type="button" class="button button-secondary" data-modal-action="cancel">Zavřít náhled</button></div>`;
  } else {
    modalFooter.innerHTML = `<span></span><div>${previewTarget.id && canManage(type) ? '<button type="button" class="button button-secondary" data-modal-action="edit-preview">Upravit</button>' : ''}<button type="button" class="button button-secondary" data-modal-action="cancel">Zavřít náhled</button></div>`;
  }
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.body.classList.remove('modal-open');
  editing = null;
  if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
}

function readFormValues(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  Object.keys(values).filter((key) => key.endsWith('Upload')).forEach((key) => delete values[key]);
  return values;
}

function saveEditor(form) {
  const values = readFormValues(form);
  const type = editing.type;
  const existing = editing.id ? content[type].find((item) => item.id === editing.id) : null;
  const item = { ...(existing || {}), ...values };
  item.id = existing ? existing.id : `${type}-${Date.now()}`;
  item.status = values.status || 'draft';
  if (type === 'gallery') item.photos = existing?.photos || (values.fileName ? 1 : 0);
  if (type === 'events' && !item.category) item.category = 'Obec';
  if (type === 'news' && !item.category) item.category = 'Informace z obce';
  if (type === 'board' && !item.documentType) item.documentType = 'Oznámení';

  if (existing) {
    Object.assign(existing, item);
  } else {
    content[type].unshift(item);
  }

  const title = item.title;
  closeModal();
  renderView();
  showToast(`Ukázkový záznam „${title}“ byl upraven. Změna se po obnovení stránky smaže.`);
}

function updateStatus(type, id) {
  if (!canManage(type)) {
    showToast(`Role „${roleLabels[currentRole]}“ nemá oprávnění měnit tuto položku.`);
    return;
  }
  const item = content[type].find((entry) => entry.id === id);
  if (!item) return;
  if (item.status === 'published') item.status = 'archived';
  else item.status = 'published';
  renderView();
  showToast(`Ukázkový stav položky „${item.title}“: ${statusLabels[item.status]}.`);
}

function saveSettings() {
  const form = document.querySelector('#settings-form');
  if (!form) return;
  if (!canManage('settings')) {
    showToast(`Role „${roleLabels[currentRole]}“ nemá oprávnění upravovat nastavení.`);
    return;
  }
  Object.assign(settings, Object.fromEntries(new FormData(form).entries()));
  showToast('Ukázkové nastavení bylo změněno. Po obnovení stránky se smaže.');
}

document.querySelectorAll('.nav-item').forEach((button) => {
  button.addEventListener('click', () => setView(button.dataset.view));
});

mobileMenu.addEventListener('click', () => {
  const open = !sidebar.classList.contains('is-open');
  sidebar.classList.toggle('is-open', open);
  sidebarScrim.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-expanded', String(open));
});

sidebarScrim.addEventListener('click', () => {
  sidebar.classList.remove('is-open');
  sidebarScrim.classList.remove('is-open');
  mobileMenu.setAttribute('aria-expanded', 'false');
});

roleSwitch.addEventListener('change', () => {
  currentRole = roleSwitch.value;
  document.querySelector('#profile-button').setAttribute('aria-label', `Ukázkový profil — ${roleLabels[currentRole]}`);
  renderView();
  showToast(`Zobrazeno jako: ${roleLabels[currentRole]}. Oprávnění jsou pouze ukázková.`);
});

document.querySelector('#profile-button').addEventListener('click', () => {
  showToast(`Ukázkový účet · role ${roleLabels[currentRole]}. Přihlášení není v prototypu zapojeno.`);
});

document.querySelector('#top-create').addEventListener('click', openChooser);

document.querySelector('#dismiss-notice').addEventListener('click', () => {
  document.querySelector('.prototype-notice').remove();
});

document.querySelector('#modal-close').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalBackdrop.hidden) closeModal();
  if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
    sidebar.classList.remove('is-open');
    sidebarScrim.classList.remove('is-open');
    mobileMenu.setAttribute('aria-expanded', 'false');
  }
});

viewRoot.addEventListener('input', (event) => {
  if (event.target.matches('#list-search')) refreshList();
});
viewRoot.addEventListener('change', (event) => {
  if (event.target.matches('#status-filter, #category-filter')) refreshList();
});

viewRoot.addEventListener('click', (event) => {
  const newButton = event.target.closest('[data-new]');
  if (newButton) {
    if (newButton.dataset.new === 'choose') openChooser();
    else openEditor(newButton.dataset.new);
    return;
  }
  const goButton = event.target.closest('[data-go]');
  if (goButton) {
    setView(goButton.dataset.go);
    return;
  }
  const action = event.target.closest('[data-action]');
  if (action) {
    const { action: actionName, type, id } = action.dataset;
    if (actionName === 'edit') openEditor(type, id);
    if (actionName === 'preview') {
      const item = content[type].find((entry) => entry.id === id);
      openPreview(type, item);
      returnFocus = action;
    }
    if (actionName === 'status') updateStatus(type, id);
    if (actionName === 'settings-save') saveSettings();
    return;
  }
});

modalBody.addEventListener('change', (event) => {
  if (event.target.matches('input[type="file"]')) {
    const nameLabel = modalBody.querySelector('#file-name');
    if (nameLabel) {
      const files = Array.from(event.target.files || []);
      nameLabel.textContent = files.length ? files.map((file) => file.name).join(', ') : 'Vyberte soubor nebo fotografie';
      const nameInput = modalBody.querySelector('[name="fileName"]');
      if (nameInput) nameInput.value = files.map((file) => file.name).join(', ');
    }
  }
});

modalFooter.addEventListener('click', (event) => {
  const button = event.target.closest('[data-modal-action]');
  if (!button) return;
  if (button.dataset.modalAction === 'cancel') closeModal();
  if (button.dataset.modalAction === 'preview') {
    const form = modalBody.querySelector('#content-form');
    if (!form.reportValidity()) return;
    const values = readFormValues(form);
    const { type, id } = editing;
    openPreview(type, id ? content[type].find((item) => item.id === id) : null, values);
  }
  if (button.dataset.modalAction === 'back-edit' && editing) {
    const { type, id } = editing;
    openEditor(type, id, draftValues);
  }
  if (button.dataset.modalAction === 'edit-preview' && previewTarget?.id) {
    const { type, id } = previewTarget;
    closeModal();
    openEditor(type, id);
  }
});

modalBody.addEventListener('submit', (event) => {
  if (event.target.matches('#content-form')) {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    saveEditor(event.target);
  }
});

modalBody.addEventListener('input', (event) => {
  if (event.target.closest('#content-form')) {
    const form = modalBody.querySelector('#content-form');
    if (form) draftValues = readFormValues(form);
  }
});

document.addEventListener('click', (event) => {
  const chooser = event.target.closest('[data-choose-type]');
  if (chooser) {
    const type = chooser.dataset.chooseType;
    closeModal();
    openEditor(type);
  }
});

viewRoot.addEventListener('submit', (event) => {
  if (event.target.matches('#settings-form')) {
    event.preventDefault();
    saveSettings();
  }
});

renderView();
