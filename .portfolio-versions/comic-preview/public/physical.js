(() => {
  'use strict';
  const tapes = [...document.querySelectorAll('.tape-project')];
  const records = new Map(tapes.map(tape => [tape, {detail:tape.querySelector('.project-detail'), title:tape.querySelector('h3')}]));
  const player = document.createElement('section');
  const close = document.createElement('button');
  close.className = 'tape-close';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Cerrar / Close');
  player.append(close);
  const compactRack = matchMedia('(max-width:480px)');
  const rack = document.querySelector('.tape-rack');
  player.className = 'tape-player';
  player.hidden = true;
  rack.after(player);
  const placePlayer = () => rack.append(player);
  // Evita el "golpe" de layout: el rack conserva su altura mientras hay un proyecto abierto.
  let lockedWidth = 0;
  const lockRack = () => { lockedWidth = window.innerWidth; rack.style.minHeight = getComputedStyle(rack).height; };
  const unlockRack = () => rack.style.removeProperty('min-height');
  window.addEventListener('resize', () => {
    if (rack.classList.contains('has-selection') && window.innerWidth !== lockedWidth) unlockRack();
  });
  compactRack.addEventListener('change', () => placePlayer(tapes.find(tape => tape.classList.contains('is-extracted'))));
  const english = () => document.documentElement.lang === 'en';
  const motionOff = () => document.documentElement.classList.contains('motion-off');
  function labelTape(tape) {
    const open = tape.classList.contains('is-extracted');
    const title = records.get(tape).title.textContent;
    tape.querySelector('.tape-title').textContent = title;
    tape.querySelector('.grip-label').textContent = english() ? (open ? '↓ RETURN' : '↑ PULL OUT') : (open ? '↓ GUARDAR' : '↑ SACAR');
    tape.querySelector('.tape-pull').removeAttribute('aria-label');
  }
  function setTape(tape, open) {
    const before = tape.getBoundingClientRect();
    const compact = compactRack.matches;
    if (open && !compact && !rack.classList.contains('has-selection')) lockRack();
    if (compact) document.documentElement.style.overflowAnchor = 'none';
    tape.classList.toggle('is-extracted', open);
    tape.querySelector('.tape-pull').setAttribute('aria-expanded', String(open));
    const {detail, title} = records.get(tape);
    detail.hidden = !open;
    if (open) {
      placePlayer(tape);
      title.id = `${detail.id}-title`;
      player.setAttribute('aria-labelledby', title.id);
      player.append(detail);
      player.hidden = false;
      rack.classList.add('has-selection');
      tapes.forEach(other => { other.hidden = other !== tape; });
    } else {
      tape.append(detail);
      player.hidden = !player.querySelector('.project-detail:not([hidden])');
      if (player.hidden) {
        rack.classList.remove('has-selection');
        unlockRack();
        tapes.forEach(other => { other.hidden = false; });
        tape.querySelector('.tape-pull').focus({preventScroll:true});
      }
    }
    tape.style.removeProperty('--pull');
    labelTape(tape);
    let after = tape.getBoundingClientRect();
    if (compact) {
      // Móvil: el casete se queda donde estaba en pantalla y la página se acomoda alrededor.
      window.scrollBy({top: after.top - before.top, behavior: 'instant'});
      after = tape.getBoundingClientRect();
      requestAnimationFrame(() => document.documentElement.style.removeProperty('overflow-anchor'));
    }
    if (!motionOff()) tape.animate([
      {transform:`translate(${before.left-after.left}px, ${before.top-after.top}px)`},
      {transform:'translate(0, 0)'}
    ], {duration:450, easing:'cubic-bezier(.2,.7,.2,1)'});
  }
  function toggleTape(tape, requested) {
    const open = requested ?? !tape.classList.contains('is-extracted');
    // Keep the collection compact: only one project is unpacked at a time.
    tapes.forEach(other => { if (other !== tape && other.classList.contains('is-extracted')) setTape(other, false); });
    setTape(tape, open);
  }
  tapes.forEach(tape => {
    const button = tape.querySelector('.tape-pull');
    const grip = tape.querySelector('.tape-grip');
    let drag = null, suppressClick = false, suppressionTimer;
    button.addEventListener('click', event => {
      if (suppressClick) { event.preventDefault(); suppressClick = false; return; }
      toggleTape(tape);
    });
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Escape') {
        event.preventDefault(); toggleTape(tape, event.key === 'ArrowUp');
      }
    });
    grip.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      drag = {y:event.clientY, id:event.pointerId, delta:0, wasOpen:tape.classList.contains('is-extracted')};
      grip.setPointerCapture(event.pointerId);
      button.focus({preventScroll:true});
    });
    grip.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.id) return;
      drag.delta = drag.y - event.clientY;
      if (Math.abs(drag.delta) < 5) return;
      tape.classList.add('is-dragging');
      tape.style.setProperty('--pull', String(Math.max(0,Math.min(95,(drag.wasOpen ? 65 : 0) + drag.delta))));
    });
    function endDrag(event) {
      if (!drag) return;
      const {delta, wasOpen} = drag;
      drag = null;
      tape.classList.remove('is-dragging'); tape.style.removeProperty('--pull');
      if (Math.abs(delta) > 7) {
        suppressClick = true;
        clearTimeout(suppressionTimer); suppressionTimer = setTimeout(() => suppressClick = false, 400);
        if (event.type !== 'pointercancel') toggleTape(tape, delta > 24 ? true : delta < -24 ? false : wasOpen);
      }
    }
    grip.addEventListener('pointerup', endDrag);
    grip.addEventListener('pointercancel', endDrag);
    grip.addEventListener('lostpointercapture', () => {
      if (drag) { drag = null; tape.classList.remove('is-dragging'); tape.style.removeProperty('--pull'); }
    });
    labelTape(tape);
  });
  window.addEventListener('comic-language-change', () => tapes.forEach(labelTape));
  function closeProject() {
    tapes.forEach(tape => {
      if (tape.classList.contains('is-extracted')) setTape(tape, false);
    });
  }
  close.addEventListener('click', closeProject);
  player.addEventListener('keydown', event => { if (event.key === 'Escape') closeProject(); });
  player.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
  player.addEventListener('click', event => {
    if (event.target === player) {
      const rect = player.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
    }
  });

  // The page geometry stays stable while the objects turn toward the pointer.
  const tilts = [...document.querySelectorAll('.comic-book')].map(element => ({element, prefix:'book', base:-12, range:12}));
  const booth = document.querySelector('.phone-booth');
  tilts.push({element:booth, prefix:'booth', base:-3, range:10});
  tilts.forEach(({element, prefix, base, range}) => {
    let frame = 0;
    const reset = () => {cancelAnimationFrame(frame); frame=0; element.style.removeProperty(`--${prefix}-rx`);element.style.removeProperty(`--${prefix}-ry`);};
    element.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || motionOff()) return;
      cancelAnimationFrame(frame);
      const {clientX, clientY} = event;
      frame = requestAnimationFrame(() => {
        if (motionOff()) return reset();
        const rect = element.getBoundingClientRect();
        element.style.setProperty(`--${prefix}-rx`, `${((clientY-rect.top)/rect.height-.5)*-range}deg`);
        element.style.setProperty(`--${prefix}-ry`, `${base+((clientX-rect.left)/rect.width-.5)*range}deg`);
      });
    });
    element.addEventListener('pointerleave', reset);
    document.querySelector('#motion')?.addEventListener('click', reset);
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', reset);
  });
})();
