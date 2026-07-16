const CONFIG = {
  whatsapp: "5561995947035"
};

const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
  const interest = document.querySelector('[name="interesse"]');
  if (interest) interest.value = link.dataset.interest;
}));

document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {
  const interest = document.querySelector('[name="interesse"]');
  if (interest) interest.value = link.dataset.plan;
}));

const referralPhone = document.querySelector('[name="telefone_indicado"]');
referralPhone.addEventListener('input', event => {
  let value = event.target.value.replace(/\D/g, '').slice(0, 11);
  if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  else if (value.length > 6) value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  else if (value.length > 2) value = value.replace(/(\d{2})(\d+)/, '($1) $2');
  event.target.value = value;
});

document.querySelector('#referral-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const message = `Olá! Quero participar da campanha Indique e Ganhe do Cleano.\n\n*Quem está indicando:* ${data.indicador}\n*Nome do indicado:* ${data.indicado}\n*Telefone do indicado:* ${data.telefone_indicado}\n*Chave PIX para receber R$ 30,00:* ${data.chave_pix}\n\n*Regra da promoção:* o desconto será liberado após a instalação do cliente indicado.`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.querySelector('#year').textContent = new Date().getFullYear();

const visitCount = document.querySelector('#visit-count');
fetch('https://api.counterapi.dev/v1/cleano-kem-netlify/visitas/up')
  .then(response => response.ok ? response.json() : Promise.reject())
  .then(data => {
    visitCount.textContent = Number(data.count).toLocaleString('pt-BR');
  })
  .catch(() => {
    visitCount.textContent = 'indisponível';
  });
