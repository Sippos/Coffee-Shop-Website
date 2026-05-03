const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-nav-toggle]');
const mobilePanel = document.querySelector('[data-mobile-panel]');

if (nav) {
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
}

if (toggle && mobilePanel) {
  const closeMenu = () => {
    mobilePanel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobilePanel.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  mobilePanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

const specials = [
  {
    label: "Today's mood",
    name: 'Oat Cortado',
    sub: 'with cinnamon foam',
    desc: 'Silky oat milk poured gently over a warm ristretto. Dusted with cinnamon. Best enjoyed without a plan.',
    price: '€ 4.20',
    img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    label: 'Seasonal',
    name: 'Iced Matcha',
    sub: 'ceremonial grade, oat milk',
    desc: 'Whisked to order, poured over ice, and made for late Berlin mornings that turn into afternoons.',
    price: '€ 4.80',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASXSusJ06hcEeG-tidG22hxY3jrKgE7xg-CcSvogRZQtWFSG-0KVQo-1x099yQb3VWU-jVVrmVHKZbKAGeuZgB37WGpaeAGXA1hzRcXGaFPgeMglzAG8dqFA7luv69Gh3jH_CwDssOWjfsu0ML8Y6AtnlJzQ0BZ8jB22UUiFZazWJ6u7F5h3uYmYIQIG7WE5VRM9S9U7n-ceQlR72JgT7i6b9KZbMTVm6-Fh64WtZgR4yk9BMlTyozMlFhHPoyItDLjMiv4lWrrL2g'
  },
  {
    label: 'House favorite',
    name: 'Honey Latte',
    sub: 'wildflower honey, soft foam',
    desc: 'Espresso, steamed milk, and a ribbon of honey. Sweet, soft, and never too much.',
    price: '€ 4.50',
    img: 'https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg?auto=compress&cs=tinysrgb&w=900'
  }
];

const specialRoot = document.querySelector('[data-special]');
if (specialRoot) {
  const label = specialRoot.querySelector('[data-special-label]');
  const name = specialRoot.querySelector('[data-special-name]');
  const sub = specialRoot.querySelector('[data-special-sub]');
  const desc = specialRoot.querySelector('[data-special-desc]');
  const price = specialRoot.querySelector('[data-special-price]');
  const img = specialRoot.querySelector('[data-special-img]');
  const dots = specialRoot.querySelector('[data-special-dots]');

  const setSpecial = (index) => {
    const item = specials[index];
    label.textContent = item.label;
    name.textContent = item.name;
    sub.textContent = item.sub;
    desc.textContent = item.desc;
    price.textContent = item.price;
    img.src = item.img;
    img.alt = `${item.name} at Sips Coffee Corner`;
    dots.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
      dot.setAttribute('aria-pressed', String(dotIndex === index));
    });
  };

  specials.forEach((item, index) => {
    const dot = document.createElement('button');
    dot.className = `dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show ${item.name}`);
    dot.setAttribute('aria-pressed', String(index === 0));
    dot.addEventListener('click', () => setSpecial(index));
    dots.appendChild(dot);
  });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const menuSections = document.querySelectorAll('[data-category]');
if (filterButtons.length && menuSections.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      menuSections.forEach((section) => {
        const show = filter === 'all' || section.dataset.category === filter;
        section.hidden = !show;
      });
    });
  });
}

const newsletter = document.querySelector('[data-newsletter]');
if (newsletter) {
  newsletter.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('[data-newsletter-message]');
    newsletter.style.display = 'none';
    if (message) message.style.display = 'block';
  });
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('[data-contact-message]');
    if (message) message.style.display = 'block';
    contactForm.reset();
  });
}
