(() => {
 const section=document.querySelector('.secret-identity');
 const portrait=section.querySelector('img'); portrait.hidden=true;
 const stage=document.createElement('div');stage.className='finale-stage';stage.setAttribute('aria-hidden','true');
 stage.innerHTML='<div class="finale-skyline"></div><div class="finale-actor"><div class="finale-sprite"></div></div><div class="finale-ground"></div>';
 section.append(stage);
 const actor=stage.querySelector('.finale-actor'),sprite=stage.querySelector('.finale-sprite');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const spriteSheet = '/art/john-walk-sheet-hd.webp';
 sprite.style.backgroundImage = `url("${spriteSheet}")`;
 let currentPose;
 let ready=false,started=false,running=false,elapsed=0,last=0,raf=0,visible=false;
 const paused=()=>document.documentElement.classList.contains('paused');
 function pose(index) {
  if (currentPose === index) return;
  currentPose = index;
  sprite.style.backgroundPosition = `${(index % 4) * 100 / 3}% ${index < 4 ? 0 : 100}%`;
 }
 function stopX(){return stage.clientWidth*(innerWidth>750?.77:.5)-actor.offsetWidth/2;}
 function render(){const t=elapsed/1000,w=stage.clientWidth,size=actor.offsetWidth,stop=stopX();let x,index;
  if(t<3.5){x=-size+(stop+size)*t/3.5;index=Math.floor(t*8)%4;}
  else if(t<6.2){
   x=stop;
   index=t<3.8?4:[5,6,5,6][Math.floor((t-3.8)*5)%4];
  }
  else{x=stop+(w+size-stop)*(t-6.2)/3.5;index=Math.floor(t*8)%4;}
  actor.style.transform=`translateX(${Math.round(x * devicePixelRatio) / devicePixelRatio}px)`;pose(index);
 }
 function tick(now){raf=0;if(!running)return;if(!visible||document.hidden||paused()){last=0;return;}if(last)elapsed+=Math.min(now-last,80);last=now;render();if(elapsed>=9700){running=false;actor.style.opacity='0';return;}raf=requestAnimationFrame(tick);}
 function reset() {
  cancelAnimationFrame(raf);
  raf=0;
  started=false;
  running=false;
  elapsed=0;
  last=0;
 }
 function sync() {
  if (!ready) return;
  if (reduced.matches) {
   reset();
   actor.style.opacity='1';
   actor.style.transform=`translateX(${stopX()}px)`;
   pose(4);
   return;
  }
  if (!visible || document.hidden || paused()) return;
  if (!started) {
   started=true;
   running=true;
   actor.style.opacity='1';
   render();
  }
  if (running && !raf) raf=requestAnimationFrame(tick);
 }
 new IntersectionObserver(([entry]) => {
  visible=entry.intersectionRatio >= .2;
  if (!entry.isIntersecting && !reduced.matches) {
   reset();
   actor.style.opacity='0';
  }
  sync();
 }, {threshold:[0,.2]}).observe(section);
 const asset = new Image();
 asset.src = spriteSheet;
 asset.decode().then(() => {
  ready = true;
  sync();
 }).catch(() => {
  portrait.hidden=false;
  stage.hidden=true;
 });
 document.addEventListener('visibilitychange',sync);
 document.querySelector('#motion')?.addEventListener('click',sync);
 reduced.addEventListener('change',sync);
 window.addEventListener('resize',()=>{if(running)render();else actor.style.transform=`translateX(${stopX()}px)`;});
 actor.style.opacity='0';
})();
