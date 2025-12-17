// ui-controls.js - نسخه اصلاح‌شده و بدون خطا

export let currentContractAddress = null; // اگر در main.js تعریف شده، اینجا لازم نیست، اما برای ایمنی

// نمایش محتوا در پنل اطلاعات
export function showInPanel(html) {
    const panel = document.getElementById('infoPanel');
    if (!panel) return;

    panel.innerHTML = html;

    // مطمئن شو دکمه مشارکت وجود داره (اگر قبلاً حذف شده باشه)
    let contributeBtn = document.getElementById('fixedContributeBtn');
    if (!contributeBtn) {
        contributeBtn = document.createElement('div');
        contributeBtn.id = 'fixedContributeBtn';
        contributeBtn.className = 'fixed-contribute-button';
        contributeBtn.innerHTML = `
            <button id="contributeButton">الان در ساخت این مدرسه مشارکت می‌کنم</button>
            <p>(اتصال به MetaMask و ارسال USDT در شبکه Polygon)</p>
        `;
        panel.appendChild(contributeBtn);
    }
}

// مخفی کردن دکمه مشارکت
export function hideContributeButton() {
    const btn = document.getElementById('fixedContributeBtn');
    if (btn) btn.style.display = 'none';
}

// نمایش دکمه مشارکت
export function showContributeButton() {
    const btn = document.getElementById('fixedContributeBtn');
    if (btn) btn.style.display = 'block';
}

// وضعیت پیش‌فرض پنل
export function resetPanel() {
    showInPanel(`
        <div class="no-selection">
            <div class="icon">🗺️</div>
            <h3>یک مورد را انتخاب کنید</h3>
            <p>روی استان، شهرستان یا پروژه کلیک کنید</p>
        </div>
    `);
    hideContributeButton();
}

// راه‌اندازی انتخابگر لایه پایه
export function setupBasemaps(map) {
    const basemaps = {
        carto: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { attribution: '© CartoDB' }),
        persiangis: L.tileLayer('https://map.persiangis.ir/tile/{z}/{x}/{y}.png', { attribution: '© PersianGIS' }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Esri' }),
        light: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© CartoDB' }),
        osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' })
    };

    let currentBasemap = basemaps.carto;
    currentBasemap.addTo(map);

    const select = document.getElementById('basemapSelect');
    if (select) {
        select.addEventListener('change', (e) => {
            map.removeLayer(currentBasemap);
            currentBasemap = basemaps[e.target.value];
            currentBasemap.addTo(map);
        });
    }
}

// راه‌اندازی دکمه بازگشت به ایران
export function setupHomeButton(map) {
    const homeBtn = document.getElementById('homeButton');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            map.flyTo([32.4279, 53.6880], 5, { animate: true, duration: 1.5 });
            resetPanel();
        });
    }
}
