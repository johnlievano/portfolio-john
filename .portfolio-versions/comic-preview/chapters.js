(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  let language = 'es';
  try { language = localStorage.getItem('comic-language') === 'en' ? 'en' : 'es'; } catch { /* Storage may be disabled. */ }
  const translations = [
    ['.reader-expand-tag', '⤢ Expand'],
    ['.skip', 'Skip to content'], ['nav a[href="#proyectos"]', 'Projects'],
    ['nav a[href="#stack"]', 'Toolkit'], ['nav a[href="#certificados"]', 'Learning'], ['nav a[href="#contacto"]', 'Contact'],
    ['.issue span:first-child', 'VOL. 01 / PERSONAL PORTFOLIO'], ['.issue span:last-child', 'DESIGN + CODE + A LITTLE CHAOS'],
    ['.hero-copy .eyebrow', 'SOFTWARE DEVELOPER'], ['.hero-statement', 'FROM IDEA<br><em>TO SOLUTION.</em>'], ['.hero-contact', 'Let’s talk about the next challenge ↗'], ['h1', 'JOHN <span>LIÉVANO</span>'],
    ['.hero-role', 'FULLSTACK DEVELOPER <span>| 2 YEARS OF EXPERIENCE</span>'],
    ['.intro', 'I build interfaces, APIs and applications that solve real problems with <strong>React, TypeScript and Node.js.</strong>'],
    ['.actions .button', 'Explore projects ↘'], ['.actions .text-link', 'Download résumé ↗'],
    ['.edition', 'FRONTEND & FULL-STACK · 2 YEARS OF EXPERIENCE'], ['.caption', 'ONE DEVELOPER. MANY STORIES.'], ['.burst', 'HELLO!'],
    ['.cover-bottom span:first-child', 'SCROLL TO THE NEXT PANEL'], ['.cover-bottom span:last-child', 'THIS STORY IS JUST BEGINNING'],
    ['.ticker', 'IDEAS THAT BECOME EXPERIENCES ✦ REACT ✦ TYPESCRIPT ✦ DESIGN WITH INTENT ✦'],
    ['#scene-title', 'IDEAS<br><em>COME TO LIFE.</em>'], ['.sketch-copy strong', 'An idea<br>takes shape…'],
    ['.demo-hero h3', 'And becomes<br><i>a solution.</i>'], ['.demo-cta', 'See what I build ↗'],
    ['.scene-caption span:last-child', 'KEEP SCROLLING ↓'],
    ['#historia>.eyebrow', '01 / BEHIND THE CHARACTER'], ['.origin h2', 'MY SUPERPOWER:<br><em>BRINGING YOUR IDEAS TO LIFE.</em>'],
    ['.origin .lead', 'I connect design, code and data to solve real problems.'],
    ['.process article:nth-child(1) h3', 'Understand'], ['.process article:nth-child(1) p', 'The problem, the people and what they need.'],
    ['.process article:nth-child(2) h3', 'Build'], ['.process article:nth-child(2) p', 'Thoughtful interfaces on a solid foundation.'],
    ['.process article:nth-child(3) h3', 'Polish'], ['.process article:nth-child(3) p', 'Details, performance and responsive design.'],
    ['#proyectos .section-heading .eyebrow', '02 / STORIES BROUGHT TO THE WEB'], ['#proyectos h2', 'MY <em>PROJECTS.</em>'],
    ['#proyectos .section-heading>p', '<span class="tape-lead">EVERY CASSETTE HAS A STORY.</span><br>Explore the work behind each project.'],
    ['.tape-instruction', 'Click a cassette to explore the project.'],
    ['#stack>.eyebrow', '03 / MY UTILITY BELT'], ['#stack h2', 'THE POWER IS<br>IN <em>WHAT YOU CREATE.</em>'],
    ['#stack>p:not([class])', 'Technologies I use to connect ideas with reality.'],
    ['#certificados>.eyebrow', '04 / MY KNOWLEDGE COLLECTION'], ['#certificados h2', 'EDUCATION &<br><em>LEARNING.</em>'],
    ['#certificados .section-heading>p', 'Choose an issue.<br>Open the comic and discover its story.'],
    ['.reader-top>span', 'LEARNING ARCHIVE'], ['#reader-original', 'View original certificate ↗'],
    ['#reader-prev', '← Previous'], ['#reader-next', 'Next →'],
    ['.contact-copy .eyebrow', '05 / THE LINE IS OPEN'], ['.contact-copy h2', 'LOOKING FOR A DEV?<br><em>LET?S TALK.</em>'],
    ['.contact-copy>p:nth-of-type(2)', 'Available for teams, companies and projects needing frontend or fullstack development.'],
    ['.contact-copy>p:nth-of-type(3)', 'Tell me about the challenge. We can build a solution together.'], ['.contact-direct', 'Message me on WhatsApp ↗'],
    ['.booth-message', 'Choose a line. I’m on the other end.'], ['.booth-hint', 'Let’s talk about your team or project.'],
    ['.booth-interior h3', 'LET’S TALK!'], ['.door-label', 'TAP TO OPEN'],
    ['.secret-identity .eyebrow', 'BEYOND THE PANEL'], ['#secret-title', 'JOHN LIÉVANO.<br><em>DEVELOPING WITH PURPOSE.</em>'],
    ['.secret-identity>div>p:not(.eyebrow)', 'A developer who turns challenges into useful digital solutions.'],
    ['.secret-identity .button', 'Let’s connect ↗'], ['.secret-end', 'TO BE CONTINUED…'],
    ['.footer-signature > span', 'Software developer'], ['.footer-top-label', 'Back to top'],
    ['.footer-rights', '© 2026 John Esteban Liévano. All rights reserved'],
    ['.footer-marvel', 'Spider-Man and Venom © Marvel. Independent portfolio, not affiliated'],
    ['.nav-toggle > span', 'Menu']
  ].map(([selector, en]) => { const element = $(selector); return {element, en, es: element?.innerHTML}; });
  const projects = [
    ['Corporate Landing Page', 'Energías Renovables Polo a Tierra', 'Modern frontend showcasing the services and projects of the renewable energy company Energías Renovables Polo a Tierra.'],
    ['Corporate Platform', 'Áurea Web', 'Full development of the agency website, with a focus on brand identity and loading speed.'],
    ['Enterprise Management System', 'Enterprise ERP Platform', 'Centralized ERP solution for managing companies, users and employee benefits. Includes role management, human resources modules and an administrative dashboard.'],
    ['E-commerce Infrastructure', 'AureaShop Template', 'Modular template for online stores. An architecture designed for scalability and easy maintenance.'],
    ['Full-Stack Platform', 'Aero Airlines', 'Flight booking system with visual seat selection, real-time flight status and secure authentication.'],
    ['Decoupled Architecture', 'Project Tracking System', 'Project management system using Google Apps Script as a backend API and Google Sheets as a relational database with role-based access.']
  ];
  document.querySelectorAll('.project').forEach((project, i) => {
    ['.project-info>.eyebrow', 'h3', '.project-info>p:not(.eyebrow)'].forEach((selector, j) => {
      const element = project.querySelector(selector);
      translations.push({element, es: element.innerHTML, en: projects[i][j]});
    });
  });
  const attributes = [...document.querySelectorAll('[aria-label],img[alt],.tool[title]')].map(element => ({
    element, label: element.getAttribute('aria-label'), alt: element.getAttribute('alt'), title: element.getAttribute('title')
  }));
  const altEnglish = {
    'Cabina telefónica británica roja en perspectiva tridimensional': 'Red British telephone kiosk in three-dimensional perspective',
    'Retrato ilustrado de John, con gafas y cabello rizado, trabajando en su portátil': 'Illustrated portrait of John, with glasses and curly hair, working on his laptop',
    'John con gafas y cabello rizado, traje de superhéroe bajo una chaqueta y la máscara en la mano': 'John with glasses and curly hair, a superhero suit under a jacket and a mask in his hand'
  };
  const repeatTranslations = [
    ['.book-open', 'ABRIR EDICIÓN ↗', 'OPEN ISSUE ↗'],
    ['.project-links a:first-child', 'Ver proyecto ↗', 'View project ↗'],
    ['.project-links a:last-child', 'Código en GitHub ↗', 'Code on GitHub ↗']
  ];
  const tagTranslations = {'Responsive Design':'Responsive Design', 'Frontend Moderno':'Modern Frontend', 'Rutas Dinámicas':'Dynamic Routes', 'Arquitectura Frontend':'Frontend Architecture'};
  document.querySelectorAll('.tags li').forEach(element => {
    if (tagTranslations[element.textContent]) translations.push({element, es:element.innerHTML, en:tagTranslations[element.textContent]});
  });
  const reader = $('#comic-reader');
  const readerPages = reader.querySelector('.reader-pages');
  const readerCover = document.createElement('div');
  readerCover.className = 'reader-cover';
  readerCover.setAttribute('aria-hidden', 'true');
  readerCover.hidden = true;
  readerPages.append(readerCover);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let coverAnimation;
  let readerClosing = false;
  let readerOpening = false;
  let books = [], currentBook = 0, lastBookButton;
  const readerStatus = $('#reader-count');
  const booth = $('.phone-booth'), door = $('.booth-door'), boothToggle = $('.booth-toggle'), interior = $('.booth-interior');
  booth.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && matchMedia('(hover:hover)').matches) {
      booth.classList.add('is-open');
      updateBooth();
    }
  });
  function updateBooth() {
    const open = booth.classList.contains('is-open');
    interior.inert = !open;
    interior.setAttribute('aria-hidden', String(!open));
    [door, boothToggle].forEach(button => button.setAttribute('aria-expanded', String(open)));
    const label = language === 'en' ? (open ? 'Close booth' : 'Open booth') : (open ? 'Cerrar cabina' : 'Abrir cabina');
    boothToggle.textContent = label + ' ↗';
    door.setAttribute('aria-label', `${door.querySelector('.door-label').textContent} — ${label}`);
  }
  [door, boothToggle].forEach(button => button.addEventListener('click', () => {
    booth.classList.toggle('is-open'); updateBooth();
    if (booth.classList.contains('is-open')) requestAnimationFrame(() => {
      if (booth.classList.contains('is-open')) interior.querySelector('a').focus({preventScroll:true});
    });
  }));
  booth.addEventListener('keydown', event => {
    if (event.key === 'Escape' && booth.classList.contains('is-open')) {
      booth.classList.remove('is-open'); updateBooth(); boothToggle.focus({preventScroll:true});
    }
  });
  function renderBook(animate = false) {
    if (!books.length) return;
    const book = books[currentBook];
    const edition = document.querySelector('.comic-book[data-book="' + currentBook + '"]');
    if (reader.open) {
      document.querySelectorAll('.comic-book.is-away').forEach(book => book.classList.remove('is-away'));
      edition.classList.add('is-away');
    }
    reader.style.setProperty('--book-color', edition.style.getPropertyValue('--book-color'));
    const art = $('#reader-art');
    art.src = edition.querySelector('.book-art img').src;
    $('#reader-title').textContent = book[0];
    $('#reader-issue').textContent = `JOHN.DEV / VOL. ${String(currentBook + 1).padStart(2, '0')}`;
    $('#reader-description').textContent = book[language === 'en' ? 4 : 3];
    const url = '/certificados/' + encodeURIComponent(book[1]);
    $('#reader-image').src = url;
    $('#reader-image').alt = `${language === 'en' ? 'Certificate' : 'Certificado'}: ${book[0]}`;
    $('#reader-original').href = url;
    readerStatus.textContent = `${currentBook + 1} / ${books.length}`;
    $('#reader-prev').disabled = currentBook === 0;
    $('#reader-next').disabled = currentBook === books.length - 1;
    if (animate && !reducedMotion.matches && !document.documentElement.classList.contains('motion-off')) {
      const pages = $('.reader-pages'); pages.classList.remove('turning');
      void pages.offsetWidth; pages.classList.add('turning');
    }
  }
  let turning = false;
  const cleanClone = element => {
    const clone = element.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(child => child.removeAttribute('id'));
    clone.querySelectorAll('a').forEach(link => link.removeAttribute('href'));
    clone.inert = true;
    return clone;
  };
  const leafFace = (element, extra = '') => {
    const face = document.createElement('div');
    face.className = 'leaf-face' + (extra ? ' ' + extra : '');
    face.append(element);
    return face;
  };
  const moveBook = async delta => {
    if (readerClosing || coverAnimation || turning) return;
    const next = Math.max(0, Math.min(books.length - 1, currentBook + delta));
    if (next === currentBook) return;
    if (reducedMotion.matches) { currentBook = next; renderBook(); return; }
    turning = true;
    const forward = delta > 0;
    const oldStory = cleanClone(reader.querySelector('.reader-story'));
    const oldProof = cleanClone(reader.querySelector('.reader-proof'));
    currentBook = next;
    renderBook();
    const newStory = cleanClone(reader.querySelector('.reader-story'));
    const newProof = cleanClone(reader.querySelector('.reader-proof'));

    const under = document.createElement('div');
    under.className = 'leaf-under';
    under.style.left = forward ? '0' : '50%';
    under.append(forward ? oldStory : oldProof);

    const leaf = document.createElement('div');
    leaf.className = 'reader-leaf';
    leaf.setAttribute('aria-hidden', 'true');
    leaf.style.left = forward ? '50%' : '0';
    leaf.style.transformOrigin = forward ? 'left center' : 'right center';
    leaf.append(
      leafFace(forward ? oldProof : oldStory),
      leafFace(forward ? newStory : newProof, 'leaf-back')
    );
    readerPages.append(under, leaf);
    await Promise.all([...leaf.querySelectorAll('img'), $('#reader-image'), $('#reader-art')].map(image => image.decode().catch(() => {})));
    await animatePart(leaf, [
      {transform: 'rotateY(0deg)'},
      {transform: 'rotateY(' + (forward ? -180 : 180) + 'deg)'}
    ], 900);
    under.remove();
    leaf.remove();
    turning = false;
  };
  $('#reader-prev').addEventListener('click', () => moveBook(-1));
  $('#reader-next').addEventListener('click', () => moveBook(1));

  async function animatePart(element, frames, duration) {
    const animation = element.animate(frames, {duration, easing:'cubic-bezier(.22,.7,.25,1)', fill:'both'});
    coverAnimation = animation;
    await animation.finished.catch(() => {});
    animation.cancel();
    coverAnimation = undefined;
  }
  const IDENTITY = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';
  function shelfPose(book, pageRect) {
    const rect = book.getBoundingClientRect();
    const matrix = getComputedStyle(book).transform;
    const dx = rect.left + rect.width / 2 - (pageRect.left + pageRect.width / 2);
    const dy = rect.top + rect.height / 2 - (pageRect.top + pageRect.height / 2);
    const sx = book.offsetWidth / (pageRect.width / 2);
    const sy = book.offsetHeight / pageRect.height;
    return `translate(${dx}px,${dy}px) ${matrix === 'none' ? IDENTITY : matrix} scale(${sx},${sy})`;
  }
  async function turnCover(opening) {
    if (reducedMotion.matches || document.documentElement.classList.contains('motion-off')) return;
    const book = document.querySelector('.comic-book[data-book="' + currentBook + '"]');
    if (!book) return;
    reader.classList.add('book-transition');
    readerPages.classList.remove('turning');
    readerCover.style.setProperty('--cover-color', book.style.getPropertyValue('--book-color') || '#ffda43');
    readerCover.style.backgroundImage = 'none';
    const lining = reader.querySelector('.reader-story').cloneNode(true);
    lining.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    lining.inert = true;
    lining.classList.add('cover-lining');
    readerCover.replaceChildren(book.querySelector('.book-cover').cloneNode(true), lining);
    readerCover.hidden = false;
    if (!opening) book.scrollIntoView({block:'nearest', behavior:'instant'});
    const pageRect = readerPages.getBoundingClientRect();
    const shelf = shelfPose(book, pageRect);
    const rest = `translate(0px,0px) ${IDENTITY} scale(1,1)`;
    const setPart = (translate, origin) => {
      readerCover.style.translate = translate;
      readerCover.style.transformOrigin = origin;
    };
    if (opening) {
      setPart('-50% 0', 'center');
      reader.classList.add('book-arriving');
      await animatePart(readerCover, [{transform:shelf, opacity:0}, {transform:shelf, opacity:1}], 140);
      book.classList.add('is-away');
      await animatePart(readerCover, [{transform:shelf}, {transform:rest}], 550);
      reader.classList.remove('book-arriving');
      reader.classList.add('book-unfolding');
      setPart('0 0', 'left center');
      await animatePart(readerCover, [{transform:'rotateY(0deg)'}, {transform:'rotateY(-180deg)'}], 850);
    } else {
      reader.classList.add('book-unfolding');
      setPart('0 0', 'left center');
      await animatePart(readerCover, [{transform:'rotateY(-180deg)'}, {transform:'rotateY(0deg)'}], 700);
      reader.classList.remove('book-unfolding');
      reader.classList.add('book-arriving');
      setPart('-50% 0', 'center');
      await animatePart(readerCover, [{transform:rest}, {transform:shelf}], 500);
      book.classList.remove('is-away');
      await animatePart(readerCover, [{transform:shelf, opacity:1}, {transform:shelf, opacity:0}], 160);
    }
    readerCover.hidden = true;
    readerCover.style.translate = '';
    readerCover.style.transformOrigin = '';
    reader.classList.remove('book-transition','book-arriving','book-unfolding');
  }
  async function closeReader() {
    if (!reader.open || readerClosing || readerOpening) return;
    readerClosing = true;
    if (coverAnimation) await coverAnimation.finished.catch(() => {});
    reader.classList.add('book-closing');
    await turnCover(false);
    reader.classList.remove('book-closing');
    reader.close();
    readerClosing = false;
  }
  $('#reader-close').addEventListener('click', closeReader);
  reader.addEventListener('cancel', event => {
    event.preventDefault();
    closeReader();
  });
  reader.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveBook(event.key === 'ArrowRight' ? 1 : -1); }
  });
  reader.addEventListener('click', event => {
    const rect = reader.getBoundingClientRect();
    if (event.target === reader && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeReader();
  });
  reader.addEventListener('close', () => lastBookButton?.focus({preventScroll:true}));
  const bookData = fetch('/books.json').then(response => { if (!response.ok) throw new Error('Book archive unavailable'); return response.json(); }).then(data => { books = data; return data; });
  // Attach a rejection handler immediately, including when no reader has been opened yet.
  bookData.catch(() => {});
  document.querySelectorAll('.comic-book').forEach(button => button.addEventListener('click', async () => {
    lastBookButton = button; currentBook = Number(button.dataset.book);
    try {
      await bookData;
      if (reader.open) return;
      renderBook();
      reader.showModal();
      reader.scrollTop = 0;
      readerOpening = true;
      await turnCover(true);
      readerOpening = false;
      $('#reader-close').focus({preventScroll:true});
    }
    catch {
      $('#reader-title').textContent = language === 'en' ? 'Archive unavailable' : 'Archivo no disponible';
      $('#reader-description').textContent = language === 'en' ? 'Please reload the page to try again.' : 'Recarga la página para intentarlo de nuevo.';
      $('#reader-expand').hidden = true; $('#reader-art').hidden = true; $('#reader-original').hidden = true; $('.reader-nav').hidden = true;
      reader.showModal();
    }
  }));
  function updateMotionLabel() {
    const paused = document.documentElement.classList.contains('paused');
    if ($('#motion')) $('#motion').textContent = language === 'en' ? (paused ? 'Enable motion' : 'Pause motion') : (paused ? 'Activar movimiento' : 'Pausar movimiento');
  }
  function applyLanguage() {
    document.documentElement.lang = language;
    translations.forEach(({element, es, en}) => { if (element) element.innerHTML = language === 'en' ? en : es; });
    repeatTranslations.forEach(([selector, es, en]) => document.querySelectorAll(selector).forEach(element => element.textContent = language === 'en' ? en : es));
    attributes.forEach(({element, label, alt, title}) => {
      if (label) element.setAttribute('aria-label', language === 'es' ? label : label.replace(/^Principal$/, 'Main').replace(/^Leer /, 'Read ').replace(/^Abrir /, 'Open ').replace(/^Mover sticker /, 'Move sticker ').replace('Cerrar cómic', 'Close comic'));
      if (alt) element.alt = language === 'es' ? alt : (altEnglish[alt] || alt.replace(/^Vista del proyecto /, 'Preview of ').replace(/^Vista de /, 'Preview of '));
      if (title) element.title = language === 'es' ? title : 'Drag or use the arrow keys';
    });
    $('#language').textContent = language === 'es' ? 'EN' : 'ES';
    $('#language').setAttribute('aria-label', language === 'es' ? 'EN — Cambiar a inglés' : 'ES — Switch to Spanish');
    $('.actions .text-link').href = language === 'es' ? '/CV_John_Esteban_Lievano.pdf' : '/CV John Esteban Liévano-en.pdf';
    document.title = language === 'es' ? 'John Esteban — Código entre viñetas' : 'John Esteban — Code between panels';
    $('meta[name="description"]').content = language === 'es' ? 'John Esteban Liévano, desarrollador fullstack. Proyectos, herramientas y formación en un portafolio ilustrado.' : 'John Esteban Liévano, fullstack developer. Projects, tools and learning in an illustrated portfolio.';
    updateMotionLabel(); updateBooth(); if (reader.open) renderBook();
    window.dispatchEvent(new Event('comic-language-change'));
  }
  $('#language').addEventListener('click', () => {
    language = language === 'es' ? 'en' : 'es';
    try { localStorage.setItem('comic-language', language); } catch { /* Keep the session choice. */ }
    applyLanguage();
  });
  $('#motion')?.addEventListener('click', updateMotionLabel);
  const zoom = $('#cert-zoom');
  $('#reader-expand').addEventListener('click', () => {
    if (!books.length || turning || readerOpening || readerClosing || zoom.open) return;
    const img = $('#reader-image');
    $('#cert-zoom-img').src = img.src;
    $('#cert-zoom-img').alt = img.alt;
    zoom.showModal();
  });
  zoom.addEventListener('click', event => {
    if (event.target === zoom || event.target.closest('.zoom-close')) zoom.close();
  });
  window.addEventListener('comic-language-change', () => {
    $('#reader-expand').setAttribute('aria-label', language === 'en' ? 'Expand certificate' : 'Expandir certificado');
    zoom.setAttribute('aria-label', language === 'en' ? 'Expanded certificate' : 'Certificado ampliado');
    zoom.querySelector('.zoom-close').setAttribute('aria-label', language === 'en' ? 'Close' : 'Cerrar');
  });
  applyLanguage();
})();
