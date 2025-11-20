// ========================================
// MAIN.JS - Core Functionality
// ========================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollButtons();
  initHelpButton();
  initMobileMenu();
  initGoogleAnalytics();
});

// ========================================
// THEME TOGGLE (Light/Dark Mode)
// ========================================

function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  // Get saved theme from browser storage (defaults to dark if nothing saved)
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Apply saved theme when page loads
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
  updateThemeIcon(savedTheme);

  // When user clicks theme button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Check if light mode is currently active
      const isLightMode = document.body.classList.contains('light-mode');

      if (isLightMode) {
        // Switch to dark mode
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      } else {
        // Switch to light mode
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      }
    });
  }
}

// Update icon to show sun (for light mode) or moon (for dark mode)
function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark'
      ? '<i class="fas fa-sun"></i>'  // Show sun icon in dark mode
      : '<i class="fas fa-moon"></i>'; // Show moon icon in light mode
  }
}

// ========================================
// NAVIGATION - Active State
// ========================================

function initNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === 'index.html' && currentPage === '')) {
      link.classList.add('active');
    }
  });

  // Add scrolled class to navbar on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ========================================
// SCROLL BUTTONS (UP/DOWN)
// ========================================

function initScrollButtons() {
  const scrollUpBtn = document.getElementById('scrollUp');
  const scrollDownBtn = document.getElementById('scrollDown');

  if (scrollUpBtn || scrollDownBtn) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show/hide UP button
      if (scrollUpBtn) {
        if (scrollPosition > 300) {
          scrollUpBtn.classList.add('show');
        } else {
          scrollUpBtn.classList.remove('show');
        }
      }

      // Show/hide DOWN button
      if (scrollDownBtn) {
        if (scrollPosition + windowHeight < documentHeight - 100) {
          scrollDownBtn.classList.add('show');
        } else {
          scrollDownBtn.classList.remove('show');
        }
      }
    });

    // UP button click
    if (scrollUpBtn) {
      scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // DOWN button click
    if (scrollDownBtn) {
      scrollDownBtn.addEventListener('click', () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }
}

// ========================================
// HELP BUTTON & MODAL
// ========================================

function initHelpButton() {
  const helpButton = document.querySelector('.help-button');
  const helpModal = document.querySelector('.help-modal');
  const helpClose = document.querySelector('.help-modal-close');

  if (helpButton && helpModal) {
    helpButton.addEventListener('click', () => {
      helpModal.classList.add('show');
    });

    if (helpClose) {
      helpClose.addEventListener('click', () => {
        helpModal.classList.remove('show');
      });
    }

    // Close on outside click
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        helpModal.classList.remove('show');
      }
    });
  }
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');

      // Update icon
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navbarMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking a link
    const navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
}

// ========================================
// GOOGLE ANALYTICS
// ========================================

function initGoogleAnalytics() {
  // Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  // Make gtag available globally
  window.gtag = gtag;
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
