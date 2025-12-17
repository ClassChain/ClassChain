import { map, currentContractAddress } from './main.js';

export function showInPanel(html) {
    const panel = document.getElementById('infoPanel');
    panel.innerHTML = html;
    // دکمه مشارکت رو دوباره اضافه می‌کنیم (در صورت نیاز)
    if (document.getElementById('fixedContributeBtn')) {
        panel.appendChild(document.getElementById('fixedContributeBtn'));
    }
}

export function hideContributeButton() {
    document.getElementById('fixedContributeBtn').style.display = 'none';
    currentContractAddress = null;
}

export function showContributeButton() {
    document.getElementById('fixedContributeBtn').style.display = 'block';
}

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

export function setupBasemaps(map) {
    const basemaps = {
        carto: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'),
        persiangis: L.tileLayer('https://map.persiangis.ir/tile/{z}/{x}/{y}.png'),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
        light: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'),
        osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    };

    let current = basemaps.carto.addTo(map);

    document.getElementById('basemapSelect').addEventListener('change', e => {
        map.removeLayer(current);
        current = basemaps[e.target.value].addTo(map);
    });
}

export function setupHomeButton(map) {
    document.getElementById('homeButton').addEventListener('click', () => {
        map.flyTo([32.4279, 53.6880], 5, { duration: 1.5 });
        resetPanel();
        // ریست انتخاب‌ها...
    });
}
