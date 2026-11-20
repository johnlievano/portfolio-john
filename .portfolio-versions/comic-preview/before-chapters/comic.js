const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('waiting');observer.unobserve(e.target)}}),{rootMargin:'0px 0px 70px 0px',threshold:.05});
document.querySelectorAll('.reveal').forEach(el=>{if(!reduced.matches&&el.getBoundingClientRect().top>innerHeight)el.classList.add('waiting');observer.observe(el)});
document.querySelector('#motion').addEventListener('click',e=>{const paused=document.documentElement.classList.toggle('paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.textContent=paused?'Activar movimiento':'Pausar movimiento';syncMotion()});
document.querySelectorAll('.tool').forEach(el=>{let x=0,y=0,startX=0,startY=0,dragging=false;const render=()=>el.style.translate=`${x}px ${y}px`;el.addEventListener('pointerdown',e=>{dragging=true;startX=e.clientX-x;startY=e.clientY-y;el.setPointerCapture(e.pointerId)});el.addEventListener('pointermove',e=>{if(!dragging)return;x=Math.max(-30,Math.min(30,e.clientX-startX));y=Math.max(-50,Math.min(50,e.clientY-startY));render()});const stop=()=>dragging=false;el.addEventListener('pointerup',stop);el.addEventListener('pointercancel',stop);el.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Escape'].includes(e.key))return;e.preventDefault();if(e.key==='Escape')x=y=0;else{x=Math.max(-30,Math.min(30,x+(e.key==='ArrowRight'?10:e.key==='ArrowLeft'?-10:0)));y=Math.max(-50,Math.min(50,y+(e.key==='ArrowDown'?10:e.key==='ArrowUp'?-10:0)))}render()})});

// One frame per scroll event, with all layout reads before style writes.
const scene=document.querySelector('#scroll-scene');
const city=scene.querySelector('.scene-city'), laptop=scene.querySelector('.scene-laptop');
const words=scene.querySelector('.scene-words'), cards=scene.querySelectorAll('.scene-card');
const meter=scene.querySelector('.scene-meter i'), step=scene.querySelector('.scene-step');
const webSections=[...document.querySelectorAll('#scroll-scene,#stack,#contacto')].map(el=>({el,paths:[...el.querySelectorAll('.scroll-web path')]}));
const toolItems=[...document.querySelectorAll('.tool')];
const contactCity=document.querySelector('.contact-city');
let frame=0,motionOff=false;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
function drawScroll(){
 frame=0;if(motionOff)return;
 const height=innerHeight,rect=scene.getBoundingClientRect();
 const sectionRects=webSections.map(s=>s.el.getBoundingClientRect());
 const p=clamp(-rect.top/(rect.height-height));
 if(rect.top<height&&rect.bottom>0){
  const entrance=clamp(p*3.2),exit=clamp((p-.7)/.3);
  city.style.transform=`translate3d(${(-70+entrance*90-exit*12).toFixed(2)}%,${(p*-40).toFixed(2)}px,0) rotate(${(-18+p*27).toFixed(2)}deg)`;
  laptop.style.transform=`translate3d(${(80-entrance*105+exit*18).toFixed(2)}%,${(-p*100).toFixed(2)}px,90px) rotate(${(25-p*42).toFixed(2)}deg)`;
  words.style.transform=`translate3d(0,${(-p*75).toFixed(2)}px,${(-p*180).toFixed(2)}px)`;
  words.style.opacity=String(1-exit*.6);
  cards[0].style.transform=`translate3d(${(-70+p*130).toFixed(2)}%,${(80-p*90).toFixed(2)}px,${(p*140).toFixed(2)}px) rotateY(${(35-p*60).toFixed(2)}deg) rotateZ(${(-16+p*25).toFixed(2)}deg)`;
  cards[1].style.transform=`translate3d(${(70-p*110).toFixed(2)}%,${(120-p*110).toFixed(2)}px,${(-70+p*120).toFixed(2)}px) rotateY(${(-35+p*60).toFixed(2)}deg) rotateZ(${(18-p*24).toFixed(2)}deg)`;
  meter.style.transform=`scaleX(${p})`;
  const label=p<.33?'01 — IMAGINAR':p<.7?'02 — CONSTRUIR':'03 — DAR VIDA';if(step.textContent!==label)step.textContent=label;
 }
 webSections.forEach((s,i)=>{
  const r=sectionRects[i];if(r.top>height||r.bottom<0)return;
  const progress=i===0?clamp(p*1.9):clamp((height-r.top)/(height*.85));
  s.paths.forEach((path,j)=>path.style.strokeDashoffset=String(1-clamp(progress*1.5-j*.045)));
 });
 const toolsRect=sectionRects[1];
 if(toolsRect.top<height&&toolsRect.bottom>0){const q=clamp((height-toolsRect.top)/(height*.9));toolItems.forEach((el,i)=>el.style.transform=`translate3d(${((1-q)*(i%2?120:-120)).toFixed(2)}px,${((1-q)*80).toFixed(2)}px,0) rotateX(${((1-q)*50).toFixed(2)}deg) rotate(${((i%2?4:-4)+(1-q)*20).toFixed(2)}deg)`)}
 const cr=sectionRects[2];if(cr.top<height&&cr.bottom>0){const q=clamp((height-cr.top)/height);contactCity.style.transform=`translate3d(${(1-q)*45}%,${(1-q)*100}px,0) rotate(${(1-q)*15}deg)`}
}
function schedule(){if(!frame&&!motionOff)frame=requestAnimationFrame(drawScroll)}
function syncMotion(){motionOff=reduced.matches||document.documentElement.classList.contains('paused');document.documentElement.classList.toggle('motion-off',motionOff);if(motionOff){cancelAnimationFrame(frame);frame=0;toolItems.forEach(e=>e.style.transform='');contactCity.style.transform='';document.querySelectorAll('.reveal').forEach(e=>e.classList.remove('waiting'))}else schedule()}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',syncMotion);syncMotion();
// Pointer depth enhances desktop; touch keeps native vertical scrolling.
document.querySelectorAll('.portrait-panel,.project').forEach(el=>{
 let pointerFrame=0;
 el.addEventListener('pointermove',e=>{if(motionOff||e.pointerType==='touch')return;cancelAnimationFrame(pointerFrame);const x=e.clientX,y=e.clientY;pointerFrame=requestAnimationFrame(()=>{const r=el.getBoundingClientRect();const rx=((y-r.top)/r.height-.5)*-8,ry=((x-r.left)/r.width-.5)*10;el.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`})});
 el.addEventListener('pointerleave',()=>{cancelAnimationFrame(pointerFrame);el.style.transform=''});
});
