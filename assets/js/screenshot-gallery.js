// Lightbox for screenshot galleries
(function () {
  var roots = document.querySelectorAll('.screenshot-gallery');
  if (!roots.length) return;

  roots.forEach(function (root) {
    // Prevent double-initialization if the script is included multiple times on the page
    if (root.dataset.lbInit) return;
    root.dataset.lbInit = '1';

    var thumbs = root.querySelectorAll('.thumb');
    var box = root.querySelector('.lightbox');
    var img = box && box.querySelector('img');
    var closeBtn = box && box.querySelector('.close');
    if (!thumbs.length || !box || !img) return;

    var savedY = 0;
    function open(src, alt) {
      img.src = src;
      img.alt = alt || 'Screenshot';
      box.removeAttribute('hidden');
      savedY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + savedY + 'px';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.setAttribute('hidden', '');
      img.removeAttribute('src');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (typeof savedY === 'number') { window.scrollTo(0, savedY); }
    }
    thumbs.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var im = a.querySelector('img');
        open(a.getAttribute('data-full') || a.href, im ? im.alt : 'Screenshot');
      });
    });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    if (closeBtn) closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hasAttribute('hidden')) close(); });
  });
})();
