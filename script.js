// Insert year
document.getElementById('year').textContent = new Date().getFullYear();

// Typing cursor (CSS blink handles it). No heavy typing logic to keep it accessible.

// Skill bar animation
function animateSkills(){
  document.querySelectorAll('.bar i').forEach(i=>{
    const val = parseInt(i.getAttribute('data-val') || '60', 10);
    i.style.width = val + '%';
  });
}

// Intersection Observer for skill bars - animate when scrolled into view
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const bars = entry.target.querySelectorAll('.bar i');
      bars.forEach(i => {
        const val = parseInt(i.getAttribute('data-val') || '60', 10);
        i.style.width = val + '%';
      });
    }
  });
}, { threshold: 0.3 });

// Trigger skill animation after initial load or when visible
document.addEventListener('DOMContentLoaded', ()=>{
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // Fade-up reveal delays
  document.querySelectorAll('.fade-up').forEach((el, idx)=>{
    el.style.animationDelay = (idx * 80) + 'ms';
  });

  // Active navigation on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sticky-nav a');

  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav(); // Set initial state

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  function toggleScrollTopBtn() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollTopBtn);
  toggleScrollTopBtn(); // Set initial state

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Theme toggle
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', ()=>{
  const root = document.documentElement;
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  themeBtn.setAttribute('aria-pressed', next === 'light');
});

// Download CV button behaviour
document.getElementById('downloadCvBtn').addEventListener('click', ()=>{
  const a = document.getElementById('cvLink');
  if (a) a.click();
});

// Respect reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.fade-up').forEach(e=>{
    e.style.animation = 'none';
    e.style.opacity = 1;
    e.style.transform = 'none';
  });
  document.querySelectorAll('.bar i').forEach(i=>{
    i.style.transition = 'none';
    i.style.width = i.getAttribute('data-val') + '%';
  });
  // Disable smooth scroll
  document.documentElement.style.scrollBehavior = 'auto';
}
