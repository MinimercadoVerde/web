import { DateTime } from 'luxon';

export function isStoreOpen(): boolean {
  const currentHour = DateTime.now().setZone('America/Bogota').hour;

  return currentHour >= 7 && currentHour < 21;
}