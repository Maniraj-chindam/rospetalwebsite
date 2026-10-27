// Keep this inline in the document head: it must run before Next loads route chunks.
export const staleChunkRecoveryScript = `(function () {
  var storageKey = 'rosepetal_stale_chunk_reload_at';
  var reloading = false;
  function recover(event) {
    var target = event && event.target;
    var missingNextScript = target && target.tagName === 'SCRIPT' &&
      /\\/_next\\/static\\/chunks\\//.test(target.src || '');
    var reason = event && (event.reason || event.error);
    var message = String((reason && (reason.message || reason.name)) || (event && event.message) || '');
    if (!missingNextScript && !/ChunkLoadError|Loading chunk [^ ]+ failed/i.test(message)) return;
    if (reloading) return;
    try {
      var lastReload = Number(sessionStorage.getItem(storageKey) || 0);
      if (Date.now() - lastReload < 60000) return;
      sessionStorage.setItem(storageKey, String(Date.now()));
    } catch (_) { return; }
    reloading = true;
    window.location.reload();
  }
  window.addEventListener('error', recover, true);
  window.addEventListener('unhandledrejection', recover);
})();`;
