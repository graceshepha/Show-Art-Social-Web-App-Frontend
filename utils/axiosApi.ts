import axios from 'axios';

const axiosApi = axios.create();

const datePattern =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

type IsDate = (value: JSONPrimitive) => boolean;

const isDate: IsDate = (value) => {
  return typeof value === 'string' && datePattern.test(value);
};

type HandleDates<T = JSONValue> = (body: T) => T;

const handleDates: HandleDates = (body) => {
  if (
    !body ||
    typeof body === 'boolean' ||
    typeof body === 'number' ||
    body instanceof Date
  )
    return body;

  if (typeof body !== 'object') return isDate(body) ? new Date(body) : body;

  if (Array.isArray(body)) {
    const t = [];
    for (const i of body) t.push(handleDates(i));
    return t;
  }

  const t: typeof body = { ...body };
  for (const key of Object.keys(t)) {
    t[key] = handleDates(t[key]);
  }
  return t;
};

axiosApi.interceptors.response.use((res) => {
  res.data = handleDates(res.data);
  return res;
});

export default axiosApi;
