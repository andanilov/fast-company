// Rules
export const rules = {
  isRequired: (error = 'Нет данных') => (data) => {
    if (Array.isArray(data)) {
      console.log('!', data);
      return data.length ? false : error;
    }
    if (typeof data === 'object') {
      return Object.values(data).length ? false : error;
    }
    return data ? false : error;
  },
  isEmail: (error = 'Неверный формат') => (data) => (String(data)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ? false
    : error),
};

export default (...fns) => (x) => {
  let error = '';

  try {
    fns.reduce((a, f) => {
      const currentError = f(a);
      if (currentError) {
        throw new Error(currentError);
      }
      return a;
    }, x);
  } catch (e) {
    error = e.message;
  }

  return error;
};
