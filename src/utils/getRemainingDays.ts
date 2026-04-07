
export function getRemainingDays(start_date: Date | string, end_date: Date | string): number {
  const start = new Date(start_date).getTime();
  const end = new Date(end_date).getTime();

  const diff = end - start;

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return days;
}