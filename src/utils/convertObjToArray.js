export default function (obj) {
  return !Array.isArray(obj) && typeof obj === 'object'
    ? [...Object.values(obj)]
    : obj;
}
