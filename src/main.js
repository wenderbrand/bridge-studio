import "./style.css";

// ═══ CANVAS ═══
const canvas=document.getElementById('heroCanvas'),ctx=canvas.getContext('2d');
let particles=[],W,H,cmouse={x:-9999,y:-9999};
function resizeCanvas(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
resizeCanvas();window.addEventListener('resize',resizeCanvas);
class Particle{constructor(){this.reset();}
reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.size=Math.random()*1.8+0.4;this.speedX=(Math.random()-0.5)*0.3;this.speedY=(Math.random()-0.5)*0.3;this.opacity=Math.random()*0.4+0.08;this.pulseSpeed=Math.random()*0.015+0.004;this.pulseOffset=Math.random()*Math.PI*2;}
update(t){this.x+=this.speedX;this.y+=this.speedY;const dx=this.x-cmouse.x,dy=this.y-cmouse.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<150){this.x+=dx/dist*0.6;this.y+=dy/dist*0.6;}if(this.x<0)this.x=W;if(this.x>W)this.x=0;if(this.y<0)this.y=H;if(this.y>H)this.y=0;this.currentOpacity=this.opacity*(0.6+0.4*Math.sin(t*this.pulseSpeed+this.pulseOffset));}
draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fillStyle=`rgba(200,170,111,${this.currentOpacity})`;ctx.fill();}}
const pCount=Math.min(70,Math.floor(W*H/14000));
for(let i=0;i<pCount;i++)particles.push(new Particle());
function drawConnections(){for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(200,170,111,${(1-d/110)*0.06})`;ctx.lineWidth=0.5;ctx.stroke();}}}}
let frame=0;function animate(){ctx.clearRect(0,0,W,H);frame++;particles.forEach(p=>{p.update(frame);p.draw();});drawConnections();requestAnimationFrame(animate);}animate();
canvas.closest('.hero').addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();cmouse.x=e.clientX-r.left;cmouse.y=e.clientY-r.top;});

// ═══ LOADER ═══
window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('loader').classList.add('hidden'),2000);});

// ═══ CURSOR ═══
const glow=document.getElementById('cursorGlow');
document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});

// ═══ REVEAL ═══
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(l=>{l.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(l.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});});});

// ═══ NAV HIDE ═══
let lastS=0;const navEl=document.querySelector('nav');
window.addEventListener('scroll',()=>{const c=window.scrollY;navEl.style.transform=(c>lastS&&c>100)?'translateY(-100%)':'translateY(0)';lastS=c;});

// ═══ i18n ═══
const T={
'pt-br':{
'nav.work':'Portfólio','nav.about':'O Studio','nav.services':'Serviços','nav.contact':'Contato',
'hero.eyebrow':'Brand Design & Direção de Arte',
'hero.line1':'Estratégia visual','hero.line2':'que conecta','hero.line3':'marcas a pessoas',
'hero.desc':'A Bridge é um studio de brand design e direção de arte. Construímos identidades com estratégia, estética e posicionamento real de mercado.',
'hero.cta':'Solicitar orçamento','hero.cta2':'Ver projetos',
'projects.label':'Portfólio','projects.title':'Marcas que <em>construímos</em>',
'tag.artdir':'Direção de Arte','tag.vi':'Identidade Visual',
'about.label':'O Studio','about.title':'A ponte entre <em>estratégia</em> e estética','about.photo':'Foto do studio',
'about.p1':'<strong>Bridge é um studio de brand design e direção de arte</strong> fundado em Ponte Nova, MG. Criamos identidades visuais que posicionam, comunicam com clareza e geram percepção de valor — do naming à execução final.',
'about.p2':'Cada projeto nasce de uma visão estratégica. Não entregamos design decorativo — entregamos sistemas visuais com propósito, consistência e impacto real no negócio do cliente.',
'about.stat1':'Marcas criadas','about.stat2':'Anos no mercado','about.stat3':'Foco estratégico',
'services.label':'Serviços','services.title':'Como <em>transformamos</em> marcas',
'services.n2':'Direção de Arte','services.n4':'Brand Strategy',
'services.s1':'Naming, logo, tipografia, paleta de cores, guidelines e o universo visual completo da marca.',
'services.s2':'Conceito criativo, moodboards, direção visual para campanhas, conteúdo e materiais.',
'services.s3':'Sites institucionais, landing pages e interfaces digitais com foco em conversão e estética.',
'services.s4':'Posicionamento, tom de voz, arquitetura de marca e planejamento estratégico visual.',
'test.label':'Depoimentos','test.title':'Quem trabalhou com a <em>Bridge</em>',
'test.q1':'A Bridge capturou a essência da minha marca antes mesmo de eu conseguir articular. O resultado final não só atendeu — superou tudo que eu imaginava.',
'test.q2':'Nível de profissionalismo raro. Entregaram não só uma marca, mas um sistema visual completo que realmente nos diferencia no mercado.',
'test.q3':'O diferencial da Bridge é pensar design como ferramenta de negócio. Cada entrega veio com estratégia por trás, não só estética.',
'test.q4':'Já trabalhei com vários designers. A Bridge foi o primeiro studio que realmente entendeu posicionamento e soube traduzir isso visualmente.',
'test.r1':'CEO — Startup de Tecnologia','test.r2':'Fundador — E-commerce de Moda','test.r3':'Diretora de Marketing — Indústria','test.r4':'Advogada — Marca Pessoal',
'cta.label':'Próximo passo','cta.title':'Sua marca merece<br><em>ser lembrada</em>',
'cta.sub':'Conte sobre seu projeto. Vamos construir uma marca com estratégia, identidade forte e impacto real.','cta.btn':'Falar com a Bridge'
},
'pt-pt':{
'nav.work':'Portfólio','nav.about':'O Studio','nav.services':'Serviços','nav.contact':'Contacto',
'hero.eyebrow':'Brand Design & Direção de Arte',
'hero.line1':'Estratégia visual','hero.line2':'que conecta','hero.line3':'marcas a pessoas',
'hero.desc':'A Bridge é um studio de brand design e direção de arte. Construímos identidades com estratégia, estética e posicionamento real de mercado.',
'hero.cta':'Solicitar orçamento','hero.cta2':'Ver projetos',
'projects.label':'Portfólio','projects.title':'Marcas que <em>construímos</em>',
'tag.artdir':'Direção de Arte','tag.vi':'Identidade Visual',
'about.label':'O Studio','about.title':'A ponte entre <em>estratégia</em> e estética','about.photo':'Foto do studio',
'about.p1':'<strong>Bridge é um studio de brand design e direção de arte</strong> fundado em Ponte Nova, MG. Criamos identidades visuais que posicionam, comunicam com clareza e geram perceção de valor — do naming à execução final.',
'about.p2':'Cada projeto nasce de uma visão estratégica. Não entregamos design decorativo — entregamos sistemas visuais com propósito, consistência e impacto real no negócio do cliente.',
'about.stat1':'Marcas criadas','about.stat2':'Anos no mercado','about.stat3':'Foco estratégico',
'services.label':'Serviços','services.title':'Como <em>transformamos</em> marcas',
'services.n2':'Direção de Arte','services.n4':'Brand Strategy',
'services.s1':'Naming, logótipo, tipografia, paleta de cores, guidelines e o universo visual completo da marca.',
'services.s2':'Conceito criativo, moodboards, direção visual para campanhas, conteúdo e materiais.',
'services.s3':'Sites institucionais, landing pages e interfaces digitais com foco em conversão e estética.',
'services.s4':'Posicionamento, tom de voz, arquitetura de marca e planeamento estratégico visual.',
'test.label':'Testemunhos','test.title':'Quem trabalhou com a <em>Bridge</em>',
'test.q1':'A Bridge capturou a essência da minha marca antes mesmo de eu conseguir articular. O resultado final não só correspondeu — superou tudo o que imaginava.',
'test.q2':'Nível de profissionalismo raro. Entregaram não só uma marca, mas um sistema visual completo que realmente nos diferencia no mercado.',
'test.q3':'O diferencial da Bridge é pensar design como ferramenta de negócio. Cada entrega veio com estratégia por trás, não apenas estética.',
'test.q4':'Já trabalhei com vários designers. A Bridge foi o primeiro studio que realmente compreendeu posicionamento e soube traduzi-lo visualmente.',
'test.r1':'CEO — Startup de Tecnologia','test.r2':'Fundador — E-commerce de Moda','test.r3':'Diretora de Marketing — Indústria','test.r4':'Advogada — Marca Pessoal',
'cta.label':'Próximo passo','cta.title':'A tua marca merece<br><em>ser lembrada</em>',
'cta.sub':'Conta-nos sobre o teu projeto. Vamos construir uma marca com estratégia, identidade forte e impacto real.','cta.btn':'Falar com a Bridge'
},
'en':{
'nav.work':'Portfolio','nav.about':'The Studio','nav.services':'Services','nav.contact':'Contact',
'hero.eyebrow':'Brand Design & Art Direction',
'hero.line1':'Visual strategy','hero.line2':'that connects','hero.line3':'brands to people',
'hero.desc':'Bridge is a brand design and art direction studio. We build identities with strategy, aesthetics and real market positioning.',
'hero.cta':'Request a quote','hero.cta2':'View projects',
'projects.label':'Portfolio','projects.title':'Brands we <em>built</em>',
'tag.artdir':'Art Direction','tag.vi':'Visual Identity',
'about.label':'The Studio','about.title':'The bridge between <em>strategy</em> and aesthetics','about.photo':'Studio photo',
'about.p1':'<strong>Bridge is a brand design and art direction studio</strong> founded in Ponte Nova, Brazil. We create visual identities that position, communicate clearly and build perceived value — from naming to final execution.',
'about.p2':'Every project is born from a strategic vision. We don\'t deliver decorative design — we deliver visual systems with purpose, consistency and real business impact.',
'about.stat1':'Brands built','about.stat2':'Years in market','about.stat3':'Strategy-first',
'services.label':'Services','services.title':'How we <em>transform</em> brands',
'services.n2':'Art Direction','services.n4':'Brand Strategy',
'services.s1':'Naming, logo, typography, color palette, guidelines and the brand\'s complete visual universe.',
'services.s2':'Creative concept, moodboards, visual direction for campaigns, content and materials.',
'services.s3':'Corporate websites, landing pages and digital interfaces focused on conversion and aesthetics.',
'services.s4':'Positioning, tone of voice, brand architecture and strategic visual planning.',
'test.label':'Testimonials','test.title':'Who worked with <em>Bridge</em>',
'test.q1':'Bridge captured the essence of my brand before I could even articulate it. The final result didn\'t just meet expectations — it surpassed everything I imagined.',
'test.q2':'Rare level of professionalism. They delivered not just a brand, but a complete visual system that truly sets us apart in the market.',
'test.q3':'Bridge\'s edge is thinking of design as a business tool. Every deliverable came with strategy behind it, not just aesthetics.',
'test.q4':'I\'ve worked with many designers. Bridge was the first studio that truly understood positioning and knew how to translate it visually.',
'test.r1':'CEO — Tech Startup','test.r2':'Founder — Fashion E-commerce','test.r3':'Marketing Director — Industry','test.r4':'Lawyer — Personal Brand',
'cta.label':'Next step','cta.title':'Your brand deserves<br><em>to be remembered</em>',
'cta.sub':'Tell us about your project. Let\'s build a brand with strategy, strong identity and real impact.','cta.btn':'Talk to Bridge'
}};
function setLang(lang){document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));const t=T[lang];document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(t[k])el.innerHTML=t[k];});document.documentElement.lang=lang==='en'?'en':'pt';}
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
// ═══ PROJECT PAGES (SPA) ═══
const projects = {
  'projeto-1': {
    name: 'Defensoria Pública SP',
    year: '2025',
    tags: ['Branding',],
    cover: 'https://i.imgur.com/dlBe74S.jpeg',
    headline: 'Uma identidade visual completa que reposicionou a marca da Defensoria em todo o estado.',
    client: 'Defensoria Pública',
    sector: 'Assistência jurídica',
    scope: 'Posicionamento, Branding , Id. Visual',
    text1: '<strong>O desafio:</strong> A Defensoria Pública enfrentava dificuldades em transmitir, de forma clara e acessível, sua importância e atuação para a população. A comunicação visual existente não refletia plenamente os valores de acolhimento, confiança e justiça, além de apresentar pouca consistência e baixa identificação com o público. Era necessário desenvolver uma solução que aproximasse a instituição das pessoas, tornando sua presença mais clara, humana e confiável.',
    text2: '<strong>A solução:</strong> Foi desenvolvida uma identidade visual estratégica, pensada para reforçar os pilares da instituição e facilitar a comunicação com o público. O conceito criativo partiu da ideia de acessibilidade e acolhimento, traduzidos em uma linguagem visual simples, moderna e institucional ao mesmo tempo. As escolhas de cores, tipografia e elementos gráficos foram cuidadosamente definidas para transmitir confiança, seriedade e proximidade. O resultado foi uma identidade construída do zero, consistente e funcional, capaz de fortalecer o posicionamento da Defensoria e melhorar a percepção do público sobre seus serviços.',
    text3: '<strong>O resultado:</strong> A nova identidade visual trouxe mais clareza e consistência para a comunicação da Defensoria Pública, fortalecendo sua presença institucional e tornando sua atuação mais compreensível para a população. Com uma linguagem visual mais acessível e acolhedora, a instituição passou a transmitir maior confiança e proximidade, facilitando a conexão com o público. Além disso, o sistema visual desenvolvido permitiu maior padronização nos materiais, otimizando a aplicação da marca em diferentes canais e garantindo reconhecimento imediato. O projeto contribuiu para uma percepção mais moderna, organizada e alinhada aos valores da Defensoria, reforçando seu papel essencial na promoção da justiça e no atendimento à população.',
    gallery: [
      'https://i.imgur.com/jDrlA6y.jpeg',
      'https://i.imgur.com/RXUtT5K.jpeg',
      'https://i.imgur.com/D79wTvW.png'
    ],
    next: 'Daniel Oliveira'
  },
  'projeto-2': {
    name: 'Daniel Oliveira',
    year: '2025',
    tags: ['Identidade Visual', 'Branding'],
    cover: 'https://i.imgur.com/zrvudXt.jpeg',
    headline: 'Do conceito à execução: uma marca que comunica sofisticação em cada detalhe.',
    client: 'Daniel Oliveira',
    sector: 'Arquiteto e Urbanista',
    scope: 'Identidade Visual, Packaging, Brandbook',
    text1: '<strong>O desafio:Desenvolver uma identidade visual que refletisse o posicionamento profissional de Daniel Oliveira no mercado de arquitetura, transmitindo sofisticação, autoridade e atenção aos detalhes. A marca precisava se destacar em um segmento competitivo, criando uma presença forte, memorável e alinhada ao perfil de clientes que buscam projetos modernos e de alto padrão.',
    text2: '<strong>A solução:</strong> A identidade visual foi construída com base em um conceito minimalista e arquitetônico, explorando formas geométricas e uma tipografia limpa para reforçar precisão e profissionalismo. O símbolo foi desenvolvido a partir da inicial “D”, trazendo solidez e fácil reconhecimento. A paleta de cores e os elementos gráficos foram pensados para transmitir elegância e modernidade, enquanto o sistema visual garante versatilidade em diferentes aplicações, do digital ao físico.',
    text3: '<strong>O resultado:</strong> O projeto resultou em uma marca forte, sofisticada e altamente reconhecível, elevando a percepção de valor do profissional no mercado. A nova identidade transmite confiança e profissionalismo, contribuindo para atrair clientes mais alinhados com o seu posicionamento e facilitando a comunicação em todos os pontos de contato. A consistência visual fortalece a presença da marca e consolida sua imagem como referência em projetos arquitetônicos de qualidade.',
    gallery: [
      'https://i.imgur.com/Qo9YZMN.jpeg',
      'https://i.imgur.com/c2vrXzb.jpeg',
      'https://i.imgur.com/chb7MzX.jpeg'
    ],
    next: 'Kauan Show'
  },
  'projeto-3': {
    name: 'Kauan Show',
    year: '2024',
    tags: ['Identidade Visual', 'Branding'],
    cover: 'https://i.imgur.com/2uwVOAB.jpeg',
    headline: 'Projeto criado para um profissional de arte e design.',
    client: 'Kauan',
    sector: 'Design e Criação',
    scope: 'Posicionamento, Branding , Id. Visual',
    text1: '<strong>O desafio:</strong> Criar uma identidade visual que representasse a personalidade criativa e versátil de Kauan Show, um profissional da área de arte e design. O principal desafio era traduzir sua originalidade em uma marca forte e autêntica, capaz de se destacar em um mercado visualmente saturado, ao mesmo tempo em que transmitisse profissionalismo e coerência estética.',
    text2: '<strong>A solução:</strong> A identidade foi construída a partir de um conceito contemporâneo e expressivo, explorando contrastes marcantes, elementos gráficos dinâmicos e uma linguagem visual impactante. O símbolo foi desenvolvido de forma única, reforçando a personalidade da marca e garantindo alto reconhecimento. A paleta vibrante, aliada a composições modernas, cria um sistema visual flexível, ideal para aplicações digitais e promocionais.',
    text3: '<strong>O resultado:</strong> O projeto resultou em uma marca ousada, memorável e alinhada ao universo criativo do profissional. A nova identidade fortalece seu posicionamento, aumenta a percepção de valor e diferencia sua presença no mercado. Com uma comunicação visual consistente e marcante, Kauan Show passa a transmitir mais autoridade, autenticidade e conexão com seu público.',
    gallery: [
      'https://i.imgur.com/DKgZ7ye.jpeg',
      'https://i.imgur.com/JQKjFzT.jpeg',
      'https://i.imgur.com/53rjKV3.jpeg'
    ],
    next: 'Vies Suplementos'
  },
  'projeto-4': {
    name: 'Vies Suplementos',
    year: '2025',
    tags: ['Identidade Visual', 'Branding'],
    cover: 'https://i.imgur.com/TADgmeU.png',
    headline: 'Marca estratégica que transformou o conceito de suplementos naturais.',
    client: 'Vinicius',
    sector: 'Suplementos',
    scope: 'Posicionamento, Branding , Id. Visual',
    text1: '<strong>O desafio:</strong> Desenvolver uma identidade visual para a Vies Suplementos que transmitisse confiança, qualidade e naturalidade, destacando seus produtos em um mercado competitivo de saúde e bem-estar. O desafio era criar uma marca que equilibrasse o aspecto científico dos suplementos com uma comunicação acessível e próxima do público.',
    text2: '<strong>A solução:</strong> A identidade foi construída com base em um conceito limpo e moderno, utilizando uma paleta de cores associada à saúde e ao natural. Elementos gráficos sutis e uma tipografia clara foram escolhidos para reforçar a credibilidade da marca, enquanto o símbolo traz uma representação visual que remete ao cuidado e equilíbrio. O sistema visual foi pensado para funcionar de forma consistente em embalagens, redes sociais e materiais institucionais.',
    text3: '<strong>O resultado:</strong> O projeto resultou em uma marca confiável, moderna e alinhada ao universo de bem-estar. A nova identidade fortalece a presença da Vies no mercado, melhora a percepção de qualidade dos produtos e cria uma conexão mais direta com o público. Com uma comunicação visual consistente, a marca se posiciona de forma mais profissional e preparada para crescer no segmento de suplementos naturais.',
    gallery: [
      'https://i.imgur.com/GdSYJNc.png',
      'https://i.imgur.com/dc05V49.png',
      'https://i.imgur.com/j6Dn1ve.png'
    ],
    next: 'Dressfit'
  },
  'projeto-5': {
    name: 'Dressfit',
    year: '2025',
    tags: ['Identidade Visual', 'Branding'],
    cover: 'https://i.imgur.com/q5Tngte.jpeg',
    headline: 'Estratégia de marca e Posicionamento para uma loja de moda fitness feminina que queria se diferenciar.',
    client: 'Daiane',
    sector: 'Moda Fitness Feminina',
    scope: 'Posicionamento, Branding , Id. Visual',
    text1: '<strong>O desafio:</strong> Criar uma identidade visual para a Dressfit que representasse a força, a autoestima e o estilo da mulher moderna no universo fitness. O desafio era desenvolver uma marca que fosse ao mesmo tempo feminina e impactante, capaz de se destacar em um mercado competitivo e transmitir confiança, movimento e atitude.',
    text2: '<strong>A solução:</strong> A identidade foi construída com uma abordagem moderna e dinâmica, explorando tipografia marcante e elementos visuais que remetem ao movimento e à energia do lifestyle fitness. A paleta de cores foi pensada para equilibrar força e feminilidade, criando uma estética versátil e atraente. O sistema visual permite aplicações consistentes em peças como roupas, etiquetas, redes sociais e campanhas.',
    text3: '<strong>O resultado:</strong> O projeto resultou em uma marca forte, estilosa e altamente conectada com seu público. A nova identidade eleva a percepção de valor da Dressfit, fortalece seu posicionamento no segmento fitness feminino e cria uma presença visual marcante. Com consistência e personalidade, a marca se torna mais reconhecível e preparada para crescer no mercado.',
    gallery: [
      'https://i.imgur.com/UHpxY05.jpeg',
      'https://i.imgur.com/Dudjam7.jpeg,
      'https://i.imgur.com/XFfSc5f.png'
    ],
    next: 'Defensoria Pública SP'
  }
};

const projectPage = document.getElementById('projectPage');
const ppContent = document.getElementById('ppContent');
const ppBack = document.getElementById('ppBack');

function openProject(slug) {
  const p = projects[slug];
  if (!p) return;
  
  const nextP = projects[p.next];
  
  ppContent.innerHTML = `
    <div class="pp-hero">
      <img src="${p.cover}" alt="${p.name}">
      <div class="pp-hero-overlay">
        <div class="pp-tags">${p.tags.map(t => `<span class="pp-tag">${t}</span>`).join('')}</div>
        <h1 class="pp-title">${p.name}</h1>
        <div class="pp-year">${p.year}</div>
      </div>
    </div>
    <div class="pp-body">
      <div class="pp-section-label">Sobre o projeto</div>
      <p class="pp-desc">${p.headline}</p>
      
      <div class="pp-details">
        <div>
          <div class="pp-detail-label">Cliente</div>
          <div class="pp-detail-value">${p.client}</div>
        </div>
        <div>
          <div class="pp-detail-label">Setor</div>
          <div class="pp-detail-value">${p.sector}</div>
        </div>
        <div>
          <div class="pp-detail-label">Escopo</div>
          <div class="pp-detail-value">${p.scope}</div>
        </div>
      </div>

      <p class="pp-text">${p.text1}</p>
      <p class="pp-text">${p.text2}</p>

      <div class="pp-gallery">
        ${p.gallery.map(img => `<img src="${img}" alt="${p.name}">`).join('')}
      </div>

      <p class="pp-text">${p.text3}</p>

      <div class="pp-next" onclick="openProject('${p.next}')">
        <div>
          <div class="pp-next-label">Próximo projeto</div>
          <div class="pp-next-name">${nextP ? nextP.name : ''}</div>
        </div>
        <div class="pp-next-arrow">→</div>
      </div>
    </div>
  `;
  
  projectPage.classList.add('active');
  projectPage.scrollTop = 0;
  history.pushState(null, '', '#/' + slug);
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  projectPage.classList.remove('active');
  history.pushState(null, '', window.location.pathname);
  document.body.style.overflow = '';
}

// Click handlers for cards
document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
});

// Back button
ppBack.addEventListener('click', closeProject);

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const hash = window.location.hash;
  if (hash.startsWith('#/projeto-')) {
    openProject(hash.replace('#/', ''));
  } else {
    projectPage.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Open project if URL has hash on load
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash.startsWith('#/projeto-')) {
    setTimeout(() => openProject(hash.replace('#/', '')), 2100);
  }
});
