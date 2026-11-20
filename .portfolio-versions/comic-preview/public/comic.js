const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('waiting');observer.unobserve(e.target)}}),{rootMargin:'0px 0px 70px 0px',threshold:.05});
document.querySelectorAll('.reveal').forEach(el=>{if(!reduced.matches&&el.getBoundingClientRect().top>innerHeight)el.classList.add('waiting');observer.observe(el)});
document.querySelector('#motion')?.addEventListener('click',e=>{const paused=document.documentElement.classList.toggle('paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.textContent=paused?'Activar movimiento':'Pausar movimiento';syncMotion()});

// One frame per scroll event, with all layout reads before style writes.
const scene=document.querySelector('#scroll-scene');
const book=scene.querySelector('.story-book'), pencil=scene.querySelector('.writing-pencil'), site=scene.querySelector('.realized-site'), sketchCopy=scene.querySelector('.sketch-copy');
const sketchPaths=[...scene.querySelectorAll('.sketch-layout path')];
const meter=scene.querySelector('.scene-meter i'), step=scene.querySelector('.scene-step');
const webSections=[...document.querySelectorAll('#scroll-scene,#stack,#contacto')].map(el=>({el,paths:[...el.querySelectorAll('.scroll-web path')]}));
const toolItems=[...document.querySelectorAll('.tool')];
toolItems.forEach(tool => {
 tool.addEventListener('click', () => {
  tool.setAttribute('aria-pressed', String(tool.getAttribute('aria-pressed') !== 'true'));
 });
});
let frame=0,motionOff=false;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
function drawScroll(){
 frame=0;if(motionOff)return;
 const height=innerHeight,rect=scene.getBoundingClientRect();
 const sectionRects=webSections.map(s=>s.el.getBoundingClientRect());
 const p=clamp(-rect.top/(rect.height-height));
 if(rect.top<height&&rect.bottom>0){
  const ease=t=>t*t*(3-2*t);
  const writing=clamp((p-.2)/.36);
  const unfold=ease(clamp((p-.57)/.28));
  const reveal=ease(clamp((p-.63)/.15));
  const breakout=ease(clamp((p-.75)/.17));
  scene.style.setProperty('--unfold',unfold);
  scene.style.setProperty('--breakout',breakout);
  book.style.opacity=String(1-reveal);
  pencil.style.opacity=String(clamp((p-.1)/.08)*(1-clamp((p-.55)/.07)));
  pencil.style.left=`${22+writing*42}%`;
  pencil.style.top=`${24+writing*25+Math.sin(writing*Math.PI*12)*2}%`;
  pencil.style.transform=`translate(-8%,-86%) rotate(${-12+Math.sin(writing*Math.PI*10)*4}deg)`;
  sketchCopy.style.clipPath=`inset(0 0 ${100-clamp(writing*2)*100}% 0)`;
  sketchPaths.forEach((path,i)=>path.style.strokeDashoffset=String(1-clamp((writing-.35)*6-i*.65)));
  site.style.opacity=String(reveal);
  site.style.visibility=reveal===0?'hidden':'visible';
  site.inert=reveal<.9 && !site.matches(':focus-within');
  meter.style.transform=`scaleX(${p})`;
  const labels=document.documentElement.lang==='en'?['01 — IMAGINE','02 — BUILD','03 — BRING TO LIFE']:['01 — IMAGINAR','02 — CONSTRUIR','03 — DAR VIDA'];const label=labels[p<.33?0:p<.7?1:2];if(step.textContent!==label)step.textContent=label;
 }
 webSections.forEach((s,i)=>{
  const r=sectionRects[i];if(r.top>height||r.bottom<0)return;
  const progress=i===0?clamp(p*1.9):clamp((height-r.top)/(height*.85));
  s.paths.forEach((path,j)=>path.style.strokeDashoffset=String(1-clamp(progress*1.5-j*.045)));
 });
 const toolsRect=sectionRects[1];
 if(toolsRect.top<height&&toolsRect.bottom>0){
  const q=clamp((height-toolsRect.top)/(height*.9));
  toolItems.forEach((el,i)=>el.style.setProperty('--scroll-reveal',String(clamp(q*1.8-i*.045))));
 }
}
function schedule(){if(!frame&&!motionOff)frame=requestAnimationFrame(drawScroll)}
function syncMotion(){motionOff=reduced.matches||document.documentElement.classList.contains('paused');document.documentElement.classList.toggle('motion-off',motionOff);if(motionOff){cancelAnimationFrame(frame);frame=0;site.inert=false;toolItems.forEach(e=>e.style.transform='');document.querySelectorAll('.reveal').forEach(e=>e.classList.remove('waiting'))}else schedule()}
addEventListener('comic-language-change',()=>{step.textContent=document.documentElement.lang==='en'?'01 — IMAGINE':'01 — IMAGINAR';schedule()});
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',syncMotion);syncMotion();
// Pointer depth enhances desktop; touch keeps native vertical scrolling.
document.querySelectorAll('.portrait-panel,.project:not(.tape-project)').forEach(el=>{
 let pointerFrame=0;
 el.addEventListener('pointermove',e=>{if(motionOff||e.pointerType==='touch')return;cancelAnimationFrame(pointerFrame);const x=e.clientX,y=e.clientY;pointerFrame=requestAnimationFrame(()=>{const r=el.getBoundingClientRect();const rx=((y-r.top)/r.height-.5)*-8,ry=((x-r.left)/r.width-.5)*10;el.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`})});
 el.addEventListener('pointerleave',()=>{cancelAnimationFrame(pointerFrame);el.style.transform=''});
});
