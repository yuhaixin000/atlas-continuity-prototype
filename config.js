// Public result-collector routing only. Unified Worker/custom-domain hosts use same-origin submission.
const atlasStaticMirrorHosts = new Set(["yuhaixin000.github.io", "127.0.0.1", "localhost"]);
window.ATLAS_COLLECTOR_URL = atlasStaticMirrorHosts.has(window.location.hostname)
  ? "https://atlas-prototype-result-collector.atlas-yuhaixin000.workers.dev"
  : window.location.origin;
window.ATLAS_COLLECTOR_URLS = [window.ATLAS_COLLECTOR_URL];
