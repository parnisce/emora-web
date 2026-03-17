document.addEventListener('DOMContentLoaded', () => {
  console.log('Emora Website Initialized');

  // Header Scroll Effect
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Animate hamburger to X
      const bars = menuToggle.querySelectorAll('span');
      if (bars.length >= 3) {
        if (menuToggle.classList.contains('active')) {
          (bars[0] as HTMLElement).style.transform = 'translateY(8px) rotate(45deg)';
          (bars[1] as HTMLElement).style.opacity = '0';
          (bars[2] as HTMLElement).style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
          (bars[0] as HTMLElement).style.transform = 'none';
          (bars[1] as HTMLElement).style.opacity = '1';
          (bars[2] as HTMLElement).style.transform = 'none';
        }
      }
    });
  }

  // Scroll Reveal Implementation
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // Parallax Effect for Hero
  const parallaxImg = document.querySelector('.parallax') as HTMLElement;
  window.addEventListener('scroll', () => {
    if (parallaxImg) {
      const speedStr = parallaxImg.getAttribute('data-speed');
      const speed = speedStr ? parseFloat(speedStr) : 0.05;
      const yPos = window.scrollY * speed;
      parallaxImg.style.transform = `translateY(${yPos}px)`;
    }
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Simple form submission handler
  const contactForm = document.querySelector('.contact-form') as HTMLFormElement;
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      if (btn) {
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
          alert('Thank you for your message! We will get back to you soon.');
          btn.innerText = originalText;
          btn.disabled = false;
          contactForm.reset();
        }, 1500);
      }
    });
  }
});
