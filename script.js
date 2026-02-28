// Menu Mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animar o botão hamburger
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
  });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(26, 26, 26, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    header.style.background = 'rgba(26, 26, 26, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// Carregar produtos em destaque
async function loadFeaturedProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    
    const featuredProducts = products.slice(0, 4); // Mostrar apenas 4 produtos
    
    const productGrid = document.getElementById('featured-products');
    if (productGrid) {
      productGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
          <div class="product-image">
            <img src="${product.image || 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80'}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-price">€${product.price.toFixed(2)}</p>
            <button class="btn-primary" onclick="addToCart('${product._id}')">Adicionar ao Carrinho</button>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedProducts();
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animação de entrada dos elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card, .testimonial-card, .expertise-content, .expertise-image').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});