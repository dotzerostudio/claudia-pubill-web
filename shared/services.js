/* Textos de cada terapia y mensajes de WhatsApp. Aquí se edita todo lo que lee la persona.

   Cada terapia tiene:
     name   título de la ventana
     queEs  de qué se trata
     como   cómo son las sesiones
     wa     primera frase del mensaje de WhatsApp (a la frase se le suman la modalidad y, si eligen uno, el hueco)

   Borrador pendiente de que Claudia lo revise: lo que describe cada proceso debe ser como ella trabaja de verdad.

   Idiomas: el español está en ES, justo debajo, y es la fuente. Con shared/i18n.js cargado se registra como
   CLAUDIA_I18N.add('es', { svc, msg }) y ca/en se traducen con las mismas claves (svc.individual.name, msg.generic…).
   Sin i18n.js (propuestas A–E) se lee ES directamente.
   window.CLAUDIA_SERVICES y window.CLAUDIA_MESSAGES siguen siendo los mismos objetos de siempre, pero cada texto
   se lee en el idioma actual cada vez que se pide, así que reflejan el idioma sin que nadie tenga que repintarlos. */
(() => {
  const ES = {
    svc: {
      individual: {
        name: 'Terapia individual',
        queEs: 'Son sesiones solo para ti, para entender qué te está pasando y qué quieres que cambie. Vienen personas con ansiedad, con tristeza, en pleno duelo, ante una decisión que no saben tomar o con la sensación de que algo no encaja desde hace tiempo.',
        como: 'En la primera sesión nos conocemos y te escucho sin prisa. Después decidimos juntos qué quieres trabajar y a qué ritmo. No uso un único método: combino enfoques según lo que a ti te sirva, y vamos revisando si lo que hacemos funciona.',
        wa: 'Hola Claudia, quería pedir una primera sesión de terapia individual.',
      },
      pareja: {
        name: 'Terapia de pareja',
        queEs: 'Para parejas que discuten siempre por lo mismo, que han dejado de entenderse o que dudan si seguir juntos. También en una crisis, como una infidelidad, o ante un cambio grande, como un hijo o una mudanza. No hace falta estar al borde de la ruptura para venir.',
        como: 'Trabajo con los dos a la vez, y ninguno es el paciente ni el culpable. Miramos cómo os habláis, qué se repite y qué necesita cada uno, y buscamos otras formas de decirlo. Mi papel no es decidir quién tiene razón ni si os conviene seguir juntos. Si hay violencia en la pareja, esta terapia no es el formato adecuado y lo valoramos antes.',
        wa: 'Hola Claudia, quería pedir una primera sesión de terapia de pareja.',
      },
      familiar: {
        name: 'Terapia familiar',
        queEs: 'Para familias en las que algo afecta a todos: conflictos entre padres e hijos, una separación, un duelo, la convivencia con un adolescente o la preocupación por cómo está alguien de la familia.',
        como: 'Trabajamos cómo os comunicáis, cómo os organizáis y qué hace que algunos conflictos se repitan. Según el caso, vienen todos o solo una parte de la familia. Hablamos de lo que ocurre, sin buscar culpables.',
        wa: 'Hola Claudia, quería pedir una primera sesión de terapia familiar.',
      },
      infantojuvenil: {
        name: 'Terapia infantojuvenil',
        queEs: 'Para niños y adolescentes que lo están pasando mal y no siempre saben explicarlo: miedos, tristeza, rabietas, problemas en el colegio o con otros chicos, cambios de humor, aislamiento. Muchas veces son las familias quienes consultan al notar un cambio.',
        como: 'Adapto la forma de trabajar a la edad: con los más pequeños, juego o dibujo si ayuda; con los adolescentes, conversación y un trato respetuoso. Suelo empezar con una conversación con la familia para entender el contexto. A los padres o tutores les cuento lo necesario para acompañar, y cuido la confianza de cada chico o chica. Si hubiera un riesgo para su seguridad, lo hablaría con la familia.',
        wa: 'Hola Claudia, quería pedir una primera sesión para un niño o adolescente. Te cuento lo básico por aquí.',
      },
      neuroevaluacion: {
        name: 'Neuroevaluación',
        queEs: 'Es una evaluación para entender cómo aprende, atiende y se relaciona una persona cuando algo le cuesta y no se sabe por qué. Sirve para saber si detrás hay una dificultad del desarrollo o del aprendizaje, y para tener claro qué apoyos le ayudan.',
        como: 'Empiezo con una entrevista para conocer la historia, sigo con varias sesiones de pruebas adaptadas a la persona y termino con una sesión para explicar los resultados. Recibes un informe por escrito que cuenta cómo aprende esa persona y qué le ayuda en el día a día. Si hace falta una valoración médica o de otros profesionales, te oriento.',
        wa: 'Hola Claudia, quería pedir una primera cita para una neuroevaluación. Te cuento para quién es.',
      },
    },
    msg: {
      /* Para quien reserva sin elegir terapia */
      generic: 'Hola Claudia, quería pedir una primera sesión. Todavía no sé qué tipo de terapia me conviene, ¿lo hablamos?',
      online: 'Mejor online, si puede ser.',
      presencial: 'Mejor presencial, si puede ser.',
      /* dia: «jueves 12 de noviembre», hora: «17:30» */
      slot: '¿Te iría bien el {dia} a las {hora}?',
      /* Para quien solo quiere preguntar antes de decidir */
      question: 'Hola Claudia, antes de decidir me gustaría hacerte una pregunta.',
      /* Líneas pequeñas de la ventana de reserva (déjalas vacías para ocultarlas) */
      first: 'La primera sesión dura [duración] y cuesta [precio].',
      fine: 'Por WhatsApp respondo dudas prácticas y organizo citas. No hago terapia ni atiendo urgencias; tu caso lo dejamos para la sesión.',
    },
  };
  const ORDER = ['individual', 'pareja', 'familiar', 'infantojuvenil', 'neuroevaluacion'];

  const I18N = window.CLAUDIA_I18N;
  if (I18N) {
    I18N.add('es', ES);
    I18N.add('ca', {
      svc: {
        individual: {
          name: 'Teràpia individual',
          queEs: 'Són sessions només per a tu, per entendre què et passa i què vols que canviï. Hi venen persones amb ansietat, amb tristesa, en ple dol, davant d’una decisió que no saben com prendre o amb la sensació que fa temps que alguna cosa no encaixa.',
          como: 'A la primera sessió ens coneixem i t’escolto sense presses. Després decidim junts què vols treballar i a quin ritme. No faig servir un sol mètode: combino enfocaments segons el que et serveixi a tu, i anem revisant si el que fem funciona.',
          wa: 'Hola Claudia, voldria demanar una primera sessió de teràpia individual.',
        },
        pareja: {
          name: 'Teràpia de parella',
          queEs: 'Per a parelles que sempre discuteixen pel mateix, que han deixat d’entendre’s o que dubten si continuar junts. També en una crisi, com una infidelitat, o davant d’un canvi important, com l’arribada d’un fill o una mudança. No cal estar a punt de trencar per venir.',
          como: 'Treballo amb tots dos alhora, i cap dels dos és el pacient ni el culpable. Mirem com us parleu, què es repeteix i què necessita cadascú, i busquem altres maneres de dir-ho. El meu paper no és decidir qui té raó ni si us convé continuar junts. Si hi ha violència a la parella, aquesta teràpia no és el format adequat i ho valorem abans.',
          wa: 'Hola Claudia, voldria demanar una primera sessió de teràpia de parella.',
        },
        familiar: {
          name: 'Teràpia familiar',
          queEs: 'Per a famílies en què alguna cosa els afecta a tots: conflictes entre pares i fills, una separació, un dol, la convivència amb un adolescent o la preocupació per com està algú de la família.',
          como: 'Treballem com us comuniqueu, com us organitzeu i què fa que alguns conflictes es repeteixin. Segons el cas, venen tots o només una part de la família. Parlem del que passa, sense buscar culpables.',
          wa: 'Hola Claudia, voldria demanar una primera sessió de teràpia familiar.',
        },
        infantojuvenil: {
          name: 'Teràpia infantojuvenil',
          queEs: 'Per a infants i adolescents que ho estan passant malament i no sempre ho saben explicar: pors, tristesa, rebequeries, problemes a l’escola o amb els companys, canvis d’humor, aïllament. Sovint són les famílies les que consulten quan noten un canvi.',
          como: 'Adapto la manera de treballar a l’edat: amb els més petits, si ajuda, juguem o dibuixem; amb els adolescents, parlem i els tracto amb respecte. Normalment començo per una conversa amb la família per entendre el context. Als pares o tutors els explico el que cal perquè puguin acompanyar el seu fill o filla, i cuido la confiança de cada noi o noia. Si hi hagués un risc per a la seva seguretat, ho parlaria amb la família.',
          wa: 'Hola Claudia, voldria demanar una primera sessió per a un nen o adolescent. T’explico el bàsic per aquí.',
        },
        neuroevaluacion: {
          name: 'Neuroavaluació',
          queEs: 'És una avaluació per entendre com aprèn, com manté l’atenció i com es relaciona una persona quan alguna cosa li costa i no se sap per què. Serveix per saber si al darrere hi ha una dificultat del desenvolupament o de l’aprenentatge, i per tenir clar quins suports l’ajuden.',
          como: 'Començo amb una entrevista per conèixer la seva història, continuo amb unes quantes sessions de proves adaptades a la persona i acabo amb una sessió per explicar els resultats. Reps un informe per escrit que descriu com aprèn aquella persona i què l’ajuda en el dia a dia. Si cal una valoració mèdica o d’altres professionals, t’oriento.',
          wa: 'Hola Claudia, voldria demanar una primera cita per a una neuroavaluació. T’explico per a qui és.',
        },
      },
      msg: {
        generic: 'Hola Claudia, voldria demanar una primera sessió. Encara no sé quin tipus de teràpia em convé, en parlem?',
        online: 'Si pot ser, millor en línia.',
        presencial: 'Si pot ser, millor presencial.',
        /* dia: «dijous 12 de novembre», hora: «17:30» */
        slot: 'T’aniria bé el {dia} a les {hora}?',
        question: 'Hola Claudia, abans de decidir-me voldria fer-te una pregunta.',
        first: 'La primera sessió dura [durada] i costa [preu].',
        fine: 'Per WhatsApp responc dubtes pràctics i organitzo cites. No hi faig teràpia ni hi atenc urgències; el teu cas el deixem per a la sessió.',
      },
    });
    I18N.add('en', {
      svc: {
        individual: {
          name: 'Individual therapy',
          queEs: 'These sessions are just for you, to understand what’s happening and what you’d like to change. People come with anxiety or sadness, while grieving, facing a decision they don’t know how to make, or with a feeling that something hasn’t been right for a long time.',
          como: 'In the first session we get to know each other and I listen without rushing you. Then we decide together what you want to work on and at what pace. I don’t stick to one method: I combine approaches depending on what helps you, and we keep checking whether what we’re doing is working.',
          wa: 'Hi Claudia, I’d like to book a first session of individual therapy.',
        },
        pareja: {
          name: 'Couples therapy',
          queEs: 'For couples who keep arguing about the same thing, who’ve stopped understanding each other or who aren’t sure whether to stay together. Also in a crisis, such as an affair, or around a big change, like having a baby or moving house. You don’t have to be about to break up to come.',
          como: 'I work with both of you together, and neither of you is the patient or the one to blame. We pay attention to how you talk to each other, what keeps coming back and what each of you needs, and we find other ways of putting it. My role isn’t to decide who’s right or whether you should stay together. If there is violence in the relationship, this therapy isn’t the right format, and we look at that first.',
          wa: 'Hi Claudia, I’d like to book a first session of couples therapy.',
        },
        familiar: {
          name: 'Family therapy',
          queEs: 'For families where something is affecting everyone: conflict between parents and children, a separation, a loss, living with a teenager, or worry about how someone in the family is doing.',
          como: 'We work on how you communicate, how you organise things and what makes some conflicts keep coming back. Depending on the situation, the whole family comes or just some of you. We talk about what’s happening without looking for someone to blame.',
          wa: 'Hi Claudia, I’d like to book a first session of family therapy.',
        },
        infantojuvenil: {
          name: 'Therapy for children and teenagers',
          queEs: 'For children and teenagers who are having a hard time and can’t always explain it: fears, sadness, tantrums, problems at school or with other kids, mood swings, withdrawing from people. Often it’s the family who gets in touch after noticing a change.',
          como: 'I adapt how I work to their age: with younger children, we play or draw if it helps; with teenagers, we talk, and I treat them with respect. I usually start with a conversation with the family to understand the background. I tell parents or guardians what they need to know to support their child, and I look after each young person’s trust. If there were a risk to their safety, I would talk to the family about it.',
          wa: 'Hi Claudia, I’d like to book a first session for a child or teenager. I can give you the basics here.',
        },
        neuroevaluacion: {
          name: 'Neuropsychological assessment',
          queEs: 'It’s an assessment to understand how a person learns, pays attention and relates to others when something is hard for them and nobody knows why. It shows whether there’s a developmental or learning difficulty behind it, and makes clear what support helps them.',
          como: 'I start with an interview to learn their history, then do several testing sessions adapted to the person, and finish with a session to explain the results. You receive a written report describing how that person learns and what helps them day to day. If a medical assessment or input from other professionals is needed, I’ll point you in the right direction.',
          wa: 'Hi Claudia, I’d like to book a first appointment for a neuropsychological assessment. I’ll tell you who it’s for.',
        },
      },
      msg: {
        generic: 'Hi Claudia, I’d like to book a first session. I’m not sure yet what kind of therapy is right for me. Could we talk about it?',
        online: 'Online if possible.',
        presencial: 'In person if possible.',
        /* dia: «Thursday 12 November», hora: «17:30» */
        slot: 'Would {dia} at {hora} work for you?',
        question: 'Hi Claudia, before I decide, I’d like to ask you something.',
        first: 'The first session lasts [duration] and costs [price].',
        fine: 'On WhatsApp I answer practical questions and arrange appointments. I don’t do therapy or handle emergencies there; we’ll keep the details of your situation for the session.',
      },
    });
  }

  /* Texto en el idioma actual; sin i18n.js, el español de ES */
  function tr(key, vars) {
    if (window.CLAUDIA_I18N) return window.CLAUDIA_I18N.t(key, vars);
    const v = key.split('.').reduce((o, k) => (o == null ? o : o[k]), ES);
    return typeof v === 'string' && vars ? v.replace(/\{(\w+)\}/g, (m, n) => (n in vars ? vars[n] : m)) : v;
  }
  const getter = (key) => ({ enumerable: true, get: () => tr(key) });

  const services = {};
  ORDER.forEach((k) => {
    services[k] = {};
    ['name', 'queEs', 'como', 'wa'].forEach((f) => Object.defineProperty(services[k], f, getter(`svc.${k}.${f}`)));
  });
  window.CLAUDIA_SERVICES = services;

  const messages = {};
  ['generic', 'online', 'presencial', 'question', 'first', 'fine'].forEach((f) => Object.defineProperty(messages, f, getter(`msg.${f}`)));
  messages.slot = (dia, hora) => tr('msg.slot', { dia, hora });
  window.CLAUDIA_MESSAGES = messages;
})();
