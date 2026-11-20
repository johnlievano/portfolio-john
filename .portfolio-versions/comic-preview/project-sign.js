(() => {
  const section = document.querySelector('#proyectos');
  const sign = section?.querySelector('.section-heading > p');
  const anchor = document.querySelector('.origin .making');
  if (!sign || !anchor) return;
  const ns = 'http://www.w3.org/2000/svg';
  const web = document.createElementNS(ns, 'svg');
  web.classList.add('project-sign-web');
  web.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(ns, 'path');
  const fibers = document.createElementNS(ns, 'path');
  path.classList.add('web-cord');
  fibers.classList.add('web-fibers');
  web.append(path, fibers);
  document.body.append(web);
  sign.style.transformOrigin = '50% 0';
  sign.style.transform = 'rotate(-5deg)';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const compactFrame = matchMedia('(max-width: 600px)');
  let sway = [];
  let suspension;
  const stopSway = () => { sway.forEach(animation => animation.cancel()); sway = []; };
  const playSway = (angles, duration, iterations = 1) => {
    if (reducedMotion.matches || !suspension) return;
    stopSway();
    const {dx, dy} = suspension;
    const timing = {duration, iterations, easing:'linear'};
    sway = [
      sign.animate(angles.map(degrees => {
        const radians = degrees * Math.PI / 180;
        const tx = dx * (Math.cos(radians) - 1) - dy * Math.sin(radians);
        const ty = dx * Math.sin(radians) + dy * (Math.cos(radians) - 1);
        return {transform:`translate(${tx}px, ${ty}px) rotate(${degrees - 5}deg)`, easing:'ease-in-out'};
      }), timing),
      web.animate(angles.map(degrees => ({transform:`rotate(${degrees}deg)`, easing:'ease-in-out'})), timing)
    ];
  };
  const startIdleSway = () => playSway([0, .7, -.55, .4, -.22, 0], 7200, Infinity);
  sign.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    playSway([0, 3, -2.4, 1.7, -1, .4, 0], 3200);
    sway[0]?.finished.then(() => { startIdleSway(); }).catch(() => {});
  });
  reducedMotion.addEventListener('change', () => reducedMotion.matches ? stopSway() : startIdleSway());
  let frame;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      stopSway();
      const a = anchor.getBoundingClientRect();
      const b = sign.getBoundingClientRect();
      const angle = 5 * Math.PI / 180;
      const targetX = b.left + sign.offsetWidth * Math.cos(angle) / 2;
      const targetY = b.top + sign.offsetWidth * Math.sin(angle) / 2;
      const sourceX = Math.min(a.right - 24, Math.max(a.left + 24, targetX - 25));
      // Start below the visible lower edge, including the solid frame shadow.
      const top = a.bottom + (compactFrame.matches ? 5 : 8);
      const left = Math.min(sourceX, targetX) - 35;
      const width = Math.abs(targetX - sourceX) + 70;
      const height = Math.max(1, targetY - top + 25);
      Object.assign(web.style, {left:`${left + scrollX}px`, top:`${top + scrollY}px`, width:`${width}px`, height:`${height}px`});
      web.setAttribute('viewBox', `0 0 ${width} ${height}`);
      const x = sourceX - left, end = targetX - left, bottom = targetY - top;
      web.style.transformOrigin = `${x}px 0px`;
      suspension = {dx:targetX - sourceX, dy:targetY - top};
      path.setAttribute('d', `M ${x} 0 C ${x - 9} ${bottom * .35} ${end + 9} ${bottom * .7} ${end} ${bottom + 3}`);
      let d = '';
      for (let i = 0; i < 7; i++) {
        const shift = (i - 3) * .8;
        d += ` M ${x + shift} 0 Q ${x - 7 + shift} ${bottom * .5} ${end + shift} ${bottom}`;
      }
      for (let i = 0; i < 9; i++) {
        const yy = bottom - 22 + i * 3;
        d += ` M ${end - 4} ${yy} Q ${end + 7} ${yy + 2} ${end - 3} ${yy + 4}`;
      }
      d += ` M ${end} ${bottom - 6} Q ${end - 10} ${bottom + 3} ${end - 19} ${bottom + 8} M ${end} ${bottom - 4} Q ${end + 9} ${bottom + 4} ${end + 18} ${bottom + 11}`;
      fibers.setAttribute('d', d);
      startIdleSway();
    });
  };
  const observer = new ResizeObserver(update);
  [anchor, sign, section, document.body].forEach(el => observer.observe(el));
  window.addEventListener('resize', update);
  document.fonts.ready.then(update);
  update();
})();
