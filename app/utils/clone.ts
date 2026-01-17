export default function clone(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}
