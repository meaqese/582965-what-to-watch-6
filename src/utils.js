export const snakeToCamel = (object) => {
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
