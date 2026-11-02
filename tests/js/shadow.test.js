import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildShadow, isHexColor, RANGES } from '../../resources/js/shadow.js';

const sample = { x: 0, y: 16, blur: 32, spread: -8, color: '#23405a', opacity: 22, inset: false };

test('satu nilai box-shadow memuat posisi, blur, spread, warna, dan alpha yang benar', () => {
    assert.equal(buildShadow(sample), '0px 16px 32px -8px rgba(35, 64, 90, 0.22)');
});

test('inset hanya ditambahkan saat opsi aktif', () => {
    assert.equal(buildShadow({ ...sample, inset: true }), 'inset 0px 16px 32px -8px rgba(35, 64, 90, 0.22)');
});

test('warna heksadesimal dikonversi tanpa bergantung pada huruf besar atau kecil', () => {
    assert.equal(buildShadow({ ...sample, color: '#Ab01cD' }), '0px 16px 32px -8px rgba(171, 1, 205, 0.22)');
});

test('opacity nol dan penuh menghasilkan alpha 0 dan 1', () => {
    assert.equal(buildShadow({ ...sample, opacity: 0 }), '0px 16px 32px -8px rgba(35, 64, 90, 0)');
    assert.equal(buildShadow({ ...sample, opacity: 100 }), '0px 16px 32px -8px rgba(35, 64, 90, 1)');
});

for (const [name, [min, max]] of Object.entries(RANGES)) {
    test(`batas ${name} menerima kedua ujung rentang dan menolak nilai di luarnya`, () => {
        assert.doesNotThrow(() => buildShadow({ ...sample, [name]: min }));
        assert.doesNotThrow(() => buildShadow({ ...sample, [name]: max }));
        assert.throws(() => buildShadow({ ...sample, [name]: min - 1 }), /rentang/);
        assert.throws(() => buildShadow({ ...sample, [name]: max + 1 }), /rentang/);
    });
}

test('kombinasi offset negatif, blur nol, dan spread maksimum tetap valid', () => {
    assert.equal(buildShadow({ ...sample, x: -100, y: -100, blur: 0, spread: 100, color: '#ffffff', opacity: 100 }), '-100px -100px 0px 100px rgba(255, 255, 255, 1)');
});

test('nilai bukan bilangan bulat dan angka tak terhingga ditolak', () => {
    for (const value of [NaN, Infinity, -Infinity, 1.5, '16', null]) {
        assert.throws(() => buildShadow({ ...sample, x: value }));
    }
});

test('warna tidak valid dan upaya menyisipkan deklarasi tambahan ditolak', () => {
    for (const value of ['#fff', '#zz0000', 'red', '#123456;', '#123456; color:red', '']) {
        assert.equal(isHexColor(value), false);
        assert.throws(() => buildShadow({ ...sample, color: value }), /warna/);
    }
});

test('inset harus berupa boolean', () => {
    assert.throws(() => buildShadow({ ...sample, inset: 'false' }), /inset/);
});
