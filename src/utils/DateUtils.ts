const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function getDateWithAddedDays(
  originalDate: Date,
  daysToAdd: number,
): Date {
  const addedMs = daysToAdd * DAY_IN_MS;
  return new Date(originalDate.getTime() + addedMs);
}

export function getDifferenceInDays(date1: Date, date2: Date): number {
  const dayInMs = 1000 * 60 * 60 * 24;
  const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffInMs / dayInMs);
}

export function getDateAsYMD(date: Date): string {
  return new Date(date).toISOString().split('T')[0];
}
