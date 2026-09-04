const cursor=document.querySelector('.cursor');
if(cursor)window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});

const filterButtons=document.querySelectorAll('.filters button');
const projects=document.querySelectorAll('.project');
function applyFilter(filter){
  filterButtons.forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
  projects.forEach(p=>p.style.display=(filter==='all'||p.dataset.category===filter)?'block':'none');
}
filterButtons.forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter)));

document.querySelectorAll('[data-filter-link]').forEach(link=>{
  link.addEventListener('click',()=>applyFilter(link.dataset.filterLink));
});

const modal=document.getElementById('modal');
const modalTitle=document.getElementById('modal-title');
const modalType=document.getElementById('modal-type');
const modalDescription=document.getElementById('modal-description');
const modalVideo=document.getElementById('modal-video');

projects.forEach(project=>{
  project.addEventListener('click',()=>{
    modalTitle.textContent=project.dataset.title;
    modalType.textContent=project.dataset.type;
    modalDescription.textContent=project.dataset.description;
    const url=project.dataset.video;
    modalVideo.innerHTML=url
      ? `<iframe src="${url}" title="${project.dataset.title}" allow="autoplay; fullscreen" allowfullscreen></iframe>`
      : `<div style="height:100%;display:grid;place-items:center;color:#666;font:10px 'DM Mono',monospace;letter-spacing:.15em">ADD YOUR VIDEO URL</div>`;
    modal.classList.add('open');
    document.body.style.overflow='hidden';
  });
});
function closeModal(){modal.classList.remove('open');modalVideo.innerHTML='';document.body.style.overflow=''}
document.querySelector('.close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const reveal=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
      reveal.unobserve(e.target);
    }
  });
},{threshold:.08});
document.querySelectorAll('.project,.about-grid,.contact h2').forEach(el=>{
  el.style.opacity='0';el.style.transform='translateY(25px)';el.style.transition='opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)';
  reveal.observe(el);
});
