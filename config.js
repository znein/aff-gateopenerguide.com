// The only file you need to edit to start earning on this site.
//
// Gate Operators Direct's affiliate program runs on Awin (advertiser 114678). Every buy link goes
// through Awin's tracker, which credits publisher 2085789 and forwards to the exact product page.
//
// link: for programs that credit a query parameter on the store itself (?ref=abc).
//   Unused here because deepLinkTemplate is set.
// deepLinkTemplate: networks with their own tracking domain. {url} = the URL-encoded
//   destination page; {clickref} = per-link label <site>-<section>-<kind>-<product> (Awin sub-ID).
//   When set, it is used instead of `link`.
window.AFFILIATE = {
  site: "gateopenerguide",  // first part of each link's clickref label in Awin reports
  store: "https://gateoperatorsdirectusa.com",
  link: "",
  deepLinkTemplate: "https://www.awin1.com/cread.php?awinmid=114678&awinaffid=2085789&clickref={clickref}&ued={url}"
};
