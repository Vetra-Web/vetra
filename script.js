document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after tapping a link (mobile)
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Copy phone number ---------- */
  var copyBtn = document.getElementById('copyBtn');
  var copyFeedback = document.getElementById('copyFeedback');

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', function () {
      var phone = copyBtn.getAttribute('data-phone') || '';

      function showFeedback(message) {
        copyFeedback.textContent = message;
        copyFeedback.classList.add('is-visible');
        clearTimeout(showFeedback._t);
        showFeedback._t = setTimeout(function () {
          copyFeedback.classList.remove('is-visible');
        }, 2200);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phone).then(function () {
          showFeedback('شماره کپی شد ✓');
        }).catch(function () {
          showFeedback('کپی انجام نشد، لطفاً دستی کپی کنید');
        });
      } else {
        // Fallback for older browsers
        var tempInput = document.createElement('input');
        tempInput.value = phone;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand('copy');
          showFeedback('شماره کپی شد ✓');
        } catch (err) {
          showFeedback('کپی انجام نشد، لطفاً دستی کپی کنید');
        }
        document.body.removeChild(tempInput);
      }
    });
  }

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 480) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }, { passive: true });
  }

  /* ---------- Footer year ---------- */
  var footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = '© ' + new Date().getFullYear() + ' Vetra';
  }

});
