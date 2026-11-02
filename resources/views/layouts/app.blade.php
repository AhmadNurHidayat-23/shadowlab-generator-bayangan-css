<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Atur bayangan CSS secara visual dengan ShadowLab. Geser pengaturan, lihat pratinjau langsung, dan salin kode box-shadow yang siap digunakan.">
    <meta name="theme-color" content="#f6f2e9">
    <title>ShadowLab — Pembuat Bayangan CSS</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <a class="skip-link" href="#shadow-form">Langsung ke editor bayangan</a>
    <header class="site-header wrap">
        <a class="wordmark" href="{{ route('home') }}" aria-label="ShadowLab, halaman utama">shadowlab<span>.</span></a>
        <span class="header-note">Eksperimen kecil, dimensi baru.</span>
    </header>
    <main class="wrap">@yield('content')</main>
    <footer class="site-footer wrap"><p>ShadowLab — Pembuat Bayangan CSS.</p><span>Dari visual ke kode.</span></footer>
</body>
</html>
