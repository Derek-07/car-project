// linkify-cards.js
// Ensure every .carousel-car-card links to single-inventory.html with useful fallback params
document.addEventListener('DOMContentLoaded', function () {
  const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  const slugify = s => normalize(s).replace(/\s+/g, '-');

  document.querySelectorAll('.carousel-car-card').forEach(card => {
    const titleEl = card.querySelector('.car-title');
    if (!titleEl) return;
    const titleText = titleEl.textContent.trim();
    const slug = slugify(titleText) || 'car';

    // find image src (img.car-image) or fallback to background image
    let imgSrc = '';
    const imgEl = card.querySelector('img.car-image');
    if (imgEl && imgEl.src) imgSrc = imgEl.getAttribute('src');
    else {
      const bg = card.querySelector('.car-image-container');
      if (bg) {
        const style = window.getComputedStyle(bg);
        const bgImg = style.backgroundImage || '';
        const m = bgImg.match(/url\((?:"|')?(.*?)(?:"|')?\)/);
        if (m) imgSrc = m[1];
      }
    }

    // price
    const priceEl = card.querySelector('.price-value');
    const priceText = priceEl ? priceEl.textContent.trim() : '';

    // category/brand
    const catEl = card.querySelector('.car-category');
    const catText = catEl ? catEl.textContent.replace(/\s*\|\s*/g, ' | ').trim() : '';

    const params = new URLSearchParams();
    params.set('car', slug);
    params.set('title', titleText);
    if (imgSrc) params.set('img', imgSrc);
    if (priceText) params.set('price', priceText);
    if (catText) params.set('category', catText);

    const href = `single-inventory.html?${params.toString()}`;

    // Add a 'view' button to action buttons (prepend)
    const actionWrap = card.querySelector('.car-action-buttons');
    if (actionWrap) {
      const existing = actionWrap.querySelector('a.btn-view');
      if (!existing) {
        const a = document.createElement('a');
        a.href = href;
        a.className = 'btn-action btn-view';
        a.innerHTML = '<i class="fas fa-eye"></i>';
        actionWrap.insertBefore(a, actionWrap.firstChild);
      }
    }

    // Make the title clickable
    if (titleEl) {
      const existing = titleEl.querySelector('a');
      if (!existing) {
        const aTitle = document.createElement('a');
        aTitle.href = href;
        aTitle.textContent = titleText;
        titleEl.textContent = '';
        titleEl.appendChild(aTitle);
      }
    }

    // Add overlay link on image container
    const imgWrap = card.querySelector('.car-image-container');
    if (imgWrap && !imgWrap.querySelector('.card-overlay-link')) {
      try { imgWrap.style.position = imgWrap.style.position || 'relative'; } catch (e) {}
      const aImg = document.createElement('a');
      aImg.href = href;
      aImg.className = 'card-overlay-link';
      aImg.style.position = 'absolute';
      aImg.style.inset = '0';
      aImg.style.zIndex = '5';
      aImg.style.display = 'block';
      aImg.setAttribute('aria-label', titleText);
      imgWrap.appendChild(aImg);
    }
  });
});
