(() => {
 const header = document.querySelector('header');
 const ticker = document.querySelector('.cover-centered + .ticker');
 const page = document.documentElement;
 // Use the full-size navbar at the top of the page as the height reference.
 const measure = new ResizeObserver(() => {
  if (!header.classList.contains('is-scrolled')) {
   page.style.setProperty('--cover-header-height', `${header.offsetHeight}px`);
  }
  if (ticker) page.style.setProperty('--cover-ticker-height', `${ticker.offsetHeight}px`);
 });
 measure.observe(header);
 if (ticker) measure.observe(ticker);
 const links = [...header.querySelectorAll('nav a')];
 const menu = header.querySelector('.nav-toggle');
 const mobile = matchMedia('(max-width:750px)');
 function setMenu(open) {
  header.classList.toggle('menu-open', open);
  menu.setAttribute('aria-expanded', String(open));
 }
 menu.hidden = false;
 header.classList.add('has-menu');
 menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
 header.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (mobile.matches && header.classList.contains('menu-open') && link.closest('nav')) menu.focus({preventScroll:true});
  setMenu(false);
 }));
 document.addEventListener('click', event => { if (!header.contains(event.target)) setMenu(false); });
 header.addEventListener('keydown', event => {
  if (event.key === 'Escape' && header.classList.contains('menu-open')) {
   setMenu(false);
   menu.focus();
  }
 });
 mobile.addEventListener('change', () => setMenu(false));
 const sections = links.map(link => document.querySelector(link.getAttribute('href')));
 let scheduled = false;
 function update() {
  scheduled = false;
  header.classList.toggle('is-scrolled', scrollY > 40);
  let active = null;
  sections.forEach((section, index) => {
   if (section && section.getBoundingClientRect().top <= 180) active = index;
  });
  links.forEach((link, index) => {
   if (index === active) link.setAttribute('aria-current', 'location');
   else link.removeAttribute('aria-current');
  });
 }
 addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
 }, {passive:true});
 update();
})();
