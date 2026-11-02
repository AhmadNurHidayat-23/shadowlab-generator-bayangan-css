import { buildShadow, isHexColor, RANGES } from './shadow.js';
import { copyText } from './clipboard.js';

const byId = id => document.getElementById(id);
const form = byId('shadow-form'), preview = byId('preview-card'), code = byId('css-output');
const color = byId('color-input'), hex = byId('color-hex'), inset = byId('inset-input');
const copy = byId('copy-button'), reset = byId('reset-button'), status = byId('copy-status');
const sliders = Object.fromEntries(Object.keys(RANGES).map(name => [name, byId(`${name}-input`)]));

function clearStatus() { status.textContent = ''; status.dataset.error = 'false'; }

function render() {
    const settings = Object.fromEntries(Object.entries(sliders).map(([name, input]) => [name, Number(input.value)]));
    settings.color = color.value;
    settings.inset = inset.checked;
    const value = buildShadow(settings);
    preview.style.boxShadow = value;
    code.value = `box-shadow: ${value};`;
    for (const [name, input] of Object.entries(sliders)) {
        const unit = name === 'opacity' ? '%' : ' px';
        byId(`${name}-value`).textContent = `${settings[name]}${unit}`;
        input.setAttribute('aria-valuetext', `${settings[name]}${unit}`);
    }
    clearStatus();
}

function setColorError(invalid) {
    hex.setAttribute('aria-invalid', String(invalid));
    byId('color-error').hidden = !invalid;
}

form.addEventListener('submit', event => event.preventDefault());
for (const input of Object.values(sliders)) input.addEventListener('input', render);
inset.addEventListener('change', render);
color.addEventListener('input', () => {
    hex.value = color.value.toUpperCase();
    setColorError(false);
    render();
});
hex.addEventListener('input', () => {
    const value = hex.value.trim();
    const valid = isHexColor(value);
    setColorError(!valid);
    if (!valid) return;
    color.value = value;
    render();
});
reset.addEventListener('click', () => {
    form.reset();
    hex.value = color.value.toUpperCase();
    setColorError(false);
    render();
    status.textContent = 'Pengaturan dikembalikan ke nilai awal.';
});
copy.addEventListener('click', async () => {
    const text = code.value;
    copy.disabled = true;
    byId('copy-label').textContent = 'Menyalin…';
    clearStatus();
    try {
        const copied = await copyText(text);
        if (copied) {
            status.textContent = code.value === text ? 'Kode CSS berhasil disalin.' : 'Kode sebelumnya disalin. Salin kembali untuk perubahan terbaru.';
        } else {
            code.focus();
            code.select();
            status.textContent = 'Penyalinan otomatis tidak tersedia. Kode sudah dipilih; tekan ⌘C atau Ctrl+C.';
            status.dataset.error = 'true';
        }
    } catch {
        status.textContent = 'Kode tidak dapat disalin. Pilih kode CSS dan salin secara manual.';
        status.dataset.error = 'true';
    } finally {
        copy.disabled = false;
        byId('copy-label').textContent = 'Salin CSS';
    }
});

hex.value = color.value.toUpperCase();
render();
byId('settings-controls').disabled = false;
reset.disabled = false;
copy.disabled = false;
