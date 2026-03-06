// car-loader.js
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const carSlug = params.get('car');

  if (!carSlug) {
    // No car specified — redirect to main listing or show error page
    // Leaving on page could be acceptable; here we redirect to error for clarity
    window.location.href = 'error.html';
    return;
  }

  fetch('assets/data/cars.json')
    .then((res) => res.json())
    .then((data) => {
      const car = data[carSlug];
      if (!car) {
        window.location.href = 'error.html';
        return;
      }

      // SEO: title and meta description
      if (car.title) {
        document.title = `${car.title} - Apex Performance Car Rental`;
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && car.description) metaDesc.setAttribute('content', car.description);

      // Breadcrumb title / hero image
      const bcTitle = document.getElementById('car-breadcrumb-title');
      if (bcTitle) bcTitle.textContent = car.title || '';

      const hero = document.getElementById('car-hero-image');
      if (hero && car.hero_image) {
        hero.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${car.hero_image}") center/cover`;
      }

      // Title, price, deposit, description
      const titleEl = document.getElementById('car-title');
      if (titleEl) titleEl.textContent = car.title || '';

      const priceEl = document.getElementById('car-price');
      if (priceEl) priceEl.textContent = car.price || '';

      const depositEl = document.getElementById('car-deposit');
      if (depositEl) depositEl.textContent = car.deposit ? `Deposit: ${car.deposit}` : '';

      const descEl = document.getElementById('car-description');
      if (descEl) {
        // allow the description to contain paragraphs
        descEl.innerHTML = `<h5 class="title">Description</h5><p>${car.description || ''}</p>`;
      }

      // Gallery
      const gallery = document.getElementById('car-gallery');
      if (gallery && Array.isArray(car.gallery)) {
        gallery.innerHTML = ''; // clear existing
        car.gallery.forEach((img) => {
          const item = document.createElement('div');
          item.className = 'single-inventory-item';
          item.style.backgroundImage = `url('${img}')`;
          item.style.backgroundSize = 'cover';
          item.style.backgroundPosition = 'center';

          const inner = document.createElement('div');
          inner.className = 'single-inventory-img';
          const content = document.createElement('div');
          content.className = 'single-inventory-item-content';
          const a = document.createElement('a');
          a.href = img;
          a.className = 'simple-icon-btn popup-image';
          a.innerHTML = '<i class="fa-regular fa-image"></i> View Image';
          // car-loader.js
          window.addEventListener('DOMContentLoaded', function () {
            const params = new URLSearchParams(window.location.search);
            const slug = params.get('car');

            fetch('assets/data/cars.json')
              .then(res => res.json())
              .then(data => {
                let car = slug ? data[slug] : null;

                // If no matching slug, fallback to query params (title,img,price,category)
                if (!car) {
                  const title = params.get('title') || 'Unknown Car';
                  const img = params.get('img') || '';
                  const price = params.get('price') || '';
                  const deposit = params.get('deposit') || '';
                  const description = params.get('description') || '';

                  car = {
                    title,
                    hero_image: img,
                    gallery: img ? [img] : [],
                    price,
                    deposit,
                    description,
                    overview: {},
                    features: []
                  };
                }

                if (!car) { window.location.href = 'error.html'; return; }

                document.title = (car.title || 'Car') + ' - Our Fleet';
                const breadcrumb = document.getElementById('car-breadcrumb-title');
                if (breadcrumb) breadcrumb.textContent = car.title || '';

                const title = document.getElementById('car-title');
                if (title) title.textContent = car.title || '';

                const price = document.getElementById('car-price');
                if (price) price.textContent = car.price || '';

                const deposit = document.getElementById('car-deposit');
                if (deposit) deposit.textContent = car.deposit || '';

                const desc = document.getElementById('car-description');
                if (desc) desc.innerHTML = car.description || '';

                const hero = document.getElementById('car-hero-image');
                if (hero && car.hero_image) {
                  try {
                    hero.style.backgroundImage = `url('${car.hero_image}')`;
                    hero.setAttribute('data-bg-src', car.hero_image);
                  } catch (e) {}
                }

                // update last breadcrumb item to car title
                try {
                  const bcMenu = document.querySelector('.premium-breadcrumb .breadcumb-menu');
                  if (bcMenu) {
                    const items = bcMenu.querySelectorAll('li');
                    if (items && items.length) {
                      const last = items[items.length - 1];
                      if (last) last.textContent = car.title || last.textContent;
                    }
                  }
                } catch (e) {}

                const galleryWrap = document.getElementById('car-gallery');
                if (galleryWrap) {
                  if (car.gallery && car.gallery.length) {
                    galleryWrap.innerHTML = car.gallery.map(src => `<a href="${src}" class="popup-img"><img src="${src}" alt=""></a>`).join('');
                  } else if (car.hero_image) {
                    galleryWrap.innerHTML = `<a href="${car.hero_image}" class="popup-img"><img src="${car.hero_image}" alt=""></a>`;
                  } else {
                    galleryWrap.innerHTML = '';
                  }
                }

                // overview and features
                const overviewWrap = document.getElementById('car-overview');
                if (overviewWrap && car.overview) {
                  overviewWrap.innerHTML = Object.keys(car.overview).map(k => `<li><strong>${k}:</strong> ${car.overview[k]}</li>`).join('');
                }

                const featuresWrap = document.getElementById('car-features');
                if (featuresWrap && car.features) {
                  featuresWrap.innerHTML = car.features.map(f => `<li>${f}</li>`).join('');
                }

                // related (use other items from data if available)
                const relatedWrap = document.querySelector('#sports-carousel .swiper-wrapper');
                if (relatedWrap) {
                  const keys = Object.keys(data).filter(k => k !== slug);
                  const sample = keys.sort(() => 0.5 - Math.random()).slice(0,3);
                  relatedWrap.innerHTML = sample.map(k => {
                    const c = data[k];
                    return `<div class="swiper-slide"><div class="car-card"><a href="single-inventory.html?car=${k}"><img src="${c.hero_image}" alt=""><h4>${c.title}</h4></a></div></div>`;
                  }).join('');
                }

                // init magnific popup for gallery
                if (window.jQuery && jQuery.magnificPopup) {
                  jQuery('.popup-img').magnificPopup({type:'image', delegate: 'a', gallery: { enabled: true },});
                }
              })
              .catch(err => console.warn('car-loader error', err));
          });
                  <img src="${rc.hero_image || (rc.gallery&&rc.gallery[0])}" alt="${rc.title}" class="car-image">
                  <div class="car-overlay"></div>
                </div>
                <div class="car-info-container">
                  <h3 class="car-title">${rc.title}</h3>
                  <p class="car-category">${rc.category} <span class="separator">|</span> ${rc.brand}</p>
                  <div class="car-price-display"><span class="price-value">${rc.price}</span><span class="price-label">/ Per Day</span></div>
                  <div class="car-action-buttons"><a href="single-inventory.html?car=${rc.slug}" class="btn-action btn-view"><i class="fas fa-eye"></i></a></div>
                </div>
              </div>
            `;
            wrapper.appendChild(slide);
          });

          // re-init the swiper for sports-carousel (safe simple init)
          if (window.Swiper) {
            new Swiper('#sports-carousel', { slidesPerView: 1, spaceBetween: 30, loop: true, autoplay: { delay: 2800 }, navigation: { nextEl: '#sports-next', prevEl: '#sports-prev' }, breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } } });
          }
        }
      } catch (e) {
        console.warn('Related cars load failed', e);
      }
    })
    .catch((err) => {
      console.error('Failed to load cars.json', err);
      window.location.href = 'error.html';
    });
});
