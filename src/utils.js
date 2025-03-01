export const convertSnakeToCamel = (object) => {
  const countOf = (str, symbol) => {
    const regex = new RegExp(symbol + `*`, `g`);
    return (symbol.match(regex) || []).length;
  };

  const adaptedToCamel = {};
  Object.entries(object).forEach(([key, value]) => {
    for (let i = 0; i < countOf(key, `_`); i++) {
      const indexOfUnderline = key.indexOf(`_`);

      if (indexOfUnderline > -1) {
        key = key.replace(`_`, ``);
        key = key.substr(0, indexOfUnderline) + key[indexOfUnderline].toUpperCase() + key.substr(indexOfUnderline + key[indexOfUnderline].length);
      }
    }

    adaptedToCamel[key] = value;
  });

  return adaptedToCamel;
};


export const format = (string, ...args) => {
  let formatted = string;

  if (typeof args[0] === `object`) {
    for (let [key, value] of Object.entries(args[0])) {
      formatted = formatted.replace(key, value);
    }
  } else {
    for (let i = 0; i < args.length; i++) {
      formatted = formatted.replace(`{` + i + `}`, args[i]);
    }
  }

  return formatted;
};

