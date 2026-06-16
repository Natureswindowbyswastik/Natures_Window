export function stripHtml(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function isRichTextEmpty(html = '') {
  return stripHtml(html).trim().length === 0;
}
