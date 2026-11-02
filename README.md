# ShadowLab — Pembuat Bayangan CSS

ShadowLab adalah aplikasi web untuk membuat bayangan elemen secara visual dan menghasilkan deklarasi CSS `box-shadow`. Pengguna dapat mengatur posisi, kelembutan, penyebaran, warna, opasitas, serta arah bayangan melalui satu halaman berbahasa Indonesia.

Aplikasi ini dikembangkan untuk mempermudah eksperimen tampilan antarmuka tanpa menulis ulang nilai CSS secara manual. Desain memakai latar krem hangat, teks biru tua, tombol teal, dan permukaan sage. Judul tetap satu baris pada layar desktop yang memadai, termasuk lebar 1024 piksel, sedangkan tata letak menyesuaikan perangkat kecil.

## Fitur utama

- Offset horizontal dan vertikal dari −100 sampai 100 piksel.
- Radius blur dari 0 sampai 100 piksel.
- Penyebaran dari −50 sampai 100 piksel.
- Pemilih warna dan masukan kode heksadesimal enam digit.
- Opasitas 0–100% serta pilihan bayangan ke dalam atau `inset`.
- Pratinjau langsung dan kode CSS yang mengikuti pengaturan aktual.
- Tombol salin CSS dengan pemberitahuan dan tombol reset ke nilai awal.

Nilai masukan diperiksa sebelum kode dibentuk. Warna yang belum valid menampilkan petunjuk dan tidak mengganti bayangan terakhir yang valid. Pratinjau dan keluaran menggunakan string bayangan yang sama, sehingga perubahan kontrol diterapkan secara konsisten.

## Teknologi

ShadowLab menggunakan Laravel 13, layout Blade, HTML5, CSS3, JavaScript murni, dan Vite. Font Inter disertakan secara lokal beserta lisensinya. Tidak ada framework frontend, library generator, authentication, API eksternal, atau database. Session dan cache dikonfigurasi memakai file. Seluruh interaksi generator berlangsung di browser; Laravel menyajikan halaman dan aset.

## Cara menggunakan

1. Geser pengaturan posisi, blur, dan penyebaran.
2. Pilih warna atau ketik kode seperti `#23405A`.
3. Atur opasitas; 0% tidak terlihat dan 100% pekat.
4. Aktifkan `inset` jika bayangan perlu berada di dalam elemen.
5. Tekan **Salin CSS**, lalu tempel deklarasi ke stylesheet.
6. Gunakan **Reset** untuk mengembalikan pengaturan awal.

Jika akses papan klip otomatis tidak tersedia, aplikasi mencoba cara penyalinan kompatibel. Jika tetap gagal, pilih kode dan salin menggunakan ⌘C atau Ctrl+C sesuai petunjuk.

## Memahami box-shadow

Urutan nilainya adalah offset X, offset Y, blur, spread, dan warna RGBA. Offset negatif menggeser bayangan ke kiri atau atas. Blur memperhalus tepi; spread positif memperluas bayangan dan nilai negatif memperkecilnya. Alpha RGBA menentukan kepekatan. Kata `inset` memindahkan bayangan ke sisi dalam elemen.

## Menjalankan secara lokal

Gunakan PHP minimal 8.3, Composer 2, dan Node.js 22.12 atau lebih baru:

```sh
git clone https://github.com/AhmadNurHidayat-23/shadowlab-generator-bayangan-css.git
cd shadowlab-generator-bayangan-css
composer install
npm ci
cp .env.example .env
php artisan key:generate
npm run build
php artisan serve
```

Buka `http://localhost:8000`. Pada instalasi MAMP, buka `http://localhost:8888/shadowlab-generator-bayangan-css/public/`. MySQL dan migrasi tidak diperlukan. Direktori source di luar `public` dilindungi oleh konfigurasi Apache project.

Jalankan `php artisan test`, `npm test`, dan `npm run build` untuk memeriksa halaman, validasi, keluaran generator, serta kompilasi aset.
