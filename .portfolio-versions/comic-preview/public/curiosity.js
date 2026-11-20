(() => {
  const sky = document.querySelector('.origin-sky');
  if (!sky) return;

  const birds = [...sky.querySelectorAll('.origin-pigeon')].map(element => ({
    element, sprite: element.firstElementChild, pose: -1
  }));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const precisePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const narrow = matchMedia('(max-width: 750px)');
  const random = (min, max) => min + Math.random() * (max - min);
  const firstVisit = [{ bird: birds[1], arrival: -5, land: 0, leave: 4.5, end: 10 }];
  let visits = firstVisit;
  let nextRound = 12;
  let previousCount = 1;
  let time = 0;
  let previousFrame;
  let frame;
  let visible = false;
  let skyWidth;
  let pointer;

  function startRound() {
    // Most visits remain small; an occasional group fills more of the wire.
    const sizes = (narrow.matches ? [1, 2, 2, 3, 3, 4] : [1, 2, 2, 3, 4, 5, 6, 7]).filter(size => size !== previousCount);
    const count = sizes[Math.floor(Math.random() * sizes.length)];
    previousCount = count;
    const slots = [...birds];
    visits = Array.from({ length: count }, (_, index) => {
      const [bird] = slots.splice(Math.floor(Math.random() * slots.length), 1);
      const arrival = time + index * random(.7, 1.2);
      const land = arrival + random(4.7, 6);
      const leave = land + random(5.5, 9);
      return { bird, arrival, land, leave, end: leave + random(4.6, 6) };
    });
    nextRound = Math.max(...visits.map(visit => visit.end)) + random(2.5, 5);
  }

  function showPose(bird, pose) {
    if (bird.pose === pose) return;
    bird.sprite.style.backgroundPosition = `${(pose % 4) * 100 / 3}% ${pose < 4 ? 0 : 100}%`;
    bird.pose = pose;
  }

  const flightPose = seconds => [4, 5, 6, 5][Math.floor(seconds * 10) % 4];

  function drawVisit({ bird, arrival, land, leave, end, scaredAt, scaredX, scaredY }) {
    if (time < arrival || time >= end) return;
    let x = 0;
    let y = 0;
    let pose = 0;
    const { perch, size } = bird;
    if (scaredAt !== undefined) {
      const progress = Math.min(1, (time - scaredAt) / (end - scaredAt));
      x = scaredX + (skyWidth - perch + size - scaredX) * progress ** 1.4;
      y = scaredY - 105 * progress ** 1.15;
      pose = progress < .07 ? 3 : flightPose(time - scaredAt);
    } else if (time < land) {
      const remaining = (land - time) / (land - arrival);
      x = -(perch + size) * remaining ** 1.65;
      y = -65 * remaining ** 1.2 + Math.sin(remaining * Math.PI * 2) * 7;
      pose = land - time < 0.48 ? 7 : flightPose(time - arrival);
    } else if (time >= leave) {
      const progress = (time - leave) / (end - leave);
      x = (skyWidth - perch + size) * progress ** 1.5;
      y = -103 * progress ** 1.15;
      pose = flightPose(time - leave);
    } else if (leave - time < 0.28) {
      pose = 3;
    } else {
      // Quiet pauses punctuated by brief glances and head dips.
      const looking = (time - land + perch * 0.009) % 3.8;
      if (looking > 1 && looking < 1.35) pose = 1;
      if (looking > 2.5 && looking < 3.08) pose = 2;
    }
    bird.element.style.visibility = 'visible';
    bird.element.style.transform = `translate(${x}px, ${y}px)`;
    showPose(bird, pose);
  }

  function measure() {
    skyWidth = sky.clientWidth;
    for (const bird of birds) {
      bird.perch = bird.element.offsetLeft;
      bird.size = bird.element.offsetWidth;
      // Match the first SVG wire, including its responsive vertical scaling.
      const anchor = bird.perch + bird.size * 0.57;
      const t = Math.max(0, Math.min(1, anchor / skyWidth));
      const wireY = (1-t)**2 * 98 + 2*(1-t)*t*166 + t*t*94;
      bird.element.style.top = (wireY * sky.clientHeight / 165) + 'px';
    }
  }

  function scareNearby() {
    if (!pointer || !visible || reducedMotion.matches) return;
    const skyBounds = sky.getBoundingClientRect();
    if (pointer.y < skyBounds.top - 35 || pointer.y > skyBounds.bottom + 35) return;
    for (const visit of visits) {
      if (visit.scaredAt !== undefined || time < visit.arrival || time >= visit.leave || visit.land - time > 1.3) continue;
      const {bird, arrival, land} = visit;
      const centerX = skyBounds.left + bird.perch + bird.size / 2;
      const centerY = skyBounds.top + parseFloat(bird.element.style.top) - bird.size * .36;
      if (Math.hypot(pointer.x - centerX, pointer.y - centerY) > bird.size * .7 + 22) continue;
      const remaining = Math.max(0, (land - time) / (land - arrival));
      visit.scaredX = -(bird.perch + bird.size) * remaining ** 1.65;
      visit.scaredY = -65 * remaining ** 1.2 + Math.sin(remaining * Math.PI * 2) * 7;
      visit.scaredAt = time;
      visit.end = time + random(2.1, 2.8);
      showPose(visit.bird, 3);
    }
  }
  const section = document.querySelector('#historia');
  section.addEventListener('pointermove', event => {
    if (!precisePointer.matches || event.pointerType !== 'mouse') return;
    pointer = {x: event.clientX, y: event.clientY};
    scareNearby();
  }, {passive: true});
  section.addEventListener('pointerleave', () => { pointer = undefined; });

  function tick(now) {
    if (previousFrame !== undefined) time += Math.min(80, now - previousFrame) / 1000;
    previousFrame = now;
    if (time >= nextRound) startRound();
    scareNearby();
    for (const bird of birds) {
      const visit = visits.find(entry => entry.bird === bird && time >= entry.arrival && time < entry.end);
      if (visit) drawVisit(visit);
      else bird.element.style.visibility = 'hidden';
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    cancelAnimationFrame(frame);
    previousFrame = undefined;
    if (reducedMotion.matches) {
      for (const bird of birds) {
        bird.element.style.visibility = bird === birds[1] ? 'visible' : 'hidden';
        bird.element.style.transform = '';
        showPose(bird, 0);
      }
    } else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
  }

  measure();
  new ResizeObserver(measure).observe(sky);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(document.querySelector('#historia'));
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
})();
