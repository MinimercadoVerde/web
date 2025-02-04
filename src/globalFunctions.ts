import { DateTime } from "luxon";

function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function camelCaseToTitleCase(camelCaseString: string) {
  return camelCaseString
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatPrice(value: number) {
  const formattedNumber = Number(value).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  return formattedNumber;
}

function removeAccents(string: string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
function toURI(string: string) {
  return removeAccents(toKebabCase(string))
}
function getLocalDateTime() {
  const now = DateTime.now().setZone("America/Bogota") as DateTime<true>
  const today = now.startOf('day').toBSON()
  const { month, year } = now
  const week = now.weekNumber

  return { now, today, week, month, year }
}

function toTitleCase(str: string): string {
  return str
    .split(" ")                        // Split the string into an array of words
    .map(word =>                        // Map over each word
      word.charAt(0).toUpperCase() +     // Capitalize the first letter
      word.slice(1).toLowerCase()       // Convert the rest of the letters to lowercase
    )
    .join(" ");                         // Join the words back into a single string
}

function toKebabCase(input: string): string {
  return input ? input
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Separa palabras cuando hay un cambio de mayúsculas a minúsculas
    .replace(/[\s_]+/g, '-') // Reemplaza espacios y guiones bajos por guiones
    .toLowerCase()
    :
    "none" // Convierte todo a minúsculas
}

function kebabToLowerCase(input: string): string {
  return input.replace(/-/g, ' ').toLowerCase();
}
function trimObject<T extends Record<string, any>>(obj: T): T {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      obj[key] = trimObject(obj[key]); // Recursively trim nested objects
    }
  }
  return obj;
}

export {
  formatName,
  camelCaseToTitleCase,
  formatPrice,
  removeAccents,
  getLocalDateTime,
  toKebabCase,
  kebabToLowerCase,
  toTitleCase,
  toURI,
  trimObject
};

