# Web de Claudia Pubill

> `CLAUDE.md` y `AGENTS.md` tienen siempre el mismo contenido. Si cambias uno, copia el cambio al otro.

Web de Claudia Pubill, psicóloga en Barcelona y por videollamada. Atiende a niños, adolescentes, familias, parejas y adultos, y hace neuroevaluaciones. Objetivo: que la gente la conozca y pida una primera sesión con calma, sin presión.

Esta es la web final, basada en la propuesta F · Alba. Las seis propuestas de diseño y las notas de trabajo están en el repositorio `claudia-pubill-propuestas`.

## Técnica

- HTML, CSS y JavaScript sin frameworks ni paso de build. Fuentes de Google Fonts con `<link>`.
- Cloudflare Pages: sin comando de build y carpeta de salida `/`, la raíz del repositorio.
- `index.html` es la página. Su script final pinta el selector «¿Quién viene a terapia?», la tarjeta de reflexión, el amanecer y las animaciones.
- `shared/`:
  - `i18n.js`: idiomas `ca`, `es` y `en`. Orden de elección: `?lang=`, la última elección guardada, el idioma del navegador y, si no, `es`. En el HTML: `data-i18n="clave"`, `data-i18n-attr="alt:clave"` y botones `data-lang="ca|es|en"`. Si falta una clave en ca o en, se muestra el español. Lo que se pinta con JavaScript se repinta en `CLAUDIA_I18N.onChange`.
  - `f-strings.js`: todos los textos de la página en es, ca y en, con las mismas claves.
  - `services.js`: textos de cada terapia y mensajes de WhatsApp (namespaces `svc` y `msg`).
  - `booking.js/css`: el popup «Pide tu primera sesión» y «En qué consiste» (namespace `bk`). Disparadores: `data-book`, `data-book-mode`, `data-service` y `data-info="individual|pareja|familiar|infantojuvenil|neuroevaluacion"`.
    - Para activar los datos reales, define antes de cargarlo `window.CLAUDIA = { whatsapp: '34XXXXXXXXX', calLink: 'usuario/primera-sesion' }`.
    - Mientras no haya `calLink`, el calendario es de ejemplo.
  - `sections.js/css`: bloques montados con `<div data-sx="doubts|proof|places|faq|blog|podcast|contact|footer">` (namespace `sx`). Se tematizan con las variables `--sx-*`.
  - `reflections.js`: 10 reflexiones (preguntas y datos). Cada dato lleva su fuente y su DOI.
- Imágenes en `shared/img/`:
  - Reales: `claudia.jpg` y `consulta-*.jpg`.
  - De stock, `people-*.jpg`: son de ejemplo y llevan la etiqueta «Foto de ejemplo». La atribución está pendiente en `CREDITS.md`.
  - Generada: `podcast.jpg`.

## Antes de publicar

- Rellenar los datos entre corchetes: [número] de colegiada, [precio], [duración], [teléfono], dirección de la consulta y correo (`hola@ejemplo.com` en `sections.js`).
- Poner el número real de WhatsApp y el enlace de Cal.com.
- Quitar `<meta name="robots" content="noindex">` de `index.html`.
- Cambiar las fotos de stock por fotos propias, o verificar su licencia.
- Confirmar con Claudia los textos de las terapias y la colaboración con Somos Estupendas.

## Reglas de contenido

- Voz cálida, en primera persona y concreta. Nada que suene a IA: sin «no es X, es Y», tríos de adjetivos, «viaje», «sanar», «transformar», frases-moraleja ni guiones largos encadenados.
- Publicidad sanitaria: no se prometen resultados, no hay opiniones de pacientes y no se dice «está demostrado» sin una fuente comprobada.
- Llamadas a la acción tranquilas. «Escríbeme», «En qué consiste», «Pedir una primera sesión», «Pide tu primera sesión», «Pedir cita por WhatsApp». Nada de insistir con «Reservar».
- Catalán natural de Barcelona, de tú. Inglés británico, cálido y sencillo. Cada idioma se escribe como si fuera el original.

## Diseño

- Estilo de la propuesta B: Young Serif y Figtree, bordes muy redondeados, círculos y trazos ondulados, y el selector que cambia el color.
- Texto del cuerpo de 18 px o más, interlineado de 1,6 o más y contraste AA como mínimo.
- Funciona desde 375 px sin scroll horizontal: en móvil, `scrollWidth` debe ser igual a `clientWidth`.
- Foco del teclado visible.
- Con `prefers-reduced-motion` no se mueve nada.
- La tarjeta de reflexión nunca tapa la cara de Claudia.
- Animaciones con calma: solo `transform` y `opacity`, una vez por elemento, y nunca esconder contenido si falla JavaScript.
- Ver en local: `python3 -m http.server 8000` en la raíz y abrir http://localhost:8000.
