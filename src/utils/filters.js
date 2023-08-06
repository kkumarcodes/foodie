import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { forEach, isObjectLike, omitBy, truncate } from 'lodash';

dayjs.extend(relativeTime);

export function relTime(value) {
  if (!value) return null;
  return dayjs(value).fromNow();
}

export function deepOmitBy(obj, predicate) {
  const changedObj = omitBy(obj, predicate);
  forEach(changedObj, function (value, key) {
    if (isObjectLike(value)) {
      changedObj[key] = deepOmitBy(value, predicate);
    }
  });
  return changedObj;
}

export function truncateText(value, length) {
  if (!value) return '';

  return truncate(value, {
    length
  });
}
