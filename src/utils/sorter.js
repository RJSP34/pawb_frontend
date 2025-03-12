import dayjs from "dayjs";

export const stringSorter = (a, b) => (a > b ? 1 : b > a ? -1 : 0);
export const dateSorter = (a, b) => dayjs(a).diff(dayjs(b));
