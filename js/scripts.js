window.addEventListener('DOMContentLoaded', () => {

  // ---------------------------
  // Navbar shrink
  // ---------------------------
  const navbarShrink = () => {
    const navbar = document.querySelector('#mainNav');
    if (!navbar) return;
    if (window.scrollY === 0) {
      navbar.classList.remove('navbar-shrink');
    } else {
      navbar.classList.add('navbar-shrink');
    }
  };
  navbarShrink();
  document.addEventListener('scroll', navbarShrink);

  // ---------------------------
  // Bootstrap ScrollSpy
  // ---------------------------
  const mainNav = document.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%', // ajustable selon le design
    });
  }

  // ---------------------------
  // Collapse responsive navbar
  // ---------------------------
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navLinks = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });



// Fermer le menu mobile si on clique en dehors
document.addEventListener('click', (e) => {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (!navbarCollapse.classList.contains('show')) return; // menu fermé, rien à faire

  // Vérifie si le clic est à l'intérieur du menu ou sur le bouton toggle
  if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
    navbarToggler.click(); // ferme le menu
  }
});


  // ---------------------------
  // Smooth scroll + active link
  // ---------------------------
  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  const sections = anchorLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  // smooth scroll au clic
  anchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navbarHeight = mainNav ? mainNav.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  // activation automatique du lien pendant le scroll
  const setActiveLink = () => {
    const scrollPos = window.scrollY + (mainNav ? mainNav.offsetHeight : 0) + 10; // offset léger
    sections.forEach((section, i) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        anchorLinks.forEach(link => link.classList.remove('active'));
        anchorLinks[i].classList.add('active');
      }
    });
  };
  document.addEventListener('scroll', setActiveLink);
  setActiveLink(); // initialisation

});