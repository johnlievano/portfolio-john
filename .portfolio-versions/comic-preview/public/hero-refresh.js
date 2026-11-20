(() => {
 const ticker=document.querySelector('.ticker');
 const syncTicker=()=>{
  if(!ticker)return;
  const text=document.documentElement.lang==='en'?'IDEAS WITH PURPOSE ✦ CODE WITH PERSONALITY ✦ SOLUTIONS THAT CONNECT ✦':'IDEAS CON PROPÓSITO ✦ CÓDIGO CON PERSONALIDAD ✦ SOLUCIONES QUE CONECTAN ✦';
  const track=document.createElement('span');track.className='ticker-track';
  for(let i=0;i<2;i++){const copy=document.createElement('span');copy.textContent=text;track.append(copy);}
  ticker.replaceChildren(track);
 };
 syncTicker();window.addEventListener('comic-language-change',syncTicker);
 const role=document.querySelector('.hero-role');
 const syncRole=()=>{if(role && document.documentElement.lang!=='en') role.innerHTML='DESARROLLADOR FULLSTACK <span>· +2 AÑOS DE EXP</span>';};
 syncRole();
 window.addEventListener('comic-language-change',syncRole);
 const whatsapp=document.querySelector('.hero-socials a[aria-label="WhatsApp"] svg');
 if(whatsapp){
  whatsapp.setAttribute('viewBox','0 0 24 24');
  whatsapp.setAttribute('fill','none');
  whatsapp.setAttribute('stroke','currentColor');
  whatsapp.setAttribute('stroke-width','1.7');
  whatsapp.setAttribute('stroke-linecap','round');
  whatsapp.setAttribute('stroke-linejoin','round');
  whatsapp.innerHTML='<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>';
 }
 const cards=[...document.querySelectorAll('.process article')];
 const content=[
  {symbol:'',es:'Investigo qué necesitas, hago preguntas y convierto el problema en un plan claro.',en:'I research your needs, ask questions and turn the problem into a clear plan.'},
  {symbol:'</>',es:'Conecto interfaz, lógica y datos para construir una experiencia que funcione de principio a fin.',en:'I connect interfaces, logic and data to build an experience that works end to end.'},
  {symbol:'',es:'Reviso cada pantalla, mejoro los tiempos de carga y cuido los detalles antes de entregar.',en:'I review every screen, improve loading times and refine the details before delivery.'}
 ];
 cards.forEach((card,index)=>{
  const visual=document.createElement('div');
  visual.className='process-visual';
  visual.setAttribute('aria-hidden','true');
  const icon=document.createElement('span');
  icon.className='process-object';
  icon.textContent=content[index].symbol;
  visual.append(icon);
  card.prepend(visual);
  const button=document.createElement('button');button.className='process-toggle';button.type='button';button.setAttribute('aria-expanded','false');
  const detail=document.createElement('p');detail.className='process-detail';detail.id=`process-detail-${index}`;detail.hidden=true;button.setAttribute('aria-controls',detail.id);card.append(button,detail);
  button.addEventListener('click',()=>{detail.hidden=!detail.hidden;card.classList.toggle('is-active',!detail.hidden);button.setAttribute('aria-expanded',String(!detail.hidden));labels();});
  function labels(){const en=document.documentElement.lang==='en';detail.textContent=content[index][en?'en':'es'];button.textContent=detail.hidden?(en?'Explore ↗':'Explorar ↗'):(en?'Close ↑':'Cerrar ↑');}
  window.addEventListener('comic-language-change',labels);labels();
 });
})();
