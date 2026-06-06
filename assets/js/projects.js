/* =====================================================
   PROJECTS FILTER JS
   ===================================================== */
document.addEventListener('DOMContentLoaded', function () {
  const btns  = document.querySelectorAll('.f-btn');
  const cards = document.querySelectorAll('.pb-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          card.addEventListener('animationend', () => card.classList.remove('fade-in'), { once: true });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
