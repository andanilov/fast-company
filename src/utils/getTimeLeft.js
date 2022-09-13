const months = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

const addZero = (num) => (+num > 9 ? num : `0${num}`);

export default function (secs) {
  return Object.values({
    min1: (secs, secsCurr) => (secsCurr - secs <= 60 * 1000 ? 'минуту назад' : null),
    min5: (secs, secsCurr) => (secsCurr - secs <= 300 * 1000 ? '5 минут назад' : null),
    min10: (secs, secsCurr) => (secsCurr - secs <= 600 * 1000 ? '10 минут назад' : null),
    min30: (secs, secsCurr) => (secsCurr - secs <= 1800 * 1000 ? '30 минут назад' : null),
    day: (secs, secsCurr) => (secsCurr - secs <= 86400 * 1000
      ? `В ${addZero(new Date(secs).getHours())}:${addZero(new Date(secs).getMinutes())}`
      : null),
    mounth: (secs, secsCurr) => (secsCurr - secs <= 86400 * 30 * 1000
      ? `${new Date(secs).getDate()} ${new Date(secs).getMonth()}`
      : null),
    year: (secs, secsCurr) => (secsCurr - secs <= 86400 * 365 * 1000
      ? `${new Date(secs).getDate()} ${months[new Date(secs).getMonth()]} ${new Date(secs).getFullYear()}`
      : null),
  }).reduce((acc, check) => acc ?? check(+secs, +new Date()) ?? null, null);
}
