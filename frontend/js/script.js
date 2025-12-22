// فعال‌سازی ذرات — دقیقاً مثل نسخه اصلی
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 100 },
        "color": { "value": ["#4cc9f0", "#8b5cf6", "#7209b7"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.6, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": {
            "enable": true,
            "distance": 140,
            "color": "#6366f1",
            "opacity": 0.3,
            "width": 1
        },
        "move": { "enable": true, "speed": 1.5 }
    },
    "interactivity": {
        "events": { "onhover": { "enable": true, "mode": "repulse" } }
    }
});

// سوئیچ زبان — کامل و بدون تغییر
function setLang(lang) {
    document.querySelectorAll('[data-fa]').forEach(el => {
        el.textContent = lang === 'fa' ? el.dataset.fa : el.dataset.en;
    });
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.classList.toggle('en', lang === 'en');
    document.querySelectorAll('.lang-switch button').forEach(b => b.classList.remove('active'));
    document.querySelector(`.lang-switch button[onclick="setLang('${lang}')"]`).classList.add('active');
}

// همبرگر منو در موبایل
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');  // برای تبدیل به ×
});

//    document.querySelector('.menu-toggle').addEventListener('click', () => {
//    document.querySelector('.nav-links').classList.toggle('active');
//});

