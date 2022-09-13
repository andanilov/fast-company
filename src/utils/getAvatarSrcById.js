export default function (name, sex) {
  const nameToNumber = [...name].map((chr) => chr.charCodeAt()).join('');
  return `https://avatars.dicebear.com/api/${sex || 'male'}/${nameToNumber}.svg`;
}
