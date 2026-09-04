const cursor=document.querySelector('.cursor');
if(cursor){
  window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
}
const filters=document.querySelectorAll('.filter');
const projects=document.querySelectorAll('.project');
filters.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const value=btn.dataset.filter;
    projects.forEach(p=>{
      p.style.display=(value==='all'||p.dataset.category===value)?'block':'none';
    });
  });
});

const modal=document.getElementById('modal');
const video=document.getElementById('modal-video');
const title=document.getElementById('modal-title');
const type=document.getElementById('modal-type');
const description=document.getElementById('modal-description');
const closeModal=()=>{
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  video.src='';
  document.body.style.overflow='';
};
projects.forEach(project=>{
  project.addEventListener('click',()=>{
    title.textContent=project.dataset.title;
    type.textContent=project.dataset.type;
    description.textContent=project.dataset.description;
    video.src=project.dataset.video + (project.dataset.video.includes('?')?'&':'?') + 'autoplay=1';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
document.querySelector('.modal-close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// Small reveal effect
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:700,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'}
      );
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});
document.querySelectorAll('.project,.capability-list>div,.about-layout').forEach(el=>observer.observe(el));
