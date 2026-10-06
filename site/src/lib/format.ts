export const fmtDate = (d: Date | string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
export const isoDate = (d: Date | string) => new Date(d).toISOString().slice(0, 10);
export const readingTime = (text: string) => Math.max(1, Math.round(text.split(/\s+/).length / 230));
export const stripMd = (s: string) => s.replace(/[#*_`>\[\]]/g, '');
