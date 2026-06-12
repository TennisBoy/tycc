import { useEffect } from "react";

export const SITE_URL = "https://tycctoronto.com";
export const SITE_NAME = "Toronto Youth Cycling Club";

export interface SeoMeta {
  /** Full document <title>. */
  title: string;
  /** Meta description, ideally ~150–160 characters. */
  description: string;
  /** Route path, e.g. "/about". Drives canonical + og:url. */
  path: string;
  /** Set true on pages that should not be indexed (e.g. 404). */
  noindex?: boolean;
}

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const removeMeta = (attr: "name" | "property", key: string) => {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
};

/**
 * Keeps the document head in sync with the active route on SPA navigations.
 *
 * It mutates the tags already present in index.html (instead of appending new
 * ones) so crawlers see exactly one title / description / canonical per page —
 * React 19's tag hoisting would otherwise leave duplicates alongside the static
 * tags shipped in index.html.
 */
export const useSeo = ({ title, description, path, noindex }: SeoMeta) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    if (noindex) {
      upsertMeta("name", "robots", "noindex, follow");
    } else {
      removeMeta("name", "robots");
    }
  }, [title, description, path, noindex]);
};
