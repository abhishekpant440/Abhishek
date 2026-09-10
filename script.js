const projects = document.querySelectorAll('.project');
const filters = document.querySelectorAll('.filters button');
const modal = document.getElementById('modal');
const modalVideo = document.getElementById('modal-video');
const modalTitle = document.getElementById('modal-title');
const modalType = document.getElementById('modal-type');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close');

filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  projects.forEach(project => {
    project.classList.toggle('hidden', filter !== 'all' && project.dataset.category !== filter);
  });
}));

function openProject(project){
  const id = project.dataset.video;
  const start = Number(project.dataset.start || 0);
  const params = new URLSearchParams({autoplay:'1',rel:'0',modestbranding:'1',playsinline:'1'});
  if(start > 0) params.set('start', start);
  modalVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?${params.toString()}" title="${project.dataset.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  modalTitle.textContent = project.dataset.title;
  modalType.textContent = project.dataset.type;
  modalDescription.textContent = project.dataset.description;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}
projects.forEach(project => project.addEventListener('click', () => openProject(project)));
function closeModal(){modal.classList.remove('open');modalVideo.innerHTML='';document.body.style.overflow='';}
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

document.querySelectorAll('[data-filter-link]').forEach(link => link.addEventListener('click', () => {
  const target = link.dataset.filterLink;
  setTimeout(() => {
    const button = document.querySelector(`.filters button[data-filter="${target}"]`);
    if(button) button.click();
  }, 50);
}));
