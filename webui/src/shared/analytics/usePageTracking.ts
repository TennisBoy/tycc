import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Sends a GA4 `page_view` event on every client-side route change.
 *
 * The gtag snippet in index.html configures GA with `send_page_view: false`,
 * so this hook owns all page views — including the first load. It no-ops when
 * `window.gtag` is unavailable (ad blockers, tests).
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
};
