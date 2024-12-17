import { DateTime } from "luxon";

export function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function camelCaseToTitleCase(camelCaseString: string) {
  return camelCaseString
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function formatPrice(value: number) {
  const formattedNumber = Number(value).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  return formattedNumber;
}
export function removeAccents(string: string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function getLocalDateTime() {
  const now = DateTime.now().setZone("America/Bogota") as DateTime<true>
  const today = now.startOf('day').toBSON()
  const { month, year } = now
  const week = now.weekNumber

  return {now, today, week, month, year}
}

