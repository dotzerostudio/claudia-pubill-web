/* Idioma de la web: catalán (ca), español (es) e inglés (en).
   Se elige así: ?lang= en la dirección, luego lo que la persona eligió la última vez, luego el idioma del navegador, y si no, español.

   CLAUDIA_I18N.t('clave', {nombre: 'valor'})  texto en el idioma actual. Si falta, usa el español; si tampoco está, devuelve la clave.
                                              Admite rutas con puntos dentro de objetos: t('sx.faq.items') devuelve la lista entera.
   CLAUDIA_I18N.add('ca', {...})              suma textos a un idioma. Varios archivos pueden sumar al mismo; los objetos se mezclan.
   CLAUDIA_I18N.apply(raiz)                   rellena [data-i18n] (texto), [data-i18n-html] (HTML propio, nunca texto de fuera)
                                              y [data-i18n-attr="aria-label:clave;alt:otra"]. Úsalo en elementos sin hijos:
                                              el texto sustituye todo lo que haya dentro.
   CLAUDIA_I18N.onChange(fn)                  fn(lang) se llama después de cada cambio. Ahí es donde los módulos se vuelven a pintar.
   CLAUDIA_I18N.setLang('ca')                 cambia el idioma, lo recuerda, ajusta <html lang>, el título y la descripción
                                              (claves meta.title y meta.description) y vuelve a pintar.
   CLAUDIA_I18N.locale                        'ca-ES', 'es-ES' o 'en-GB', para fechas con Intl.

   Cualquier botón con data-lang="ca|es|en" cambia el idioma; el activo lleva aria-pressed="true". */
(function () {
  'use strict';

  var LANGS = ['ca', 'es', 'en'];
  var LOCALES = { ca: 'ca-ES', es: 'es-ES', en: 'en-GB' };
  var NAMES = { ca: 'Català', es: 'Español', en: 'English' };
  var KEY = 'claudia.lang';
  var dict = { ca: {}, es: {}, en: {} };
  var listeners = [];

  function readSaved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* sin almacenamiento: no pasa nada */ } }

  function firstChoice() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) { /* navegador antiguo */ }
    if (LANGS.indexOf(q) > -1) return q;
    var saved = readSaved();
    if (LANGS.indexOf(saved) > -1) return saved;
    var nav = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < nav.length; i++) {
      var l = String(nav[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(l) > -1) return l;
    }
    return 'es';
  }

  function isPlain(o) { return o && typeof o === 'object' && !Array.isArray(o); }
  function merge(target, src) {
    Object.keys(src).forEach(function (k) {
      if (isPlain(src[k]) && isPlain(target[k])) merge(target[k], src[k]);
      else target[k] = src[k];
    });
    return target;
  }

  function lookup(lang, key) {
    var d = dict[lang];
    if (!d) return undefined;
    if (Object.prototype.hasOwnProperty.call(d, key)) return d[key];
    var parts = key.split('.');
    var cur = d;
    for (var i = 0; i < parts.length; i++) {
      if (!cur || typeof cur !== 'object' || !(parts[i] in cur)) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function t(key, vars) {
    var v = lookup(I.lang, key);
    if (v === undefined || v === '') v = lookup('es', key);
    if (v === undefined) return key;
    if (typeof v === 'string' && vars) {
      v = v.replace(/\{(\w+)\}/g, function (m, n) { return n in vars ? vars[n] : m; });
    }
    return v;
  }

  function each(root, sel, fn) { Array.prototype.forEach.call(root.querySelectorAll(sel), fn); }

  function apply(root) {
    root = root || document;
    each(root, '[data-i18n]', function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    each(root, '[data-i18n-html]', function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    each(root, '[data-i18n-attr]', function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2 && p[0].trim()) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
  }

  function syncDocument() {
    document.documentElement.lang = I.lang;
    var title = t('meta.title');
    if (title !== 'meta.title') document.title = title;
    var desc = t('meta.description');
    var meta = document.querySelector('meta[name="description"]');
    if (meta && desc !== 'meta.description') meta.setAttribute('content', desc);
    each(document, '[data-lang]', function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === I.lang ? 'true' : 'false');
    });
  }

  function setLang(l, opts) {
    if (LANGS.indexOf(l) < 0) return;
    I.lang = l;
    I.locale = LOCALES[l];
    if (!opts || opts.remember !== false) save(l);
    syncDocument();
    apply(document);
    listeners.forEach(function (fn) { try { fn(l); } catch (e) { console.error(e); } });
  }

  var I = window.CLAUDIA_I18N = {
    langs: LANGS.slice(),
    names: NAMES,
    lang: firstChoice(),
    locale: 'es-ES',
    t: t,
    add: function (lang, obj) { if (dict[lang] && obj) merge(dict[lang], obj); },
    apply: apply,
    setLang: setLang,
    onChange: function (fn) { if (typeof fn === 'function') listeners.push(fn); },
  };
  I.locale = LOCALES[I.lang];
  document.documentElement.lang = I.lang;

  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-lang]') : null;
    if (!b) return;
    e.preventDefault();
    setLang(b.getAttribute('data-lang'));
  });

  // Con defer, este archivo se ejecuta antes que los de textos: se espera a DOMContentLoaded (o a load si ya pasó)
  // y, una vez pintado, cada add() posterior vuelve a aplicar los textos.
  var started = false;
  function start() {
    if (started) return;
    started = true;
    syncDocument();
    apply(document);
  }
  var add = I.add;
  I.add = function (lang, obj) {
    add(lang, obj);
    if (started && lang === I.lang) { syncDocument(); apply(document); }
  };
  if (document.readyState === 'complete') start();
  else {
    document.addEventListener('DOMContentLoaded', start);
    window.addEventListener('load', start);
  }
})();
