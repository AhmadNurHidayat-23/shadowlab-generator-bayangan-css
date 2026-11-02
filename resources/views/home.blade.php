@extends('layouts.app')

@section('content')
    <section class="intro" aria-labelledby="page-title">
        <p class="eyebrow">EDITOR BAYANGAN INTERAKTIF</p>
        <h1 id="page-title">Buat Bayangan CSS dengan Mudah.</h1>
        <p class="description">Atur bayangan elemen secara visual dan salin kode CSS yang siap digunakan.</p>
    </section>

    <section class="editor" aria-label="Editor bayangan CSS">
        <form id="shadow-form" class="settings-panel">
            <div class="panel-heading"><h2>Pengaturan bayangan</h2><button type="button" id="reset-button" class="reset-button" disabled><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6"/></svg>Reset</button></div>
            <fieldset id="settings-controls" disabled>
                <legend class="sr-only">Atur nilai bayangan</legend>
                <div class="control">
                    <div class="control-heading"><label for="x-input">Offset horizontal (X)</label><output id="x-value" for="x-input">0 px</output></div>
                    <input type="range" id="x-input" name="x" min="-100" max="100" step="1" value="0">
                </div>
                <div class="control">
                    <div class="control-heading"><label for="y-input">Offset vertikal (Y)</label><output id="y-value" for="y-input">16 px</output></div>
                    <input type="range" id="y-input" name="y" min="-100" max="100" step="1" value="16">
                </div>
                <div class="control">
                    <div class="control-heading"><label for="blur-input">Radius blur</label><output id="blur-value" for="blur-input">32 px</output></div>
                    <input type="range" id="blur-input" name="blur" min="0" max="100" step="1" value="32">
                </div>
                <div class="control">
                    <div class="control-heading"><label for="spread-input">Penyebaran (spread)</label><output id="spread-value" for="spread-input">-8 px</output></div>
                    <input type="range" id="spread-input" name="spread" min="-50" max="100" step="1" value="-8">
                </div>
                <div class="color-control">
                    <label for="color-input">Warna bayangan</label>
                    <div class="color-fields">
                        <input type="color" id="color-input" value="#23405a" aria-label="Pilih warna bayangan">
                        <label class="sr-only" for="color-hex">Kode warna heksadesimal</label>
                        <input type="text" id="color-hex" maxlength="7" pattern="#[0-9a-fA-F]{6}" placeholder="#23405A" spellcheck="false" autocapitalize="characters" aria-describedby="color-error">
                    </div>
                    <p class="field-error" id="color-error" role="alert" hidden>Gunakan kode warna enam digit, misalnya #23405A.</p>
                </div>
                <div class="control opacity-control">
                    <div class="control-heading"><label for="opacity-input">Opasitas bayangan</label><output id="opacity-value" for="opacity-input">22%</output></div>
                    <input type="range" id="opacity-input" name="opacity" min="0" max="100" step="1" value="22" aria-describedby="opacity-hint">
                    <p class="field-hint" id="opacity-hint">0% tidak terlihat · 100% pekat</p>
                </div>
                <label class="inset-control" for="inset-input"><input type="checkbox" id="inset-input">Bayangan ke dalam <span>(inset)</span></label>
            </fieldset>
            <noscript><p class="field-error">Aktifkan JavaScript untuk mengatur bayangan dan menyalin CSS.</p></noscript>
        </form>

        <div class="preview-panel" aria-labelledby="preview-title">
            <div class="panel-heading"><h2 id="preview-title">Pratinjau</h2><span class="live-label"><span aria-hidden="true"></span>Langsung</span></div>
            <div class="preview-stage">
                <div id="preview-card" class="preview-card" role="img" aria-label="Pratinjau bayangan pada elemen"><span>Elemen Anda</span></div>
            </div>
            <p class="preview-hint">Geser pengaturan. Lihat perbedaannya.</p>
        </div>
    </section>

    <section class="code-panel" aria-labelledby="code-title">
        <div class="code-heading"><div><h2 id="code-title">Kode CSS</h2><p>Siap ditempel ke stylesheet Anda.</p></div><button class="button" id="copy-button" type="button" disabled><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H4v13h4"/></svg><span id="copy-label">Salin CSS</span></button></div>
        <label class="sr-only" for="css-output">Kode CSS box-shadow</label>
        <textarea id="css-output" readonly rows="2" spellcheck="false" placeholder="Kode CSS akan muncul di sini setelah JavaScript aktif."></textarea>
        <p class="copy-status" id="copy-status" role="status" aria-live="polite" aria-atomic="true"></p>
    </section>
@endsection
