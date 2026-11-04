/* Bloques que repiten todas las propuestas: dudas, con quién trabajo, dónde nos vemos, preguntas, blog, podcast, contacto y pie.

   Cómo se usa en la página:
     <div data-sx="doubts"></div>   <div data-sx="proof"></div>    <div data-sx="places"></div>
     <div data-sx="faq"></div>      <div data-sx="blog"></div>     <div data-sx="podcast"></div>
     <div data-sx="contact"></div>  <div data-sx="footer"></div>
   y en las secciones propias de la página, para que el pie sepa a dónde llevar:
     data-sx-anchor="quien"   data-sx-anchor="terapias"   data-sx-anchor="como"

   Todo el texto está en ES.sx, justo debajo (español, la fuente). Los datos entre corchetes son pendientes de Claudia.
   El diseño se adapta a cada propuesta con variables --sx-* (ver sections.css).

   Idiomas: con shared/i18n.js cargado, ES.sx se registra como CLAUDIA_I18N.add('es', { sx }) y ca/en se traducen con
   las mismas claves y el mismo anidado (las listas son arrays de objetos; en una lista traducida basta con poner los
   campos de texto, lo demás —img, link.href, id, k— se toma del español). Los bloques se repintan al cambiar de idioma.
   Sin i18n.js (propuestas A–E) se lee ES directamente. */
(() => {
  const ES = { sx: {
    exampleTag: 'Foto de ejemplo',
    pending: '{label} (pendiente)',
    doubts: {
      h: 'Casi todo el mundo empieza con dudas',
      p: 'Puedes escribirme aunque todavía no sepas qué necesitas. Abajo respondo a las preguntas más habituales.',
      read: 'Leer las respuestas',
      ask: 'Preguntarme por WhatsApp',
    },
    proof: {
      h: 'No trabajo sola',
      p: '',
      items: [
        { t: 'Colaboro con Somos Estupendas', d: 'Un equipo de psicólogas en Barcelona, Madrid y online. [Confirmar con Claudia en qué consiste la colaboración.]', link: { label: 'Conocer Somos Estupendas', href: 'https://somosestupendas.com' } },
        { t: 'Derivo si hace falta', d: 'Si necesitas un psiquiatra, un logopeda u otro especialista, te pongo en contacto con alguien de confianza. [Confirmar con Claudia.]' },
        { t: 'Psicóloga colegiada', d: 'Colegiada nº [número]. [Título, habilitación sanitaria y universidad: pendiente.]' },
      ],
    },
    places: {
      h: 'Dónde nos vemos',
      p: '',
      items: [
        { t: 'En consulta', d: '[Dirección de la consulta en Barcelona, cómo llegar y si es accesible.]', ph: 'Foto de la consulta', img: 'shared/img/consulta-sala.jpg', real: true, alt: 'La consulta de Claudia: un sofá verde, un sillón y una alfombra junto a dos ventanas con estores' },
        { t: 'Por videollamada', d: 'Desde donde estés. Solo necesitas una buena conexión y un sitio donde puedas hablar con tranquilidad. [Plataforma que uso.]', ph: 'Foto de la sesión online', img: 'shared/img/people-online.jpg', alt: 'Persona en una videollamada desde su casa' },
      ],
    },
    faq: {
      h: 'Preguntas que suelen hacerme',
      p: 'Si no encuentras la tuya, escríbeme.',
      items: [
        { q: '¿Cómo sé si necesito terapia?', a: 'Basta con que algo te preocupe desde hace tiempo o con que quieras entenderte mejor. Si sigues sin saberlo, escríbeme y vemos si tiene sentido empezar; a veces la respuesta es que no hace falta, o que te conviene otra ayuda, y te lo diré. Si estás en peligro o piensas en hacerte daño, llama al 112 o al 024.' },
        { q: '¿Cómo es la primera sesión?', a: 'Me cuentas qué te trae, te explico cómo trabajo y al final vemos si seguimos y cómo. No tienes que llegar con todo pensado.' },
        { q: '¿Tengo que contarlo todo desde el primer día?', a: 'No. Cuentas lo que quieras, cuando quieras. Si no sabes por dónde empezar, te ayudo yo.' },
        { q: '¿Y si después de la primera sesión no quiero seguir?', a: 'Lo dejamos ahí, sin que tengas que dar explicaciones. Si creo que otra persona puede ayudarte mejor, te lo digo. [Confirmar condiciones y política de cancelación.]' },
        { q: '¿Online o presencial?', a: 'Las dos sirven. Online te ahorras el desplazamiento; en consulta estamos cara a cara, y hay quien lo prefiere. En algunos casos recomiendo presencial [confirmar cuáles: niños pequeños, neuroevaluación, situaciones de riesgo] y lo valoramos juntos.' },
        { q: '¿Cuánto dura y cuánto cuesta?', a: 'La primera sesión dura [duración] y cuesta [precio]. [Formas de pago y política de cancelación.]' },
        { q: '¿Cuántas sesiones hacen falta?', a: 'No hay un número fijo. En la primera sesión te doy una orientación según lo que traigas, y la revisamos sobre la marcha.' },
        { q: '¿Lo que cuente es confidencial?', a: 'Sí: lo que hablamos está protegido por el secreto profesional. Hay unas pocas excepciones que marca la ley, como un riesgo grave para ti o para otra persona o un requerimiento judicial, y te las explico al empezar. [Si comento un caso con mi equipo, lo hago sin datos identificativos. Revisar con Claudia.]' },
        { q: 'Mi hijo o hija irá a terapia: ¿me contarás lo que habla contigo?', a: 'No todo. Te daré la información necesaria para acompañarle, sin entrar en lo que confíe en sesión; si viera un riesgo para su seguridad, te lo diría. Cómo lo concretamos depende de su edad y lo acordamos al empezar. [Revisar con Claudia.]' },
        { q: 'Tengo menos de 18 años: ¿puedo escribirte yo?', a: 'Sí, puedes escribirme. Cómo empezar y qué sabrá tu familia lo hablamos antes de nada. [Revisar con Claudia: edad y consentimiento.]' },
        { q: '¿Puedo escribirte antes de pedir cita?', a: 'Puedes escribirme para dudas prácticas, como cómo trabajo, horarios o precio. No me cuentes tu caso por escrito: lo dejamos para la sesión. Te respondo en [plazo].' },
      ],
    },
    blog: {
      h: 'Para leer',
      p: 'Artículos de divulgación sobre lo que suele preocupar a familias y adultos. [Por ahora son ejemplos de cómo podría ser el blog.]',
      tag: 'Ejemplo',
      cards: [
        { cat: 'Adolescentes', t: 'Cómo hablar con un adolescente que no quiere hablar', img: 'shared/img/people-adolescente.jpg', alt: 'Adolescente en un sofá con auriculares' },
        { cat: 'Parejas', t: 'Por qué las parejas discuten siempre por lo mismo', img: 'shared/img/people-pareja.jpg', alt: 'Pareja en una sesión de terapia' },
        { cat: 'Infancia y aprendizaje', t: 'Qué hacer cuando el colegio te dice que a tu hijo algo le cuesta', img: 'shared/img/people-infancia.jpg', alt: 'Madre e hija dibujando juntas en una mesa' },
      ],
      imgLabel: 'Imagen del artículo',
      more: 'Ver todos los artículos',
      soon: 'Pronto',
    },
    podcast: {
      h: 'Para escuchar',
      p: 'Episodios cortos para escuchar mientras paseas o cocinas. Todavía no existe: es una idea de cómo quedaría.',
      note: '',
      platforms: ['Spotify', 'YouTube', 'Apple Podcasts'],
      soon: 'Pronto',
      ph: 'Imagen del podcast', img: 'shared/img/podcast.jpg', alt: 'Auriculares, una libreta y una planta sobre una mesa de madera',
    },
    contact: {
      h: 'Contacto',
      items: [
        { k: 'mail', t: 'Correo', d: 'hola@ejemplo.com', n: 'Te respondo en [plazo].' },
        { k: 'phone', t: 'Teléfono', d: '[teléfono]', n: '[días y horas]' },
        { k: 'wa', t: 'WhatsApp', d: '[teléfono]', n: '[días y horas]' },
      ],
    },
    footer: {
      name: 'Claudia Pubill',
      role: 'Psicóloga · Colegiada nº [número]',
      place: 'Barcelona y online',
      colTherapies: 'Terapias',
      colAbout: 'Información',
      colContact: 'Contacto',
      colLegal: 'Legal',
      phone: '[teléfono]',
      wa: 'WhatsApp',
      about: [{ id: 'quien', t: 'Quién soy' }, { id: 'como', t: 'Cómo trabajo' }, { id: 'preguntas', t: 'Preguntas' }, { id: 'blog', t: 'Blog' }, { id: 'podcast', t: 'Podcast' }],
      legal: ['Aviso legal', 'Privacidad', 'Cookies'],
      crisis: 'Esta web no sustituye una consulta. En una emergencia, llama al 112; si tienes pensamientos suicidas, al 024 (gratuito, 24 horas). Niños y adolescentes pueden llamar al 900 20 20 10 (ANAR) y, en caso de violencia machista, al 016. Por WhatsApp o correo no atiendo urgencias.',
    },
  } };

  const I18N = window.CLAUDIA_I18N;
  if (I18N) {
    I18N.add('es', ES);
    /* Listas en el mismo orden y longitud que en ES; img, link.href, id y k salen del español */
    I18N.add('ca', { sx: {
      exampleTag: 'Foto d’exemple',
      pending: '{label} (pendent)',
      doubts: {
        h: 'Gairebé tothom comença amb dubtes',
        p: 'Em pots escriure encara que no sàpigues què necessites. Més avall responc les preguntes més habituals.',
        read: 'Llegir les respostes',
        ask: 'Pregunta’m per WhatsApp',
      },
      proof: {
        h: 'No treballo sola',
        p: '',
        items: [
          { t: 'Col·laboro amb Somos Estupendas', d: 'Un equip de psicòlogues a Barcelona, Madrid i en línia. [Confirmar amb la Claudia en què consisteix la col·laboració.]', link: { label: 'Coneix Somos Estupendas' } },
          { t: 'Derivo si cal', d: 'Si necessites un psiquiatre, un logopeda o un altre especialista, et poso en contacte amb algú de confiança. [Confirmar amb la Claudia.]' },
          { t: 'Psicòloga col·legiada', d: 'Col·legiada núm. [número]. [Títol, habilitació sanitària i universitat: pendent.]' },
        ],
      },
      places: {
        h: 'On ens veiem',
        p: '',
        items: [
          { t: 'A la consulta', d: '[Adreça de la consulta a Barcelona, com arribar-hi i si és accessible.]', ph: 'Foto de la consulta', alt: 'La consulta de la Claudia: un sofà verd, una butaca i una catifa al costat de dues finestres amb estors' },
          { t: 'Per videotrucada', d: 'Des d’on siguis. Només necessites una bona connexió i un lloc on puguis parlar amb tranquil·litat. [Plataforma que faig servir.]', ph: 'Foto de la sessió en línia', alt: 'Persona en una videotrucada des de casa seva' },
        ],
      },
      faq: {
        h: 'Preguntes que em fan sovint',
        p: 'Si no hi trobes la teva, escriu-me.',
        items: [
          { q: 'Com sé si necessito teràpia?', a: 'N’hi ha prou que alguna cosa et preocupi des de fa temps o que vulguis entendre’t millor. Si encara no ho tens clar, escriu-me i mirem si té sentit començar; de vegades la resposta és que no cal, o que et convé un altre tipus d’ajuda, i t’ho diré. Si estàs en perill o penses a fer-te mal, truca al 112 o al 024.' },
          { q: 'Com és la primera sessió?', a: 'Em dius què et porta aquí, t’explico com treballo i al final mirem si continuem i de quina manera. No cal que vinguis amb tot pensat.' },
          { q: 'Ho he d’explicar tot des del primer dia?', a: 'No. Expliques el que vulguis, quan vulguis. Si no saps per on començar, t’ajudo jo.' },
          { q: 'I si després de la primera sessió no vull continuar?', a: 'Ho deixem aquí, sense que hagis de donar explicacions. Si crec que una altra persona et pot ajudar millor, t’ho dic. [Confirmar condicions i política de cancel·lació.]' },
          { q: 'En línia o presencial?', a: 'Totes dues opcions funcionen. En línia t’estalvies el desplaçament; a la consulta som cara a cara, i hi ha qui ho prefereix. En alguns casos recomano venir a la consulta [confirmar quins: infants petits, neuroavaluació, situacions de risc] i ho valorem junts.' },
          { q: 'Quant dura i quant costa?', a: 'La primera sessió dura [durada] i costa [preu]. [Formes de pagament i política de cancel·lació.]' },
          { q: 'Quantes sessions calen?', a: 'No hi ha un nombre fix. A la primera sessió et dono una orientació segons el que portis, i l’anem revisant sobre la marxa.' },
          { q: 'El que expliqui és confidencial?', a: 'Sí: el que parlem està protegit pel secret professional. Hi ha unes poques excepcions que marca la llei, com un risc greu per a tu o per a una altra persona o un requeriment judicial, i te les explico en començar. [Si comento un cas amb el meu equip, ho faig sense dades identificatives. Revisar amb la Claudia.]' },
          { q: 'El meu fill o filla farà teràpia: m’explicaràs el que parli amb tu?', a: 'No tot. Et donaré la informació que necessitis per acompanyar-lo, sense entrar en el que m’expliqui en confiança a la sessió; si veiés un risc per a la seva seguretat, t’ho diria. Com ho concretem depèn de la seva edat i ho acordem en començar. [Revisar amb la Claudia.]' },
          { q: 'Tinc menys de 18 anys: et puc escriure jo?', a: 'Sí, em pots escriure. Com començar i què en sabrà la teva família ho parlem abans de res. [Revisar amb la Claudia: edat i consentiment.]' },
          { q: 'Et puc escriure abans de demanar cita?', a: 'Em pots escriure per a dubtes pràctics: com treballo, horaris o preu. No m’expliquis el teu cas per escrit: el deixem per a la sessió. Et responc en [termini].' },
        ],
      },
      blog: {
        h: 'Per llegir',
        p: 'Articles divulgatius sobre el que sol preocupar les famílies i els adults. [De moment són exemples de com podria ser el blog.]',
        tag: 'Exemple',
        cards: [
          { cat: 'Adolescents', t: 'Com parlar amb un adolescent que no vol parlar', alt: 'Adolescent en un sofà amb auriculars' },
          { cat: 'Parelles', t: 'Per què les parelles sempre discuteixen pel mateix', alt: 'Parella en una sessió de teràpia' },
          { cat: 'Infància i aprenentatge', t: 'Què fer quan l’escola et diu que al teu fill li costa alguna cosa', alt: 'Mare i filla dibuixant juntes a la taula' },
        ],
        imgLabel: 'Imatge de l’article',
        more: 'Veure tots els articles',
        soon: 'Aviat',
      },
      podcast: {
        h: 'Per escoltar',
        p: 'Episodis curts per escoltar mentre passeges o cuines. Encara no existeix: és una idea de com quedaria.',
        note: '',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts'],
        soon: 'Aviat',
        ph: 'Imatge del pòdcast', alt: 'Uns auriculars, una llibreta i una planta sobre una taula de fusta',
      },
      contact: {
        h: 'Contacte',
        items: [
          { t: 'Correu', d: 'hola@ejemplo.com', n: 'Et responc en [termini].' },
          { t: 'Telèfon', d: '[telèfon]', n: '[dies i hores]' },
          { t: 'WhatsApp', d: '[telèfon]', n: '[dies i hores]' },
        ],
      },
      footer: {
        name: 'Claudia Pubill',
        role: 'Psicòloga · Col·legiada núm. [número]',
        place: 'Barcelona i en línia',
        colTherapies: 'Teràpies',
        colAbout: 'Informació',
        colContact: 'Contacte',
        colLegal: 'Legal',
        phone: '[telèfon]',
        wa: 'WhatsApp',
        about: [{ t: 'Qui sóc' }, { t: 'Com treballo' }, { t: 'Preguntes' }, { t: 'Blog' }, { t: 'Pòdcast' }],
        legal: ['Avís legal', 'Privacitat', 'Galetes'],
        crisis: 'Aquesta web no substitueix una consulta. En una emergència, truca al 112; si tens pensaments suïcides, al 024 (gratuït, 24 hores). Els infants i adolescents poden trucar al 900 20 20 10 (ANAR) i, en cas de violència masclista, al 016. Per WhatsApp o correu no atenc urgències.',
      },
    } });
    I18N.add('en', { sx: {
      exampleTag: 'Example photo',
      pending: '{label} (pending)',
      doubts: {
        h: 'Almost everyone starts out unsure',
        p: 'You can message me even if you don’t know yet what you need. Further down I answer the questions people ask most.',
        read: 'Read the answers',
        ask: 'Ask me on WhatsApp',
      },
      proof: {
        h: 'I don’t work alone',
        p: '',
        items: [
          { t: 'I collaborate with Somos Estupendas', d: 'A team of psychologists in Barcelona, Madrid and online. [Check with Claudia what the collaboration involves.]', link: { label: 'Visit Somos Estupendas' } },
          { t: 'I refer you on if needed', d: 'If you need a psychiatrist, a speech and language therapist or another specialist, I’ll put you in touch with someone I trust. [Check with Claudia.]' },
          { t: 'Registered psychologist', d: 'Registration no. [number]. [Degree, health psychology licence and university: pending.]' },
        ],
      },
      places: {
        h: 'Where we meet',
        p: '',
        items: [
          { t: 'At my practice', d: '[Address of the practice in Barcelona, how to get there and whether it’s accessible.]', ph: 'Photo of the practice', alt: 'Claudia’s consulting room: a green sofa, an armchair and a rug by two windows with blinds' },
          { t: 'By video call', d: 'Wherever you are. All you need is a good connection and a quiet place where you can talk freely. [Platform I use.]', ph: 'Photo of an online session', alt: 'Person on a video call at home' },
        ],
      },
      faq: {
        h: 'Questions people often ask me',
        p: 'If yours isn’t here, message me.',
        items: [
          { q: 'How do I know if I need therapy?', a: 'It’s enough that something has been worrying you for a while, or that you’d like to understand yourself better. If you’re still not sure, message me and we’ll see whether it makes sense to start; sometimes the answer is that you don’t need it, or that another kind of help would suit you better, and I’ll tell you so. If you’re in danger or thinking about harming yourself, call 112 or 024.' },
          { q: 'What is the first session like?', a: 'You tell me what brings you here, I explain how I work, and at the end we see whether we carry on and how. You don’t have to arrive with everything worked out.' },
          { q: 'Do I have to tell you everything from day one?', a: 'No. You share what you want, when you want. If you don’t know where to start, I’ll help you.' },
          { q: 'What if I don’t want to carry on after the first session?', a: 'We leave it there, and you don’t have to give any reasons. If I think someone else could help you better, I’ll tell you. [Confirm terms and cancellation policy.]' },
          { q: 'Online or in person?', a: 'Both work. Online saves you travelling; at the practice we’re face to face, and some people prefer that. In some cases I recommend coming in person [confirm which: young children, neuropsychological assessment, risk situations] and we weigh it up together.' },
          { q: 'How long is it and how much does it cost?', a: 'The first session lasts [duration] and costs [price]. [Payment methods and cancellation policy.]' },
          { q: 'How many sessions will I need?', a: 'There’s no set number. In the first session I’ll give you a rough idea based on what you bring, and we review it as we go.' },
          { q: 'Is what I tell you confidential?', a: 'Yes: what we talk about is protected by professional confidentiality. There are a few exceptions set by law, such as a serious risk to you or someone else, or a court order, and I explain them when we start. [If I discuss a case with my team, I do it without identifying details. Check with Claudia.]' },
          { q: 'My child is starting therapy: will you tell me what they talk to you about?', a: 'Not everything. I’ll give you what you need to support them, without going into what they share with me in confidence; if I saw a risk to their safety, I would tell you. How we handle this depends on their age, and we agree on it at the start. [Check with Claudia.]' },
          { q: 'I’m under 18: can I message you myself?', a: 'Yes, you can message me. Before anything else, we’ll talk about how to start and what your family will know. [Check with Claudia: age and consent.]' },
          { q: 'Can I message you before asking for an appointment?', a: 'You can message me with practical questions, such as how I work, times or price. Please don’t tell me about your situation in writing: we’ll keep that for the session. I reply within [timeframe].' },
        ],
      },
      blog: {
        h: 'Something to read',
        p: 'Plain-language articles on things that often worry families and adults. [For now these are examples of what the blog could look like.]',
        tag: 'Example',
        cards: [
          { cat: 'Teenagers', t: 'How to talk to a teenager who doesn’t want to talk', alt: 'Teenager on a sofa wearing headphones' },
          { cat: 'Couples', t: 'Why couples keep arguing about the same thing', alt: 'Couple in a therapy session' },
          { cat: 'Childhood and learning', t: 'What to do when the school tells you your child is struggling with something', alt: 'Mother and daughter drawing together at a table' },
        ],
        imgLabel: 'Article image',
        more: 'See all articles',
        soon: 'Coming soon',
      },
      podcast: {
        h: 'Something to listen to',
        p: 'Short episodes to listen to while you walk or cook. It doesn’t exist yet: this is an idea of how it would look.',
        note: '',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts'],
        soon: 'Coming soon',
        ph: 'Podcast image', alt: 'Headphones, a notebook and a plant on a wooden table',
      },
      contact: {
        h: 'Contact',
        items: [
          { t: 'Email', d: 'hola@ejemplo.com', n: 'I reply within [timeframe].' },
          { t: 'Phone', d: '[phone]', n: '[days and times]' },
          { t: 'WhatsApp', d: '[phone]', n: '[days and times]' },
        ],
      },
      footer: {
        name: 'Claudia Pubill',
        role: 'Psychologist · Registration no. [number]',
        place: 'Barcelona and online',
        colTherapies: 'Therapies',
        colAbout: 'Information',
        colContact: 'Contact',
        colLegal: 'Legal',
        phone: '[phone]',
        wa: 'WhatsApp',
        about: [{ t: 'About me' }, { t: 'How I work' }, { t: 'Questions' }, { t: 'Blog' }, { t: 'Podcast' }],
        legal: ['Legal notice', 'Privacy', 'Cookies'],
        crisis: 'This website doesn’t replace a consultation. In an emergency, call 112; if you’re having suicidal thoughts, call 024 (free, 24 hours). Children and teenagers can call ANAR on 900 20 20 10 and, for violence against women, 016. I don’t handle emergencies by WhatsApp or email.',
      },
    } });
  }

  const isPlain = (o) => o && typeof o === 'object' && !Array.isArray(o);
  const fill = (base, over) => {
    if (Array.isArray(base) && Array.isArray(over)) return base.map((b, i) => (i in over ? fill(b, over[i]) : b));
    if (isPlain(base) && isPlain(over)) { const o = Object.assign({}, base); Object.keys(over).forEach((k) => { o[k] = k in base ? fill(base[k], over[k]) : over[k]; }); return o; }
    return over === undefined || over === '' ? base : over;
  };
  const lookup = (key) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), ES.sx);
  /* Texto suelto en el idioma actual; sin i18n.js, el español de ES */
  const tx = (key, vars) => {
    const v = window.CLAUDIA_I18N ? window.CLAUDIA_I18N.t('sx.' + key, vars) : lookup(key);
    return vars && !window.CLAUDIA_I18N ? v.replace(/\{(\w+)\}/g, (m, n) => (n in vars ? vars[n] : m)) : v;
  };
  /* Lista (objetos o textos) en el idioma actual, completada con el español en lo que falte */
  const list = (key) => (window.CLAUDIA_I18N ? fill(lookup(key), window.CLAUDIA_I18N.t('sx.' + key)) : lookup(key));
  /* Bloque entero: textos sueltos y listas, ya en el idioma actual */
  const block = (name) => {
    const t = {};
    Object.keys(ES.sx[name]).forEach((k) => { t[k] = Array.isArray(ES.sx[name][k]) ? list(`${name}.${k}`) : tx(`${name}.${k}`); });
    return t;
  };

  const CFG = Object.assign({ whatsapp: '34600000000' }, window.CLAUDIA || {});
  const SERV = window.CLAUDIA_SERVICES || {};
  const MSG = () => window.CLAUDIA_MESSAGES || {};
  const waAsk = () => `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(MSG().question || 'Hola Claudia, antes de decidir me gustaría hacerte una pregunta.')}`;
  const ICON = {
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7.5 8 6 8-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4h3l1.5 4-2 1.3a11 11 0 0 0 5.7 5.7L16 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A15 15 0 0 1 4 6.7 2.5 2.5 0 0 1 6.5 4Z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20Z"/><path d="M9.2 9c.2 2.4 2.4 4.6 4.8 4.8l1.2-1.1-1.9-1-.8.6a4 4 0 0 1-1.9-1.9l.6-.8-1-1.9L9.2 9Z"/></svg>',
  };
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const shell = (name, inner, cls = '') => `<section class="sx sx--${name} ${cls}" aria-labelledby="sx-${name}-h"><div class="sx__in">${inner}</div></section>`;
  const head = (name, h, p) => `<div class="sx__head"><h2 class="sx__h" id="sx-${name}-h">${esc(h)}</h2>${p ? `<p class="sx__lead">${esc(p)}</p>` : ''}</div>`;
  /* real: foto de verdad de Claudia o de su consulta, sin la etiqueta «Foto de ejemplo» */
  const ph = (label, cls = '', img = '', alt = '', real = false) => img
    ? `<figure class="sx-ph sx-ph--img ${cls}"><img src="${img}" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.parentNode.classList.remove('sx-ph--img');this.remove()">${real ? '' : `<figcaption class="sx-ph__tag">${esc(tx('exampleTag'))}</figcaption>`}</figure>`
    : `<figure class="sx-ph ${cls}" role="img" aria-label="${esc(tx('pending', { label }))}"><figcaption>[${esc(label)}]</figcaption></figure>`;

  const R = {
    doubts() {
      const t = block('doubts');
      return shell('doubts', `<div class="sx__head sx__head--wide"><h2 class="sx__h" id="sx-doubts-h">${esc(t.h)}</h2><p class="sx__lead">${esc(t.p)}</p></div>
        <div class="sx__row"><a class="sx__btn" href="#" data-sx-go="preguntas">${esc(t.read)}</a><a class="sx__link" href="${waAsk()}" target="_blank" rel="noopener">${esc(t.ask)}</a></div>`);
    },
    proof() {
      const t = block('proof');
      return shell('proof', head('proof', t.h, t.p) + `<ul class="sx__cards sx__cards--3">${t.items.map((i) => `<li class="sx__card"><h3>${esc(i.t)}</h3><p>${esc(i.d)}</p>${i.link ? `<a class="sx__link" href="${i.link.href}" target="_blank" rel="noopener">${esc(i.link.label)}</a>` : ''}</li>`).join('')}</ul>`, 'sx--alt');
    },
    places() {
      const t = block('places');
      return shell('places', head('places', t.h, t.p) + `<ul class="sx__cards sx__cards--2">${t.items.map((i) => `<li class="sx__card sx__card--media">${ph(i.ph, '', i.img, i.alt, i.real)}<div class="sx__cardbody"><h3>${esc(i.t)}</h3><p>${esc(i.d)}</p></div></li>`).join('')}</ul>`);
    },
    faq() {
      const t = block('faq');
      return shell('faq', head('faq', t.h, t.p) + `<div class="sx__faq">${t.items.map((i) => `<details class="sx__q"><summary>${esc(i.q)}</summary><p>${esc(i.a)}</p></details>`).join('')}</div>`, 'sx--alt');
    },
    blog() {
      const t = block('blog');
      return shell('blog', head('blog', t.h, t.p) + `<ul class="sx__cards sx__cards--3">${t.cards.map((c, n) => `<li class="sx__card sx__card--media">${ph(t.imgLabel, 'sx-ph--' + (n + 1), c.img, c.alt)}<div class="sx__cardbody"><p class="sx__meta">${esc(c.cat)} <span class="sx__tag">${esc(t.tag)}</span></p><h3>${esc(c.t)}</h3></div></li>`).join('')}</ul>
        <p class="sx__after"><span class="sx__soft" aria-disabled="true">${esc(t.more)} <small>${esc(t.soon)}</small></span></p>`);
    },
    podcast() {
      const t = block('podcast');
      return shell('podcast', `<div class="sx__pod">${ph(t.ph, 'sx-ph--pod', t.img, t.alt)}<div class="sx__podtext"><h2 class="sx__h" id="sx-podcast-h">${esc(t.h)}</h2><p class="sx__lead">${esc(t.p)}</p>${t.note ? `<p class="sx__meta">${esc(t.note)}</p>` : ''}<ul class="sx__pills">${t.platforms.map((p) => `<li><span class="sx__pill" aria-disabled="true">${esc(p)} <small>${esc(t.soon)}</small></span></li>`).join('')}</ul></div></div>`, 'sx--alt');
    },
    contact() {
      const t = block('contact');
      const href = { mail: 'mailto:hola@ejemplo.com', phone: '', wa: waAsk() };
      return shell('contact', head('contact', t.h) + `<ul class="sx__contact">${t.items.map((i) => {
        const body = `<span class="sx__ico">${ICON[i.k]}</span><span class="sx__ctext"><strong>${esc(i.t)}</strong><span>${esc(i.d)}</span><small>${esc(i.n)}</small></span>`;
        return `<li>${href[i.k] ? `<a class="sx__citem" href="${href[i.k]}"${i.k === 'wa' ? ' target="_blank" rel="noopener"' : ''}>${body}</a>` : `<div class="sx__citem">${body}</div>`}</li>`;
      }).join('')}</ul>`);
    },
    footer() {
      const t = block('footer');
      const about = t.about.filter((a) => document.querySelector(`[data-sx-anchor="${a.id}"]`)).map((a) => `<li><a href="#" data-sx-go="${a.id}">${esc(a.t)}</a></li>`).join('');
      const ther = Object.keys(SERV).map((k) => `<li><button type="button" class="sx__flink" data-info="${k}">${esc(SERV[k].name)}</button></li>`).join('');
      return `<footer class="sx sx--footer"><div class="sx__in">
        <div class="sx__fgrid">
          <div class="sx__fbrand"><p class="sx__fname">${esc(t.name)}</p><p>${esc(t.role)}</p><p>${esc(t.place)}</p></div>
          <nav aria-label="${esc(t.colTherapies)}"><h2 class="sx__fh">${esc(t.colTherapies)}</h2><ul>${ther}</ul></nav>
          <nav aria-label="${esc(t.colAbout)}"><h2 class="sx__fh">${esc(t.colAbout)}</h2><ul>${about}</ul></nav>
          <div><h2 class="sx__fh">${esc(t.colContact)}</h2><ul><li><a href="mailto:hola@ejemplo.com">hola@ejemplo.com</a></li><li>${esc(t.phone)}</li><li><a href="${waAsk()}" target="_blank" rel="noopener">${esc(t.wa)}</a></li></ul></div>
          <nav aria-label="${esc(t.colLegal)}"><h2 class="sx__fh">${esc(t.colLegal)}</h2><ul>${t.legal.map((l) => `<li><a href="#" onclick="return false">${esc(l)}</a></li>`).join('')}</ul></nav>
        </div>
        <p class="sx__fcrisis">${esc(t.crisis).replace('112', '<a href="tel:112">112</a>').replace('024', '<a href="tel:024">024</a>')}</p>
        <p class="sx__fcopy">© ${esc(t.name)}</p>
      </div></footer>`;
    },
  };

  const anchors = { faq: 'preguntas', blog: 'blog', podcast: 'podcast', contact: 'contacto', places: 'donde' };
  function mount() {
    const order = ['doubts', 'proof', 'places', 'faq', 'blog', 'podcast', 'contact', 'footer'];
    order.forEach((name) => {
      document.querySelectorAll(`[data-sx="${name}"]`).forEach((host) => {
        /* al repintar por un cambio de idioma, las preguntas abiertas siguen abiertas */
        const open = Array.from(host.querySelectorAll('details'), (d) => d.open);
        host.innerHTML = R[name]();
        host.querySelectorAll('details').forEach((d, i) => { d.open = !!open[i]; });
        const sec = host.firstElementChild;
        if (anchors[name] && sec) { sec.setAttribute('data-sx-anchor', anchors[name]); sec.id = sec.id || 'sx-' + anchors[name]; }
      });
    });
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-sx-go]'); if (!a) return;
    e.preventDefault();
    const el = document.querySelector(`[data-sx-anchor="${a.dataset.sxGo}"]`); if (!el) return;
    el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  /* Con i18n.js: los bloques montados se vuelven a pintar al cambiar de idioma */
  if (I18N) I18N.onChange(mount);
})();
