export function formatMonth(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });
}

export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7);
}

export function calculateReadingTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}