document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens que estiverem abertos
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));

      // Se o clicado não estava ativo, abre-o
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});