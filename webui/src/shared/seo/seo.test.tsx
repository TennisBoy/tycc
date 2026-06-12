import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { getRouteMeta, ROUTE_META } from "./routeMeta";
import { SITE_URL, useSeo } from "./useSeo";

const metaContent = (selector: string) =>
  document.head.querySelector<HTMLMetaElement>(selector)?.content;

const canonicalHref = () =>
  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;

describe("getRouteMeta", () => {
  it("returns the matching entry for a known path", () => {
    expect(getRouteMeta("/about")).toBe(ROUTE_META["/about"]);
  });

  it("falls back to the home entry for an unknown path", () => {
    expect(getRouteMeta("/does-not-exist")).toBe(ROUTE_META["/"]);
  });

  it("gives every route a unique, non-empty title and description", () => {
    const entries = Object.values(ROUTE_META);
    const titles = new Set(entries.map((e) => e.title));
    expect(titles.size).toBe(entries.length);
    for (const entry of entries) {
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.description.length).toBeGreaterThan(0);
      // Descriptions should stay within the ~160 char SERP snippet budget.
      expect(entry.description.length).toBeLessThanOrEqual(170);
    }
  });
});

describe("useSeo", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("syncs title, description, canonical, and social tags to the route", () => {
    renderHook(() =>
      useSeo({ path: "/about", title: "About — TYCC", description: "About copy." }),
    );

    expect(document.title).toBe("About — TYCC");
    expect(metaContent('meta[name="description"]')).toBe("About copy.");
    expect(canonicalHref()).toBe(`${SITE_URL}/about`);
    expect(metaContent('meta[property="og:title"]')).toBe("About — TYCC");
    expect(metaContent('meta[property="og:url"]')).toBe(`${SITE_URL}/about`);
    expect(metaContent('meta[name="twitter:description"]')).toBe("About copy.");
  });

  it("updates existing tags in place rather than duplicating them", () => {
    const existing = document.createElement("meta");
    existing.setAttribute("name", "description");
    existing.setAttribute("content", "old");
    document.head.appendChild(existing);

    renderHook(() =>
      useSeo({ path: "/", title: "Home", description: "new description" }),
    );

    const tags = document.head.querySelectorAll('meta[name="description"]');
    expect(tags).toHaveLength(1);
    expect(tags[0].getAttribute("content")).toBe("new description");
  });

  it("adds a noindex robots tag only when requested", () => {
    const { rerender } = renderHook(
      ({ noindex }: { noindex: boolean }) =>
        useSeo({ path: "/404", title: "404", description: "missing", noindex }),
      { initialProps: { noindex: true } },
    );
    expect(metaContent('meta[name="robots"]')).toBe("noindex, follow");

    rerender({ noindex: false });
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });
});
