import { SITE } from '../config';
/** Site base path ("/" in production, e.g. "/Cozy-7/" on a GitHub Pages preview). */
export const BASE: string = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
/** Prefix a site-absolute path ("/guides/") with the base path. Idempotent. */
export const withBase = (p: string) => (BASE === '/' || p.startsWith(BASE) ? p : BASE.replace(/\/$/, '') + p);
/** Absolute URL for canonical, Open Graph and JSON-LD. */
export const abs = (p: string) => (/^https?:\/\//.test(p) ? p : SITE.url.replace(/\/$/, '') + withBase(p));
