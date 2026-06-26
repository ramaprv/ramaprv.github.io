(function () {
  'use strict';

  const header     = document.getElementById('header');
  const menuBtn    = document.getElementById('menuBtn');
  const navList    = document.getElementById('navList');
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');
  const revealEls  = document.querySelectorAll('.reveal');

  // ----- Sticky header background -----
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Active nav link via IntersectionObserver -----
  const navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
  );

  sections.forEach(function (section) {
    navObserver.observe(section);
  });

  // ----- Mobile menu -----
  menuBtn.addEventListener('click', function () {
    var isOpen = navList.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navList.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-link')) {
      navList.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      navList.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ----- Project pagination -----
  (function () {
    var grid       = document.getElementById('projectsGrid');
    var pagination = document.getElementById('pagination');
    if (!grid || !pagination) return;

    var PER_PAGE   = 6;
    var allCards   = Array.prototype.slice.call(grid.querySelectorAll('.project-card'));
    var totalPages = Math.ceil(allCards.length / PER_PAGE);
    var current    = 1;

    function showPage(page) {
      current = page;

      // fade out
      grid.classList.add('paging');
      grid.classList.remove('visible');

      setTimeout(function () {
        allCards.forEach(function (card, i) {
          var inPage = i >= (page - 1) * PER_PAGE && i < page * PER_PAGE;
          card.style.display = inPage ? '' : 'none';
          if (inPage) card.classList.add('revealed');
        });

        renderPagination();

        // fade in
        requestAnimationFrame(function () {
          grid.classList.add('visible');
        });
      }, 200);
    }

    function renderPagination() {
      pagination.innerHTML = '';

      // prev arrow
      var prev = document.createElement('button');
      prev.className = 'page-btn arrow';
      prev.setAttribute('aria-label', 'Previous page');
      prev.textContent = '‹';
      if (current === 1) prev.disabled = true;
      prev.addEventListener('click', function () { showPage(current - 1); });
      pagination.appendChild(prev);

      // page numbers (show all if ≤7 pages, else compress)
      for (var p = 1; p <= totalPages; p++) {
        if (
          totalPages <= 7 ||
          p === 1 ||
          p === totalPages ||
          (p >= current - 1 && p <= current + 1)
        ) {
          var btn = document.createElement('button');
          btn.className = 'page-btn' + (p === current ? ' active' : '');
          btn.textContent = p;
          btn.setAttribute('aria-label', 'Page ' + p);
          (function (pg) {
            btn.addEventListener('click', function () { showPage(pg); });
          }(p));
          pagination.appendChild(btn);
        } else if (
          (p === current - 2 && current - 2 > 1) ||
          (p === current + 2 && current + 2 < totalPages)
        ) {
          var dots = document.createElement('span');
          dots.className = 'page-dots';
          dots.textContent = '…';
          pagination.appendChild(dots);
        }
      }

      // next arrow
      var next = document.createElement('button');
      next.className = 'page-btn arrow';
      next.setAttribute('aria-label', 'Next page');
      next.textContent = '›';
      if (current === totalPages) next.disabled = true;
      next.addEventListener('click', function () { showPage(current + 1); });
      pagination.appendChild(next);
    }

    // init — add paging class first so the grid starts transparent
    grid.classList.add('paging');
    showPage(1);
    // ensure it fades in on first render
    setTimeout(function () { grid.classList.add('visible'); }, 250);
  }());

  // ----- Scroll reveal -----
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ----- Smooth scroll for older Safari -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
