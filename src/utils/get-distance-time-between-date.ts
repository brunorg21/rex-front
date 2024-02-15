import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

export function getDistanceTime(date: Date) {
  dayjs.extend(relativeTime);
  const distanceInTime = dayjs(date, {
    locale: "pt-BR",
  }).fromNow();

  return distanceInTime;
}
