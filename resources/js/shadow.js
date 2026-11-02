export const RANGES = { x: [-100, 100], y: [-100, 100], blur: [0, 100], spread: [-50, 100], opacity: [0, 100] };

export function isHexColor(value) {
    return /^#[0-9a-f]{6}$/i.test(value);
}

export function buildShadow(settings) {
    for (const [name, [min, max]] of Object.entries(RANGES)) {
        const value = settings[name];
        if (!Number.isInteger(value) || value < min || value > max) throw new Error('Nilai bayangan berada di luar rentang yang diizinkan.');
    }
    if (!isHexColor(settings.color)) throw new Error('Gunakan kode warna heksadesimal enam digit.');
    if (typeof settings.inset !== 'boolean') throw new Error('Opsi inset tidak valid.');
    const rgb = [1, 3, 5].map(offset => parseInt(settings.color.slice(offset, offset + 2), 16));
    const { x, y, blur, spread, opacity, inset } = settings;
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px rgba(${rgb.join(', ')}, ${opacity / 100})`;
}
