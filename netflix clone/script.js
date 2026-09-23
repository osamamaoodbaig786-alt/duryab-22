document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const openTrailerBtn = document.getElementById('openTrailerBtn');
  const videoModal = document.getElementById('videoModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const trailerIframe = document.getElementById('trailerIframe');
  const faqItems = document.querySelectorAll('.faq-item');
  const posterCards = document.querySelectorAll('.poster-card');

  // 1. Navbar Solid Background on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Open Video Modal for Featured Hero Movie
  openTrailerBtn.addEventListener('click', () => {
    openModal('https://www.youtube.com/embed/b9EkMc79ZSU?autoplay=1');
  });

  // 3. Open Video Modal on Clicking Any Poster Card
  posterCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoUrl = card.getAttribute('data-video');
      if (videoUrl) {
        openModal(`${videoUrl}?autoplay=1`);
      }
    });
  });

  function openModal(url) {
    trailerIframe.src = url;
    videoModal.classList.add('open');
  }

  // 4. Close Modal
  closeModalBtn.addEventListener('click', closeModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeModal();
    }
  });

  function closeModal() {
    videoModal.classList.remove('open');
    trailerIframe.src = '';
  }

  // 5. FAQ Accordion Toggle
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      item.classList.toggle('active');
    });
  });
});

// 6. Smooth Scroll for Row Carousel Handles
function scrollRow(button, direction) {
  const rowWrapper = button.parentElement;
  const rowPosters = rowWrapper.querySelector('.row-posters');
  const scrollAmount = rowPosters.clientWidth * 0.75;
  rowPosters.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}