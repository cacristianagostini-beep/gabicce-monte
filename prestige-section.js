(function(){
"use strict";
const units={
a1:{label:'A1',floor:'Piano terra',area:'82,16',outdoor:'Giardino privato',size:'186,39',map:'assets/masterplan.jpg',x:17.6,y:48.8,points:'208,277 419,296 403,418 348,416 287,866 77,750 128,357 199,372',description:'La zona giorno si apre sul giardino privato: uno spazio da vivere, dentro e fuori casa.'},
a2:{label:'A2',floor:'Piano terra',area:'82,16',outdoor:'Giardino privato',size:'235,65',map:'assets/masterplan.jpg',x:54,y:65,points:'820,446 965,536 860,677 951,735 704,1077 465,973',description:'Il giardino più ampio del progetto, con 235,65 m² dedicati al tuo tempo all’aperto.'},
b1:{label:'B1',floor:'Piano primo',area:'80,58',outdoor:'Loggia',size:'21,41',map:'assets/masterplan-first.jpg',x:17.9,y:51.4,points:'192,414 345,436 308,741 145,717',description:'Una zona giorno con cucina, due camere e la loggia: scopri la distribuzione degli ambienti nella planimetria B1.'},
b2:{label:'B2',floor:'Piano primo',area:'80,58',outdoor:'Loggia',size:'21,41',map:'assets/masterplan-first.jpg',x:29.9,y:47.6,points:'351,365 518,389 479,690 318,669',description:'Spazi interni ed esterni da esplorare insieme. Apri la planimetria B2 e individua la sua posizione nel complesso.'},
b3:{label:'B3',floor:'Piano primo',area:'80,58',outdoor:'Loggia',size:'21,41',map:'assets/masterplan-first.jpg',x:44.3,y:55.3,points:'630,433 766,525 588,777 460,688',description:'Il living si affaccia sulla loggia. Esplora B3, la disposizione delle due camere e la sua posizione al primo piano.'},
b4:{label:'B4',floor:'Piano primo',area:'80,58',outdoor:'Loggia',size:'21,41',map:'assets/masterplan-first.jpg',x:53,y:65.8,points:'713,590 858,677 687,934 548,839',description:'Una residenza al primo piano con due camere e loggia. Scopri B4 attraverso la sua planimetria dedicata.'}
};

const gallery=[{src:'assets/exterior-sea.webp',title:'Il complesso nella luce del tramonto'},{src:'assets/exterior-front.webp',title:'La vista frontale e gli accessi'},{src:'assets/exterior-wide.webp',title:'Il progetto nel suo insieme'},{src:'assets/exterior-facade.webp',title:'Le facciate e gli spazi esterni'},{src:'assets/exterior-detail.webp',title:'I dettagli dell’architettura'}];

const accessories={
d1:{label:'Box D1',short:'D1',type:'Box auto',floor:'ground',size:'33',x:27.2,y:55.5},d2:{label:'Box D2',short:'D2',type:'Box auto',floor:'ground',size:'33',x:32.8,y:56.6},
c1:{label:'Parcheggio C1',short:'C1',type:'Parcheggio privato',floor:'ground',x:27.2,y:70.5},c2:{label:'Parcheggio C2',short:'C2',type:'Parcheggio privato',floor:'ground',x:31.2,y:72.6},c3:{label:'Parcheggio C3',short:'C3',type:'Parcheggio privato',floor:'ground',x:34.3,y:74.7},c4:{label:'Parcheggio C4',short:'C4',type:'Parcheggio privato',floor:'ground',x:37.6,y:77.1},c5:{label:'Parcheggio C5',short:'C5',type:'Parcheggio privato',floor:'ground',x:80.8,y:42.1},
sb1:{label:'Locale interrato B1',short:'B1',type:'Box / cantina',floor:'lower',size:'15,50',x:32.4,y:41},sb2:{label:'Locale interrato B2',short:'B2',type:'Box / cantina',floor:'lower',size:'15,50',x:31.5,y:50},sb3:{label:'Locale interrato B3',short:'B3',type:'Box / cantina',floor:'lower',size:'16,00',x:30.7,y:58},sb4:{label:'Locale interrato B4',short:'B4',type:'Box / cantina',floor:'lower',size:'15,50',x:75,y:62.4},sb5:{label:'Locale interrato B5',short:'B5',type:'Box / cantina',floor:'lower',size:'15,50',x:71.2,y:69.8},sb6:{label:'Locale interrato B6',short:'B6',type:'Box / cantina',floor:'lower',size:'16,00',x:67.2,y:76.4},
p1:{label:'Posto auto P1',short:'P1',type:'Posto auto interrato',floor:'lower',x:36.9,y:51.5},p2:{label:'Posto auto P2',short:'P2',type:'Posto auto interrato',floor:'lower',x:42.4,y:52.5},p3:{label:'Posto auto P3',short:'P3',type:'Posto auto interrato',floor:'lower',x:47.3,y:53.5},p4:{label:'Posto auto P4',short:'P4',type:'Posto auto interrato',floor:'lower',x:55.8,y:58.7},p5:{label:'Posto auto P5',short:'P5',type:'Posto auto interrato',floor:'lower',x:60.4,y:63.2},p6:{label:'Posto auto P6',short:'P6',type:'Posto auto interrato',floor:'lower',x:65.1,y:67.2}
};

const materials={warm:{title:'Toni caldi',description:'Le tonalità brune e ramate introducono profondità e contrasto nella palette del progetto.'},mineral:{title:'Superfici chiare',description:'La texture chiara dall’aspetto minerale porta luminosità e un contrappunto alle tonalità più intense.'},rhythm:{title:'Ritmo verticale',description:'La sequenza di elementi verticali introduce ritmo e richiama le tonalità calde del legno.'},stone:{title:'Materia naturale',description:'La texture di pietra irregolare richiama il paesaggio e il carattere materico delle facciate rappresentate nei render.'}};

function initialize(root){
 if(root.dataset.initialized)return;root.dataset.initialized='true';
 const $=name=>root.querySelector('[data-pe="'+name+'"]'),base=root.dataset.assets||'./assets/';
 const asset=path=>base+path.replace(/^assets\//,'');
 let active='a1',tab='residences',view='map',galleryIndex=0,accessKey='d1',materialKey='warm';
 const interests=Object.fromEntries(Object.keys(units).map(key=>[key,new Set()]));
 const unitFromURL=new URLSearchParams(location.search).get('residenza')?.toLowerCase();if(units[unitFromURL])active=unitFromURL;
 const interestLabels=()=>[...interests[active]].map(key=>accessories[key].label);
 function fireChange(){root.dispatchEvent(new CustomEvent('prestige:change',{bubbles:true,detail:{residenza:units[active].label,scheda:tab,pertinenze:[...interests[active]],pertinenzeDettagli:[...interests[active]].map(key=>({id:key,nome:accessories[key].label}))}}))}
 $('units').innerHTML=Object.entries(units).map(([key,u])=>'<button class="pe-unit" data-unit="'+key+'" aria-pressed="'+(key===active)+'"><strong>'+u.label+'</strong><small>'+u.floor.replace('Piano ','')+'</small></button>').join('');
 function render(){
  const u=units[active],a=accessories[accessKey];
  root.querySelectorAll('[data-unit]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.unit===active));root.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.tab===tab));root.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));
  $('viewSwitch').hidden=tab!=='residences';$('arrows').hidden=tab!=='exteriors';$('outlines').innerHTML='';$('pins').innerHTML='';$('stage').className='pe-stage';$('context').textContent='La tua selezione: '+u.label+(interests[active].size?' · '+interests[active].size+' pertinenz'+(interests[active].size===1?'a':'e')+' di interesse':'');
  if(tab==='residences'){
   $('visualLabel').textContent=u.floor.toUpperCase();$('image').src=asset(view==='map'?u.map:'assets/'+active+'-plan.jpg');$('image').alt=view==='map'?'Vista del '+u.floor.toLowerCase()+' del complesso':'Planimetria residenza '+u.label;$('caption').textContent=view==='map'?'Seleziona una residenza · Render di progetto':'Planimetria '+u.label+' · Elaborato di progetto';
   if(view==='map'){$('outlines').innerHTML='<polygon points="'+u.points+'"/>';$('pins').innerHTML=Object.entries(units).filter(([key,item])=>item.floor===u.floor).map(([key,item])=>'<button class="pe-pin" data-unit="'+key+'" aria-label="Seleziona residenza '+item.label+'" aria-pressed="'+(key===active)+'" style="left:'+item.x+'%;top:'+item.y+'%">'+item.label+'</button>').join('')}else $('stage').classList.add('is-plan');
   $('content').innerHTML='<span class="pe-eyebrow">'+u.floor.toUpperCase()+'</span><h3>Residenza '+u.label+'</h3><p>'+u.description+'</p><div class="pe-metrics"><div><small>APPARTAMENTO</small><strong>'+u.area+' <span>m²</span></strong></div><div><small>'+u.outdoor.toUpperCase()+'</small><strong>'+u.size+' <span>m²</span></strong></div></div><div class="pe-rooms">2 camere · 2 bagni* · Living con cucina</div><a class="pe-text-link" href="'+asset('assets/'+active+'-original.jpg')+'" download="Prestige-'+u.label+'-planimetria.jpg">Scarica la planimetria ↓</a>';
   $('footnote').textContent='Superfici da elaborati di progetto, non commerciali. * Un bagno e un bagno/lavanderia. Prezzo e dotazioni della singola unità da confermare.';
  }else if(tab==='exteriors'){
   const g=gallery[galleryIndex];$('stage').classList.add('is-exterior');$('visualLabel').textContent='IL PROGETTO, DA OGNI PROSPETTIVA';$('image').src=asset(g.src);$('image').alt=g.title;$('caption').textContent='Render generale del complesso';$('count').textContent=(galleryIndex+1)+' / '+gallery.length;
   $('content').innerHTML='<span class="pe-eyebrow">ARCHITETTURA</span><h3>'+g.title+'</h3><p>Esplora gli esterni, gli accessi e i dettagli del progetto.</p><div class="pe-thumbs">'+gallery.map((item,i)=>'<button data-gallery="'+i+'" aria-label="'+item.title+'" aria-pressed="'+(i===galleryIndex)+'"><img src="'+asset(item.src)+'" alt="" loading="lazy"></button>').join('')+'</div>';
   $('footnote').textContent='Render del progetto Sunset · NR Architecture, come da elaborati forniti. Le immagini illustrano il complesso e non la vista dalla singola residenza.';
  }else if(tab==='accessories'){
   $('visualLabel').textContent=a.floor==='ground'?'PERTINENZE · PIANO TERRA':'PERTINENZE · INTERRATO';$('image').src=asset('assets/access-'+a.floor+'.webp');$('image').alt='Tavola delle pertinenze al '+(a.floor==='ground'?'piano terra':'piano interrato');$('pins').innerHTML='<span class="pe-access-dot" style="left:'+a.x+'%;top:'+a.y+'%"></span>';$('caption').textContent=a.label+' · Posizione nel progetto';
   let options='';for(const [floor,title] of [['ground','Piano terra'],['lower','Piano interrato']])options+='<optgroup label="'+title+'">'+Object.entries(accessories).filter(([key,item])=>item.floor===floor).map(([key,item])=>'<option value="'+key+'" '+(key===accessKey?'selected':'')+'>'+item.label+'</option>').join('')+'</optgroup>';
   $('content').innerHTML='<label class="pe-select-label" for="'+root.id+'-access">ESPLORA BOX, CANTINE E POSTI AUTO</label><select id="'+root.id+'-access" data-access-select>'+options+'</select><h3>'+a.label+'</h3><div class="pe-size">'+(a.size?a.size+' <span>m²</span>':'<span>Superficie da confermare</span>')+'</div><p class="pe-small">'+(a.type==='Box / cantina'?'Locale indicato come “box/cantina” nella tavola di progetto. Destinazione da confermare.':a.type+' · '+(a.floor==='ground'?'Piano terra':'Piano interrato')+'.')+'</p><button class="pe-secondary" data-interest aria-pressed="'+interests[active].has(accessKey)+'">'+(interests[active].has(accessKey)?'Rimuovi dalle preferenze <span>✓</span>':'Mi interessa <span>＋</span>')+'</button><div class="pe-preferences">'+(interestLabels().length?interestLabels().join(' · '):'Nessuna pertinenza selezionata.')+'</div>';
   $('footnote').textContent='Le preferenze non costituiscono prenotazioni. Disponibilità, abbinamenti e inclusione nel prezzo sono da confermare. I locali interrati B1–B6 sono distinti dalle residenze B1–B4.';
  }else{
   const m=materials[materialKey];$('stage').classList.add('is-material');$('visualLabel').textContent='PALETTE PROGETTUALE';$('image').src=asset('assets/texture-'+materialKey+'.webp');$('image').alt=m.title+' · Texture di ispirazione';$('caption').textContent='Ispirazioni e texture del progetto';
   $('content').innerHTML='<span class="pe-eyebrow">MATERIA E CARATTERE</span><h3>'+m.title+'</h3><p>'+m.description+'</p><div class="pe-swatches">'+Object.entries(materials).map(([key,item])=>'<button data-material="'+key+'" aria-label="'+item.title+'" aria-pressed="'+(key===materialKey)+'"><img src="'+asset('assets/texture-'+key+'.webp')+'" alt="" loading="lazy"></button>').join('')+'</div><button class="pe-text-link" data-mood>Apri il moodboard ⤢</button>';
   $('footnote').textContent='Palette di ispirazione. Materiali, impieghi e finiture saranno precisati nel capitolato definitivo.';
  }
 }
 function selectUnit(key){active=key;render();fireChange()}
 function openImage(src,title){$('largeImage').src=src;$('largeImage').alt=title;$('imageTitle').textContent=title;$('imageDialog').showModal()}
 root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||!root.contains(b))return;
  if(b.dataset.unit){selectUnit(b.dataset.unit);return}
  if(b.dataset.tab){tab=b.dataset.tab;render();fireChange();return}
  if(b.dataset.view){view=b.dataset.view;render();return}
  if(b.dataset.gallery!==undefined){galleryIndex=Number(b.dataset.gallery);render();root.querySelector('[data-gallery="'+galleryIndex+'"]').focus();return}
  if(b.dataset.material){materialKey=b.dataset.material;render();root.querySelector('[data-material="'+materialKey+'"]').focus();return}
  if(b.hasAttribute('data-interest')){const set=interests[active];set.has(accessKey)?set.delete(accessKey):set.add(accessKey);render();root.querySelector('[data-interest]').focus();fireChange();return}
  if(b.hasAttribute('data-mood')){openImage(asset('assets/mood.webp'),'Moodboard del progetto');return}
  if(b.hasAttribute('data-close')){b.closest('dialog').close();return}
  if(b.dataset.request){
   const detail={residenza:units[active].label,tipo:b.dataset.request,pertinenze:[...interests[active]].map(key=>({id:key,nome:accessories[key].label}))};
   const handled=!root.dispatchEvent(new CustomEvent('prestige:contact',{bubbles:true,cancelable:true,detail}));
   if(handled)$('contactDialog').close();else $('requestStatus').textContent='Anteprima: richiesta '+(detail.tipo==='visita'?'di visita privata':'di brochure e prezzi')+' per '+detail.residenza+' pronta per il modulo contatti. Nessun messaggio inviato.';
  }
 });
 root.addEventListener('change',e=>{if(e.target.hasAttribute('data-access-select')){accessKey=e.target.value;render();root.querySelector('[data-access-select]').focus()}});
 $('prev').onclick=()=>{galleryIndex=(galleryIndex+gallery.length-1)%gallery.length;render()};$('next').onclick=()=>{galleryIndex=(galleryIndex+1)%gallery.length;render()};
 $('zoom').onclick=()=>openImage(tab==='residences'&&view==='plan'?asset('assets/'+active+'-original.jpg'):$('image').src,$('image').alt);
 $('contact').onclick=()=>{$('requestTitle').textContent='Residenza '+units[active].label;$('requestSummary').textContent=units[active].floor+' · '+units[active].area+' m²'+(interestLabels().length?' · Interesse per: '+interestLabels().join(', '):'');$('requestStatus').textContent='Anteprima: questi pulsanti passeranno la selezione al modulo contatti della landing.';$('contactDialog').showModal()};
 render();
 root.prestige={selectResidence(key){const value=String(key).toLowerCase();if(units[value])selectUnit(value)},getSelection(){return {residenza:units[active].label,pertinenze:[...interests[active]],pertinenzeDettagli:[...interests[active]].map(key=>({id:key,nome:accessories[key].label}))}}};
 fireChange();
}
function boot(){document.querySelectorAll('.prestige-explorer').forEach(initialize)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
