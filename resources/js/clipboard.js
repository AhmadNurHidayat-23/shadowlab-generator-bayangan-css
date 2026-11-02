export async function copyText(text) {
    if (window.isSecureContext && typeof navigator.clipboard?.writeText === 'function') {
        try { await navigator.clipboard.writeText(text); return true; } catch { /* Coba penyalinan kompatibel. */ }
    }
    const previousFocus = document.activeElement;
    const buffer = document.createElement('textarea');
    buffer.value = text;
    buffer.className = 'clipboard-buffer';
    buffer.setAttribute('readonly', '');
    buffer.setAttribute('aria-hidden', 'true');
    document.body.append(buffer);
    buffer.select();
    buffer.setSelectionRange(0, text.length);
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { /* Tawarkan salin manual. */ }
    buffer.remove();
    previousFocus?.focus({ preventScroll: true });
    return copied;
}
