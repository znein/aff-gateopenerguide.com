// Turns every <a data-aff href="https://store/..."> into a tracked affiliate link.
// The plain href stays in the HTML as a fallback if this script never runs.
//
// With a deepLinkTemplate containing {clickref}, each link also gets a sub-ID label -
// <site>-<section>-<kind>-<product>, e.g. "bestsupersoil-picks-btn-starter-kit" - so the
// network's reports show which site, section and button earned each click and sale.
(function () {
  var cfg = window.AFFILIATE || {};
  var params = new URLSearchParams();
  try { params = new URL(cfg.link).searchParams; } catch (e) {}

  function kindOf(a) {
    if (a.classList.contains("card-img-link")) return "img";
    if (a.classList.contains("cat")) return "cat";
    if (a.closest(".card")) return "btn";
    return "cta";
  }

  function clean(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  // A short, stable fingerprint of a string (djb2 hash, base 36).
  function fingerprint(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return ("0000" + h.toString(36)).slice(-4);
  }

  // Awin allows 50 characters. A slug that doesn't fit keeps its readable start (usually the model)
  // plus a 4-character fingerprint of the whole slug, so two products can never share a label.
  function clickref(a, url) {
    var section = (a.closest("section[id]") || {}).id || "page";
    var prefix = clean([cfg.site, section, kindOf(a)].filter(Boolean).join("-"));
    var slug = clean(decodeURIComponent(url.pathname).split("/").filter(Boolean).pop() || "home");
    var room = 50 - prefix.length - 1;
    if (slug.length > room) {
      slug = slug.slice(0, room - 5).replace(/-+$/, "") + "-" + fingerprint(slug);
    }
    return prefix + "-" + slug;
  }

  document.querySelectorAll("a[data-aff]").forEach(function (a) {
    var url = new URL(a.getAttribute("href"), cfg.store);
    if (cfg.deepLinkTemplate) {
      a.href = cfg.deepLinkTemplate
        .replace("{clickref}", encodeURIComponent(clickref(a, url)))
        .replace("{url}", encodeURIComponent(url.toString()));
    } else {
      params.forEach(function (v, k) { url.searchParams.set(k, v); });
      a.href = url.toString();
    }
    a.target = "_blank";
    a.rel = "sponsored nofollow noopener";
  });
})();
