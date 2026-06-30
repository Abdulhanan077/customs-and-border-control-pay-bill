document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. FEDERAL BANNER TOGGLE
  // ==========================================
  const bannerToggleBtn = document.getElementById('banner-toggle');
  const bannerDetails = document.getElementById('gov-banner-details');

  if (bannerToggleBtn && bannerDetails) {
    bannerToggleBtn.addEventListener('click', () => {
      const isExpanded = bannerToggleBtn.getAttribute('aria-expanded') === 'true';
      
      // Toggle active states
      bannerToggleBtn.classList.toggle('active');
      bannerDetails.classList.toggle('active');
      
      // Update ARIA
      bannerToggleBtn.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // ==========================================
  // 2. AMERICA 250 COUNTDOWN TIMER
  // ==========================================
  // Target: July 4, 2026, 00:00:00 EST (UTC-5) -> 2026-07-04T00:00:00-05:00
  const targetDate = new Date('2026-07-04T00:00:00-05:00').getTime();

  const daysVal = document.getElementById('days-val');
  const hoursVal = document.getElementById('hours-val');
  const minutesVal = document.getElementById('minutes-val');
  const secondsVal = document.getElementById('seconds-val');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysVal) daysVal.innerText = '00';
      if (hoursVal) hoursVal.innerText = '00';
      if (minutesVal) minutesVal.innerText = '00';
      if (secondsVal) secondsVal.innerText = '00';
      clearInterval(countdownInterval);
      return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Render values with padded zeros
    if (daysVal) daysVal.innerText = String(days).padStart(2, '0');
    if (hoursVal) hoursVal.innerText = String(hours).padStart(2, '0');
    if (minutesVal) minutesVal.innerText = String(minutes).padStart(2, '0');
    if (secondsVal) secondsVal.innerText = String(seconds).padStart(2, '0');
  }

  // Update immediately and set interval
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // ==========================================
  // 3. LEFT SIDEBAR ACCORDION TOGGLE
  // ==========================================
  const submenuToggles = document.querySelectorAll('.toggle-submenu');
  
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parentItem = toggle.closest('.sidebar-nav__item');
      if (parentItem) {
        parentItem.classList.toggle('expanded');
      }
    });
  });

  // ==========================================
  // 4. MOBILE NAVIGATION MENU TOGGLE
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const primaryNavLinks = document.getElementById('primary-nav-links');

  if (mobileMenuBtn && primaryNavLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      
      mobileMenuBtn.classList.toggle('open');
      primaryNavLinks.classList.toggle('open');
      
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // ==========================================
  // 5. SIMULATED SEARCH ACTION
  // ==========================================
  const searchInput = document.querySelector('.cbp-header__search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          alert(`Search Simulation:\nNo search backend is connected. You searched for: "${query}"\n\nThis replica is a high-fidelity static front-end presentation.`);
          searchInput.value = '';
        }
      }
    });
  }

  // ==========================================
  // 6. PARCEL TRACKING SEARCH (CASE INSENSITIVE)
  // ==========================================
  const parcelInput = document.getElementById('parcel-search-input');
  const parcelBtn = document.getElementById('parcel-search-btn');
  const parcelResult = document.getElementById('parcel-search-result');

  if (parcelBtn && parcelInput && parcelResult) {
    const performSearch = () => {
      const code = parcelInput.value.trim().toLowerCase();
      if (!code) {
        parcelResult.style.display = 'block';
        parcelResult.style.borderLeft = '3px solid #b22234';
        parcelResult.innerHTML = `<span style="color: #b22234; font-weight: 600; font-size: 14px;">Please enter a valid tracking number.</span>`;
        return;
      }

      if (code === 'cbptrk89981166') {
        parcelResult.style.display = 'block';
        parcelResult.style.borderLeft = '3px solid var(--color-success)';
        parcelResult.innerHTML = `
          <div>
            <strong style="color: var(--color-success); font-size: 14px;">Shipment Record Found</strong>
            <p style="margin: 0.25rem 0 0.5rem 0; font-size: 14.5px; color: #1b1b1b;">
              Consignee: <a href="parcel_details.html" style="font-weight: 700; color: var(--color-primary); text-decoration: underline;" id="parcel-link">Quirk Donald Williams</a>
            </p>
            <p style="margin: 0; font-size: 12px; color: #71767a;">Click on the name to open the official customs clearance form and invoice details.</p>
          </div>
        `;
      } else {
        parcelResult.style.display = 'block';
        parcelResult.style.borderLeft = '3px solid #5b616b';
        parcelResult.innerHTML = `<span style="color: #5b616b; font-size: 14px;">No customs records found for tracking number: <strong>${parcelInput.value}</strong>. Please check the spelling and try again.</span>`;
      }
    };

    parcelBtn.addEventListener('click', performSearch);
    parcelInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  // Highlight page when options cards are hovered
  const optionCards = document.querySelectorAll('.option-card');
  optionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--color-primary)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--color-border-light)';
    });
  });

});
