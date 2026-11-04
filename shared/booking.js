/* Reserva de primera sesión — compartida por todas las direcciones.

   Cómo se usa en la página:
     <button data-book>Pide tu primera sesión</button>
     <button data-book data-book-mode="presencial">…</button>        (elige la modalidad)
     <button data-book data-service="pareja">…</button>              (reserva con el servicio ya elegido)
     <button data-info="pareja">En qué consiste</button>             (explica la terapia y, debajo, deja reservar)

   Las claves de servicio (individual, pareja, familiar, infantojuvenil, neuroevaluacion), sus textos
   y los mensajes de WhatsApp están en shared/services.js; se cargan antes que este archivo.

   Qué hay que cambiar cuando exista la cuenta real (todo en window.CLAUDIA, antes de cargar este archivo):
     whatsapp  número con prefijo de país, sin + ni espacios  →  '34612345678'
     calLink   'tu-usuario/primera-sesion' de Cal.com         →  activa el calendario real

   Mientras calLink esté vacío se muestra un calendario de ejemplo (los huecos no son reales).

   Idiomas: los textos de la ventana están en ES (justo debajo) y, con shared/i18n.js cargado, se registran como
   CLAUDIA_I18N.add('es', { bk }); ca y en se traducen con las mismas claves. Con i18n.js la ventana (también abierta),
   el calendario y el enlace de WhatsApp se repintan al cambiar de idioma y las fechas salen de Intl con CLAUDIA_I18N.locale.
   Sin i18n.js (propuestas A–E) se usa ES y los nombres de días y meses de ES_CAL. */
(() => {
  const CFG = Object.assign(
    { whatsapp: '34600000000', calLink: '', calOrigin: 'https://app.cal.com' },
    window.CLAUDIA || {}
  );
  const ES = {
    bk: {
      close: 'Cerrar',
      title: 'Pide tu primera sesión',
      what: 'De qué se trata',
      how: 'Cómo son las sesiones',
      mode: 'Modalidad',
      online: 'Online',
      presencial: 'Presencial',
      modeOnline: 'online',
      modePresencial: 'presencial',
      ask: 'Elige cómo quieres hacerla y cómo prefieres pedir cita.',
      leadService: '{name}. {ask}',
      wa: { title: 'Pedir cita por WhatsApp', note: 'Se abre WhatsApp con el mensaje escrito. Puedes cambiarlo antes de enviarlo.' },
      cal: { title: 'Elegir día y hora', note: 'Mis huecos de las próximas semanas.' },
      prev: 'Semana anterior',
      next: 'Semana siguiente',
      day: 'Día',
      hour: 'Hora',
      hint: 'Este hueco ya va incluido en el mensaje de WhatsApp.',
      confirm: 'Confirmar este hueco',
      example: 'Vista de ejemplo: aquí aparecerá tu calendario real de Cal.com, conectado a tu Google Calendar.',
      /* weekday: «jueves», day: 12, month: «noviembre»; también dm: «12 de noviembre» (con i18n.js; el catalán lo usa por «d’octubre») */
      dayLong: '{weekday} {day} de {month}',
      /* a, b: días del mes; m, m1, m2: meses abreviados */
      weekOne: 'Semana del {a} al {b} {m}',
      weekTwo: 'Semana del {a} {m1} al {b} {m2}',
      /* day: «jueves 12 de noviembre», slot: «17:30», mode: «online» o «presencial» */
      chosen: 'Hueco elegido: {day} · {slot} · {mode}. Es un ejemplo: en la web real se confirmaría aquí y te llegaría un correo.',
      /* Nota que recibe Cal.com; service: « · Terapia de pareja» o nada */
      calNote: 'Modalidad: {mode}{service}',
    },
  };
  /* Nombres de días y meses para cuando no hay i18n.js; con él salen de Intl */
  const ES_CAL = {
    days: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    daysLong: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    months: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    monthsLong: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  };
  const I18N = window.CLAUDIA_I18N;
  if (I18N) {
    I18N.add('es', ES);
    I18N.add('ca', {
      bk: {
        close: 'Tancar',
        title: 'Demana la teva primera sessió',
        what: 'De què es tracta',
        how: 'Com són les sessions',
        mode: 'Modalitat',
        online: 'En línia',
        presencial: 'Presencial',
        modeOnline: 'en línia',
        modePresencial: 'presencial',
        ask: 'Tria com la vols fer i com prefereixes demanar cita.',
        leadService: '{name}. {ask}',
        wa: { title: 'Demanar cita per WhatsApp', note: 'S’obre el WhatsApp amb el missatge ja escrit. El pots canviar abans d’enviar-lo.' },
        cal: { title: 'Triar dia i hora', note: 'Les meves hores lliures de les properes setmanes.' },
        prev: 'Setmana anterior',
        next: 'Setmana següent',
        day: 'Dia',
        hour: 'Hora',
        hint: 'Aquesta hora ja surt al missatge de WhatsApp.',
        confirm: 'Confirmar aquesta hora',
        example: 'Vista d’exemple: aquí sortirà el teu calendari real de Cal.com, connectat al teu Google Calendar.',
        /* weekday: «dijous»; dm: «12 de novembre», «1 d’octubre» (Intl ya pone «de» o «d’») */
        dayLong: '{weekday} {dm}',
        /* sin preposición ante el mes abreviado, como en el español: «Setmana del 9 al 13 nov.» */
        weekOne: 'Setmana del {a} al {b} {m}',
        weekTwo: 'Setmana del {a} {m1} al {b} {m2}',
        chosen: 'Hora triada: {day} · {slot} · {mode}. És un exemple: a la web real es confirmaria aquí i t’arribaria un correu.',
        calNote: 'Modalitat: {mode}{service}',
      },
    });
    I18N.add('en', {
      bk: {
        close: 'Close',
        title: 'Ask for your first session',
        what: 'What it’s about',
        how: 'What sessions are like',
        mode: 'Online or in person',
        online: 'Online',
        presencial: 'In person',
        modeOnline: 'online',
        modePresencial: 'in person',
        ask: 'Choose how you’d like to meet and how you’d prefer to ask for an appointment.',
        leadService: '{name}. {ask}',
        wa: { title: 'Ask for an appointment on WhatsApp', note: 'WhatsApp opens with the message already written. You can change it before you send it.' },
        cal: { title: 'Choose a day and time', note: 'When I’m free over the next few weeks.' },
        prev: 'Previous week',
        next: 'Next week',
        day: 'Day',
        hour: 'Time',
        hint: 'This time is already in the WhatsApp message.',
        confirm: 'Confirm this time',
        example: 'Example view: your real Cal.com calendar will appear here, linked to your Google Calendar.',
        /* «Thursday 5 November» */
        dayLong: '{weekday} {day} {month}',
        /* «9–13 Nov», «30 Nov – 4 Dec» */
        weekOne: '{a}–{b} {m}',
        weekTwo: '{a} {m1} – {b} {m2}',
        chosen: 'Your time: {day} · {slot} · {mode}. This is only an example: on the real site you would confirm it here and get an email.',
        calNote: 'Format: {mode}{service}',
      },
    });
  }
  /* Texto en el idioma actual; sin i18n.js, el español de ES */
  const T = (key, vars) => {
    if (window.CLAUDIA_I18N) return window.CLAUDIA_I18N.t('bk.' + key, vars);
    const v = key.split('.').reduce((o, k) => o[k], ES.bk);
    return vars ? v.replace(/\{(\w+)\}/g, (m, n) => (n in vars ? vars[n] : m)) : v;
  };
  /* Nombres de fecha: Intl con el idioma de la web, o las listas de ES_CAL */
  const fmt = (d, opt, list, idx) => (window.CLAUDIA_I18N ? new Intl.DateTimeFormat(window.CLAUDIA_I18N.locale, opt).format(d) : ES_CAL[list][idx]);
  const dayShort = (d) => fmt(d, { weekday: 'short' }, 'days', d.getDay());
  const monthShort = (d) => fmt(d, { month: 'short' }, 'months', d.getMonth());

  const SERV = window.CLAUDIA_SERVICES || {};
  const MSG_DEFAULT = {
    generic: 'Hola Claudia, me gustaría reservar una primera sesión.',
    online: 'Prefiero que sea online.',
    presencial: 'Prefiero que sea presencial.',
    slot: (d, h) => `Me vendría bien el ${d} a las ${h}.`,
  };
  /* Si services.js no está, valen estos mensajes de reserva; si está, manda él (y cambia con el idioma) */
  const MSG = new Proxy({}, { get: (_, k) => { const m = window.CLAUDIA_MESSAGES || {}; return k in m ? m[k] : MSG_DEFAULT[k]; } });

  const SLOTS = ['10:00', '11:30', '16:00', '17:30', '19:00'];
  const WORKDAYS = 25; // cinco semanas laborables a la vista
  const state = { mode: 'online', service: '', info: false, week: 0, day: null, slot: null };

  const dlg = document.createElement('dialog');
  dlg.className = 'bk';
  dlg.setAttribute('aria-labelledby', 'bk-title');
  /* Los textos se rellenan en labels() */
  dlg.innerHTML = `
    <button class="bk__x" type="button">×</button>
    <div class="bk__body">
      <h2 id="bk-title"></h2>
      <div class="bk__info" id="bk-info" hidden>
        <h3></h3>
        <p id="bk-que"></p>
        <h3></h3>
        <p id="bk-como"></p>
      </div>
      <h3 class="bk__h" id="bk-h" hidden></h3>
      <p class="bk__lead" id="bk-lead"></p>
      <p class="bk__first" id="bk-first"></p>
      <fieldset class="bk__seg">
        <legend style="position:absolute;left:-9999px"></legend>
        <label><input type="radio" name="bk-mode" value="online" checked><span></span></label>
        <label><input type="radio" name="bk-mode" value="presencial"><span></span></label>
      </fieldset>
      <div class="bk__opts">
        <a class="bk__opt bk__opt--wa" id="bk-wa" target="_blank" rel="noopener">
          <strong></strong>
          <span></span>
        </a>
        <button class="bk__opt" id="bk-cal" type="button" aria-expanded="false">
          <strong></strong>
          <span></span>
        </button>
      </div>
      <p class="bk__fine" id="bk-fine"></p>
      <div class="bk__cal" id="bk-calbox" hidden>
        <div class="bk__weeknav">
          <button class="bk__wk" id="bk-prev" type="button">‹</button>
          <span id="bk-wklabel" aria-live="polite"></span>
          <button class="bk__wk" id="bk-next" type="button">›</button>
        </div>
        <div class="bk__days" id="bk-days" role="group"></div>
        <div class="bk__slots" id="bk-slots" role="group"></div>
        <p class="bk__hint" id="bk-hint" hidden></p>
        <button class="bk__confirm" id="bk-confirm" type="button" hidden></button>
        <div class="bk__done" id="bk-done" role="status" hidden></div>
        <p class="bk__note"></p>
      </div>
    </div>`;
  document.body.appendChild(dlg);

  const $ = (id) => dlg.querySelector('#' + id);
  const modeLabel = () => T(state.mode === 'online' ? 'modeOnline' : 'modePresencial');
  const txt = (sel, key) => { dlg.querySelector(sel).textContent = T(key); };
  const aria = (sel, key) => { dlg.querySelector(sel).setAttribute('aria-label', T(key)); };

  /* Textos fijos de la ventana; se vuelven a poner al cambiar de idioma */
  function labels() {
    aria('.bk__x', 'close');
    const h3 = dlg.querySelectorAll('.bk__info h3');
    h3[0].textContent = T('what'); h3[1].textContent = T('how');
    txt('#bk-h', 'title');
    txt('legend', 'mode');
    const seg = dlg.querySelectorAll('.bk__seg span');
    seg[0].textContent = T('online'); seg[1].textContent = T('presencial');
    txt('#bk-wa strong', 'wa.title'); txt('#bk-wa span', 'wa.note');
    txt('#bk-cal strong', 'cal.title'); txt('#bk-cal span', 'cal.note');
    aria('#bk-prev', 'prev'); aria('#bk-next', 'next');
    aria('#bk-days', 'day'); aria('#bk-slots', 'hour');
    txt('#bk-hint', 'hint'); txt('#bk-confirm', 'confirm'); txt('.bk__note', 'example');
  }

  /* — servicio — */
  function resolveService(v) {
    if (!v) return '';
    if (SERV[v]) return v;
    const key = Object.keys(SERV).find((k) => SERV[k].name.toLowerCase() === v.toLowerCase());
    return key || '';
  }

  /* — calendario de ejemplo — */
  function nextWorkdays(n) {
    const out = [];
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    while (out.length < n) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() % 6 !== 0) out.push(new Date(d));
    }
    return out;
  }
  const days = nextWorkdays(WORKDAYS);
  const weekStart = (d) => { const m = new Date(d); m.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return m.getTime(); };
  const weeks = [];
  days.forEach((d, i) => {
    const k = weekStart(d);
    const last = weeks[weeks.length - 1];
    if (last && last.k === k) last.idx.push(i); else weeks.push({ k, idx: [i] });
  });
  const taken = (d, i) => (d.getDate() * 7 + i * 13) % 5 === 0;
  const dayLong = (d) => T('dayLong', {
    weekday: fmt(d, { weekday: 'long' }, 'daysLong', d.getDay()),
    day: d.getDate(),
    month: fmt(d, { month: 'long' }, 'monthsLong', d.getMonth()),
    /* día y mes juntos, con la preposición que pone Intl en cada idioma («1 d’octubre»); solo existe con i18n.js */
    dm: window.CLAUDIA_I18N ? new Intl.DateTimeFormat(window.CLAUDIA_I18N.locale, { day: 'numeric', month: 'long' }).format(d) : '',
  });
  function weekLabel(idx) {
    const a = days[idx[0]], b = days[idx[idx.length - 1]];
    return a.getMonth() === b.getMonth()
      ? T('weekOne', { a: a.getDate(), b: b.getDate(), m: monthShort(b) })
      : T('weekTwo', { a: a.getDate(), m1: monthShort(a), b: b.getDate(), m2: monthShort(b) });
  }

  /* — mensaje de WhatsApp — */
  function waHref() {
    const S = SERV[state.service];
    const parts = [S ? S.wa : MSG.generic, MSG[state.mode]];
    if (state.slot !== null) parts.push(MSG.slot(dayLong(days[state.day]), state.slot));
    return `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(parts.join(' '))}`;
  }

  function refresh() {
    const S = SERV[state.service];
    const showInfo = state.info && !!S;
    $('bk-title').textContent = showInfo ? S.name : T('title');
    $('bk-info').hidden = !showInfo;
    $('bk-h').hidden = !showInfo;
    if (showInfo) { $('bk-que').textContent = S.queEs; $('bk-como').textContent = S.como; }
    const ask = T('ask');
    $('bk-lead').textContent = !showInfo && S ? T('leadService', { name: S.name, ask }) : ask;
    $('bk-first').textContent = MSG.first || '';
    $('bk-fine').textContent = MSG.fine || '';
    $('bk-wa').href = waHref();
    $('bk-hint').hidden = state.slot === null;
  }

  function renderCal() {
    const idx = weeks[state.week].idx;
    $('bk-wklabel').textContent = weekLabel(idx);
    $('bk-prev').disabled = state.week === 0;
    $('bk-next').disabled = state.week === weeks.length - 1;
    $('bk-days').innerHTML = idx
      .map((i) => `<button class="bk__day" type="button" data-i="${i}" aria-pressed="${state.day === i}">${dayShort(days[i])}<small>${days[i].getDate()} ${monthShort(days[i])}</small></button>`)
      .join('');
    renderSlots();
  }
  function renderSlots() {
    if (state.day === null) { $('bk-slots').innerHTML = ''; return; }
    const d = days[state.day];
    $('bk-slots').innerHTML = SLOTS.map(
      (s, i) => `<button class="bk__slot" type="button" data-s="${s}" aria-pressed="${state.slot === s}" ${taken(d, i) ? 'disabled' : ''}>${s}</button>`
    ).join('');
  }
  function paintDone() {
    $('bk-done').textContent = T('chosen', { day: dayLong(days[state.day]), slot: state.slot, mode: modeLabel() });
  }
  function clearPick() {
    state.slot = null;
    $('bk-confirm').hidden = true;
    $('bk-done').hidden = true;
  }

  /* — Cal.com real (se activa cuando CLAUDIA.calLink tiene valor; sin probar hasta que exista la cuenta) — */
  function loadCal() {
    if (window.Cal) return;
    (function (C, A, L) {
      const p = function (a, ar) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal; const ar = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1]; api.q = api.q || [];
          if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, `${CFG.calOrigin}/embed/embed.js`, 'init');
    window.Cal('init', { origin: CFG.calOrigin });
  }

  /* — eventos — */
  dlg.addEventListener('change', (e) => {
    if (e.target.name === 'bk-mode') { state.mode = e.target.value; refresh(); }
  });
  $('bk-cal').addEventListener('click', () => {
    if (CFG.calLink) {
      loadCal();
      dlg.close();
      const S = SERV[state.service];
      window.Cal('modal', { calLink: CFG.calLink, config: { layout: 'month_view', notes: T('calNote', { mode: modeLabel(), service: S ? ' · ' + S.name : '' }) } });
      return;
    }
    const box = $('bk-calbox');
    const open = box.hidden;
    box.hidden = !open;
    $('bk-cal').setAttribute('aria-expanded', String(open));
    if (open && state.day === null) { state.day = weeks[state.week].idx[0]; renderCal(); }
  });
  function goWeek(step) {
    const w = state.week + step;
    if (w < 0 || w >= weeks.length) return;
    state.week = w; state.day = weeks[w].idx[0];
    clearPick(); renderCal(); refresh();
  }
  $('bk-prev').addEventListener('click', () => goWeek(-1));
  $('bk-next').addEventListener('click', () => goWeek(1));
  $('bk-days').addEventListener('click', (e) => {
    const b = e.target.closest('.bk__day'); if (!b) return;
    state.day = +b.dataset.i;
    clearPick(); renderCal(); refresh();
  });
  $('bk-slots').addEventListener('click', (e) => {
    const b = e.target.closest('.bk__slot'); if (!b || b.disabled) return;
    state.slot = b.dataset.s; $('bk-done').hidden = true;
    renderSlots(); refresh(); $('bk-confirm').hidden = false;
  });
  $('bk-confirm').addEventListener('click', () => {
    paintDone();
    $('bk-done').hidden = false; $('bk-confirm').hidden = true;
  });
  dlg.querySelector('.bk__x').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-book],[data-info]'); if (!t) return;
    e.preventDefault();
    if (t.dataset.bookMode) {
      state.mode = t.dataset.bookMode;
      dlg.querySelector(`input[value="${state.mode}"]`).checked = true;
    }
    state.service = resolveService(t.dataset.info || t.dataset.service || '');
    state.info = !!t.dataset.info;
    state.week = 0; state.day = null; clearPick();
    $('bk-calbox').hidden = true; $('bk-cal').setAttribute('aria-expanded', 'false');
    refresh();
    dlg.showModal();
    dlg.scrollTop = 0;
  });
  /* Con i18n.js: repinta la ventana (abierta o no), el calendario y el enlace de WhatsApp */
  function repaint() {
    labels();
    refresh();
    if (!$('bk-calbox').hidden) renderCal();
    if (!$('bk-done').hidden) paintDone();
  }
  labels();
  refresh();
  if (I18N) {
    I18N.onChange(repaint);
    /* por si otro archivo suma traducciones después de este */
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', repaint);
  }
})();
