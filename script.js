const projects = document.querySelectorAll('.project');
const filters = document.querySelectorAll('.filters button');
const modal = document.getElementById('modal');
const modalVideo = document.getElementById('modal-video');
const modalTitle = document.getElementById('modal-title');
const modalType = document.getElementById('modal-type');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close');
let activePreview = null;
let hoverTimer = null;

function previewUrl(project) {
  const id = project.dataset.video;
  const start = Number(project.dataset.start || 0);
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    playsinline: '1',
    rel: '0',
    iv_load_policy: '3',
    disablekb: '1',
    fs: '0',
    modestbranding: '1',
    enablejsapi: '1'
  });
  if (start > 0) params.set('start', start);
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function stopPreview() {
  clearTimeout(hoverTimer);
  if (activePreview) {
    const frame = activePreview.querySelector('.hover-preview');
    if (frame) frame.remove();
    activePreview.classList.remove('is-previewing');
    activePreview = null;
  }
}

function startPreview(project) {
  if (project.classList.contains('hidden')) return;
  if (activePreview === project) return;
  stopPreview();
  const media = project.querySelector('.project-media');
  if (!media) return;
  const iframe = document.createElement('iframe');
  iframe.className = 'hover-preview';
  iframe.src = previewUrl(project);
  iframe.title = `${project.dataset.title} preview`;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.setAttribute('tabindex', '-1');
  media.appendChild(iframe);
  project.classList.add('is-previewing');
  activePreview = project;
}

projects.forEach(project => {
  project.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(() => startPreview(project), 180);
  });
  project.addEventListener('mouseleave', stopPreview);
  project.addEventListener('focusin', () => startPreview(project));
  project.addEventListener('focusout', e => {
    if (!project.contains(e.relatedTarget)) stopPreview();
  });
  project.addEventListener('click', () => openProject(project));
});

filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  stopPreview();
  projects.forEach(project => {
    project.classList.toggle('hidden', filter !== 'all' && project.dataset.category !== filter);
  });
}));

function openProject(project) {
  stopPreview();
  const id = project.dataset.video;
  const start = Number(project.dataset.start || 0);
  const params = new URLSearchParams({autoplay:'1',rel:'0',playsinline:'1',modestbranding:'1'});
  if (start > 0) params.set('start', start);
  modalVideo.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?${params.toString()}" title="${project.dataset.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  modalTitle.textContent = project.dataset.title;
  modalType.textContent = project.dataset.type;
  modalDescription.textContent = project.dataset.description;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}

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
