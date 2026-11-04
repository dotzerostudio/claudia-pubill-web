/* Reflexiones y preguntas de la portada: cada visita enseña una distinta.
   Cada elemento:
     id      texto corto y estable
     kind    'question' (una pregunta para pensar) o 'fact' (un dato con fuente comprobada)
     aud     para quién encaja: 'child', 'teen', 'family', 'couple', 'adult'. Vacío o ausente: para todo el mundo.
     text    { es, ca, en }
     source  { label, url }  solo en los datos ('fact'). label es corto y vale para los tres idiomas:
             "Holt-Lunstad et al., 2010", "Emmons & McCullough, 2003". url es el DOI.

   CLAUDIA_REFLECT.pick(aud)    una reflexión que no sea la última que vio esta persona ni una ya vista en esta visita.
                                Con aud, elige entre las de esa persona y las de todo el mundo.
   CLAUDIA_REFLECT.text(item)   el texto en el idioma actual (usa CLAUDIA_I18N si está; si no, español).
   CLAUDIA_REFLECT.sourceLine(item)  "Fuente: …" en el idioma actual, o '' si no tiene fuente.
   CLAUDIA_REFLECT.ui           textos del botón y la etiqueta en los tres idiomas. */
(function () {
  'use strict';

  var ITEMS = [
    /* Preguntas. La primera es la de Claudia. */
    {
      id: 'mirada',
      kind: 'question',
      aud: [],
      text: {
        es: '¿Cómo sería poder verte, por un instante, como te ve esa persona que te quiere?',
        ca: 'Com seria poder veure’t, per un instant, com et veu aquella persona que t’estima?',
        en: 'What would it be like to see yourself, just for a moment, through the eyes of someone who loves you?',
      },
    },
    {
      id: 'tono',
      kind: 'question',
      aud: [],
      text: {
        es: 'Cuando algo te sale mal, ¿con qué tono te hablas?',
        ca: 'Quan alguna cosa et surt malament, amb quin to et parles?',
        en: 'When things go wrong, what tone of voice do you use with yourself?',
      },
    },
    {
      id: 'tiempo',
      kind: 'question',
      aud: [],
      text: {
        es: 'Si pudieras mirar dentro de ti como quien mira por la ventana, ¿qué tiempo haría hoy?',
        ca: 'Si poguessis mirar dins teu com qui mira per la finestra, quin temps hi faria avui?',
        en: 'If you could look inside yourself the way you look out of a window, what would the weather be like today?',
      },
    },
    {
      id: 'sin-pedirlo',
      kind: 'question',
      aud: [],
      text: {
        es: '¿Qué ha hecho alguien por ti estos días sin que se lo pidieras?',
        ca: 'Què ha fet algú per tu aquests dies sense que ho demanessis?',
        en: 'What has someone done for you lately without you having to ask?',
      },
    },

    /* Datos. Fuentes completas y límites de cada uno en _notes/reflexiones-fuentes.md. */
    {
      id: 'relaciones',
      kind: 'fact',
      aud: ['adult', 'couple', 'family'],
      text: {
        es: 'Un análisis de 148 estudios con más de 300.000 participantes encontró que las personas con relaciones más sólidas tenían más probabilidades de seguir con vida al terminar cada estudio.',
        ca: 'Una anàlisi de 148 estudis amb més de 300.000 participants va trobar que les persones amb relacions més sòlides tenien més probabilitats de seguir amb vida en acabar cada estudi.',
        en: 'An analysis of 148 studies with more than 300,000 participants found that people with stronger relationships were more likely to still be alive when each study ended.',
      },
      source: { label: 'Holt-Lunstad et al., 2010', url: 'https://doi.org/10.1371/journal.pmed.1000316' },
    },
    {
      id: 'respirar',
      kind: 'fact',
      aud: ['adult', 'teen', 'family'],
      text: {
        es: 'En un estudio con 108 adultos, cinco minutos diarios de ejercicios de respiración durante un mes les mejoraron el ánimo, sobre todo al soltar el aire más despacio que al tomarlo.',
        ca: 'En un estudi amb 108 adults, cinc minuts al dia d’exercicis de respiració durant un mes els van millorar l’estat d’ànim, sobretot si treien l’aire més a poc a poc del que l’agafaven.',
        en: 'In a study of 108 adults, five minutes of breathing exercises a day for a month lifted their mood, especially when they breathed out more slowly than they breathed in.',
      },
      source: { label: 'Balban et al., 2023', url: 'https://doi.org/10.1016/j.xcrm.2022.100895' },
    },
    {
      id: 'nombrar',
      kind: 'fact',
      aud: ['adult', 'teen', 'couple', 'family'],
      text: {
        es: 'En un estudio con 30 personas, ponerle nombre a la emoción de una imagen desagradable redujo la respuesta de la amígdala, una zona del cerebro que da la voz de alarma.',
        ca: 'En un estudi amb 30 persones, posar nom a l’emoció d’una imatge desagradable va reduir la resposta de l’amígdala, una zona del cervell que dona la veu d’alarma.',
        en: 'In a study of 30 people, putting a name to the emotion in an unpleasant image reduced the response of the amygdala, a part of the brain that sounds the alarm.',
      },
      source: { label: 'Lieberman et al., 2007', url: 'https://doi.org/10.1111/j.1467-9280.2007.01916.x' },
    },
    {
      id: 'jugar',
      kind: 'fact',
      aud: ['child', 'family'],
      text: {
        es: 'La Academia Americana de Pediatría señala que, cuando los niños juegan con su madre o su padre, la alegría compartida ayuda a su cuerpo a regular el estrés.',
        ca: 'L’Acadèmia Americana de Pediatria explica que, quan els infants juguen amb la mare o el pare, l’alegria compartida ajuda el seu cos a regular l’estrès.',
        en: 'The American Academy of Pediatrics notes that when children play with a parent, the joy they share helps their bodies regulate stress.',
      },
      source: { label: 'Yogman et al., 2018', url: 'https://doi.org/10.1542/peds.2018-2058' },
    },
    {
      id: 'agradecer',
      kind: 'fact',
      aud: ['adult', 'couple'],
      text: {
        es: 'En un estudio con 65 adultos que vivían con una enfermedad neuromuscular, quienes apuntaron cada día, durante tres semanas, cosas que agradecer notaron más emociones positivas que el resto.',
        ca: 'En un estudi amb 65 adults que vivien amb una malaltia neuromuscular, els que apuntaven cada dia, durant tres setmanes, allò que agraïen van notar més emocions positives que la resta.',
        en: 'In a study of 65 adults living with a neuromuscular condition, those who wrote down every day, for three weeks, what they were grateful for felt more positive emotions than the rest.',
      },
      source: { label: 'Emmons & McCullough, 2003', url: 'https://doi.org/10.1037/0022-3514.84.2.377' },
    },
    {
      id: 'escuchar-pronto',
      kind: 'fact',
      aud: ['child', 'teen', 'family'],
      text: {
        es: 'Vale la pena escuchar pronto a niños y adolescentes: según un análisis de 192 estudios, casi la mitad de los problemas de salud mental empiezan antes de los 18 años.',
        ca: 'Val la pena escoltar aviat els infants i els adolescents: segons una anàlisi de 192 estudis, gairebé la meitat dels problemes de salut mental comencen abans dels 18 anys.',
        en: 'It’s worth listening to children and teenagers early on: an analysis of 192 studies found that almost half of mental health problems begin before the age of 18.',
      },
      source: { label: 'Solmi et al., 2022', url: 'https://doi.org/10.1038/s41380-021-01161-7' },
    },
  ];

  var UI = {
    es: { label: 'Para pensar un momento', other: 'Otra', otherLong: 'Ver otra reflexión', source: 'Fuente' },
    ca: { label: 'Per pensar-hi un moment', other: 'Una altra', otherLong: 'Veure una altra reflexió', source: 'Font' },
    en: { label: 'Something to think about', other: 'Another', otherLong: 'Show another reflection', source: 'Source' },
  };

  var LAST = 'claudia.reflection.last';
  var SEEN = 'claudia.reflection.seen';

  function lang() { return (window.CLAUDIA_I18N && window.CLAUDIA_I18N.lang) || 'es'; }
  function get(store, k) { try { return window[store].getItem(k); } catch (e) { return null; } }
  function set(store, k, v) { try { window[store].setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  function seenList() { try { return JSON.parse(get('sessionStorage', SEEN) || '[]'); } catch (e) { return []; } }

  function fits(item, aud) { return !aud || !item.aud || !item.aud.length || item.aud.indexOf(aud) > -1; }

  function pick(aud) {
    var all = ITEMS.filter(function (i) { return fits(i, aud); });
    if (!all.length) all = ITEMS.slice();
    if (all.length === 1) return all[0];
    var last = get('localStorage', LAST);
    var seen = seenList();
    var pool = all.filter(function (i) { return i.id !== last && seen.indexOf(i.id) < 0; });
    if (!pool.length) {
      seen = [];
      pool = all.filter(function (i) { return i.id !== last; });
    }
    var item = pool[Math.floor(Math.random() * pool.length)];
    seen.push(item.id);
    set('sessionStorage', SEEN, JSON.stringify(seen));
    set('localStorage', LAST, item.id);
    return item;
  }

  function text(item) { return (item && (item.text[lang()] || item.text.es)) || ''; }

  function sourceLine(item) {
    if (!item || !item.source || !item.source.label) return '';
    return (UI[lang()] || UI.es).source + ': ' + item.source.label;
  }

  window.CLAUDIA_REFLECT = {
    items: ITEMS,
    ui: UI,
    pick: pick,
    text: text,
    sourceLine: sourceLine,
    uiText: function (k) { return (UI[lang()] || UI.es)[k]; },
  };
})();
