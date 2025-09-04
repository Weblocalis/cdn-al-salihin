window.addEventListener('DOMContentLoaded', event => {

  // ---------------------------
  // Navbar shrink
  // ---------------------------
  const navbarShrink = () => {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) return;
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
    } else {
      navbarCollapsible.classList.add('navbar-shrink');
    }
  };

  navbarShrink();
  document.addEventListener('scroll', navbarShrink);

  // ---------------------------
  // ScrollSpy Bootstrap
  // ---------------------------
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  }

  // ---------------------------
  // Collapse responsive navbar
  // ---------------------------
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
  responsiveNavItems.map(responsiveNavItem => {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  // ---------------------------
  // Smooth scroll + active link
  // ---------------------------
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const sections = Array.from(anchorLinks)
                        .map(link => document.querySelector(link.getAttribute('href')))
                        .filter(Boolean);

  // smooth scroll au clic
  anchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // lien actif pendant scroll
  const setActiveLink = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 4; // ajustable selon navbar
    sections.forEach((section, index) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < bottom) {
        anchorLinks.forEach(link => link.classList.remove('active'));
        anchorLinks[index].classList.add('active');
      }
    });
  };

  document.addEventListener('scroll', setActiveLink);
  setActiveLink(); // initialisation

});